/**
 * IP Subnet Calculator Tool Guide Content
 */

import type { ToolGuideContent } from "./types";

export const ipSubnetGuideContent: ToolGuideContent = {
  toolName: "IP Subnet Calculator",
  toolPath: "/ip-subnet",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter IP Address",
      description: "Type an IP address with CIDR (192.168.1.0/24) or separately in the IP and mask fields. Both dotted-decimal masks (255.255.255.0) and prefix notation (/24) are accepted."
    },
    {
      title: "View Network Details",
      description: "Instantly see network address, broadcast address, subnet mask, wildcard mask, usable host range, total addresses, IP class, and whether the address is private or public."
    },
    {
      title: "Inspect Binary Representation",
      description: "See the IP, mask, and network address in binary with network bits highlighted in colour, making it easy to understand the boundary between network and host portions."
    },
    {
      title: "Split Subnets",
      description: "Expand the Subnet Splitting section, enter how many subnets you need, and view each sub-network's CIDR, host range, broadcast address, and usable host count."
    }
  ],

  introduction: {
    title: "What is IP Subnetting?",
    content: `IP subnetting divides a single network into smaller, more manageable sub-networks. Each subnet has its own network address and broadcast address, and the remaining addresses can be assigned to hosts (servers, containers, devices).

### How Subnet Masks Work

A subnet mask is a 32-bit number that separates the network portion from the host portion of an IP address. In CIDR notation, /24 means the first 24 bits are the network, leaving 8 bits (256 addresses, 254 usable hosts). A dotted-decimal mask like 255.255.255.0 encodes the same information.

### Why Subnetting Matters

Subnetting is essential for cloud VPC design (AWS, GCP, Azure), Kubernetes pod networking, firewall rule writing, DHCP scope planning, and any environment where efficient IP allocation is critical. Poor subnetting leads to IP exhaustion, routing errors, or security gaps.`
  },

  useCases: [
    {
      title: "Cloud VPC Planning",
      description: "Design AWS VPC or GCP VPC CIDRs and plan non-overlapping subnets across availability zones. Verify host capacity before provisioning.",
      example: "VPC 10.0.0.0/16 → Public 10.0.1.0/24 | Private 10.0.10.0/24 | DB 10.0.20.0/24"
    },
    {
      title: "Firewall & ACL Rules",
      description: "Determine the exact CIDR range to allow or deny in security groups, iptables rules, or cloud firewalls. Avoid accidentally exposing too many hosts.",
      example: "Allow SSH from office 203.0.113.0/29 (6 usable IPs)"
    },
    {
      title: "Kubernetes Networking",
      description: "Configure pod CIDR, service CIDR, and node networks without overlapping. Plan for multi-cluster federation by reserving non-overlapping ranges.",
      example: "Pods 10.244.0.0/16 | Services 10.96.0.0/12 | Nodes 10.0.0.0/16"
    },
    {
      title: "Network Troubleshooting",
      description: "Quickly determine if two IPs are in the same subnet, find broadcast addresses, or verify whether a given IP falls within a CIDR range.",
      example: "Are 10.0.1.50 and 10.0.2.10 in the same /22? → Yes (same /22 network)"
    }
  ],

  howToUse: {
    title: "How to Use This IP Subnet Calculator",
    content: `Enter any IPv4 address with a subnet mask or CIDR prefix to instantly calculate network boundaries, host ranges, and binary representations.

### Input Options

- **CIDR notation in IP field:** Type 10.0.0.0/16 directly
- **Separate fields:** IP = 10.0.0.0, Mask = 255.255.240.0 or /20 or 20
- **Any host IP:** Enter 192.168.1.50/24 and the calculator finds the network (192.168.1.0)

### Reading the Binary View

The binary representation highlights network bits in colour and host bits in grey. This helps visualise exactly where the subnet boundary falls — essential for understanding non-standard masks like /22 or /27.

### Subnet Splitting

Open the splitting section, enter a desired number of subnets (2–256), and the calculator rounds up to the nearest power of two, showing each resulting subnet's CIDR, address range, and capacity. Use this for capacity planning and VLSM design.`,
    steps: [
      { name: "Enter IP and Mask", text: "Type an IPv4 address and subnet mask (dotted decimal or CIDR). The calculator accepts any host IP within a subnet." },
      { name: "Review Network Details", text: "Check network address, broadcast, mask, wildcard, host range, class, and private/public status." },
      { name: "View Binary", text: "Inspect the binary representation with network/host bit highlighting." },
      { name: "Split Subnets", text: "Expand the splitting section, choose a count, and review resulting sub-networks." }
    ]
  },

  faqs: [
    {
      question: "What is the difference between subnet mask and wildcard mask?",
      answer: "A subnet mask has contiguous 1-bits for the network portion (e.g. 255.255.255.0). A wildcard mask is its bitwise inverse (0.0.0.255) and is used in Cisco ACLs and OSPF configurations. They convey the same information from opposite perspectives."
    },
    {
      question: "Can I enter a host IP instead of a network address?",
      answer: "Yes. Enter any IP within the subnet (e.g. 192.168.1.55/24) and the calculator will automatically determine the network address (192.168.1.0), broadcast, and host range."
    },
    {
      question: "What is VLSM (Variable Length Subnet Masking)?",
      answer: "VLSM allows different subnets within the same network to use different prefix lengths. For example, you could have a /24 for servers and a /30 for a point-to-point link, both carved from a /16 VPC."
    },
    {
      question: "Why do I lose 2 IPs per subnet?",
      answer: "The first IP is the network address (identifies the subnet) and the last IP is the broadcast address (sends to all hosts in the subnet). Neither can be assigned to a device. Exception: /31 (RFC 3021) allows both IPs for point-to-point links."
    },
    {
      question: "Is my data sent to any server?",
      answer: "No. All calculations happen entirely in your browser using JavaScript. No IP addresses or network data are ever transmitted. The tool works offline after the initial page load."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This IP subnet calculator runs 100% client-side. No IP addresses, subnet masks, or network designs are transmitted to any server.

- **No data collection:** Your inputs stay in your browser and are never logged.
- **Offline capable:** After loading, the tool works without an internet connection.
- **Transparent & auditable:** Inspect the code or browser DevTools to verify zero network requests.

Safe for production network planning, security audits, and confidential infrastructure design.`
  },

  stats: {
    "IP Version": "IPv4",
    "Prefix Range": "/0 – /32",
    "Split Limit": "256 subnets",
    "Calculation Speed": "<5ms"
  }
};
