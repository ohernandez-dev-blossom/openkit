/**
 * CIDR Calculator Tool Guide Content
 * Comprehensive developer guide for subnet calculations and IP networking
 */

import type { ToolGuideContent } from "./types";

export const cidrGuideContent: ToolGuideContent = {
  toolName: "CIDR Calculator",
  toolPath: "/cidr",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter IP Address and CIDR Notation",
      description: "Type an IP address with CIDR suffix (192.168.1.0/24) to instantly calculate network properties. CIDR notation uses /prefix length where /24 means 24 bits for network, 8 bits for hosts."
    },
    {
      title: "View Network Details",
      description: "See calculated network address, broadcast address, subnet mask, wildcard mask, usable host range, and total hosts. Essential for subnet design, firewall rules, and network documentation."
    },
    {
      title: "Calculate Subnets",
      description: "Enter how many subnets you need to split the network into. The calculator shows optimal CIDR notation, hosts per subnet, and individual subnet ranges for network planning."
    },
    {
      title: "Copy Configuration Values",
      description: "Click copy buttons for subnet mask, network address, or host ranges. Use these values in router configs, firewall rules, DHCP servers, or network documentation."
    }
  ],

  introduction: {
    title: "What is CIDR?",
    content: `CIDR (Classless Inter-Domain Routing) is the standard notation for defining IP address ranges and subnets in modern networking. Introduced in 1993 to replace wasteful classful addressing (Class A, B, C), CIDR uses a slash notation (/24, /16, /8) to specify how many bits of an IP address represent the network versus host portions. Understanding CIDR is essential for cloud infrastructure, Kubernetes networking, AWS VPC design, firewall configuration, and any network architecture work.

CIDR notation combines an IP address with a prefix length: 192.168.1.0/24. The /24 means the first 24 bits identify the network, leaving 8 bits for hosts. This /24 subnet contains 256 IP addresses (2^8 = 256), with 254 usable for hosts after subtracting network and broadcast addresses. Smaller prefix numbers mean larger networks: /16 has 65,536 IPs, /8 has 16.7 million IPs. Larger prefix numbers mean smaller networks: /30 has only 4 IPs (2 usable), /32 is a single IP.

### Why CIDR Matters for Developers

Cloud platforms like AWS VPC, Google Cloud, and Azure require CIDR notation for network configuration. When creating a VPC, you specify a CIDR block (10.0.0.0/16) that defines the available IP space. Subnets within the VPC use smaller CIDR blocks (10.0.1.0/24, 10.0.2.0/24) carved from the VPC range. Incorrect CIDR planning causes IP exhaustion, overlapping subnets, or insufficient address space for scaling.

Kubernetes networking relies heavily on CIDR for pod and service IP allocation. Pod CIDR defines the IP range for pod IPs, service CIDR defines cluster service IPs, and node CIDR defines node network ranges. Overlapping CIDRs between clusters, pods, and services break networking. Multi-cluster deployments require careful CIDR planning to avoid conflicts.

Firewall rules and security groups use CIDR to specify allowed/denied IP ranges. Instead of individual IPs, you grant access to entire subnets (10.0.1.0/24 for internal servers) or restrict to specific ranges (203.0.113.0/29 for office IPs). CIDR-based rules are more maintainable than long lists of individual IPs and scale better.

### CIDR Notation Quick Reference

- **/32:** Single IP (host route) - 1 IP total
- **/31:** Point-to-point link - 2 IPs (no network/broadcast with RFC 3021)
- **/30:** Small subnet - 4 IPs, 2 usable (common for router links)
- **/29:** Tiny subnet - 8 IPs, 6 usable (small office network)
- **/28:** Small subnet - 16 IPs, 14 usable
- **/27:** Small subnet - 32 IPs, 30 usable
- **/26:** Small subnet - 64 IPs, 62 usable
- **/25:** Small subnet - 128 IPs, 126 usable
- **/24:** Standard subnet - 256 IPs, 254 usable (most common for LANs)
- **/23:** 512 IPs, 510 usable
- **/22:** 1,024 IPs, 1,022 usable
- **/21:** 2,048 IPs, 2,046 usable
- **/20:** 4,096 IPs, 4,094 usable (medium cloud VPC)
- **/16:** 65,536 IPs, 65,534 usable (large VPC, Class B equivalent)
- **/8:** 16,777,216 IPs (massive networks, Class A equivalent)

### Subnet Masks vs CIDR

CIDR is the modern shorthand for subnet masks. A /24 CIDR equals subnet mask 255.255.255.0, /16 equals 255.255.0.0, /8 equals 255.0.0.0. CIDR is more concise and flexible than traditional classful addressing (Class A, B, C) because it allows arbitrary prefix lengths. You can have a /22 subnet (between Class B and C) for exactly the IP count you need without wasting addresses.

### Private vs Public IP Ranges

Private IP ranges (RFC 1918) are used for internal networks and not routable on the internet:
- **10.0.0.0/8** (10.0.0.0 - 10.255.255.255) - 16.7M IPs, commonly used in large enterprises and cloud VPCs
- **172.16.0.0/12** (172.16.0.0 - 172.31.255.255) - 1M IPs, used in medium networks
- **192.168.0.0/16** (192.168.0.0 - 192.168.255.255) - 65K IPs, standard for home/small office routers

Public IP addresses are routable on the internet and must be globally unique. Cloud providers allocate public IPs from their owned ranges. On-premises data centers lease public IPs from ISPs or regional internet registries (ARIN, RIPE, APNIC).

### Common CIDR Mistakes

**Overlapping subnets:** Creating subnet 10.0.1.0/24 and later adding 10.0.0.0/16 causes overlap. The /16 contains the /24. Always check existing subnets before allocating new ones.

**IP exhaustion:** Starting with a /24 (254 hosts) for a VPC that grows to 1,000 servers. Plan for growth: use /16 for VPCs, subnet into smaller /24 or /22 ranges for flexibility.

**Broadcast address misuse:** The last IP in a subnet (.255 in /24) is broadcast and cannot be assigned to hosts. CIDR calculators show usable ranges excluding network and broadcast IPs.

**Security group CIDR typos:** Opening firewall to 0.0.0.0/0 (entire internet) instead of 10.0.0.0/8 (internal network) creates security vulnerabilities. Double-check CIDR in production security rules.`
  },

  useCases: [
    {
      title: "AWS VPC and Subnet Design",
      description: "Plan AWS VPC CIDR blocks and subnet allocation for multi-tier applications. Design non-overlapping subnets for public, private, and database tiers across multiple availability zones with room for future growth.",
      example: `# AWS VPC CIDR Planning

# Main VPC: 10.0.0.0/16 (65,536 IPs)
VPC: 10.0.0.0/16

# Public Subnets (Internet-facing load balancers, NAT gateways)
Public Subnet AZ1: 10.0.1.0/24 (256 IPs, 251 usable)
Public Subnet AZ2: 10.0.2.0/24
Public Subnet AZ3: 10.0.3.0/24

# Private Subnets (Application servers, containers)
Private Subnet AZ1: 10.0.11.0/24
Private Subnet AZ2: 10.0.12.0/24
Private Subnet AZ3: 10.0.13.0/24

# Database Subnets (RDS, ElastiCache)
Database Subnet AZ1: 10.0.21.0/24
Database Subnet AZ2: 10.0.22.0/24
Database Subnet AZ3: 10.0.23.0/24

# Reserved for future expansion
# 10.0.31.0/24 - 10.0.254.0/24 available

# Security Group Rules
# Allow app servers to access database
# Source: 10.0.11.0/24, 10.0.12.0/24, 10.0.13.0/24
# Destination: 10.0.21.0/24, 10.0.22.0/24, 10.0.23.0/24
# Port: 3306 (MySQL) or 5432 (PostgreSQL)`
    },
    {
      title: "Kubernetes Pod and Service CIDR",
      description: "Configure Kubernetes cluster networking with non-overlapping CIDR ranges for pods, services, and nodes. Proper CIDR allocation prevents IP conflicts in multi-cluster environments and enables cluster federation.",
      example: `# Kubernetes Cluster CIDR Configuration

# Node Network (existing network infrastructure)
Nodes: 10.0.0.0/16

# Pod CIDR (pods get IPs from this range)
Pod CIDR: 10.244.0.0/16  # 65,536 IPs for pod allocation

# Service CIDR (cluster services virtual IPs)
Service CIDR: 10.96.0.0/12  # 1,048,576 IPs for services

# Example: kube-apiserver flags
--service-cluster-ip-range=10.96.0.0/12
--pod-network-cidr=10.244.0.0/16

# Multi-cluster setup (avoid overlap)
Cluster 1: Pods 10.244.0.0/16, Services 10.96.0.0/12
Cluster 2: Pods 10.245.0.0/16, Services 10.97.0.0/12
Cluster 3: Pods 10.246.0.0/16, Services 10.98.0.0/12

# IP range breakdown per node (using /24 per node)
Node1: 10.244.1.0/24 (254 pods max)
Node2: 10.244.2.0/24
Node3: 10.244.3.0/24`
    },
    {
      title: "Firewall and Security Group Rules",
      description: "Write CIDR-based firewall rules that grant access to specific networks while blocking others. Use CIDR ranges instead of individual IPs for maintainable security policies that scale with infrastructure growth.",
      example: `# AWS Security Group Rules using CIDR

# Allow SSH from office network only
Type: SSH
Protocol: TCP
Port: 22
Source: 203.0.113.0/29  # Office IP range (6 usable IPs)

# Allow HTTPS from entire internet
Type: HTTPS
Protocol: TCP
Port: 443
Source: 0.0.0.0/0  # All IPv4 addresses

# Allow internal database access from app servers
Type: PostgreSQL
Protocol: TCP
Port: 5432
Source: 10.0.11.0/24  # App subnet

# Allow VPN access from corporate network
Type: Custom TCP
Port: 1194
Source: 192.0.2.0/24  # VPN gateway range

# Deny all other inbound traffic (implicit deny)

# iptables firewall rules
# Allow SSH from specific subnet
iptables -A INPUT -p tcp --dport 22 -s 203.0.113.0/29 -j ACCEPT

# Allow HTTP/HTTPS from anywhere
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Allow internal network
iptables -A INPUT -s 10.0.0.0/16 -j ACCEPT`
    },
    {
      title: "Docker Network Configuration",
      description: "Configure Docker bridge networks and overlay networks with custom CIDR ranges. Avoid conflicts with existing network infrastructure by choosing non-overlapping CIDR blocks for container networking.",
      example: `# Docker default bridge network
# Default: 172.17.0.0/16

# Create custom bridge network with specific CIDR
docker network create \\
  --driver bridge \\
  --subnet 172.20.0.0/16 \\
  --gateway 172.20.0.1 \\
  my-bridge-network

# Create network with smaller subnet
docker network create \\
  --driver bridge \\
  --subnet 192.168.100.0/24 \\
  --gateway 192.168.100.1 \\
  small-network

# Docker Swarm overlay network
docker network create \\
  --driver overlay \\
  --subnet 10.10.0.0/16 \\
  --attachable \\
  swarm-overlay

# Docker Compose network definition
networks:
  backend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16
          gateway: 172.28.0.1

# Assign static IP to container
docker run --network my-bridge-network \\
  --ip 172.20.0.10 \\
  nginx

# Avoid overlapping with:
# - Host network: 10.0.0.0/16
# - Kubernetes pods: 10.244.0.0/16
# - Other Docker networks`
    }
  ],

  howToUse: {
    title: "How to Use This CIDR Calculator",
    content: `This CIDR calculator provides instant subnet calculations for network planning, VPC design, and firewall configuration. Enter any valid IPv4 address with CIDR notation to see network properties, usable host ranges, and subnet breakdown.

### Basic CIDR Calculation

Enter an IP address with CIDR prefix length (192.168.1.0/24) in the input field. The calculator instantly displays: **Network Address** (first IP in the subnet), **Broadcast Address** (last IP in the subnet), **Subnet Mask** (dotted decimal notation), **Wildcard Mask** (inverse of subnet mask, used in Cisco ACLs), **Usable Host Range** (IPs you can assign to devices, excluding network and broadcast), and **Total Hosts** (usable IP count).

You can enter the IP in any position within the subnet (192.168.1.50/24) and the calculator determines the network address (192.168.1.0). This is useful when you have an existing IP and need to find its subnet boundaries.

### Understanding Calculator Output

The network address is the first IP in the subnet and identifies the network itself (cannot be assigned to hosts). The broadcast address is the last IP and is used for broadcasting to all hosts in the subnet (cannot be assigned). The usable host range is network+1 to broadcast-1, the IPs you can assign to servers, containers, or devices.

For /24 subnets, you lose 2 IPs (network and broadcast) from 256 total, leaving 254 usable. For /30 subnets (4 IPs total), you lose 2, leaving only 2 usable - perfect for point-to-point links. For /31 (RFC 3021), both IPs are usable because network and broadcast are not needed for point-to-point links.

### Subnet Planning and Division

Use the calculator to divide large networks into smaller subnets. For example, start with 10.0.0.0/16 (65,536 IPs) and calculate how many /24 subnets fit: 256 subnets with 254 hosts each. Or divide 192.168.0.0/24 into four /26 subnets: 192.168.0.0/26 (0-63), 192.168.0.64/26 (64-127), 192.168.0.128/26 (128-191), 192.168.0.192/26 (192-255).

### Common CIDR Values to Remember

- **/8 = 255.0.0.0** - 16.7M hosts (Class A)
- **/16 = 255.255.0.0** - 65K hosts (Class B)
- **/24 = 255.255.255.0** - 254 hosts (Class C)
- **/30 = 255.255.255.252** - 2 hosts (point-to-point)
- **/32 = 255.255.255.255** - 1 host (single IP)

### Practical Applications

Use this calculator when designing AWS VPCs to ensure subnets don't overlap and you have sufficient IP space. When configuring Kubernetes to verify pod CIDR, service CIDR, and node networks don't conflict. When writing firewall rules to determine the correct CIDR range for security groups. When troubleshooting network issues to understand if IPs are in the same subnet or require routing.`,
    steps: [
      {
        name: "Enter IP and CIDR",
        text: "Type an IPv4 address with CIDR notation (192.168.1.0/24). The calculator accepts any IP within the subnet and calculates network boundaries.",
      },
      {
        name: "Review Network Details",
        text: "Check network address, broadcast address, subnet mask, and usable host range. Verify these match your network design requirements.",
      },
      {
        name: "Calculate Subnet Division",
        text: "Enter how many subnets you need to split the network into. The calculator shows optimal CIDR notation and hosts per subnet.",
      },
      {
        name: "Copy and Apply",
        text: "Click copy buttons to copy subnet masks, network addresses, or host ranges. Use these values in router configs, firewall rules, or VPC setup.",
      }
    ]
  },

  faqs: [
    {
      question: "What does /24 mean in CIDR notation?",
      answer: "/24 means the first 24 bits of the IP address are the network portion, leaving 8 bits for hosts. This gives 2^8 = 256 total IPs, with 254 usable (minus network and broadcast addresses). /24 is equivalent to subnet mask 255.255.255.0 and is the most common subnet size for LANs, providing enough IPs for typical office or server networks."
    },
    {
      question: "How many usable IPs are in a /16 subnet?",
      answer: "A /16 subnet has 16 bits for hosts: 2^16 = 65,536 total IPs. Subtracting network and broadcast addresses leaves 65,534 usable host IPs. /16 equals subnet mask 255.255.0.0 (Class B equivalent) and is commonly used for large AWS VPCs or enterprise networks that need substantial IP space for growth."
    },
    {
      question: "Why are there only 2 usable IPs in a /30 subnet?",
      answer: "A /30 subnet has 2 bits for hosts: 2^2 = 4 total IPs. The first IP is the network address, the last is broadcast, leaving 2 usable IPs in the middle. /30 is perfect for point-to-point links between routers where you only need two IPs (one per endpoint). For even smaller point-to-point, use /31 (RFC 3021) which provides 2 usable IPs without network/broadcast."
    },
    {
      question: "What's the difference between 10.0.0.0/8, /16, and /24?",
      answer: "10.0.0.0/8 covers 10.0.0.0 - 10.255.255.255 (16.7M IPs), the entire private Class A range. 10.0.0.0/16 covers 10.0.0.0 - 10.0.255.255 (65K IPs), a single Class B equivalent. 10.0.0.0/24 covers 10.0.0.0 - 10.0.0.255 (254 IPs), a single Class C equivalent. Smaller CIDR numbers = larger networks. Use /8 for massive VPCs, /16 for large VPCs, /24 for subnets within VPCs."
    },
    {
      question: "Can I have overlapping CIDR blocks?",
      answer: "No, overlapping CIDRs cause routing conflicts. If you have 10.0.1.0/24 (10.0.1.0-10.0.1.255) and add 10.0.0.0/16 (10.0.0.0-10.0.255.255), they overlap because /16 contains /24. Routers won't know which network to use. Always verify new CIDRs don't overlap existing ones. Use CIDR calculators to check ranges before allocating subnets."
    },
    {
      question: "How do I split a /24 into smaller subnets?",
      answer: "To split 192.168.1.0/24 into 4 equal subnets, move to /26 (adds 2 bits: 2^2 = 4 subnets). Each /26 has 64 IPs (62 usable): 192.168.1.0/26 (0-63), 192.168.1.64/26 (64-127), 192.168.1.128/26 (128-191), 192.168.1.192/26 (192-255). For 8 subnets use /27 (32 IPs each), for 16 use /28 (16 IPs each). Rule: increase prefix length to divide."
    },
    {
      question: "What's the largest CIDR block AWS VPC supports?",
      answer: "AWS VPCs support /16 to /28 CIDR blocks. /16 provides 65,536 IPs (recommended for most VPCs to allow growth), /28 provides only 16 IPs (11 usable, minimum size). AWS recommends using private IP ranges: 10.0.0.0/8, 172.16.0.0/12, or 192.168.0.0/16. You cannot change VPC CIDR after creation, so plan for future growth - start with /16 and subnet into smaller blocks."
    },
    {
      question: "Should I use /32 for single IPs in firewall rules?",
      answer: "Yes, /32 represents a single specific IP address. In security groups or firewall rules, use /32 when allowing access from one exact IP: 203.0.113.42/32. This is more secure than allowing a range. For example, AWS security groups accept 203.0.113.42/32 to allow only that IP, not the entire /24 subnet. /32 is the most restrictive CIDR and is equivalent to a traditional single IP address."
    },
    {
      question: "What does 0.0.0.0/0 mean in security groups?",
      answer: "0.0.0.0/0 represents all IPv4 addresses on the internet - the entire IP space. In AWS security groups or firewall rules, allowing 0.0.0.0/0 opens access to everyone worldwide. Use 0.0.0.0/0 only for public services (HTTPS on web servers). For internal services, restrict to specific CIDRs (10.0.0.0/8 for private networks). Never use 0.0.0.0/0 for SSH or databases - major security vulnerability."
    },
    {
      question: "How do I calculate subnet mask from CIDR notation?",
      answer: "Convert the CIDR prefix to binary 1s followed by 0s. /24 = 24 ones: 11111111.11111111.11111111.00000000 = 255.255.255.0. /16 = 16 ones: 11111111.11111111.00000000.00000000 = 255.255.0.0. /30 = 30 ones: 11111111.11111111.11111111.11111100 = 255.255.255.252. Or use a calculator: subnet mask is 255 for each complete octet (8 bits) of network portion."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This CIDR calculator operates entirely client-side in your browser. No IP addresses, CIDR ranges, or network configurations are transmitted to any servers. All subnet calculations and IP math happen locally using JavaScript.

### Privacy Guarantees

- **100% Client-Side Processing:** All CIDR calculations, subnet math, and IP range conversions happen in your browser. No network requests with your data.
- **No Server Uploads:** We have no backend servers to process CIDR calculations. The tool works completely offline after initial page load.
- **No Data Storage:** Your IP addresses and CIDR ranges are not saved, logged, or transmitted anywhere. Refresh the page and all inputs are cleared.
- **No Analytics Tracking:** We don't track what IP ranges you calculate, what networks you design, or any usage patterns.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab to verify zero data transmission.

Safe for calculating production network ranges, planning AWS VPC architectures, designing Kubernetes cluster networking, or any subnet planning that must remain confidential. Use with confidence for enterprise network design, security group configuration, or infrastructure planning.`
  },

  stats: {
    "IP Versions": "IPv4",
    "Min Subnet": "/32",
    "Max Subnet": "/0",
    "Calculation Speed": "<10ms"
  }
};
