## G4MR - A Better Gaming Recommendation Engine

**G4MR** is a powerful, proprietary recommendation engine designed to help gamers discover their next favorite title.

This repository is a monorepo containing both the frontend and backend components of the web application. The frontend is built with React and Vite, while the backend is built with NestJS.

### Stack

Frontend - React, Vite, Mantine
Backend - NestJS, Drizzle, PostgreSQL, Powered by IGDB

![G4MR Marquee](README/images/g4mr_marquee.png)

- Yarn Berry (v4)
- Node.js
- nvm (optional)

### Run with Docker

Install Docker Engine / Docker Desktop with Docker Compose, then from the repository root:

```bash
cp .env.example .env
# Edit .env with your Twitch/IGDB and Steam credentials and random auth secrets.
docker compose up --build -d
```

If `.env` already exists, retain it and add any missing settings from `.env.example`.
Open http://localhost:4467. The frontend serves compiled assets through Nginx and
proxies API requests to the backend. PostgreSQL must pass its health check,
and the migration service must finish successfully, before the backend starts.
Existing checked-in migrations run at startup; image builds do not generate migrations.

`FRONTEND_PORT` controls the browser port; `PORT` controls the direct API port
(default 4468). Set `PUBLIC_URL` to the browser-visible origin when changing the
frontend port or hostname so Steam authentication returns to the same session.
Compose overrides database host and internal ports; local `.env` values
can remain `localhost`. The database host port binds only to loopback.
Use strong database, JWT, and session secrets for a shared deployment.

```bash
docker compose ps
docker compose logs -f backend migrate
docker compose down
```

Database data and login sessions persist in the PostgreSQL named volume after `down`. `docker compose down -v`
permanently removes that data. Existing database volumes retain their original database
credentials; editing `.env` does not change credentials stored in PostgreSQL.
Rebuild with `docker compose up --build -d` after source changes.

### Optional Cloudflare Tunnel

The `cloudflared` service is excluded from normal startup. To enable it, create a
[remotely managed Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/get-started/)
and set `CLOUDFLARE_TUNNEL_TOKEN` in `.env` to its connector token.
Configure the tunnel's public hostname to use HTTP service `http://webhooks:7331`,
then set `PUBLIC_URL` in `.env` to that hostname's HTTPS origin (for example,
`https://hooks.example.com`) so IGDB registration uses the public callback URL.
`PUBLIC_URL` is also used for Steam authentication; a webhook-only hostname is
intended for running the receiver, not browser sign-in.

```bash
docker compose --profile tunnel up --build -d cloudflared
docker compose logs -f cloudflared
```

This starts the tunnel, webhook receiver, database, and migrations. The tunnel
connects over the Compose network and needs no additional published ports.
Register the IGDB webhooks separately using the command below once the tunnel is running.
To stop just the tunnel, run `docker compose stop cloudflared`.

### Populate game data

The initial database contains the schema but no game catalog. With valid Twitch/IGDB
and Steam credentials, run the existing seed job explicitly:

```bash
docker compose --profile seed run --build --rm seed
```

The `seed` service is excluded from normal startup and waits for migrations to finish.
The command above runs it once and removes the job container afterward.

### IGDB webhooks

The webhook receiver starts with the rest of the stack on port 7331. Webhook registration is separate: review the
public callback URL and secret in
`backend/src/infrastructure/igdb/db/webhooks/webhooks.ts` before registering with IGDB.
The callback must be reachable by IGDB at `PUBLIC_URL/igdb/...`. The registration
service is excluded from normal startup and starts the receiver as a dependency.
The existing script replaces registered IGDB webhooks. To run it once:

```bash
docker compose --profile register-webhooks run --build --rm register-webhooks
```

### Local development

Use Node.js 22 and the pinned Yarn version via Corepack:

```bash
corepack enable
yarn install --immutable
docker compose up -d db
yarn backend:migrate
yarn dev
```

Keep local `DB_HOST` set to `localhost`, and `PORT=4468`.
Vite proxies API requests to `http://localhost:4468`; set `API_PROXY_TARGET` in the
shell to override that target. Stop containerized frontend/backend services before
running local servers on the same ports.

```bash
yarn build                       # Build both workspaces
yarn workspace @g4mr/frontend build
yarn workspace @g4mr/backend build
```

The Dockerfile provides separate `frontend` and `backend` targets. The backend
runs as the unprivileged Node user and retains the tools used by the existing
migration/seed jobs. Environment files, local dependencies, and build output
are excluded from the Docker build context.

### Session storage

Login sessions are stored in PostgreSQL's `sessions` table, created by migration
`0009_postgres_sessions`. Sessions expire after 24 hours of inactivity, with
expired rows cleaned up approximately every 15 minutes while the backend runs.
Browser-session cookie behavior is unchanged. The store uses `connect-pg-simple`.

When upgrading from Redis, users must sign in again. Run
`docker compose up --build -d --remove-orphans` to apply migrations and remove
the old Redis container. Its old volume is left intact; no Redis settings are needed.
