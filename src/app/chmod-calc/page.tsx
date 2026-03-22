"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, Check, Shield, Terminal, Lock } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { chmodCalcGuideContent } from "@/content/chmod-calc-guide";

interface PermissionSet {
  read: boolean;
  write: boolean;
  execute: boolean;
}

interface Permissions {
  owner: PermissionSet;
  group: PermissionSet;
  others: PermissionSet;
}

interface SpecialPermissions {
  setuid: boolean;
  setgid: boolean;
  sticky: boolean;
}

interface PermissionCheckboxProps {
  who: keyof Permissions;
  perm: keyof PermissionSet;
  label: string;
  checked: boolean;
  onChange: () => void;
}

function PermissionCheckbox({ who, perm, label, checked, onChange }: PermissionCheckboxProps) {
  const id = `${who}-${perm}`;
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </Label>
    </div>
  );
}

export default function ChmodCalcPage() {
  useToolTracker("chmod-calc", "chmod Calculator Pro", "developers");
  useAnalytics();
  const { copy, isCopied } = useCopyToClipboard({ duration: 2000 });

  const [permissions, setPermissions] = useState<Permissions>({
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    others: { read: true, write: false, execute: false },
  });

  const [special, setSpecial] = useState<SpecialPermissions>({
    setuid: false,
    setgid: false,
    sticky: false,
  });

  const calculateNumeric = useCallback((): string => {
    const owner = (permissions.owner.read ? 4 : 0) + (permissions.owner.write ? 2 : 0) + (permissions.owner.execute ? 1 : 0);
    const group = (permissions.group.read ? 4 : 0) + (permissions.group.write ? 2 : 0) + (permissions.group.execute ? 1 : 0);
    const others = (permissions.others.read ? 4 : 0) + (permissions.others.write ? 2 : 0) + (permissions.others.execute ? 1 : 0);
    
    const specialBits = (special.setuid ? 4 : 0) + (special.setgid ? 2 : 0) + (special.sticky ? 1 : 0);
    
    return `${specialBits > 0 ? specialBits : ''}${owner}${group}${others}`;
  }, [permissions, special]);

  const calculateSymbolic = useCallback((): string => {
    const toSymbol = (p: PermissionSet) => 
      `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
    
    const specialBits = [];
    if (special.setuid) specialBits.push('SUID');
    if (special.setgid) specialBits.push('SGID');
    if (special.sticky) specialBits.push('Sticky');
    
    return `${toSymbol(permissions.owner)}${toSymbol(permissions.group)}${toSymbol(permissions.others)}`;
  }, [permissions, special]);

  const command = useMemo(() => {
    const numeric = calculateNumeric();
    return `chmod ${numeric} filename`;
  }, [calculateNumeric]);

  const symbolicCommand = useMemo(() => {
    const parts: string[] = [];
    
    if (special.setuid) parts.push('u+s');
    if (special.setgid) parts.push('g+s');
    if (special.sticky) parts.push('+t');
    
    ['owner', 'group', 'others'].forEach((who) => {
      const p = permissions[who as keyof Permissions];
      const whoChar = who === 'owner' ? 'u' : who === 'group' ? 'g' : 'o';
      const perms = [];
      if (p.read) perms.push('r');
      if (p.write) perms.push('w');
      if (p.execute) perms.push('x');
      if (perms.length > 0) {
        parts.push(`${whoChar}+${perms.join('')}`);
      }
    });
    
    return parts.length > 0 ? `chmod ${parts.join(',')} filename` : 'chmod filename';
  }, [permissions, special]);

  const updatePermission = (who: keyof Permissions, perm: keyof PermissionSet) => {
    setPermissions(prev => ({
      ...prev,
      [who]: {
        ...prev[who],
        [perm]: !prev[who][perm]
      }
    }));
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">chmod Calculator Pro</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Permission Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Permission Builder
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Owner */}
              <div className="space-y-3">
                <h3 className="font-semibold text-amber-500">Owner (u)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <PermissionCheckbox who="owner" perm="read" label="Read (4)" checked={permissions.owner.read} onChange={() => updatePermission("owner", "read")} />
                  <PermissionCheckbox who="owner" perm="write" label="Write (2)" checked={permissions.owner.write} onChange={() => updatePermission("owner", "write")} />
                  <PermissionCheckbox who="owner" perm="execute" label="Execute (1)" checked={permissions.owner.execute} onChange={() => updatePermission("owner", "execute")} />
                </div>
              </div>

              {/* Group */}
              <div className="space-y-3">
                <h3 className="font-semibold text-green-500">Group (g)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <PermissionCheckbox who="group" perm="read" label="Read (4)" checked={permissions.group.read} onChange={() => updatePermission("group", "read")} />
                  <PermissionCheckbox who="group" perm="write" label="Write (2)" checked={permissions.group.write} onChange={() => updatePermission("group", "write")} />
                  <PermissionCheckbox who="group" perm="execute" label="Execute (1)" checked={permissions.group.execute} onChange={() => updatePermission("group", "execute")} />
                </div>
              </div>

              {/* Others */}
              <div className="space-y-3">
                <h3 className="font-semibold text-blue-500">Others (o)</h3>
                <div className="grid grid-cols-3 gap-4">
                  <PermissionCheckbox who="others" perm="read" label="Read (4)" checked={permissions.others.read} onChange={() => updatePermission("others", "read")} />
                  <PermissionCheckbox who="others" perm="write" label="Write (2)" checked={permissions.others.write} onChange={() => updatePermission("others", "write")} />
                  <PermissionCheckbox who="others" perm="execute" label="Execute (1)" checked={permissions.others.execute} onChange={() => updatePermission("others", "execute")} />
                </div>
              </div>

              {/* Special Permissions */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-semibold text-purple-500">Special Permissions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="setuid"
                      checked={special.setuid}
                      onCheckedChange={(c) => setSpecial(s => ({ ...s, setuid: c as boolean }))}
                    />
                    <Label htmlFor="setuid" className="text-sm cursor-pointer">
                      Setuid (4)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="setgid"
                      checked={special.setgid}
                      onCheckedChange={(c) => setSpecial(s => ({ ...s, setgid: c as boolean }))}
                    />
                    <Label htmlFor="setgid" className="text-sm cursor-pointer">
                      Setgid (2)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sticky"
                      checked={special.sticky}
                      onCheckedChange={(c) => setSpecial(s => ({ ...s, sticky: c as boolean }))}
                    />
                    <Label htmlFor="sticky" className="text-sm cursor-pointer">
                      Sticky (1)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Numeric */}
                <div className="space-y-2">
                  <Label>Numeric Notation</Label>
                  <div className="flex gap-2">
                    <Input value={calculateNumeric()} readOnly className="font-mono text-lg" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copy(calculateNumeric())}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Symbolic */}
                <div className="space-y-2">
                  <Label>Symbolic Notation</Label>
                  <div className="flex gap-2">
                    <Input value={calculateSymbolic()} readOnly className="font-mono text-lg" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copy(calculateSymbolic())}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Commands */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <Label>Command (Numeric)</Label>
                  <div className="flex gap-2">
                    <Input value={command} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copy(command)}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Command (Symbolic)</Label>
                  <div className="flex gap-2">
                    <Input value={symbolicCommand} readOnly className="font-mono" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copy(symbolicCommand)}
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle>Common Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-muted rounded">644 - Standard file</div>
                  <div className="p-2 bg-muted rounded">755 - Standard directory/executable</div>
                  <div className="p-2 bg-muted rounded">600 - Private file</div>
                  <div className="p-2 bg-muted rounded">700 - Private directory</div>
                  <div className="p-2 bg-muted rounded">777 - Full access (avoid)</div>
                  <div className="p-2 bg-muted rounded">4755 - Setuid executable</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guide Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Calculate permissions in seconds" variant="highlight">
            <QuickStartGuide steps={chmodCalcGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={chmodCalcGuideContent.introduction.title} subtitle="Understanding Linux permissions" variant="default">
            <MarkdownContent content={chmodCalcGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="Real-world permission scenarios" variant="default">
            <FeatureGrid features={chmodCalcGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={chmodCalcGuideContent.howToUse.title} subtitle="Master file permissions" variant="minimal">
            <HowToSchema name={`How to use ${chmodCalcGuideContent.toolName}`} description="Step-by-step guide to calculating permissions" steps={chmodCalcGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${chmodCalcGuideContent.toolPath}`} />
            <MarkdownContent content={chmodCalcGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Common chmod questions answered" variant="default">
            <ToolFAQ faqs={chmodCalcGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={chmodCalcGuideContent.security.title} subtitle="Protect your files" variant="highlight">
            <MarkdownContent content={chmodCalcGuideContent.security.content} />
          </GeoSection>
          {chmodCalcGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Permission statistics" variant="minimal">
              <StatsBar stats={Object.entries(chmodCalcGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/chmod-calc" />
        <LastUpdated date={chmodCalcGuideContent.lastUpdated} />
      </div>

      <StructuredData
        type="WebApplication"
        name="chmod Calculator Pro"
        description="Advanced chmod calculator with special permissions support. Calculate file permissions with SUID, SGID, and sticky bit."
        url="https://openkit.tools/chmod-calc"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={chmodCalcGuideContent.lastUpdated}
        version={chmodCalcGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "chmod Calculator Pro", url: "https://openkit.tools/chmod-calc" },
        ]}
      />
    </main>
  );
}
