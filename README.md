# MKN Developments — web + CMS (Step 1 scaffold)

## Requirements

- Node.js ≥ 20.9
- PostgreSQL (local or hosted)

## Database

Example connection string (matches `.env.example`):

`postgresql://mkn:mkn@localhost:5432/mkn?schema=public`

With Docker: `docker compose up -d`, then create `.env` from `.env.example`, then:

```bash
npm run db:migrate
```

Prisma **7** uses the [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/postgresql) driver adapter (`src/lib/prisma.ts`). Ensure `DATABASE_URL` is set for all commands that open a DB connection.

The initial migration is committed under `prisma/migrations/`. On a fresh server you can run:

```bash
npx prisma migrate deploy
```

## Environment

Copy `.env.example` to `.env` and set `DATABASE_URL`. Optional: `NEXT_PUBLIC_IMAGE_ALLOWLIST` for additional `next/image` remote hosts (comma-separated hostnames, HTTPS). `NEXT_PUBLIC_HERO_VIDEO_URL` defaults to the MKN hero MP4 in code and in the example file.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run db:generate` — `prisma generate`
- `npm run db:migrate` — `prisma migrate dev` (needs local Postgres)
- `npm run db:push` — `prisma db push` (prototyping only)
# mkn2
