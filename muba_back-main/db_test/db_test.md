# Test Database Setup

This guide explains how to set up a test PostgreSQL database using Docker for development and testing.

---

## Prerequisites

- **Docker** installed and running
- **Node.js 18+** installed
- **npm** or **pnpm** package manager

---

## Quick Start

### 1. Start the Test Database

```bash
pnpm run db:test:up
```

Or with npm: `npm run db:test:up`. Or manually:

```bash
docker-compose -f db_test/docker-compose.yml up -d
```

This will start:
- PostgreSQL 15 (port 5432)
- Redis 7 (port 6379)
- Adminer (port 8080) - Web-based database management

### 2. Apply Schema and Seed (recommended)

Use the full setup script (recommended):

```bash
pnpm run db:test:setup
```

Or with npm:

```bash
npm run db:test:setup
```

This command:
1. Starts the Docker containers
2. Waits 3 seconds for PostgreSQL to be ready
3. **Generates the Prisma client** (`prisma generate`) — required before push/seed
4. Pushes the schema to the database (`prisma db push`)
5. Seeds the database with test data

You can also push the schema only (no seed):

```bash
pnpm run prisma:generate
pnpm run prisma:push
```

### 3. Seed Test Data (optional, after generate)

To seed after a previous setup:

```bash
pnpm run db:test:seed
```

**Note:** Run `pnpm run prisma:generate` at least once before seeding, or use full setup above. The seed script requires the generated Prisma client.

This creates:
- 2 Buildings (Edificio Principal, Edificio Anexo)
- 3 Floors
- 4 Sectors
- 5 Rooms (Habitaciones)
- 9 Beds (Camas) - various states (Disponible, Ocupada, EnLimpieza)
- 3 Roles (Administrador, Enfermero, Usuario)
- 2 Users:
  - `admin@muba.com` / `password123`
  - `enfermero@muba.com` / `password123`
- 3 Financiadores (OSDE, Swiss Medical, IOMA)
- 4 Plans
- 3 Residents (various states)

---

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm run db:test:up` | Start PostgreSQL, Redis & Adminer containers |
| `pnpm run db:test:down` | Stop and remove containers |
| `pnpm run prisma:generate` | Generate Prisma client (run before seed if not using full setup) |
| `pnpm run prisma:push` | Push schema to DB (no migrations) |
| `pnpm run db:test:seed` | Seed database with test data |
| `pnpm run db:test:setup` | Full setup: up → generate → push → seed |

Use `npm run` instead of `pnpm run` if you use npm. You may see npm env warnings when scripts call npm; they can be ignored.

### CLI Alternatives

```bash
# Start containers
docker-compose -f db_test/docker-compose.yml up -d

# Stop containers
docker-compose -f db_test/docker-compose.yml down

# View logs
docker-compose -f db_test/docker-compose.yml logs -f

# Reset database (delete volumes)
docker-compose -f db_test/docker-compose.yml down -v
```

---

## Environment Variables

The test database uses `.env.example`:

```bash
DATABASE_URL="postgresql://muba_user:muba_pass@localhost:5432/muba_test?schema=public"
REDIS_URL="redis://localhost:6379"
PORT=8081
NODE_ENV=test
```

---

## Container Management

### Using Scripts (Recommended)
```bash
pnpm run db:test:up      # Start containers
pnpm run db:test:down    # Stop containers
pnpm run db:test:setup   # Full setup: up + generate + push + seed
```

### Using CLI

#### Start containers
```bash
docker-compose -f db_test/docker-compose.yml up -d
```

#### Stop containers
```bash
docker-compose -f db_test/docker-compose.yml down
```

#### View logs
```bash
docker-compose -f db_test/docker-compose.yml logs -f
```

#### Reset database (delete volumes)
```bash
docker-compose -f db_test/docker-compose.yml down -v
```

---

## Connect to Test Database

### Using psql
```bash
docker exec -it muba_postgres_test psql -U muba_user -d muba_test
```

### Using Prisma Studio
```bash
dotenv -e .env.example -- npx prisma studio
```

### Using Adminer
Open http://localhost:8080

| Field | Value |
|-------|-------|
| System | PostgreSQL |
| Server | postgres |
| Username | muba_user |
| Password | muba_pass |
| Database | muba_test |

---

## Troubleshooting

### Database connection refused
Make sure Docker is running:
```bash
docker ps
```

### Permission denied
Check that the db_test directory has proper permissions:
```bash
chmod +x db_test/seed.mjs
```

### Cannot find module '.prisma/client/default'
The generated Prisma client is missing. Generate it before running the seed:
```bash
pnpm run prisma:generate
```
Then run `pnpm run db:test:seed` again. Using `pnpm run db:test:setup` runs generate automatically.

### Named export 'PrismaClient' not found (ESM)
In ESM projects (`"type": "module"`), `@prisma/client` is consumed as CommonJS. Use the default import and destructure:
```javascript
import pkg from '@prisma/client'
const { PrismaClient } = pkg
import { PrismaPg } from '@prisma/adapter-pg'
```
Do not use `import { PrismaClient } from '@prisma/client'` in this setup.

### Error [ERR_REQUIRE_ESM] with zeptomatch / @prisma/dev
If `prisma db push` or `prisma generate` fails with `require() of ES Module ... zeptomatch ... from @prisma/dev`, this is a known Prisma 7.x tooling issue on some Node versions. Options:
- Use **Node 20+ or 24** (often resolves it).
- Or **downgrade** to Prisma 6.x (`prisma`, `@prisma/client`, `@prisma/adapter-pg`) if you need a stable CLI on Node 18.

### Docker Compose "version is obsolete" warning
The warning about the `version` attribute in `docker-compose.yml` is harmless. To remove it, delete the top-level `version:` line from `db_test/docker-compose.yml`.

### Prisma client not generated (general)
Always run generate after changing the schema or cloning the project:
```bash
pnpm run prisma:generate
```

---

## Cleaning Up

To completely remove the test database and containers:

```bash
npm run db:test:down
docker volume rm muba_back_postgres_test_data
docker volume rm muba_back_redis_test_data
```
