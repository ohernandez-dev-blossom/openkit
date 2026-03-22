import { ToolGuideContent } from "./types";

export const chmodCalcGuideContent: ToolGuideContent = {
  toolName: "chmod Calculator Pro",
  toolPath: "/chmod-calc",
  lastUpdated: "2026-02-05",
  version: "1.0.0",

  quickStartSteps: [
    {
      title: "Select permissions",
      description: "Check the boxes for read, write, and execute permissions for owner, group, and others.",
    },
    {
      title: "Add special permissions",
      description: "Optionally enable Setuid, Setgid, or Sticky bit for advanced use cases.",
    },
    {
      title: "Copy the command",
      description: "Copy the generated chmod command in numeric or symbolic notation.",
    },
  ],

  introduction: {
    title: "What is chmod?",
    content: `
**chmod** (change mode) is a Unix/Linux command used to change the permissions of files and directories. 

Every file in Linux has three permission types:
- **Read (r)** - View file contents or list directory
- **Write (w)** - Modify file or add/remove directory contents  
- **Execute (x)** - Run as a program or enter directory

Permissions are set for three user categories:
- **Owner (u)** - The file's owner
- **Group (g)** - Users in the file's group
- **Others (o)** - Everyone else

This calculator helps you visualize and generate the correct chmod command with support for special permissions.
    `,
  },

  useCases: [
    {
      title: "Web Server Files",
      description: "Set 644 for HTML/CSS/JS files (owner can edit, others can read)",
      icon: "globe",
    },
    {
      title: "Executable Scripts",
      description: "Set 755 for shell scripts and binaries that need to run",
      icon: "terminal",
    },
    {
      title: "Private Config Files",
      description: "Set 600 for SSH keys and sensitive configuration files",
      icon: "lock",
    },
    {
      title: "Shared Directories",
      description: "Set 775 for team directories with shared write access",
      icon: "users",
    },
    {
      title: "Setuid Binaries",
      description: "Set 4755 for executables that need root privileges",
      icon: "shield",
    },
    {
      title: "Sticky Bit Folders",
      description: "Set 1777 for /tmp directories where everyone can write but only owners can delete",
      icon: "folder",
    },
  ],

  howToUse: {
    title: "How to Use the chmod Calculator",
    content: `
The calculator provides two ways to specify permissions:

**Numeric Notation (Octal)**
Each permission has a numeric value:
- Read = 4
- Write = 2  
- Execute = 1

Add values for each category: 
- 7 (4+2+1) = rwx
- 6 (4+2) = rw-
- 5 (4+1) = r-x
- 4 (4) = r--

**Symbolic Notation**
Use letters and operators:
- u=user, g=group, o=others, a=all
- + adds, - removes, = sets exactly
- Example: \`chmod u+x,g-w file\`
    `,
    steps: [
      {
        name: "Choose base permissions",
        text: "Select read, write, and execute for owner, group, and others using the checkboxes.",
      },
      {
        name: "Add special permissions",
        text: "Enable Setuid (4), Setgid (2), or Sticky (1) if needed for your use case.",
      },
      {
        name: "Review the output",
        text: "Check both numeric and symbolic notations to understand the permission set.",
      },
      {
        name: "Copy the command",
        text: "Click the copy button to get the ready-to-use chmod command.",
      },
      {
        name: "Apply to your files",
        text: "Run the command in your terminal to apply the permissions.",
      },
    ],
  },

  faqs: [
    {
      question: "What does chmod 755 mean?",
      answer: "chmod 755 sets permissions to rwxr-xr-x. Owner has full read/write/execute permissions. Group and others can read and execute but cannot modify the file. This is the standard permission for executables and directories.",
    },
    {
      question: "What is the difference between 644 and 755?",
      answer: "644 (rw-r--r--) is for files that should be readable by everyone but only editable by the owner - typical for web files. 755 (rwxr-xr-x) adds execute permission, needed for scripts and directories that people need to enter.",
    },
    {
      question: "What is Setuid (SUID)?",
      answer: "Setuid (Set User ID) is a special permission that allows a file to be executed with the privileges of the file owner, not the user running it. Used for programs like passwd that need root access to modify system files. Represented as 4 in the special permission digit.",
    },
    {
      question: "What is Setgid (SGID)?",
      answer: "Setgid (Set Group ID) works like SUID but for groups. On executables, it runs with the file's group permissions. On directories, new files inherit the directory's group instead of the user's primary group. Represented as 2 in the special permission digit.",
    },
    {
      question: "What is the Sticky Bit?",
      answer: "The sticky bit (1) on directories restricts file deletion. Even if users have write permission to a directory, they can only delete files they own. Essential for shared directories like /tmp. Represented as 1 in the special permission digit.",
    },
    {
      question: "Why should I avoid chmod 777?",
      answer: "777 gives everyone full read, write, and execute permissions. This is a security risk as any user or process can modify your files. Use the most restrictive permissions that still allow necessary access - usually 644 for files and 755 for directories.",
    },
  ],

  security: {
    title: "Security Best Practices",
    content: `
**Follow the principle of least privilege:**
- Use 600 for sensitive files (SSH keys, passwords)
- Use 644 for most web content
- Use 755 for executables and directories
- Never use 777 in production

**Special permissions:**
- Only use SUID/SGID when absolutely necessary
- Regularly audit files with special permissions: \`find / -perm /6000 -type f\`
- Setuid scripts are dangerous - use compiled binaries instead

**Regular maintenance:**
- Review file permissions periodically
- Remove execute permission from files that don't need it
- Ensure private keys are never world-readable
    `,
  },

  stats: {
    "Common Permissions": "12+",
    "Permission Types": "3 (rwx)",
    "Special Bits": "3 (SUID/SGID/Sticky)",
  },

  features: [
    {
      title: "Visual Permission Builder",
      description: "Interactive checkboxes for all permission combinations with color-coded categories.",
    },
    {
      title: "Special Permissions Support",
      description: "Full support for Setuid, Setgid, and Sticky bit calculations.",
    },
    {
      title: "Dual Notation Output",
      description: "Get both numeric (755) and symbolic (u=rwx,g=rx,o=rx) representations.",
    },
    {
      title: "Command Generator",
      description: "Ready-to-copy chmod commands for immediate terminal use.",
    },
    {
      title: "Quick Reference",
      description: "Common permission presets for typical use cases.",
    },
  ],
};
