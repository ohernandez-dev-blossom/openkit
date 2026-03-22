/**
 * XML Formatter Tool Guide Content
 * Comprehensive developer guide for XML formatting
 */

import type { ToolGuideContent } from "./types";

export const xmlFormatGuideContent: ToolGuideContent = {
  toolName: "XML Formatter",
  toolPath: "/xml-format",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Paste Your XML Data",
      description: "Copy your XML from API responses, configuration files, SOAP messages, or data exports and paste it into the input panel. The formatter handles single-line XML, minified documents, and complex nested structures."
    },
    {
      title: "Configure Indentation",
      description: "Select your preferred indentation (2 spaces, 4 spaces, or tabs). 2 spaces is common for modern configs, while 4 spaces matches traditional Java/enterprise XML conventions."
    },
    {
      title: "Format Automatically",
      description: "The formatter processes your XML instantly, adding proper nested indentation, line breaks between elements, and visual hierarchy that makes the document structure immediately clear."
    },
    {
      title: "Copy Formatted XML",
      description: "Click Copy to copy the formatted XML to your clipboard, ready for configuration files, SOAP debugging, or API integration work."
    }
  ],

  introduction: {
    title: "What is XML?",
    content: `XML (eXtensible Markup Language) is a markup language designed for storing and transporting data in a human-readable, machine-parsable format. Developed by W3C in the late 1990s, XML became the standard for data interchange in enterprise systems, web services (SOAP), configuration files, and document formats before JSON's rise.

XML represents data using a hierarchical tree structure with opening and closing tags, similar to HTML but with strict syntax rules. Unlike HTML's predefined tags, XML allows custom tag names, making it flexible for domain-specific data representation. This flexibility made XML popular for configuration files (Maven pom.xml, Spring application context), data exchange (RSS feeds, SVG graphics), and enterprise integration (SOAP web services).

### Why XML Still Matters

While JSON has largely replaced XML for web APIs, XML remains critical in several domains. Enterprise systems built on Java EE, .NET, or legacy SOA architectures heavily use SOAP web services, which transmit XML messages. Understanding and debugging these systems requires XML formatting skills.

Configuration management in enterprise tools relies on XML. Maven's pom.xml defines Java project dependencies, Spring Framework uses XML for bean configuration, and Android development uses XML for layouts and manifests. Developers working in these ecosystems format XML daily for readability and maintenance.

Document formats like SVG (Scalable Vector Graphics), DOCX (Microsoft Word), and XLSX (Excel) are XML-based. When customizing these formats programmatically or debugging rendering issues, developers need to inspect and format the underlying XML structure.

### Key Characteristics of XML

**Strict Syntax:** XML requires properly nested tags, quoted attributes, and case-sensitive element names. This strictness ensures unambiguous parsing but makes hand-writing XML error-prone - formatters help catch structural issues visually.

**Verbose Structure:** XML uses opening and closing tags for every element, making documents 30-60% larger than equivalent JSON. This verbosity improves self-documentation but requires formatting to remain readable at scale.

**Namespace Support:** XML namespaces (xmlns) prevent naming conflicts when combining documents from different sources. Formatters preserve namespace declarations while making the hierarchical structure clear.

**Schema Validation:** XML supports formal schemas (XSD, DTD) that define valid structure and data types. Formatted XML is easier to validate against schemas because structural issues become visually obvious.

### XML vs JSON

JSON has largely replaced XML for web APIs due to lighter syntax (30-50% smaller), faster parsing, and native JavaScript compatibility. However, XML excels in document-centric use cases, complex validation requirements (XSD schemas are more powerful than JSON Schema), and systems requiring mixed content (text with embedded markup). XML formatters remain essential for developers working with legacy systems, enterprise integrations, or document formats.`
  },

  useCases: [
    {
      title: "Debug SOAP Web Services",
      description: "SOAP APIs transmit XML messages between client and server. When debugging SOAP calls, format the request/response XML to see message structure, identify missing elements, or trace namespace issues.",
      example: `<!-- Before: Minified SOAP response -->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetUserResponse><User><ID>123</ID><Name>John Doe</Name></User></GetUserResponse></soap:Body></soap:Envelope>

<!-- After: Readable formatted SOAP -->
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUserResponse>
      <User>
        <ID>123</ID>
        <Name>John Doe</Name>
      </User>
    </GetUserResponse>
  </soap:Body>
</soap:Envelope>`
    },
    {
      title: "Format Configuration Files",
      description: "Enterprise Java projects use XML for Maven dependencies, Spring beans, and logging configs. Format these files to understand structure, review changes, or debug configuration errors.",
      example: `<!-- Formatted Maven pom.xml -->
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0.0</version>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>5.3.20</version>
    </dependency>
  </dependencies>
</project>`
    },
    {
      title: "Inspect SVG Graphics",
      description: "SVG files are XML-based vector graphics. When customizing SVG icons or debugging rendering issues, format the SVG to see path definitions, transforms, and grouping structure.",
      example: `<!-- Formatted SVG markup -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </g>
</svg>`
    },
    {
      title: "Parse Data Exports",
      description: "Legacy systems export data in XML format. Format these exports to review data structure, verify field mappings, or prepare for migration to modern JSON-based APIs.",
      example: `<!-- Formatted XML data export -->
<users>
  <user id="1">
    <name>Alice Johnson</name>
    <email>alice@example.com</email>
    <role>admin</role>
    <createdAt>2024-01-15T10:00:00Z</createdAt>
  </user>
  <user id="2">
    <name>Bob Smith</name>
    <email>bob@example.com</email>
    <role>editor</role>
    <createdAt>2024-01-16T14:30:00Z</createdAt>
  </user>
</users>`
    }
  ],

  howToUse: {
    title: "How to Use This XML Formatter",
    content: `This XML formatter provides instant client-side formatting with zero server uploads. All processing happens in your browser using JavaScript XML parsing (DOMParser), ensuring your documents remain private and processing is instantaneous.

### Basic Formatting Workflow

Copy your XML from any source (SOAP response, config file, SVG graphic, or data export) and paste it into the input panel. The formatter accepts any valid XML including elements, attributes, CDATA sections, and processing instructions.

Select your preferred indentation type: 2 spaces (modern/web), 4 spaces (enterprise/Java), or tabs. The formatter processes your XML instantly, applying proper nested indentation that shows element hierarchy clearly.

The formatted output appears with parent and child relationships visually obvious, attributes preserved on opening tags, and text content properly positioned. Complex XML with deep nesting becomes readable with clear indentation levels.

### Advanced Features

**Namespace Preservation:** XML namespaces (xmlns declarations) are preserved exactly as written. The formatter maintains namespace prefixes and URIs while improving document structure visibility.

**Attribute Handling:** Element attributes are preserved on the opening tag. For elements with many attributes, the formatter keeps them readable while maintaining proper XML syntax.

**CDATA Section Support:** CDATA sections (containing special characters or embedded code) are preserved intact without escaping, maintaining their content exactly as written.

**Comment Formatting:** XML comments (<!-- comment -->) receive proper indentation based on their position in the document tree, maintaining documentation while improving readability.

### Best Practices

Always validate XML syntax before formatting - malformed XML may produce unexpected results. Use consistent indentation across XML configuration files in your project. Format SOAP messages before debugging to identify missing required elements. When customizing SVG graphics, format first to understand the path structure and grouping.`,
    steps: [
      {
        name: "Paste XML Data",
        text: "Copy your XML from a SOAP response, config file, SVG graphic, or data export and paste it into the input panel."
      },
      {
        name: "Choose Indentation",
        text: "Select your indentation type (2 spaces, 4 spaces, or tabs) to match your project conventions or enterprise standards."
      },
      {
        name: "Review Formatted XML",
        text: "The formatter processes XML instantly. Review the formatted output to see proper element nesting and document structure."
      },
      {
        name: "Copy Result",
        text: "Click Copy to copy formatted XML to your clipboard, ready for debugging, configuration editing, or documentation."
      }
    ]
  },

  faqs: [
    {
      question: "Does XML formatting change how documents are parsed?",
      answer: "No, XML formatting only affects whitespace (spaces, tabs, line breaks) and does not modify elements, attributes, or content. The formatted XML parses identically to the input - XML parsers ignore insignificant whitespace between elements. Formatting is purely for developer readability and has zero impact on functionality."
    },
    {
      question: "Can this formatter fix invalid XML?",
      answer: "No, this formatter preserves the XML structure as-is and only adjusts whitespace. It does not fix missing closing tags, unquoted attributes, or namespace errors. For XML validation, use an XML validator or your IDE's built-in validation to identify syntax errors, fix them, then use this formatter for readability."
    },
    {
      question: "What's the difference between XML and JSON?",
      answer: "XML uses verbose opening/closing tags while JSON uses lightweight braces/brackets, making JSON 30-50% smaller. JSON is faster to parse and natively compatible with JavaScript. XML excels at mixed content (text with embedded markup), complex validation (XSD schemas), and document-centric use cases. For modern web APIs, JSON is preferred; for enterprise integration and document formats, XML remains standard."
    },
    {
      question: "How do I format XML with namespaces?",
      answer: "Paste your XML with namespace declarations (xmlns attributes) into the formatter. Namespaces are preserved exactly as written, including default namespaces and prefix declarations. The formatter maintains namespace prefixes on elements while improving overall structure readability. This is essential for SOAP messages and composite XML documents."
    },
    {
      question: "Does this work with SOAP messages?",
      answer: "Yes, SOAP envelopes are standard XML with SOAP-specific namespaces. Paste SOAP request or response XML to format it, making message structure, body content, and header elements clearly visible. This is invaluable for debugging SOAP web service integration issues or analyzing WS-Security tokens."
    },
    {
      question: "Is my XML data private when using this tool?",
      answer: "Absolutely. All XML formatting happens entirely in your browser using client-side JavaScript DOM parsing. Your documents never leave your device or get sent to any servers. No uploads, no storage, no analytics tracking. Safe for SOAP messages with authentication, proprietary configs, or confidential data exports."
    },
    {
      question: "Can I format large XML files (10MB+)?",
      answer: "Yes, this formatter handles XML files up to several megabytes depending on browser memory. Typical config files and SOAP messages (10-500KB) format instantly. Very large files (10MB+) like data exports may take 1-2 seconds. For massive XML datasets, consider splitting them into logical documents before formatting."
    },
    {
      question: "Does this preserve CDATA sections?",
      answer: "Yes, CDATA sections (<![CDATA[...]]>) are preserved exactly as written without escaping their content. The formatter maintains CDATA sections in their original position while adjusting surrounding element indentation. This is important for XML containing embedded code, HTML, or special characters that would otherwise require escaping."
    },
    {
      question: "How do I format SVG files?",
      answer: "SVG is XML-based, so paste SVG code directly into this formatter. The formatted output shows the SVG structure clearly - path definitions, groups (<g>), transforms, and styling. This makes it easier to customize icons, debug rendering issues, or optimize SVG for web performance."
    },
    {
      question: "What about XML processing instructions and declarations?",
      answer: "XML declarations (<?xml version=\"1.0\"?>) and processing instructions are preserved at the top of the formatted document. The formatter maintains these exactly as written while formatting the document content below. This ensures compatibility with XML parsers that require specific declarations or encoding information."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your XML documents never leave your browser. This formatter operates entirely client-side using JavaScript DOM parsing (DOMParser API) in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All XML formatting happens in your browser's JavaScript engine. Your documents stay on your device.
- **No Server Uploads:** We don't have servers to process XML. The tool works completely offline after first load.
- **No Data Storage:** Your XML is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what XML you format, how often you use the tool, or any content-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the formatter safe for sensitive use cases like SOAP messages with authentication tokens, proprietary configuration files, customer data exports, or any XML that must remain confidential. Use with confidence for production debugging, security audits, or handling regulated data (HIPAA, GDPR, PCI-DSS).`
  },

  stats: {
    "Processing": "<100ms",
    "Max Size": "10MB",
    "Standards": "W3C",
    "Privacy": "100%"
  }
};
