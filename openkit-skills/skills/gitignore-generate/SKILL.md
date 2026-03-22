---
name: gitignore-generate
description: Generate a .gitignore file for a language, framework, OS, or IDE. Use when the user asks to create a .gitignore, generate gitignore patterns, or ignore files for Node.js, Python, Java, Go, Rust, macOS, Windows, VSCode, or JetBrains.
---

# .gitignore Generator

Combine one or more built-in presets — plus any custom patterns — into a ready-to-use `.gitignore` file.

## Input
- One or more preset names (nodejs, python, java, go, rust, macos, windows, vscode, jetbrains)
- Optional custom entries (one glob pattern per line)

## Output
- A `.gitignore` file with all requested preset blocks followed by any custom entries

## Instructions
1. Identify which presets the user wants. Match case-insensitively.
2. For each preset, emit its full block (including section comments) exactly as defined below.
3. Separate preset blocks with a blank line.
4. If custom entries are provided, append them under `# Custom entries`.
5. Return only the raw `.gitignore` content — no extra explanation unless the user asks.

### Preset content

**nodejs**
```
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Build outputs
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.*.local

# Testing
coverage/
.nyc_output/

# Cache
.npm/
.eslintcache
.cache/
.parcel-cache/
```

**python**
```
# Python
__pycache__/
*.py[cod]
*$py.class

# Virtual environments
venv/
env/
ENV/
.venv/

# Distribution / packaging
*.egg-info/
dist/
build/
*.egg

# PyInstaller
*.manifest
*.spec

# Unit test / coverage
.pytest_cache/
.coverage
htmlcov/

# Jupyter Notebook
.ipynb_checkpoints/
```

**java**
```
# Java
*.class
*.jar
*.war
*.ear

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup

# Gradle
.gradle/
build/
!gradle-wrapper.jar

# IntelliJ
*.iml
.idea/

# Eclipse
.classpath
.project
.settings/
```

**go**
```
# Go
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary
*.test

# Output of go build
*.o
*.a

# Dependency directories
vendor/

# Go workspace file
go.work

# Coverage
*.out
coverage.txt
```

**rust**
```
# Rust
target/
Cargo.lock

# Debug files
*.pdb

# Backup files
**/*.rs.bk

# MSVC Windows builds
*.exe
*.pdb
```

**macos**
```
# macOS
.DS_Store
.AppleDouble
.LSOverride

# Thumbnails
._*

# Files that might appear in the root
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk
```

**windows**
```
# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Dump file
*.stackdump

# Folder config file
[Dd]esktop.ini

# Recycle Bin
$RECYCLE.BIN/

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp

# Windows shortcuts
*.lnk
```

**vscode**
```
# VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
!.vscode/*.code-snippets

# Local History for Visual Studio Code
.history/

# Built Visual Studio Code Extensions
*.vsix
```

**jetbrains**
```
# JetBrains IDEs
.idea/
*.iml
*.iws
*.ipr

# CMake
cmake-build-*/

# IntelliJ
out/

# JIRA plugin
atlassian-ide-plugin.xml
```

## Options
- `presets` — comma-separated list of preset names (required unless custom-only)
- `custom` — additional patterns appended under `# Custom entries`

## Examples

**Input:** nodejs, macos, vscode

**Output:** (nodejs block) + blank line + (macos block) + blank line + (vscode block)

**Input:** python with custom `*.log` and `secrets.json`

**Output:** (python block) + blank line + `# Custom entries\n*.log\nsecrets.json`

## Error Handling
- If an unknown preset name is given, list the valid preset names and ask the user to clarify.
- If no presets and no custom entries are provided, ask the user what technology or OS they are using.
