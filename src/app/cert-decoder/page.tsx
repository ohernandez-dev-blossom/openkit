"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCcw, Shield, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid } from "@/components/geo-content-layout";

interface CertInfo {
  subject: Record<string, string>;
  issuer: Record<string, string>;
  serialNumber: string;
  validFrom: Date;
  validTo: Date;
  signatureAlgorithm: string;
  publicKeyAlgorithm: string;
  publicKeySize?: number;
  fingerprints: {
    sha256: string;
    sha1: string;
  };
  extensions: {
    subjectAltNames?: string[];
    keyUsage?: string[];
    extendedKeyUsage?: string[];
    basicConstraints?: { isCA: boolean; pathLen?: number };
  };
  pemType: string;
  isExpired: boolean;
  isNotYetValid: boolean;
  daysUntilExpiry: number;
}

// ASN.1 OID to name mapping
const OID_MAP: Record<string, string> = {
  "2.5.4.3": "CN",
  "2.5.4.6": "C",
  "2.5.4.7": "L",
  "2.5.4.8": "ST",
  "2.5.4.10": "O",
  "2.5.4.11": "OU",
  "2.5.4.12": "T",
  "2.5.4.42": "GN",
  "2.5.4.4": "SN",
  "1.2.840.113549.1.9.1": "E",
  "0.9.2342.19200300.100.1.25": "DC",
};

const SIG_ALGO_MAP: Record<string, string> = {
  "1.2.840.113549.1.1.5": "SHA-1 with RSA",
  "1.2.840.113549.1.1.11": "SHA-256 with RSA",
  "1.2.840.113549.1.1.12": "SHA-384 with RSA",
  "1.2.840.113549.1.1.13": "SHA-512 with RSA",
  "1.2.840.10045.4.3.2": "ECDSA with SHA-256",
  "1.2.840.10045.4.3.3": "ECDSA with SHA-384",
  "1.2.840.10045.4.3.4": "ECDSA with SHA-512",
};

// Simple ASN.1 DER parser
function parseDER(bytes: Uint8Array, offset = 0): { tag: number; length: number; value: Uint8Array; totalLength: number } {
  const tag = bytes[offset];
  let length = bytes[offset + 1];
  let headerLength = 2;
  
  if (length & 0x80) {
    const numBytes = length & 0x7f;
    length = 0;
    for (let i = 0; i < numBytes; i++) {
      length = (length << 8) | bytes[offset + 2 + i];
    }
    headerLength += numBytes;
  }
  
  const value = bytes.slice(offset + headerLength, offset + headerLength + length);
  return { tag, length, value, totalLength: headerLength + length };
}

function parseOID(bytes: Uint8Array): string {
  const oid: number[] = [];
  oid.push(Math.floor(bytes[0] / 40));
  oid.push(bytes[0] % 40);
  
  let value = 0;
  for (let i = 1; i < bytes.length; i++) {
    value = (value << 7) | (bytes[i] & 0x7f);
    if (!(bytes[i] & 0x80)) {
      oid.push(value);
      value = 0;
    }
  }
  
  return oid.join(".");
}

function parseRDNSequence(bytes: Uint8Array): Record<string, string> {
  const result: Record<string, string> = {};
  let offset = 0;
  
  while (offset < bytes.length) {
    const set = parseDER(bytes, offset);
    if (set.tag !== 0x31) break;
    
    const seq = parseDER(set.value, 0);
    if (seq.tag === 0x30) {
      const oid = parseDER(seq.value, 0);
      const val = parseDER(seq.value, oid.totalLength);
      
      const oidStr = parseOID(oid.value);
      const name = OID_MAP[oidStr] || oidStr;
      const decoder = new TextDecoder();
      result[name] = decoder.decode(val.value);
    }
    
    offset += set.totalLength;
  }
  
  return result;
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join(":");
}

async function hashBytes(bytes: Uint8Array, algorithm: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, bytes.buffer as ArrayBuffer);
  return bytesToHex(new Uint8Array(hashBuffer));
}

async function parseCertificate(pem: string): Promise<CertInfo> {
  // Extract PEM type and base64 content
  const pemMatch = pem.match(/-----BEGIN ([A-Z0-9 ]+)-----([^-]+)-----END/);
  if (!pemMatch) {
    throw new Error("Invalid PEM format. Expected -----BEGIN CERTIFICATE-----");
  }
  
  const pemType = pemMatch[1];
  const base64 = pemMatch[2].replace(/\s/g, "");
  const der = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  
  // Parse main SEQUENCE
  const cert = parseDER(der, 0);
  if (cert.tag !== 0x30) throw new Error("Invalid certificate structure");
  
  // TBSCertificate
  const tbs = parseDER(cert.value, 0);
  let tbsOffset = 0;
  
  // Version (optional, context tag 0)
  let version = parseDER(tbs.value, tbsOffset);
  if (version.tag === 0xa0) {
    tbsOffset += version.totalLength;
    version = parseDER(tbs.value, tbsOffset);
  }
  
  // Serial Number
  const serial = parseDER(tbs.value, tbsOffset);
  tbsOffset += serial.totalLength;
  const serialNumber = bytesToHex(serial.value).replace(/:/g, "").toUpperCase();
  
  // Signature Algorithm
  const sigAlgo = parseDER(tbs.value, tbsOffset);
  tbsOffset += sigAlgo.totalLength;
  const sigOID = parseDER(sigAlgo.value, 0);
  const signatureAlgorithm = SIG_ALGO_MAP[parseOID(sigOID.value)] || parseOID(sigOID.value);
  
  // Issuer
  const issuerSeq = parseDER(tbs.value, tbsOffset);
  tbsOffset += issuerSeq.totalLength;
  const issuer = parseRDNSequence(issuerSeq.value);
  
  // Validity
  const validity = parseDER(tbs.value, tbsOffset);
  tbsOffset += validity.totalLength;
  const notBefore = parseDER(validity.value, 0);
  const notAfter = parseDER(validity.value, notBefore.totalLength);
  
  const parseTime = (bytes: Uint8Array, tag: number): Date => {
    const str = new TextDecoder().decode(bytes);
    if (tag === 0x17) { // UTCTime
      const year = parseInt(str.slice(0, 2));
      const fullYear = year >= 50 ? 1900 + year : 2000 + year;
      return new Date(`${fullYear}-${str.slice(2, 4)}-${str.slice(4, 6)}T${str.slice(6, 8)}:${str.slice(8, 10)}:${str.slice(10, 12)}Z`);
    } else { // GeneralizedTime
      return new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}T${str.slice(8, 10)}:${str.slice(10, 12)}:${str.slice(12, 14)}Z`);
    }
  };
  
  const validFrom = parseTime(notBefore.value, notBefore.tag);
  const validTo = parseTime(notAfter.value, notAfter.tag);
  
  // Subject
  const subjectSeq = parseDER(tbs.value, tbsOffset);
  tbsOffset += subjectSeq.totalLength;
  const subject = parseRDNSequence(subjectSeq.value);
  
  // Subject Public Key Info
  const pubKeyInfo = parseDER(tbs.value, tbsOffset);
  tbsOffset += pubKeyInfo.totalLength;
  const pubKeyAlgo = parseDER(pubKeyInfo.value, 0);
  const pubKeyOID = parseDER(pubKeyAlgo.value, 0);
  const publicKeyAlgorithm = parseOID(pubKeyOID.value) === "1.2.840.113549.1.1.1" ? "RSA" :
                             parseOID(pubKeyOID.value) === "1.2.840.10045.2.1" ? "ECDSA" : 
                             parseOID(pubKeyOID.value);
  
  // Calculate fingerprints
  const sha256 = await hashBytes(der, "SHA-256");
  const sha1 = await hashBytes(der, "SHA-1");
  
  // Calculate dates
  const now = new Date();
  const isExpired = validTo < now;
  const isNotYetValid = validFrom > now;
  const daysUntilExpiry = Math.ceil((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  return {
    subject,
    issuer,
    serialNumber,
    validFrom,
    validTo,
    signatureAlgorithm,
    publicKeyAlgorithm,
    fingerprints: { sha256, sha1 },
    extensions: {},
    pemType,
    isExpired,
    isNotYetValid,
    daysUntilExpiry,
  };
}

const SAMPLE_CERT = `-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAMT4qPaFMQ+eMB0GCSqGSIb3DQEBCwUAMEUxCzAJBgNV
BAYTAlVTMRMwEQYDVQQIDApTb21lLVN0YXRlMSEwHwYDVQQKDBhJbnRlcm5ldCBX
aWRnaXRzIFB0eSBMdGQwHhcNMjQwMTAxMDAwMDAwWhcNMjUwMTAxMDAwMDAwWjBF
MQswCQYDVQQGEwJVUzETMBEGA1UECAwKU29tZS1TdGF0ZTEhMB8GA1UECgwYSW50
ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
CgKCAQEA0Z3VS5JJcds3xfn/ygWyF8PbnGy0AHJSUuhPaGWMxpDFWL3hC7HxWNeo
sGvPsNzLH/0B2N0VBpgfHJCmBpqXw4EgP3qSPzhzLHCJpJjJJltXvDzZHpJBhDHA
s8UO+0VzLp3P5LCvfUvQjGf2ZK/2qXzX6FDxQjQ0xXBb5KdHpAQZCZQEBD0qWPwN
+pLJV7rlL+sMPxfNOXxQM6DQl7bUqVk1RQYFpCvlCZkKxHUIPKkPldfZXn2hfQl7
LDmMWAdPqgFJD9dYTfXfMhdz3Ny0gZ2gH3xPF/1zLKPMjPKvGF1z9F/hnmL5HN3b
/OFMCyQGQ4dzVTHvM2VNrBhc8rHq8wIDAQABo1AwTjAdBgNVHQ4EFgQUlJKqzZ5L
xfGPq3lL1k6HT5gE/P4wHwYDVR0jBBgwFoAUlJKqzZ5LxfGPq3lL1k6HT5gE/P4w
DAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAlY5GEQP5e7EGHLV9K3wE
sGm5tCKcHKhFCIQp4HlNTH0FZS5H5cQsZYzIWdHMHuqBFqZmFY5iZ3G/kXJNRQyL
tF6YRLT5HbYCe5M/RjvEZdMp5o2F6Q2tZz2Bk+x8PLMIRqGS5MIVL8KwAANQ3bZz
zR3vPANhAYKClGFqaF3BfOvNHvLRxSxBPGq5vwI1ybHKj3dHTGe3PD6bpGLC1/GC
jI5F2l9HVLsd0R5YD7peD5eLX0dMJ5w8HrOW3hDqGMNr8vZq7VxbLfnS3fUqKS2+
Yc5J3WJmzzE3yHDLfG5xBpLwC8dPVvOTKb3B8rVsJI5U5GHv8WCxNzPbQ3/JQMF
HQ==
-----END CERTIFICATE-----`;

export default function CertDecoderPage() {
  const [input, setInput] = useState("");
  const [certInfo, setCertInfo] = useState<CertInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { copy } = useCopyToClipboard();
  const { trackToolUsage } = useAnalytics();
  
  useToolTracker("cert-decoder", "Certificate Decoder", "security");

  const decodeCertificate = useCallback(async () => {
    if (!input.trim()) {
      setError("Please enter a PEM-encoded certificate");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const info = await parseCertificate(input);
      setCertInfo(info);
      trackToolUsage("cert-decoder", { action: "decode" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to decode certificate");
      setCertInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [input, trackToolUsage]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_CERT);
    setError(null);
    setCertInfo(null);
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setCertInfo(null);
    setError(null);
  }, []);

  useKeyboardShortcut(SHORTCUTS.execute, decodeCertificate, { enabled: !!input });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const formatDN = (dn: Record<string, string>) => {
    return Object.entries(dn)
      .map(([k, v]) => `${k}=${v}`)
      .join(", ");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="SSL/TLS Certificate Decoder"
        description="Decode and analyze SSL/TLS certificates. View subject, issuer, validity, fingerprints, and more."
        url="https://openkit.tools/cert-decoder"
        applicationCategory="SecurityApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Certificate Decoder", url: "https://openkit.tools/cert-decoder" },
        ]}
      />
      <HowToSchema
        name="How to decode an SSL/TLS certificate"
        description="Parse and analyze PEM-encoded SSL/TLS certificates"
        steps={[
          { name: "Paste certificate", text: "Paste your PEM-encoded certificate (-----BEGIN CERTIFICATE-----)" },
          { name: "Decode", text: "Click Decode Certificate to parse the certificate" },
          { name: "Review details", text: "View certificate details including subject, issuer, and validity dates" },
        ]}
        toolUrl="https://openkit.tools/cert-decoder"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">Certificate Decoder</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Decode and inspect SSL/TLS certificates, fingerprints, and validity details.
          </p>
        </div>
      </div>

      <GeoContentLayout>
        <GeoSection id="tool" title="Decoder" subtitle="Parse and analyze X.509 certificates">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Certificate Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste PEM-encoded certificate here...&#10;-----BEGIN CERTIFICATE-----&#10;...&#10;-----END CERTIFICATE-----"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="font-mono text-sm min-h-[300px]"
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={decodeCertificate} disabled={isLoading}>
                    {isLoading ? "Decoding..." : "Decode Certificate"}
                  </Button>
                  <Button variant="outline" onClick={loadSample}>
                    Load Sample
                  </Button>
                  <Button variant="outline" onClick={clearAll}>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="flex items-center gap-2 text-destructive mb-4">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}
                
                {certInfo && (
                  <div className="space-y-4">
                    {/* Status Banner */}
                    <div className={`p-3 rounded-lg flex items-center gap-2 ${
                      certInfo.isExpired ? "bg-destructive/10 text-destructive" :
                      certInfo.isNotYetValid ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" :
                      certInfo.daysUntilExpiry <= 30 ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" :
                      "bg-green-500/10 text-green-700 dark:text-green-400"
                    }`}>
                      {certInfo.isExpired ? (
                        <>
                          <AlertCircle className="h-5 w-5" />
                          Certificate Expired
                        </>
                      ) : certInfo.isNotYetValid ? (
                        <>
                          <Clock className="h-5 w-5" />
                          Certificate Not Yet Valid
                        </>
                      ) : certInfo.daysUntilExpiry <= 30 ? (
                        <>
                          <Clock className="h-5 w-5" />
                          Expires in {certInfo.daysUntilExpiry} days
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          Valid ({certInfo.daysUntilExpiry} days remaining)
                        </>
                      )}
                    </div>

                    {/* Subject */}
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Subject</h4>
                      <p className="text-sm font-mono break-all">{formatDN(certInfo.subject)}</p>
                    </div>

                    {/* Issuer */}
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Issuer</h4>
                      <p className="text-sm font-mono break-all">{formatDN(certInfo.issuer)}</p>
                    </div>

                    {/* Validity */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Valid From</h4>
                        <p className="text-sm">{formatDate(certInfo.validFrom)}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Valid To</h4>
                        <p className="text-sm">{formatDate(certInfo.validTo)}</p>
                      </div>
                    </div>

                    {/* Algorithms */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Signature Algorithm</h4>
                        <p className="text-sm font-mono">{certInfo.signatureAlgorithm}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Public Key</h4>
                        <p className="text-sm font-mono">{certInfo.publicKeyAlgorithm}</p>
                      </div>
                    </div>

                    {/* Serial Number */}
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Serial Number</h4>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted p-1 rounded break-all">{certInfo.serialNumber}</code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copy(certInfo.serialNumber)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Fingerprints */}
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Fingerprints</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs text-muted-foreground">SHA-256:</span>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted p-1 rounded break-all flex-1">{certInfo.fingerprints.sha256}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copy(certInfo.fingerprints.sha256)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">SHA-1:</span>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-muted p-1 rounded break-all flex-1">{certInfo.fingerprints.sha1}</code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copy(certInfo.fingerprints.sha1)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!certInfo && !error && (
                  <p className="text-muted-foreground text-center py-8">
                    Paste a certificate to see its details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </GeoSection>

        <GeoSection id="quick-start" title="Quick Start" subtitle="Get started in seconds">
          <QuickStartGuide
            steps={[
              { title: "Get Certificate", description: "Export or copy a PEM-encoded certificate (-----BEGIN CERTIFICATE-----)" },
              { title: "Paste & Decode", description: "Paste into the input area and click Decode Certificate" },
              { title: "Analyze", description: "Review subject, issuer, validity dates, and fingerprints" },
            ]}
          />
        </GeoSection>

        <GeoSection id="features" title="Features" subtitle="What you can do">
          <FeatureGrid
            features={[
              { icon: <Shield className="w-5 h-5" />, title: "Full Parsing", description: "Decode subject, issuer, serial number, and algorithms" },
              { icon: <Clock className="w-5 h-5" />, title: "Validity Check", description: "Instant expiration status with days remaining" },
              { icon: <CheckCircle className="w-5 h-5" />, title: "Fingerprints", description: "SHA-256 and SHA-1 certificate fingerprints" },
            ]}
          />
        </GeoSection>

        <GeoSection id="content" title="About SSL/TLS Certificates" subtitle="Understanding certificate structure">
          <MarkdownContent content={`## About SSL/TLS Certificates

SSL/TLS certificates are digital documents that authenticate a website's identity and enable encrypted connections. They contain the public key, identity information, and a digital signature from a Certificate Authority (CA).

### Certificate Fields

- **Subject**: The entity the certificate is issued to (Common Name, Organization, etc.)
- **Issuer**: The CA that signed the certificate
- **Validity Period**: When the certificate is valid (Not Before / Not After)
- **Serial Number**: Unique identifier assigned by the CA
- **Signature Algorithm**: The cryptographic algorithm used to sign the certificate

### Common Use Cases

- Verify certificate validity before deployment
- Debug SSL/TLS connection issues
- Extract certificate details for documentation
- Compare certificate fingerprints for verification
- Check certificate expiration dates

### PEM Format

The PEM format is the most common encoding for certificates:

\`\`\`
-----BEGIN CERTIFICATE-----
Base64-encoded certificate data
-----END CERTIFICATE-----
\`\`\`
`} />
        </GeoSection>

        <GeoSection id="related" title="Related Tools" subtitle="More security tools">
          <RelatedTools currentPath="/cert-decoder" />
        </GeoSection>

        <LastUpdated date="2026-02-06" />
      </GeoContentLayout>
    </main>
  );
}
