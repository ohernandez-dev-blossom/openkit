/**
 * Docker Compose Generator Tool Guide Content
 * Comprehensive developer guide for Docker Compose file generation
 */

import type { ToolGuideContent } from "./types";

export const dockerGuideContent: ToolGuideContent = {
  toolName: "Docker Compose Generator",
  toolPath: "/docker",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select Your Services",
      description: "Choose from popular pre-configured services like Nginx, PostgreSQL, MySQL, Redis, MongoDB, or Elasticsearch. Each service comes with sensible defaults for development environments."
    },
    {
      title: "Configure Service Options",
      description: "Customize service settings including ports, volumes, environment variables, and network configuration. Adjust memory limits, restart policies, and dependencies between services."
    },
    {
      title: "Generate docker-compose.yml",
      description: "Click Generate to create a complete docker-compose.yml file with proper YAML syntax, service definitions, volume mounts, and network configuration ready for development or production."
    },
    {
      title: "Copy or Download File",
      description: "Click Copy to copy the docker-compose.yml content to your clipboard, or Download to save directly to your project directory ready to run with docker-compose up."
    }
  ],

  introduction: {
    title: "What is Docker Compose?",
    content: `Docker Compose is a tool for defining and running multi-container Docker applications using a single YAML configuration file. Instead of running multiple docker run commands with complex flags, Compose lets you define all services, networks, and volumes in docker-compose.yml and start everything with docker-compose up.

Modern applications consist of multiple interconnected services - a web server, database, cache, message queue, and background workers. Managing these services individually with Docker commands is error-prone and doesn't capture dependencies or startup order. Docker Compose solves this by orchestrating the entire application stack from a single configuration file.

### Why Docker Compose Matters

Development environment consistency is critical for team productivity. Docker Compose ensures every developer runs identical services with the same versions, configurations, and network setup. New team members run docker-compose up and have a complete working environment in minutes, eliminating "works on my machine" problems.

Microservices architectures require running dozens of services locally during development. Compose manages complex service topologies - databases, APIs, authentication services, caching layers, and message queues - all defined in one file with explicit dependencies and startup order.

CI/CD pipelines use Docker Compose for integration testing. Test environments spin up with docker-compose up, tests run against real services (not mocks), then docker-compose down tears everything down. This ensures tests match production behavior without manual infrastructure management.

### Key Docker Compose Features

**Service Definitions:** Each service specifies its Docker image, ports, volumes, environment variables, and dependencies. Services can reference images from Docker Hub or custom Dockerfiles in your repository.

**Networking:** Compose automatically creates a network where all services can communicate using service names as hostnames. The database service connects to postgres:5432 instead of localhost:5432, making configs portable.

**Volume Management:** Persistent data storage through named volumes ensures databases survive container restarts. Bind mounts sync local code into containers for hot-reloading during development.

**Environment Variables:** Configuration separated from code through env_file or environment declarations. Different .env files for dev/staging/production without changing docker-compose.yml.

**Dependency Management:** depends_on ensures services start in correct order - databases before APIs, message queues before workers. Health checks verify services are ready before dependent services start.

### Common Use Cases

Developers use Docker Compose for local development environments matching production, integration testing with real databases and services, demonstrating applications to clients without complex setup, onboarding new developers with one-command environment setup, and prototyping microservices architectures before cloud deployment.

The generator eliminates manual YAML writing, provides production-ready defaults, and ensures syntactically correct Compose files that work immediately.`
  },

  useCases: [
    {
      title: "Full-Stack Development Environment",
      description: "Create a complete development environment with web server, API, database, and cache. Developers clone the repo, run docker-compose up, and have a working application instantly.",
      example: `# Generated docker-compose.yml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - api

  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:postgres@postgres:5432/myapp
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:`
    },
    {
      title: "Integration Testing Setup",
      description: "Define test databases and services that spin up for CI/CD pipelines. Tests run against real PostgreSQL, Redis, or MongoDB instead of mocks, ensuring production parity.",
      example: `# Test environment composition
services:
  test-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: test
      POSTGRES_DB: test_db
    tmpfs:
      - /var/lib/postgresql/data  # Ephemeral storage for speed

  test-redis:
    image: redis:alpine
    tmpfs:
      - /data

  test-runner:
    build:
      context: .
      dockerfile: Dockerfile.test
    depends_on:
      - test-db
      - test-redis
    command: npm test`
    },
    {
      title: "Microservices Local Development",
      description: "Run multiple interconnected microservices locally with service discovery. Each service communicates using service names, matching production Kubernetes environments.",
      example: `# Microservices stack
services:
  auth-service:
    image: mycompany/auth:latest
    environment:
      DATABASE_URL: postgres://postgres:5432/auth

  user-service:
    image: mycompany/users:latest
    environment:
      AUTH_SERVICE_URL: http://auth-service:3001
      DATABASE_URL: postgres://postgres:5432/users
    depends_on:
      - auth-service

  api-gateway:
    image: mycompany/gateway:latest
    ports:
      - "8080:8080"
    environment:
      AUTH_URL: http://auth-service:3001
      USERS_URL: http://user-service:3002
    depends_on:
      - auth-service
      - user-service`
    },
    {
      title: "Database Version Testing",
      description: "Test application compatibility with different database versions. Switch between PostgreSQL 14, 15, 16, or MySQL 8.0, 8.4 by changing image tags in docker-compose.yml.",
      example: `# Test against multiple PostgreSQL versions
services:
  app:
    build: .
    environment:
      DATABASE_URL: postgres://postgres:5432/app

  # Swap between versions by changing tag
  postgres:
    image: postgres:16-alpine  # or postgres:15-alpine, postgres:14
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: app
    volumes:
      - pg-data:/var/lib/postgresql/data

volumes:
  pg-data:`
    }
  ],

  howToUse: {
    title: "How to Use This Docker Compose Generator",
    content: `This Docker Compose generator provides instant configuration file creation with zero server uploads. All processing happens in your browser using JavaScript YAML generation, ensuring your configuration remains private and processing is instantaneous.

### Basic Generation Workflow

Select services from the provided list of popular Docker images: Nginx (web server), PostgreSQL (database), MySQL (database), Redis (cache), MongoDB (NoSQL database), Elasticsearch (search engine), RabbitMQ (message queue), or custom services.

Configure each service's options: ports to expose, volume mounts for persistent data, environment variables for configuration, memory and CPU limits for resource management, and restart policies for production resilience.

Click Generate to create a complete docker-compose.yml file with proper YAML syntax, service definitions, dependency ordering, network configuration, and volume declarations. The generated file follows Docker Compose best practices and works immediately.

### Advanced Configuration

**Port Mapping:** Expose services on specific host ports (8080:80 maps container port 80 to host port 8080). Use different host ports when running multiple Compose projects simultaneously to avoid conflicts.

**Volume Types:** Named volumes (postgres-data) persist data across container restarts. Bind mounts (./code:/app) sync local directories into containers for live code reloading during development.

**Environment Variables:** Define inline (DATABASE_URL=postgres://...) or use env_file (.env.development) to load from files. Separate configuration from code for different environments.

**Healthchecks:** Configure health checks that verify services are ready before dependent services start. Prevents connection errors during startup when databases need time to initialize.

**Resource Limits:** Set memory and CPU limits (mem_limit: 512m) to prevent services from consuming all host resources, important when running large Compose stacks on laptops.

### Best Practices

Use named volumes for database data to prevent data loss when containers are removed. Set explicit image tags (postgres:16-alpine) instead of latest to ensure consistent environments. Define restart policies (restart: unless-stopped) for production deployments. Use .env files for sensitive configuration instead of hardcoding secrets. Document service dependencies in depends_on to ensure correct startup order. Test generated docker-compose.yml with docker-compose config to validate YAML syntax before running.`,
    steps: [
      {
        name: "Select Services",
        text: "Choose the services your application needs from the list: databases (PostgreSQL, MySQL, MongoDB), caches (Redis), web servers (Nginx), or message queues (RabbitMQ)."
      },
      {
        name: "Configure Options",
        text: "Customize each service's ports, volumes, environment variables, memory limits, and restart policies to match your development or production requirements."
      },
      {
        name: "Generate Configuration",
        text: "Click Generate to create a complete docker-compose.yml file with proper YAML syntax, service definitions, and networking configured."
      },
      {
        name: "Download and Run",
        text: "Download the docker-compose.yml file to your project directory, then run 'docker-compose up -d' to start all services."
      }
    ]
  },

  faqs: [
    {
      question: "What's the difference between named volumes and bind mounts?",
      answer: "Named volumes (postgres-data:/var/lib/postgresql/data) are Docker-managed storage that persists data even after containers are removed. They're ideal for databases and stateful services. Bind mounts (./code:/app) map local directories into containers, syncing local file changes immediately - perfect for development hot-reloading. Use named volumes for data persistence, bind mounts for code synchronization."
    },
    {
      question: "How do I access services from my host machine?",
      answer: "Services with exposed ports are accessible on localhost at the mapped port. If postgres maps '5432:5432', connect to localhost:5432 from your host. Services without exposed ports are only accessible from other containers in the Compose network. Use psql -h localhost -p 5432 or your application's database client pointing to localhost."
    },
    {
      question: "Should I commit docker-compose.yml to version control?",
      answer: "Yes, commit docker-compose.yml so all team members use the same service configuration. Don't commit .env files with secrets - use .env.example templates instead. Include docker-compose.override.yml in .gitignore for developer-specific customizations (different port mappings, debug tools). This ensures consistent environments while allowing local flexibility."
    },
    {
      question: "How do I update service images to latest versions?",
      answer: "Run 'docker-compose pull' to download latest images matching tags in docker-compose.yml, then 'docker-compose up -d' to recreate containers with new images. For databases, backup data first - some version upgrades require data migration. Pin specific versions (postgres:16.1) in production; use broader tags (postgres:16) in development for automatic minor updates."
    },
    {
      question: "Can I run multiple Compose projects simultaneously?",
      answer: "Yes, but ensure services don't conflict on host ports. If two projects both expose port 5432, the second will fail. Use different port mappings ('5433:5432') or run projects in different directories. Docker Compose uses directory name as project name, isolating networks and volumes automatically. Override project name with 'docker-compose -p myproject up'."
    },
    {
      question: "Is my configuration private when using this tool?",
      answer: "Absolutely. All Docker Compose file generation happens entirely in your browser using client-side JavaScript. Your configuration never leaves your device or gets sent to any servers. No uploads, no storage, no analytics tracking. Safe for proprietary service configurations, database credentials, or confidential project setups."
    },
    {
      question: "How do I handle secrets in docker-compose.yml?",
      answer: "Never hardcode secrets in docker-compose.yml committed to version control. Use environment variables with env_file: .env, keep .env in .gitignore, and provide .env.example templates. For production, use Docker Secrets (Swarm mode) or external secret managers (AWS Secrets Manager, HashiCorp Vault). Reference secrets as environment variables loaded from secure sources."
    },
    {
      question: "What's the difference between depends_on and links?",
      answer: "depends_on controls startup order - PostgreSQL starts before the API that needs it. However, it doesn't wait for the service to be ready, only started. Use healthchecks with depends_on for readiness. links is deprecated - use service names for networking instead (DATABASE_URL: postgres://postgres:5432 works automatically in Compose networks)."
    },
    {
      question: "Can I use Docker Compose in production?",
      answer: "Docker Compose works for small production deployments (single-server apps, staging environments), but Kubernetes, Docker Swarm, or ECS are better for multi-server production. Compose lacks advanced orchestration like rolling updates, automatic failover, and multi-host networking. For production, use Compose for local development, then deploy the same images to orchestration platforms."
    },
    {
      question: "How do I troubleshoot Compose startup failures?",
      answer: "Run 'docker-compose logs service-name' to see service-specific logs. Check 'docker-compose ps' for container status. Validate YAML syntax with 'docker-compose config'. Common issues: port conflicts (check ports with 'netstat -tuln'), volume permission errors (check ownership), missing environment variables (check .env files), or image pull failures (check Docker Hub connectivity or credentials)."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your Docker configuration never leaves your browser. This Compose generator operates entirely client-side using JavaScript YAML generation in your web browser. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Processing:** All docker-compose.yml generation happens in your browser's JavaScript engine. Your configuration stays on your device.
- **No Server Uploads:** We don't have servers to process Docker configs. The tool works completely offline after first load.
- **No Data Storage:** Your configuration is not saved, logged, or stored anywhere. Refresh the page and it's gone (unless you save it locally).
- **No Analytics Tracking:** We don't track what services you configure, how often you use the tool, or any configuration-specific analytics.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect the Network tab in browser DevTools - zero outbound requests containing your data.

This makes the generator safe for sensitive use cases like proprietary microservices architectures, database configurations with schema names, internal service topologies, or any setup that must remain confidential. Use with confidence for commercial projects, client work, or confidential development environments.

### Security Best Practices

Never commit secrets (passwords, API keys, tokens) directly in docker-compose.yml. Use .env files with .gitignore, environment variable injection from CI/CD systems, or Docker Secrets for Swarm deployments. Scan Docker images for vulnerabilities using tools like Trivy or Snyk. Keep images updated to latest stable versions for security patches. Use read-only file systems (read_only: true) where possible. Drop unnecessary capabilities to reduce attack surface. Implement network segmentation for services that shouldn't communicate directly.`
  },

  stats: {
    "Services": "20+",
    "Processing": "<50ms",
    "Version": "3.8",
    "Privacy": "100%"
  }
};
