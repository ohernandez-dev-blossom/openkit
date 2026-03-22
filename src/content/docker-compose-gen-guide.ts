import type { ToolGuideContent } from "./types";

export const dockerComposeGenGuideContent: ToolGuideContent = {
  toolName: "Docker Compose Generator",
  toolPath: "/docker-compose-gen",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Pick a Preset",
      description: "Choose a stack preset (Node.js + PostgreSQL, WordPress + MySQL, etc.) or start fresh. The preset fills in services, volumes, and networks."
    },
    {
      title: "Configure Services",
      description: "Set image, build context, ports, environment variables, volumes, and restart policy for each service. Add new services as needed."
    },
    {
      title: "Set Up Networking",
      description: "Define Docker networks and assign services. Configure named volumes for persistent data."
    },
    {
      title: "Copy & Deploy",
      description: "Copy the generated docker-compose.yml. Save it and run docker compose up -d."
    }
  ],

  introduction: {
    title: "What is Docker Compose?",
    content: `Docker Compose is a tool for defining and running multi-container Docker applications. With a single YAML file, you configure all your app's services, networks, and volumes, then create and start everything with one command.

### Why Use a Compose Generator?

docker-compose.yml syntax has many options and it's easy to get indentation, field names, or relationships wrong. A visual builder lets you focus on architecture decisions while ensuring valid YAML output.

### What This Tool Supports

- **Services:** Image, build context, ports, environment variables, volumes, commands, restart policies
- **Dependencies:** depends_on for startup ordering
- **Networks:** Bridge, overlay, and host drivers; external networks
- **Volumes:** Named volumes with drivers; bind mounts
- **Health checks:** Custom health check commands with interval, timeout, and retries
- **Resource limits:** Memory and CPU limits via deploy.resources
- **Presets:** Common stacks (Node.js + PostgreSQL, WordPress + MySQL, etc.) as starting points`
  },

  useCases: [
    {
      title: "Full-Stack Development",
      description: "Run your entire stack locally — app, database, cache, queue, and reverse proxy — with one docker compose up command. Consistent across team members.",
      example: "Next.js + PostgreSQL + Redis + Nginx reverse proxy"
    },
    {
      title: "Database Stacks",
      description: "Spin up databases with persistent volumes and proper health checks. PostgreSQL, MySQL, MongoDB, Redis — preconfigured and ready to connect.",
      example: "PostgreSQL 16 with persistent volume, health check, and environment config"
    },
    {
      title: "CI/CD Test Environments",
      description: "Define test infrastructure as code. Spin up services for integration tests in CI pipelines, then tear them down.",
      example: "App + test database + test Redis in GitHub Actions"
    },
    {
      title: "Self-Hosted Apps",
      description: "Deploy self-hosted services (WordPress, Gitea, Nextcloud, etc.) with proper volumes, networks, and SSL reverse proxies.",
      example: "WordPress + MySQL + Caddy with Let's Encrypt"
    }
  ],

  howToUse: {
    title: "How to Use Docker Compose Generator",
    content: `Build your docker-compose.yml step by step with the visual interface.

### Services

Each service represents a container. Configure:
- **Image:** Docker Hub image (e.g., postgres:16-alpine)
- **Build:** Build context for custom Dockerfiles (e.g., . for current directory)
- **Ports:** Host:container port mappings
- **Environment:** KEY=VALUE environment variables
- **Volumes:** Bind mounts or named volumes
- **Command:** Override the default container command
- **Restart Policy:** no, always, on-failure, unless-stopped

### Dependencies

Use depends_on to control startup order. Toggle dependency buttons to link services.

### Networks & Volumes

Define named networks and volumes at the bottom. Assign them to services. Named volumes persist data across container restarts and recreations.

### Health Checks

Add a health check command (e.g., pg_isready -U postgres for PostgreSQL). The generated config includes interval, timeout, and retry settings.`,
    steps: [
      { name: "Choose a Preset", text: "Select a common stack or start empty." },
      { name: "Configure Services", text: "Set image, ports, env vars, volumes for each service." },
      { name: "Set Dependencies", text: "Link services with depends_on for startup ordering." },
      { name: "Define Networks & Volumes", text: "Create named networks and volumes; assign to services." },
      { name: "Copy & Deploy", text: "Copy the YAML output. Save as docker-compose.yml and run docker compose up -d." }
    ]
  },

  faqs: [
    {
      question: "Should I use 'docker-compose' or 'docker compose'?",
      answer: "Use 'docker compose' (with a space). The hyphenated 'docker-compose' is the legacy v1 Python tool. Docker Compose v2 is built into the Docker CLI as 'docker compose'. Both read the same docker-compose.yml format."
    },
    {
      question: "Do I need a 'version' field in docker-compose.yml?",
      answer: "No. Docker Compose v2 no longer requires the 'version' field. It's optional and ignored. This generator omits it for cleanliness."
    },
    {
      question: "How do I handle secrets (passwords, API keys)?",
      answer: "Don't put real secrets in docker-compose.yml if it's committed to git. Use a .env file (add to .gitignore) and reference variables with ${VARIABLE} in your compose file. For production, use Docker secrets or external secret management."
    },
    {
      question: "Can I use this with Docker Swarm?",
      answer: "The generated files work with both 'docker compose' and 'docker stack deploy'. The deploy section (resource limits) is specifically for Swarm mode or newer Compose features."
    },
    {
      question: "What about multi-stage builds?",
      answer: "This tool generates the docker-compose.yml file, not Dockerfiles. For multi-stage builds, create your Dockerfile separately and reference it via the 'build' context in the service configuration."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Docker configurations may contain internal architecture details, service names, and environment variable structures. This tool keeps all of that private.

- **100% client-side:** No server processing. Your config never leaves the browser.
- **No storage:** Nothing saved or cached. Close the tab to clear everything.
- **No analytics on content:** We track page views but never log service names, images, or environment variables.
- **Offline capable:** Works without an internet connection after initial load.

Safe for generating configs with internal service names, database credentials, and architecture details.`
  },

  stats: {
    "Stack Presets": "4",
    "Restart Policies": "4",
    "Network Drivers": "3",
    "Processing": "Client-side"
  }
};
