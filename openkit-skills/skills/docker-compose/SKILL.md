---
name: docker-compose
description: Generate Docker Compose YAML from service parameters. Use when the user asks to generate a docker-compose.yml, create a Docker Compose configuration, set up Docker services, or compose containers for nginx, mysql, postgres, redis, mongodb, node, or python.
---

# Docker Compose Generator

Generate a valid `docker-compose.yml` file for one or more services with correct image tags, port mappings, volume mounts, environment variables, and restart policy.

## Input
- List of services to include (nginx, mysql, postgres, redis, mongodb, node, python)
- Optional custom port mappings (host:container) per service
- Optional volume mappings per service

## Output
- A complete `docker-compose.yml` in YAML format, ready to run with `docker-compose up -d`

## Instructions
1. Parse which services the user wants. Accepted values: `nginx`, `mysql`, `postgres`, `redis`, `mongodb`, `node`, `python`.
2. For each selected service, emit a YAML block using the defaults below. Apply any user-specified port or volume overrides.
3. Always include `restart: unless-stopped` for every service.
4. Assemble the full file starting with `version: '3.8'` and a `services:` key.
5. Return only the YAML — no markdown fences unless the user is in a chat context where code blocks aid readability.

### Service defaults

| Service    | Image              | Default port   | Default volume                               | Environment variables |
|------------|--------------------|----------------|----------------------------------------------|-----------------------|
| nginx      | nginx:alpine       | "80:80"        | ./nginx.conf:/etc/nginx/nginx.conf:ro        | —                     |
| mysql      | mysql:8            | "3306:3306"    | ./mysql-data:/var/lib/mysql                  | MYSQL_ROOT_PASSWORD=root, MYSQL_DATABASE=mydb |
| postgres   | postgres:16-alpine | "5432:5432"    | ./postgres-data:/var/lib/postgresql/data     | POSTGRES_PASSWORD=postgres, POSTGRES_DB=mydb |
| redis      | redis:alpine       | "6379:6379"    | ./redis-data:/data                           | —                     |
| mongodb    | mongo:7            | "27017:27017"  | ./mongo-data:/data/db                        | MONGO_INITDB_ROOT_USERNAME=admin, MONGO_INITDB_ROOT_PASSWORD=admin |
| node       | node:20-alpine     | "3000:3000"    | ./app:/app                                   | —                     |
| python     | python:3.12-slim   | "8000:8000"    | ./app:/app                                   | —                     |

### YAML block structure per service
```yaml
  <service-id>:
    image: <image>
    container_name: <service-id>
    ports:
      - "<port-mapping>"
    volumes:
      - <volume-mapping>
    environment:
      KEY: value
    restart: unless-stopped
```

## Options
- `services` — comma-separated list of service IDs (required)
- `port_<service>` — override port mapping for a specific service (e.g. `port_nginx=8080:80`)
- `volume_<service>` — override volume mapping for a specific service

## Examples

**Input:** nginx, postgres, redis

**Output:**
```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    container_name: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    restart: unless-stopped

  postgres:
    image: postgres:16-alpine
    container_name: postgres
    ports:
      - "5432:5432"
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    restart: unless-stopped

  redis:
    image: redis:alpine
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - ./redis-data:/data
    restart: unless-stopped
```

## Error Handling
- If the user requests an unsupported service name, say so and list the supported services.
- If no services are specified, ask the user which services they need.
- If a port override has an invalid format, use the default and note the issue.
