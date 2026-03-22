/**
 * chmod Calculator Tool Guide Content
 * Comprehensive developer guide for Unix/Linux file permissions
 */

import type { ToolGuideContent } from "./types";

export const chmodGuideContent: ToolGuideContent = {
  toolName: "chmod Calculator",
  toolPath: "/chmod",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Click Permission Checkboxes",
      description: "Use the visual grid to select read (r), write (w), and execute (x) permissions for Owner, Group, and Others. Each checkbox represents a specific permission bit in the resulting octal code."
    },
    {
      title: "Or Enter Code Directly",
      description: "Type a 3-digit octal code (755, 644) or symbolic notation (rwxr-xr-x) for instant conversion. The tool accepts both numeric and symbolic chmod formats used in Unix/Linux systems."
    },
    {
      title: "Use Common Presets",
      description: "Select from standard permission patterns like 755 (executables), 644 (files), or 600 (private files). Presets include security warnings for dangerous permissions like 777."
    },
    {
      title: "Copy chmod Command",
      description: "Click Copy to get the ready-to-use chmod command: 'chmod 755 filename'. Paste directly into your terminal to apply permissions to files or directories."
    }
  ],

  introduction: {
    title: "What is chmod?",
    content: `chmod (change mode) is a Unix/Linux command for modifying file and directory permissions that control read, write, and execute access for users, groups, and others. Understanding chmod is essential for system security, deployment automation, server configuration, and DevOps workflows where incorrect permissions can cause security vulnerabilities or application failures.

Unix file permissions are represented in two formats: **octal notation** (numeric codes like 755, 644) and **symbolic notation** (text codes like rwxr-xr-x). Both formats define the same permissions but serve different use cases. Octal is faster to type in scripts, while symbolic is more human-readable when inspecting files with \`ls -l\`.

### How chmod Permissions Work

Every Unix file has three permission sets: **Owner** (file creator), **Group** (users in the file's group), and **Others** (everyone else). Each set has three permission types: **Read (r/4)** allows viewing file contents or listing directory contents, **Write (w/2)** allows modifying files or creating/deleting files in directories, and **Execute (x/1)** allows running files as programs or entering directories.

Octal notation combines these permissions using binary addition: read=4, write=2, execute=1. For example, 7 (4+2+1) means read+write+execute, 6 (4+2) means read+write only, 5 (4+1) means read+execute, and 0 means no permissions. A full chmod code like 755 means owner has 7 (rwx), group has 5 (r-x), others have 5 (r-x).

### Common chmod Use Cases

**Web Server Configuration:** Web application files need specific permissions for security. PHP/Node.js files should be 644 (owner read/write, others read-only) so the web server can read them but attackers cannot modify them. Upload directories need 755 (owner full access, others read+execute) so the web server can write files but cannot execute uploaded scripts.

**SSH Key Security:** Private SSH keys (.pem, id_rsa) must be 600 (owner read/write only) or SSH refuses to use them, preventing security risks from world-readable keys. Public keys (.pub) can be 644 since they are meant to be shared.

**Script Deployment:** Shell scripts, Python executables, and compiled binaries need execute permission (755 or 750) to run. Without execute permission, running \`./script.sh\` fails with "Permission denied" even if the script is executable in your editor.

### Why chmod Security Matters

Incorrect chmod permissions create serious security vulnerabilities. **Permission 777** (world-writable) allows any user to modify files, enabling attackers to inject malicious code into web applications, replace binaries with trojans, or delete critical system files. **Permission 666** (world-writable files) lets attackers modify configuration files, environment variables, or database credentials.

Setting directories to 777 is particularly dangerous because it allows attackers to create new files (like PHP web shells) that the web server will execute. Production servers should never use 777 - use 755 for directories and 644 for files as the secure default. Always follow the principle of least privilege: grant only the minimum permissions needed for functionality.

### chmod Calculator Benefits

Manually calculating octal permissions from symbolic notation (or vice versa) is error-prone and slow. The chmod calculator provides instant conversion between formats, visual checkboxes that make permission combinations clear, common presets for typical scenarios, security warnings for dangerous permissions, and the generated chmod command ready to copy-paste into your terminal.

This tool is essential when debugging permission denied errors in deployment pipelines, configuring new servers with correct file permissions, auditing existing systems for security vulnerabilities, teaching Unix permissions to junior developers, or quickly finding the numeric code for a symbolic permission set you see in documentation.`
  },

  useCases: [
    {
      title: "Secure SSH Private Keys",
      description: "SSH private keys must have restrictive permissions (600) or SSH clients refuse to use them. This prevents unauthorized users from reading your private key and impersonating you on remote servers.",
      example: `# SSH requires strict key permissions
chmod 600 ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_ed25519

# Public keys can be readable
chmod 644 ~/.ssh/id_rsa.pub

# SSH directory itself
chmod 700 ~/.ssh

# Without 600, you get:
# "Permissions 0644 for 'id_rsa' are too open"
# "It is required that your private key files are NOT accessible by others"`
    },
    {
      title: "Web Application File Security",
      description: "Web applications need specific permissions for each file type. PHP/HTML files should be 644 (world-readable but not writable), upload directories 755 (writable by owner only), and configuration files 600 (private) to prevent credential leaks.",
      example: `# Application files (PHP, JS, HTML)
chmod 644 index.php
chmod 644 app.js

# Directories
chmod 755 public/
chmod 755 assets/

# Upload directory (writable by owner)
chmod 755 uploads/

# Configuration files (private)
chmod 600 .env
chmod 600 config/database.php

# Never use 777 on production servers!`
    },
    {
      title: "Make Scripts Executable",
      description: "Shell scripts, Python files, and other executables need execute permission (755 or 700) to run directly. Without it, './script.sh' fails with 'Permission denied' even though the code is valid.",
      example: `# Make shell script executable
chmod 755 deploy.sh
chmod +x deploy.sh  # Alternative syntax

# Now you can run:
./deploy.sh

# Python scripts
chmod 755 backup.py
./backup.py

# Build scripts in CI/CD
chmod 755 build.sh
chmod 755 test.sh

# Without execute permission:
# bash: ./deploy.sh: Permission denied`
    },
    {
      title: "Docker Container Permissions",
      description: "Docker volumes and mounted files need correct permissions for container processes to access them. Incorrect permissions cause 'Permission denied' errors inside containers even though the host user has access.",
      example: `# Allow Docker container to read config
chmod 644 docker/config.yml

# Dockerfile scripts must be executable
chmod 755 docker/entrypoint.sh

# Data directories for mounted volumes
chmod 755 docker/data/

# Fix permission denied in container:
# chmod 777 is NOT the solution!
# Use 755 for directories, 644 for files

# Container user UID often differs from host,
# causing permission issues. Use chmod 755 on
# directories so container can enter them.`
    }
  ],

  howToUse: {
    title: "How to Use This chmod Calculator",
    content: `This chmod calculator provides three input methods for maximum flexibility: visual checkboxes, numeric octal input, and symbolic notation input. All three methods update instantly and generate the same chmod command output.

### Visual Checkbox Method

Click checkboxes in the permission grid to set read (r), write (w), and execute (x) permissions for Owner, Group, and Others. As you toggle checkboxes, the numeric code (644, 755) and symbolic notation (rw-r--r--, rwxr-xr-x) update automatically. This visual method helps you understand permission combinations without memorizing octal math.

### Numeric Octal Input

Type a 3-digit octal code (000-777) into the numeric input field and press Enter or click Apply. The checkboxes and symbolic notation update to match. Use this method when you know the exact numeric code you need (like 644 for files or 755 for directories) and want to see what permissions it grants.

### Symbolic Notation Input

Type a 9-character symbolic string (like rwxr-xr-x or rw-r--r--) into the symbolic input field and press Enter or click Apply. The tool converts it to numeric code and updates checkboxes. Use this when you have symbolic notation from \`ls -l\` output or documentation and need the numeric chmod command.

### Common Permission Presets

Click preset buttons for standard permission patterns. **755 (rwxr-xr-x)** is standard for executable files and directories where owner needs full control but others only need read/execute. **644 (rw-r--r--)** is standard for regular files where owner can edit but others only read. **600 (rw-------)** is for private files like SSH keys or credentials. **700 (rwx-------)** is for private executables or directories.

Dangerous presets like **777 (rwxrwxrwx)** and **666 (rw-rw-rw-)** show security warnings because they grant excessive permissions that attackers can exploit. Avoid these on production systems.

### Understanding the Octal Breakdown

The calculator shows how octal digits are calculated: each permission set is the sum of read (4), write (2), and execute (1). For example, Owner with rwx is 4+2+1=7. Group with r-x is 4+0+1=5. Others with r-x is 4+0+1=5. Combined: 755.

### Using the Generated Command

The calculator generates the full chmod command: \`chmod 755 filename\`. Click Copy to copy it to your clipboard, then paste into your terminal and replace "filename" with your actual file or directory path. For directories, add \`-R\` for recursive: \`chmod -R 755 /var/www\`.`,
    steps: [
      {
        name: "Set Permissions Visually",
        text: "Click checkboxes in the grid to select read, write, and execute permissions for Owner, Group, and Others. Or use numeric/symbolic input for direct entry.",
      },
      {
        name: "Choose Common Preset",
        text: "Select from standard patterns like 755 (executables), 644 (files), 600 (private keys), or 700 (private executables). Watch for security warnings.",
      },
      {
        name: "Review Octal Breakdown",
        text: "Check the octal breakdown to understand how permissions add up: read=4, write=2, execute=1. Verify the symbolic notation matches your intent.",
      },
      {
        name: "Copy and Apply Command",
        text: "Click Copy to get the chmod command: 'chmod 755 filename'. Paste into your terminal and replace 'filename' with your target file or directory.",
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between 755 and 777?",
      answer: "755 (rwxr-xr-x) allows owner full control but others can only read and execute - secure for most use cases. 777 (rwxrwxrwx) gives everyone full control including write access - dangerous because any user can modify or delete the file. Use 755 for directories and executables, never 777 on production systems."
    },
    {
      question: "Why does SSH reject my private key with wrong permissions?",
      answer: "SSH requires private keys to be 600 (rw-------) or 400 (r--------) - readable only by owner. If your key is 644 or 777, SSH refuses it with 'Permissions too open' error. Run 'chmod 600 ~/.ssh/id_rsa' to fix. This security measure prevents other users from reading your private key and impersonating you."
    },
    {
      question: "Should I use 777 to fix 'Permission denied' errors?",
      answer: "No. 777 is a security vulnerability that grants write access to everyone, allowing attackers to inject malicious code. Instead, identify which permission is missing (read, write, or execute) and who needs it (owner, group, or others). Usually 755 for directories and 644 for files solves permission errors securely."
    },
    {
      question: "What permissions should web application files have?",
      answer: "PHP/HTML files: 644 (owner write, world read). Directories: 755 (owner write, world read+enter). Upload directories: 755 with proper owner. Configuration files with credentials: 600 (owner only). Never use 777 on web servers - attackers can upload malicious files that the server executes."
    },
    {
      question: "How do I make a script executable?",
      answer: "Use 'chmod 755 script.sh' or 'chmod +x script.sh'. The execute permission (x) allows running the file as a program. 755 grants owner full control and allows others to execute. 700 makes it executable by owner only. Without execute permission, './script.sh' fails with 'Permission denied'."
    },
    {
      question: "What does 'chmod +x' do versus 'chmod 755'?",
      answer: "chmod +x adds execute permission to existing permissions without changing read/write. chmod 755 sets exact permissions: rwxr-xr-x. If a file is 644 (rw-r--r--), '+x' makes it 755 (rwxr-xr-x). If it's 600 (rw-------), '+x' makes it 700 (rwx------). Use +x when you want to preserve existing read/write settings."
    },
    {
      question: "Can I use chmod recursively on directories?",
      answer: "Yes, use 'chmod -R 755 /path/to/directory' to apply permissions to all files and subdirectories. Be careful: this applies the same permissions to both files and directories. Best practice: use find with chmod to set different permissions: 'find . -type d -exec chmod 755 {} \\;' for directories and 'find . -type f -exec chmod 644 {} \\;' for files."
    },
    {
      question: "Why do I get 'Permission denied' inside Docker containers?",
      answer: "Docker containers run as a specific UID (often 1000 or root). If host files are owned by a different user, the container cannot access them. Solutions: 1) Use 'chmod 755' on directories so container can enter them. 2) Use 'chmod 644' on files so container can read them. 3) Change file ownership with 'chown' to match container UID. Avoid 777 - it's insecure."
    },
    {
      question: "What's the difference between 644 and 664?",
      answer: "644 (rw-r--r--) allows owner to write, group and others to read. 664 (rw-rw-r--) allows owner and group to write, others to read. Use 664 when multiple users in the same group need to edit the file (team shared files). Use 644 when only the file owner should edit (typical for web files)."
    },
    {
      question: "How do I secure .env files with sensitive data?",
      answer: "Use 'chmod 600 .env' to make it readable/writable by owner only. This prevents other users on the server from viewing API keys, database passwords, or secrets. For shared hosting, also ensure your .env is outside the web root. Never commit .env to git - add it to .gitignore. For production, use environment variables or secrets management instead."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This chmod calculator operates entirely client-side in your browser using JavaScript. No chmod commands, permission configurations, or file information are sent to any servers. All calculations and conversions happen locally on your device.

### Privacy Guarantees

- **100% Client-Side Processing:** All permission calculations, octal-to-symbolic conversions, and command generation happen in your browser. No network requests with your data.
- **No Server Uploads:** We have no backend servers to process chmod configurations. The tool works completely offline after initial page load.
- **No Data Storage:** Your permission settings and chmod commands are not saved, logged, or transmitted anywhere. Refresh the page and everything is cleared.
- **No Analytics Tracking:** We don't track what permissions you calculate, what presets you use, or any usage-specific information.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab to verify zero data transmission.

Safe for calculating production server permissions, security-sensitive configurations, deployment scripts, or any chmod commands that must remain confidential. Use with confidence for managing enterprise systems, cloud infrastructure, or security audits.`
  },

  stats: {
    "Permission Sets": "3",
    "Permission Types": "3",
    "Common Presets": "7",
    "Max Octal Value": "777"
  }
};
