---
name: ssh-keygen
description: Generate SSH key pairs (Ed25519 or RSA). Use when the user asks to generate an SSH key, create a new SSH keypair, make an ed25519 key, generate RSA keys for SSH, or set up SSH authentication.
metadata: {"openclaw":{"requires":{"bins":["ssh-keygen"]}}}
---

# SSH Keygen

Generate SSH key pairs using `ssh-keygen`.

## Input
- Key type: `ed25519` (recommended, default) or `rsa`
- RSA key size (only for RSA): 2048 or 4096 (default 4096)
- Comment/label (optional, e.g., email address or hostname)
- Passphrase (optional; default: no passphrase for convenience, but recommend one for real use)

## Output
- Private key (display content and note the temp file path)
- Public key (display content — safe to share)
- Fingerprint of the generated key

## Instructions

1. Determine key type (default: `ed25519`) and any comment the user wants.

2. **Generate Ed25519 key (recommended):**
   ```
   ssh-keygen -t ed25519 -f /tmp/openkit_ssh_key -N "" -C "COMMENT"
   ```

3. **Generate RSA key (2048-bit):**
   ```
   ssh-keygen -t rsa -b 2048 -f /tmp/openkit_ssh_key -N "" -C "COMMENT"
   ```

4. **Generate RSA key (4096-bit):**
   ```
   ssh-keygen -t rsa -b 4096 -f /tmp/openkit_ssh_key -N "" -C "COMMENT"
   ```

   Flags:
   - `-f /tmp/openkit_ssh_key` — output path (private key). Public key goes to `/tmp/openkit_ssh_key.pub`
   - `-N ""` — empty passphrase (for display purposes; real keys should use a passphrase)
   - `-C "COMMENT"` — label embedded in the public key

5. After generation, read and display both keys:
   - Private key: contents of `/tmp/openkit_ssh_key`
   - Public key: contents of `/tmp/openkit_ssh_key.pub`
   - Show fingerprint: `ssh-keygen -lf /tmp/openkit_ssh_key.pub`

6. Clean up temp files after displaying:
   ```
   rm /tmp/openkit_ssh_key /tmp/openkit_ssh_key.pub
   ```

7. If `ssh-keygen` is not found, tell the user:
   > "This skill requires `ssh-keygen`. On macOS and Linux it is included with OpenSSH. Install with: `brew install openssh` (macOS) or `sudo apt install openssh-client` (Linux)."

8. Remind the user: the private key shown should be stored securely (e.g., `~/.ssh/`) with permissions `chmod 600`. The public key (`.pub`) is safe to share with servers.

## Examples

**Ed25519 key with comment "user@laptop":**
**Command:** `ssh-keygen -t ed25519 -f /tmp/openkit_ssh_key -N "" -C "user@laptop"`

**Output (public key format):**
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... user@laptop
```

**RSA 4096-bit key:**
**Command:** `ssh-keygen -t rsa -b 4096 -f /tmp/openkit_ssh_key -N "" -C "deploy-key"`

## Error Handling

- `ssh-keygen` not found → tell user to install OpenSSH (see step 7)
- `/tmp` not writable → use a different temp path like `/var/tmp/openkit_ssh_key` or ask user for a path
- Key type not supported → only allow `ed25519` and `rsa`; reject others like `dsa` or `ecdsa` with an explanation
- File already exists at temp path → add a timestamp suffix to avoid collision: `/tmp/openkit_ssh_key_$(date +%s)`
- Passphrase requested → if user wants a passphrase on the generated key, note that `-N ""` must be replaced with `-N "PASSPHRASE"`, and display the command to use
