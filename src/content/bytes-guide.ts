/**
 * Bytes Converter Tool Guide Content
 * Comprehensive developer guide for data size conversion
 */

import type { ToolGuideContent } from "./types";

export const bytesGuideContent: ToolGuideContent = {
  toolName: "Data Size Converter",
  toolPath: "/bytes",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Your Value",
      description: "Type any numeric value into the input field. Supports decimals for precise measurements like 1.5 GB or 2048.25 MB. Use this for file sizes, memory allocations, or storage capacity calculations."
    },
    {
      title: "Select Input Unit",
      description: "Choose the unit for your input value from the dropdown: Bytes, KB, MB, GB, or TB. The tool uses binary (base-1024) conversion standard - the same system used by operating systems and memory specifications."
    },
    {
      title: "View All Conversions",
      description: "See instant conversion results across all five units simultaneously. Each card displays the equivalent value in different units, with the selected input unit highlighted for easy reference."
    },
    {
      title: "Copy or Compare",
      description: "Click the copy icon on any conversion card to grab that value. Use the 'Size Context' section to compare your input against common file sizes like text characters, photos, or HD movies."
    }
  ],

  introduction: {
    title: "What is Data Size Conversion?",
    content: `Data size conversion translates digital storage measurements between different units of magnitude - bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), and terabytes (TB). Understanding these conversions is fundamental for software development, system administration, database management, and infrastructure planning.

Digital storage uses binary (base-1024) conversion rather than metric (base-1000). This means 1 KB equals 1,024 bytes, not 1,000 bytes. The difference stems from computer architecture: memory addresses and storage blocks align to powers of 2 (2^10 = 1,024). While some vendors use decimal prefixes (KiB, MiB, GiB) to clarify binary vs. metric, most operating systems, programming languages, and documentation use KB/MB/GB to mean binary units.

### Why Byte Conversion Matters for Developers

**Memory allocation:** When configuring application memory limits (-Xmx for JVM, memory_limit for PHP, max_old_space_size for Node.js), you need to convert between MB and GB. Kubernetes resource requests use binary units for container memory. Miscalculating conversions leads to out-of-memory errors or resource waste.

**Database optimization:** Database row size calculations, index memory requirements, and buffer pool sizing all require accurate byte arithmetic. A VARCHAR(255) column doesn't always use 255 bytes - UTF-8 encoding can require up to 4 bytes per character. Understanding byte calculations prevents schema design mistakes.

**File upload limits:** Web applications set upload limits in MB (nginx client_max_body_size, PHP upload_max_filesize, AWS Lambda payload limits). Converting user-facing file sizes to backend byte limits ensures consistent behavior. A "10 MB limit" means 10,485,760 bytes, not 10,000,000 bytes.

**Network bandwidth:** API rate limits, CDN egress costs, and network throttling use bytes/KB/MB. Converting between units helps estimate monthly bandwidth costs. A video streaming service serving 1 TB of data per month needs to understand the cost implications across different unit measurements.

**Performance budgeting:** Frontend performance budgets (total page weight under 1 MB) require adding up JavaScript bundles, images, fonts, and CSS. Bundle analyzers report sizes in bytes or KB. Converting to MB helps communicate performance targets to stakeholders.

### Binary vs. Decimal: The Standards Debate

**Binary (IEC standard):** 1 KB = 1,024 bytes, 1 MB = 1,048,576 bytes, 1 GB = 1,073,741,824 bytes. This is what operating systems report (Windows File Explorer, macOS Finder, Linux du/df commands) and what programming languages use (sizeof operations, file I/O APIs).

**Decimal (SI standard):** 1 kB = 1,000 bytes, 1 MB = 1,000,000 bytes. Storage vendors (hard drive manufacturers) sometimes use decimal units to report larger numbers. A "500 GB" hard drive might actually store 465 GiB (binary gigabytes).

**The confusion:** A file showing as "1.5 GB" in your OS is 1,610,612,736 bytes. But a storage vendor might call that same byte count "1.61 GB" using decimal calculation. This tool uses binary conversion (base-1024) matching OS behavior and developer expectations.

### Common Developer Scenarios

Developers constantly convert between units when:
- Configuring Docker container memory limits (--memory 512m)
- Setting database connection pool sizes and buffer allocations
- Estimating AWS S3 storage costs ($0.023 per GB/month)
- Calculating Redis memory requirements for caching strategies
- Debugging JavaScript heap size limits in Node.js applications
- Analyzing webpack bundle sizes for performance optimization
- Planning PostgreSQL shared_buffers and work_mem settings
- Understanding Kubernetes resource quotas and limits

This tool provides instant, accurate conversions using binary (base-1024) arithmetic - the same calculation method used by operating systems, memory specifications, and programming language documentation. All conversions happen client-side with zero latency.`
  },

  useCases: [
    {
      title: "Configure Docker Container Memory",
      description: "Convert human-readable memory specifications to Docker's expected formats. Docker accepts memory limits in various units: --memory 512m, --memory 2g, --memory 2048m. Understanding conversions ensures containers get appropriate memory allocations without waste.",
      example: `// Docker Compose memory limits:
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          memory: 2048M  # 2 GB in megabytes
        reservations:
          memory: 1024M  # 1 GB minimum

// Converting to understand actual bytes:
// 2048 MB = 2,147,483,648 bytes
// 1024 MB = 1,073,741,824 bytes`
    },
    {
      title: "Calculate Database Storage Requirements",
      description: "Estimate PostgreSQL, MySQL, or MongoDB storage needs based on row counts and average row sizes. Accurate byte calculations prevent running out of disk space in production. Critical for capacity planning and infrastructure budgeting.",
      example: `// Estimating PostgreSQL storage:
// Users table: 1M rows, average 500 bytes/row
// 1,000,000 rows × 500 bytes = 500,000,000 bytes
// = 476.84 MB base data
// + 20% for indexes = ~572 MB
// + MVCC overhead = ~700 MB total

// MongoDB document size check:
// Average document: 2 KB
// 10M documents = 20,000,000 KB = 19.07 GB`
    },
    {
      title: "Optimize JavaScript Bundle Sizes",
      description: "Webpack bundle analyzer reports chunk sizes in bytes or KB. Convert to MB to understand total page weight against performance budgets. Modern web performance targets: initial bundle < 200 KB gzipped, total page weight < 1 MB.",
      example: `// Webpack bundle analysis:
// vendor.js: 524,288 bytes = 512 KB
// app.js: 196,608 bytes = 192 KB
// Total: 720,896 bytes = 704 KB uncompressed

// After gzip (assuming ~70% compression):
// 704 KB × 0.3 = ~210 KB compressed
// Meets performance budget for fast 3G`
    },
    {
      title: "Configure AWS Lambda Payload Limits",
      description: "AWS Lambda has strict payload size limits: 6 MB synchronous, 256 KB asynchronous. Convert between units to ensure API payloads stay under limits. Exceeding limits causes runtime errors that are hard to debug.",
      example: `// Lambda invocation payload check:
// Input payload: 5,242,880 bytes = 5 MB ✓ (under 6 MB)
// Response payload: 7,340,032 bytes = 7 MB ✗ (exceeds 6 MB)

// EventBridge event size:
// Event data: 256,000 bytes = 250 KB ✓ (under 256 KB)

// S3 trigger event typical size:
// ~2 KB per event = 2,048 bytes`
    }
  ],

  howToUse: {
    title: "How to Use This Data Size Converter",
    content: `This tool converts between binary data storage units (bytes, KB, MB, GB, TB) using the base-1024 calculation standard used by operating systems and memory specifications. All conversions are instant and client-side.

### Understanding Binary Conversion

Binary units use powers of 1,024:
- 1 KB = 1,024 bytes (2^10)
- 1 MB = 1,048,576 bytes (2^20)
- 1 GB = 1,073,741,824 bytes (2^30)
- 1 TB = 1,099,511,627,776 bytes (2^40)

This matches how Windows, macOS, Linux, and programming languages calculate data sizes. It differs from decimal (SI) units that some storage vendors use where 1 KB = 1,000 bytes.

### Entering Values

Type any numeric value in the input field. Decimals are supported for precise conversions (e.g., 1.5 GB, 2048.75 MB, 524288 bytes). The tool handles fractional values accurately - useful when working with exact memory allocations or file size calculations.

### Selecting Units

Choose your input unit from the dropdown:
- **Bytes:** Base unit, smallest denomination
- **KB (Kilobytes):** 1,024 bytes - typical for small files, text documents
- **MB (Megabytes):** 1,048,576 bytes - typical for images, JavaScript bundles
- **GB (Gigabytes):** 1,073,741,824 bytes - typical for databases, videos
- **TB (Terabytes):** 1,099,511,627,776 bytes - typical for large datasets, storage systems

### Reading Results

All five unit conversions display simultaneously in cards. The currently selected input unit is highlighted with a cyan border. Each card shows:
- Unit abbreviation at top
- Converted numeric value in monospace font
- Copy button to grab the value

### Size Context Feature

The "Size Context" panel compares your input against common file sizes:
- Text character: 1 byte (ASCII) or 1-4 bytes (UTF-8)
- Typical email: 50 KB with text and formatting
- Photo (JPEG): 2 MB average smartphone camera output
- HD movie (H.264): 4 GB for 2-hour 1080p video
- Your input: Highlighted for comparison

This contextualizes abstract byte counts into real-world reference points.

### Copying Values

Click the copy icon on any conversion card to copy that numeric value to your clipboard. Useful for pasting into configuration files, database queries, or documentation. The copied value is the raw number without unit suffix.`,
    steps: [
      {
        name: "Enter Value",
        text: "Type your numeric value into the input field. Supports decimals for precise measurements."
      },
      {
        name: "Select Unit",
        text: "Choose the unit for your input from the dropdown: Bytes, KB, MB, GB, or TB."
      },
      {
        name: "View Conversions",
        text: "See instant conversion results across all five units simultaneously in the cards below."
      },
      {
        name: "Copy Result",
        text: "Click the copy icon on any conversion card to grab that value for use in configs or code."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between KB and KiB?",
      answer: "KB (kilobyte) traditionally means 1,024 bytes in computing contexts (binary). KiB (kibibyte) is the IEC standard explicitly meaning 1,024 bytes to distinguish from SI kilobyte (1,000 bytes). Most operating systems, documentation, and this tool use KB to mean binary kilobytes (1,024 bytes). Storage manufacturers sometimes use KB to mean 1,000 bytes, causing confusion. For developer tools, assume KB means 1,024 bytes unless explicitly noted otherwise."
    },
    {
      question: "Why does my 1 TB hard drive show as 931 GB in the OS?",
      answer: "Hard drive manufacturers use decimal (base-1,000) units: 1 TB = 1,000,000,000,000 bytes. Operating systems display binary (base-1,024) units: 1 TB = 1,099,511,627,776 bytes. When your OS calculates 1,000,000,000,000 ÷ 1,099,511,627,776, you get 0.909 TB = 931 GB. The drive isn't smaller - it's a unit conversion difference. This converter uses binary units matching OS display."
    },
    {
      question: "How do I calculate memory for Docker containers?",
      answer: "Docker accepts memory limits with suffixes: m or M for megabytes, g or G for gigabytes. Use binary conversion: --memory 512m means 512 × 1,048,576 = 536,870,912 bytes. For Java applications, leave headroom: if your JVM needs -Xmx1g, set Docker memory to 1.5g to account for non-heap memory. Monitor actual usage with docker stats before finalizing limits."
    },
    {
      question: "What's a good JavaScript bundle size target?",
      answer: "Modern web performance budgets target: initial bundle < 200 KB gzipped (loads in ~2s on 3G), total page weight < 1 MB. Uncompressed JavaScript typically compresses to ~30% of original size with gzip. So 200 KB gzipped = ~600 KB uncompressed source. Use this converter to check your webpack bundle analyzer output against these targets."
    },
    {
      question: "How do I estimate database storage needs?",
      answer: "Calculate: row_count × average_row_size_bytes. For PostgreSQL: add 20% for indexes, 30% for MVCC (Multi-Version Concurrency Control) overhead. Example: 1M rows × 500 bytes = 500 MB base + 100 MB indexes + 150 MB MVCC = 750 MB total. Add 50% growth buffer for production. Use this converter to translate bytes to GB for capacity planning."
    },
    {
      question: "What are AWS Lambda payload limits in bytes?",
      answer: "AWS Lambda synchronous invocation: 6 MB = 6,291,456 bytes for both request and response payloads. Asynchronous invocation: 256 KB = 262,144 bytes. These are hard limits - exceeding them causes RequestEntityTooLargeException. For large payloads, use S3 with signed URLs instead of direct payloads. EventBridge events: 256 KB limit."
    },
    {
      question: "How much memory does Redis need for caching?",
      answer: "Estimate: number_of_keys × average_value_size × 1.5 (Redis overhead). Example: 100,000 keys × 1 KB each = 100 MB × 1.5 overhead = 150 MB. Add memory for connection buffers (~10 MB per 10,000 connections), replication buffers, and AOF/RDB snapshots if persistence is enabled. Monitor with INFO memory command and adjust."
    },
    {
      question: "What's the difference between heap and non-heap memory in JVM?",
      answer: "Heap memory: -Xmx flag, stores Java objects, garbage collected. Non-heap: metaspace (class metadata), thread stacks, direct buffers, JIT compiler. Total JVM memory = heap + non-heap (typically 200-500 MB). When setting Docker memory limits, allocate heap + 512 MB for non-heap overhead to prevent OOM kills."
    },
    {
      question: "How do I calculate PostgreSQL shared_buffers size?",
      answer: "Rule of thumb: 25% of system RAM up to 8 GB. For 16 GB server: 4 GB shared_buffers. For 64 GB server: 8 GB shared_buffers (not 16 GB). Convert GB to MB for postgresql.conf: 4 GB = 4096 MB. Setting too high (>40% RAM) hurts performance due to double buffering with OS cache."
    },
    {
      question: "Is data private when using this converter?",
      answer: "Yes, all conversions happen entirely in your browser using JavaScript math operations. No data is transmitted to servers, logged, or stored. No network requests are made. This tool works completely offline after loading. Safe for calculating confidential infrastructure specifications, proprietary storage requirements, or sensitive capacity planning data."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All data size conversions happen entirely in your browser using client-side JavaScript arithmetic. Zero server communication, zero data transmission, zero logging.

### Privacy Guarantees

- **100% Client-Side Processing:** All conversions use browser-native JavaScript math operations. Calculations happen locally on your device.
- **No Server Uploads:** We don't have backend servers to process conversions. The tool works completely offline after first page load.
- **No Data Storage:** Input values and conversion results are not saved, logged, stored in cookies, or transmitted anywhere.
- **No Analytics on Content:** We don't track what values you convert, what units you use, or any calculation-specific information.
- **Transparent & Auditable:** Inspect browser DevTools Network tab - zero outbound requests with your data.

Safe for converting confidential infrastructure specifications, proprietary capacity planning data, or regulated system requirements. Use with confidence for production database sizing, AWS cost calculations, or enterprise storage planning.`
  },

  stats: {
    "Conversion Speed": "<1ms",
    "Supported Units": "5",
    "Max Value": "1000+ TB",
    "Precision": "2 decimals",
    "Server Uploads": "0"
  }
};
