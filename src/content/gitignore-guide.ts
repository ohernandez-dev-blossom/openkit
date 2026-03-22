/**
 * .gitignore Generator Tool Guide Content
 * Comprehensive developer guide for git ignore patterns
 */

import type { ToolGuideContent } from "./types";

export const gitignoreGuideContent: ToolGuideContent = {
  toolName: ".gitignore Generator",
  toolPath: "/gitignore",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Your Tech Stack",
      description: "Choose your programming languages, frameworks, and tools (Node.js, Python, Java, React, Docker). The generator includes battle-tested patterns for each technology to prevent common mistakes."
    },
    {
      title: "Add IDE and OS Patterns",
      description: "Select your code editor (VS Code, IntelliJ, Vim) and operating system (Windows, macOS, Linux). Prevents IDE config files and OS metadata from polluting repositories."
    },
    {
      title: "Generate .gitignore File",
      description: "Click Generate to create a comprehensive .gitignore with all selected patterns organized by category. Includes comments explaining each section for team understanding."
    },
    {
      title: "Copy to Repository",
      description: "Copy the generated .gitignore content and save as .gitignore file in your repository root. Commit immediately to prevent accidentally tracking unwanted files later."
    }
  ],

  introduction: {
    title: "What is .gitignore?",
    content: `.gitignore is a configuration file that tells Git which files and directories to exclude from version control. Without .gitignore, developers accidentally commit sensitive data (API keys, passwords), large files (node_modules, build artifacts), IDE configs (workspace settings), and OS metadata (.DS_Store, Thumbs.db) that bloat repositories and leak information. A proper .gitignore is essential for repository hygiene, security, and collaboration.

Every Git repository should have a .gitignore file committed as the first file before any code. This prevents the common mistake of committing node_modules, venv, or .env files that are noticed only after thousands of commits. Removing sensitive files from Git history is difficult (requires rewriting history with git filter-branch or BFG Repo-Cleaner) and may not remove them from forks or clones. Prevention via .gitignore is far easier than remediation.

### Why .gitignore Matters

**Security:** The most critical reason for .gitignore is preventing accidental commits of sensitive files. .env files contain API keys, database passwords, OAuth secrets, and encryption keys. Committing .env to public repositories exposes credentials to the entire internet - attackers scan GitHub for exposed keys. node_modules and package dependencies may contain compiled binaries with embedded tokens. IDE configs may store workspace-specific paths that leak internal infrastructure.

**Repository size:** node_modules folders contain thousands of files and hundreds of megabytes. Committing dependencies to Git creates massive repositories that are slow to clone, consume excessive storage, and make git operations crawl. Build artifacts (dist/, build/, target/) are generated from source and should never be committed - they cause merge conflicts and repository bloat. Large binary files (videos, datasets, compiled executables) belong in Git LFS or external storage, not tracked directly.

**Collaboration issues:** Each developer has different IDE preferences (VS Code vs IntelliJ), operating systems (macOS vs Windows), and local configurations. Without .gitignore, every developer commits their IDE settings, creating noise in git diff and constant merge conflicts. .DS_Store (macOS), Thumbs.db (Windows), and *.swp (Vim) files are personal and irrelevant to other team members.

**CI/CD failures:** Accidentally committed node_modules or venv with different platform binaries (macOS binaries committed, CI runs on Linux) cause cryptic build failures. Environment-specific configs (local database URLs, dev API endpoints) committed to repos break production deployments when config values differ between environments.

### Common Files to Ignore

**Dependencies and packages:** node_modules/ (Node.js), vendor/ (PHP Composer), venv/ or env/ (Python virtualenv), target/ (Java/Maven), pkg/ (Go). These are installed from package.json, requirements.txt, pom.xml, etc. and should never be committed. Reinstalling dependencies is standard workflow (npm install, pip install).

**Build artifacts and output:** dist/, build/, out/, *.o, *.class, *.pyc, *.dll, *.exe. Generated from source code during compilation or build process. Committing build outputs causes merge conflicts (binary files) and wastes space. CI/CD pipelines rebuild from source anyway.

**Environment configuration:** .env, .env.local, config.local.js, secrets.yml. Files containing API keys, passwords, database URLs, or environment-specific settings. These must be created locally or injected by deployment systems, never committed. Use .env.example with placeholder values to document required variables without exposing real values.

**IDE and editor files:** .vscode/, .idea/ (IntelliJ), *.sublime-workspace, *.swp (Vim), .project (Eclipse). These are personal workspace configurations that differ per developer. Exception: some teams commit shared .vscode/settings.json for consistent formatting, but ignore workspace files like .vscode/tasks.json.

**Operating system files:** .DS_Store (macOS Finder metadata), Thumbs.db (Windows thumbnail cache), Desktop.ini (Windows folder config), *.tmp. These files are created automatically by OS and provide no value in repositories. They create noise in git status and diffs.

**Logs and temporary files:** *.log, *.tmp, *.cache, .pytest_cache/, .coverage, npm-debug.log, yarn-error.log. Logs are environment-specific and change frequently. Committing logs creates constant merge conflicts and bloats history.

### .gitignore Pattern Syntax

Git patterns use glob syntax with wildcards. **Asterisk (\*)** matches any characters except slash: *.log matches file.log, error.log. **Double asterisk (\*\*)** matches any directories recursively: **/node_modules matches node_modules at any depth. **Question mark (?)** matches single character: file?.txt matches file1.txt, fileA.txt. **Slash (/)** at start matches only root directory: /config matches /config but not /src/config. **Slash at end** matches only directories: build/ matches build directory, not build file. **Exclamation mark (!)** negates patterns: *.log ignores logs, !important.log tracks important.log.

### Best Practices

**Commit .gitignore first:** Create and commit .gitignore before any code. Prevents accidental commits of dependencies or secrets during initial development.

**Use template generators:** Don't write .gitignore from scratch - use templates for your tech stack. GitHub maintains official gitignore templates for every major language and framework. Generators like this tool combine multiple templates into complete configs.

**Comment sections:** Add comments explaining each section (# Python dependencies, # IDE files) so team members understand patterns. Organized .gitignore files are easier to maintain and extend.

**Wildcard carefully:** Overly broad patterns (*.json ignores all JSON) may accidentally exclude important config files (package.json, tsconfig.json). Be specific (*.log.json) or use explicit exceptions (!package.json).

**Version control .gitignore:** The .gitignore file itself should be committed to the repository. This ensures all team members and CI/CD systems use the same ignore patterns.

**Platform-specific patterns:** Add OS-specific patterns (macOS .DS_Store, Windows Thumbs.db) even if you don't use that OS. Team members on different platforms benefit, and patterns are harmless if files don't exist.`
  },

  useCases: [
    {
      title: "Node.js Project Setup",
      description: "Create .gitignore for Node.js projects to exclude node_modules, environment files, build outputs, and logs. Prevents massive repository bloat from thousands of dependency files and protects API keys in .env.",
      example: `# .gitignore for Node.js / React / Next.js
# Generated with https://openkit.tools/gitignore

# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# Production builds
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

# IDE
.vscode/
.idea/
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Why each section matters:
# node_modules: 100MB+ of dependencies, reinstall with npm install
# dist/build: Generated from source, rebuild with npm run build
# .env: Contains API keys, database passwords - NEVER commit!
# coverage: Test coverage reports, generated during testing
# .vscode: Personal IDE settings, differs per developer
# .DS_Store: macOS metadata, irrelevant to code

# Common mistakes without this:
# ✗ Committing node_modules (100MB+, slow clones)
# ✗ Exposing .env keys on GitHub (security breach)
# ✗ Merge conflicts on dist/ (binary files)
# ✗ .DS_Store noise in every commit`
    },
    {
      title: "Python Data Science Project",
      description: "Generate .gitignore for Python projects with virtual environments, Jupyter notebooks, datasets, and model outputs. Prevents committing large data files and environment-specific packages.",
      example: `# .gitignore for Python / Data Science
# Generated with https://openkit.tools/gitignore

# Virtual environments
venv/
env/
.venv/
ENV/
env.bak/

# Python bytecode
__pycache__/
*.py[cod]
*$py.class
*.so

# Jupyter Notebook
.ipynb_checkpoints/
*.ipynb_checkpoints

# Data and models (large files)
data/
*.csv
*.h5
*.pkl
*.joblib
models/
*.pth

# IDE
.vscode/
.idea/
.spyderproject
.ropeproject

# OS
.DS_Store

# Environment
.env

# Why exclude data and models:
# data/: Datasets can be GB-sized, use Git LFS or external storage
# *.h5, *.pth: Trained models are large, store in MLflow or S3
# .ipynb_checkpoints: Jupyter autosaves, constant changes create noise

# Example workflow:
# 1. Store raw data in S3 or data/ (ignored)
# 2. Commit data loading scripts and preprocessing code
# 3. Store trained models in model registry (MLflow, Weights & Biases)
# 4. Commit model training scripts, not outputs

# Track .env.example with placeholder values:
# DB_HOST=localhost
# API_KEY=your_key_here

# Each developer creates .env with real values (ignored)`
    },
    {
      title: "Docker Development Environment",
      description: "Create .gitignore for Dockerized projects to exclude container volumes, build contexts, and environment overrides. Prevents committing generated files and local configuration that breaks deployments.",
      example: `# .gitignore for Docker projects
# Generated with https://openkit.tools/gitignore

# Docker volumes and data
volumes/
data/
postgres-data/
redis-data/

# Docker overrides
docker-compose.override.yml
.dockerignore

# Environment files
.env
.env.local
.env.*.local

# Logs from containers
logs/
*.log

# IDE
.vscode/
.idea/

# OS
.DS_Store

# Build contexts (if large)
build-context/

# Why exclude these:
# volumes/: Mount points for container data, recreated on each run
# docker-compose.override.yml: Local dev overrides (different ports, volumes)
# .env: Contains database passwords, API keys for containers

# Workflow:
# 1. Commit docker-compose.yml (base config)
# 2. Create docker-compose.override.yml locally (ignored)
#    for personal dev settings (port mappings, mount paths)
# 3. Each developer has own .env with local values
# 4. CI/CD injects production .env values

# docker-compose.override.yml example (not committed):
version: '3.8'
services:
  db:
    ports:
      - "5433:5432"  # Personal port to avoid conflicts
    volumes:
      - ./volumes/postgres:/var/lib/postgresql/data

# .env.example (committed, with placeholders):
DATABASE_URL=postgresql://user:password@localhost:5432/db
REDIS_URL=redis://localhost:6379
API_KEY=your_api_key_here

# .env (not committed, real values):
DATABASE_URL=postgresql://admin:s3cr3t@localhost:5432/mydb
REDIS_URL=redis://localhost:6379
API_KEY=live_sk_abc123xyz789`
    },
    {
      title: "Full-Stack Monorepo",
      description: "Generate .gitignore for monorepos with multiple languages (Node.js frontend, Python backend, Java services). Combines patterns from all tech stacks into single comprehensive file.",
      example: `# .gitignore for Monorepo (Frontend + Backend + Services)
# Generated with https://openkit.tools/gitignore

# ====================
# Node.js (Frontend)
# ====================
frontend/node_modules/
frontend/dist/
frontend/.next/
frontend/build/
frontend/npm-debug.log*

# ====================
# Python (Backend)
# ====================
backend/venv/
backend/__pycache__/
backend/*.py[cod]
backend/.pytest_cache/

# ====================
# Java (Services)
# ====================
services/target/
services/*.class
services/.mvn/
services/*.jar

# ====================
# Shared
# ====================
# Environment files
.env
.env.local
**/.env

# IDE (all projects)
.vscode/
.idea/
*.sublime-workspace

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Docker
volumes/
docker-compose.override.yml

# Why monorepo .gitignore differs:
# - Prefix paths with subdirectory (frontend/node_modules)
# - Combine patterns from all languages
# - Shared patterns at root level (**/.env catches all)

# Structure:
monorepo/
  frontend/  (React/Next.js)
    package.json
    node_modules/  (ignored)
  backend/  (Python/FastAPI)
    requirements.txt
    venv/  (ignored)
  services/  (Java/Spring)
    pom.xml
    target/  (ignored)
  .gitignore  (this file, covers all)
  docker-compose.yml

# Alternative: .gitignore per subdirectory
# Some teams prefer:
frontend/.gitignore  (Node patterns only)
backend/.gitignore   (Python patterns only)
services/.gitignore  (Java patterns only)
.gitignore           (Shared patterns)

# Both approaches work, choose based on team preference`
    }
  ],

  howToUse: {
    title: "How to Use This .gitignore Generator",
    content: `This .gitignore generator creates comprehensive ignore patterns based on your project's technology stack. Select your languages, frameworks, IDEs, and operating systems to generate a battle-tested .gitignore file that prevents common mistakes and security issues.

### Selecting Technologies

Choose all programming languages used in your project (Node.js, Python, Java, Go, Ruby). Select frameworks (React, Django, Spring Boot) to include framework-specific patterns (Next.js .next/ folder, Django *.pyc files). Add build tools (Maven target/, Gradle build/) if using compiled languages.

The generator includes official patterns from GitHub's gitignore repository, maintained by thousands of developers and covering edge cases most developers don't consider. These templates are battle-tested across millions of repositories.

### Adding IDE and OS Patterns

Select your code editor (VS Code, IntelliJ IDEA, Vim, Emacs) to exclude IDE-specific config files. Even if all team members use the same IDE, some files like workspace settings should be personal. Choose operating systems your team uses (Windows, macOS, Linux) to exclude OS metadata files. It's safe to include all OS patterns even if you only use one - unused patterns have no effect.

### Understanding Generated Patterns

The generated .gitignore is organized into commented sections (Dependencies, Build Output, Environment, IDE, OS) for readability. Each section groups related patterns with explanatory comments. This organization makes .gitignore maintainable - when you add new technologies, you know where to insert patterns.

Patterns use glob syntax: * matches any characters, ** matches directories recursively, / at start means root only, / at end means directory only, ! negates patterns. Examples: *.log (all log files), **/node_modules (node_modules at any depth), /dist (only root dist), build/ (only directories named build), !important.log (track important.log despite *.log).

### Installing in Your Repository

Copy the generated .gitignore content. Create a file named .gitignore (with leading dot, no extension) in your repository root directory. Paste the content and save. Commit .gitignore immediately: git add .gitignore && git commit -m "Add .gitignore". If you already committed files that should be ignored, see the FAQ for removal instructions.

### Updating Existing .gitignore

If your project already has .gitignore, append new patterns to existing file rather than replacing. Review existing patterns - they may be project-specific. Organize combined patterns into sections with comments. Remove duplicate patterns if merging multiple templates.

### Testing .gitignore

Run git status to see which files are tracked. Ignored files don't appear in git status output (unless already committed). Create a test file that should be ignored (touch .env) and verify it doesn't appear in git status. Try committing an ignored directory (git add node_modules/) - Git should report "nothing to commit" if patterns work correctly.

Use git check-ignore -v filename to test if specific files are ignored and which pattern matches. Example: git check-ignore -v .DS_Store shows ".gitignore:15:*.DS_Store  .DS_Store" indicating line 15 matches.`,
    steps: [
      {
        name: "Select Technologies",
        text: "Choose programming languages (Node.js, Python, Java), frameworks (React, Django), and build tools (Maven, Gradle) used in your project.",
      },
      {
        name: "Add IDE and OS Patterns",
        text: "Select code editors (VS Code, IntelliJ, Vim) and operating systems (Windows, macOS, Linux) to exclude IDE and OS metadata files.",
      },
      {
        name: "Generate and Copy",
        text: "Click Generate to create comprehensive .gitignore with all selected patterns. Copy the output to clipboard.",
      },
      {
        name: "Commit to Repository",
        text: "Save as .gitignore file in repository root. Commit immediately: 'git add .gitignore && git commit -m \"Add .gitignore\"'.",
      }
    ]
  },

  faqs: [
    {
      question: "How do I remove files I already committed that should be ignored?",
      answer: "Use 'git rm --cached <file>' to remove from tracking without deleting locally. For directories: 'git rm -r --cached node_modules/'. Add pattern to .gitignore, then commit the removal: 'git commit -m \"Remove node_modules from tracking\"'. The file is removed from the repository but stays in your working directory. Team members need to pull to remove from their repos too."
    },
    {
      question: "Should I commit .gitignore itself?",
      answer: "Yes, always commit .gitignore to the repository. This ensures all team members and CI/CD systems use the same ignore patterns. Without committed .gitignore, each developer creates their own (or none), leading to inconsistent tracking and accidental commits. The .gitignore file is not ignored by itself - it's tracked like any other file."
    },
    {
      question: "Can I have .gitignore in subdirectories?",
      answer: "Yes, place .gitignore files in subdirectories to apply patterns to specific folders. Patterns in subdirectory .gitignore are relative to that directory. Useful for monorepos: frontend/.gitignore for Node patterns, backend/.gitignore for Python patterns. Root .gitignore applies globally. Git checks .gitignore files from file location up to repository root."
    },
    {
      question: "What if I need to track a file that matches ignore patterns?",
      answer: "Use ! (exclamation mark) to negate patterns and track specific files. Example: '*.log' ignores all logs, '!important.log' tracks important.log. Order matters - place negation after the pattern it negates. Or use 'git add -f <file>' to force-add ignored files, but this is not recommended - better to adjust .gitignore patterns."
    },
    {
      question: "Why do ignore patterns sometimes not work?",
      answer: "Files already tracked before adding .gitignore remain tracked. .gitignore only affects untracked files. If node_modules was committed before adding it to .gitignore, it stays tracked. Solution: 'git rm -r --cached node_modules/' then commit. Also check pattern syntax - '/dist' matches only root, 'dist/' matches directories anywhere, '**/dist' explicitly matches at any depth."
    },
    {
      question: "Should I ignore package-lock.json or yarn.lock?",
      answer: "No, never ignore lock files (package-lock.json, yarn.lock, Gemfile.lock, composer.lock). Lock files ensure all developers and CI/CD use identical dependency versions. Without lock files, 'npm install' may install different versions on different machines, causing 'works on my machine' bugs. Always commit lock files for reproducible builds."
    },
    {
      question: "What's the difference between .gitignore and .dockerignore?",
      answer: ".gitignore tells Git what to exclude from version control. .dockerignore tells Docker what to exclude from build context when building images. They serve different purposes and should be maintained separately. Example: node_modules ignored by both, but .git directory only in .dockerignore (never send .git to Docker build). Some patterns overlap but not all."
    },
    {
      question: "Can .gitignore delete files from remote repository?",
      answer: "No, .gitignore prevents tracking new files but doesn't remove existing tracked files from remote repos. If you committed secrets.json, adding it to .gitignore doesn't remove it from history. You must: 1) 'git rm --cached secrets.json', 2) commit the removal, 3) push. The file disappears from repo but stays in history. To purge from history completely, use git filter-branch or BFG Repo-Cleaner."
    },
    {
      question: "Should I use global .gitignore for personal settings?",
      answer: "Yes, create ~/.gitignore_global for IDE and OS files you never want to commit (VS Code .vscode/, macOS .DS_Store). Configure Git to use it: 'git config --global core.excludesfile ~/.gitignore_global'. This keeps personal preferences out of project .gitignore files. Project .gitignore should only contain project-specific patterns, not personal tool configs."
    },
    {
      question: "What patterns are safe to copy from other projects?",
      answer: "IDE and OS patterns (VS Code, IntelliJ, .DS_Store, Thumbs.db) are universal - safe to copy. Language-specific patterns (Python __pycache__, Node node_modules) are safe for that language. Framework patterns are safe if using that framework (Next.js .next/, Django *.pyc). Avoid copying project-specific patterns (custom build dirs, internal file names) without understanding them - may accidentally ignore important files."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This .gitignore generator operates entirely client-side in your browser. No information about your tech stack, project structure, or repository details is transmitted to servers. All pattern generation happens locally using pre-loaded templates.

### Privacy Guarantees

- **100% Client-Side Processing:** All template selection and .gitignore generation happens in your browser using JavaScript. No server communication.
- **No Server Uploads:** We have no backend servers to process your selections. The tool works completely offline after page load.
- **No Data Storage:** Your technology selections and generated .gitignore are not saved, logged, or transmitted. Refresh the page and selections are cleared.
- **No Analytics Tracking:** We don't track what technologies you select, what patterns you generate, or any project information.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during generation - zero uploads.

Safe for generating .gitignore for confidential projects, proprietary tech stacks, client work, or any project requiring privacy. Use with confidence for sensitive repositories, pre-launch products, or enterprise development.`
  },

  stats: {
    "Language Templates": "50+",
    "IDE Patterns": "10+",
    "OS Patterns": "3",
    "Pattern Types": "100+"
  }
};
