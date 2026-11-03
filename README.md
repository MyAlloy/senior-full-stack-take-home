# Senior Full-Stack Take-Home

Starter for the Alloy full-stack take-home. It is the smallest thing that runs end to end: an Express API with a Knex connection to Postgres, a React app that calls it, and a Postgres container. Everything else is yours to decide. The project brief is sent to you separately.

## Getting started

1. **Create your own private repo from this template.** Click **Use this template → Create a new repository** at the top of this page and set visibility to **Private**. Don't fork; forks of a public repo are public.
2. Clone your new repo and start everything in Docker:

   ```sh
   docker compose up --build    # Postgres, API on :4000, web on :5173
   ```

   Docker is the only thing to install. Dependencies install and run inside the container, and only the repo folder is shared with it. Ports listen on localhost only.

3. Open http://localhost:5173. You should see the API and database reporting ok.

Run commands inside the container with `docker compose exec app <command>`, for example `docker compose exec app pnpm migrate`. If you add a dependency, run `docker compose up --build` again.

To run without Docker for the apps, use Node 22 (`nvm use`), then run `corepack enable`, `pnpm install`, `pnpm db:up`, and `pnpm dev`. Postgres still runs in Docker on host port 5433.

Postgres defaults are in `docker-compose.yml` and match the API's fallback connection string, so `.env` is optional. Copy `.env.example` to `.env` if you need to change ports or add API keys.

## Layout

```
apps/api   Express + TypeScript + Knex. One route, GET /health, which runs SELECT 1.
apps/web   Vite + React + TypeScript. One component that fetches /api/health.
```

`apps/web` proxies `/api/*` to the API in development, so fetch from `/api/...` and you won't need CORS.

### Useful scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Runs both apps in watch mode |
| `pnpm test` | Runs every package's tests (currently the API's health-route test) |
| `pnpm typecheck` | `tsc --noEmit` in both packages |
| `pnpm migrate` | Applies Knex migrations from `apps/api/migrations` |
| `pnpm --filter api migrate:make <name>` | Creates a new migration file |
| `pnpm db:down` | Stops Postgres (data persists in a named volume) |

## What's deliberately not here

No linter or formatter config, no routing or data-fetching library on the frontend, no service layer or error handling on the backend, no agent configuration files, no CI. Add what you'd add on a real project; restructure anything you like.

## Submitting

Push to your private repo and add the GitHub usernames we send you as collaborators. We'll read the commit history from the template's initial commit forward, so commit the way you would on a team.
