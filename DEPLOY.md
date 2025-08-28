# Deploying to Vercel

These steps assume you will push this repo to GitHub and connect it to Vercel.

## What I changed

- Removed all platform-specific files and dev-only plugins (configuration files and dev banner).
- Added `api/index.ts` as a Vercel Serverless Function that mounts the existing Express API (`server/routes.ts`).
- Added `vercel.json` to (a) run `npm run build`, (b) publish the Vite build from `dist/public`, and (c) route `/api/*` to the API function and everything else to the SPA `index.html`.
- Left your local dev/prod server intact. `npm run dev` still uses Vite + Express; `npm run build` compiles the client and bundles the server (the server bundle is unused on Vercel but handy locally).

## One-time Vercel setup

1. Push this project to **GitHub** (public or private).
2. In **Vercel** → **New Project** → Import the GitHub repo.
3. It will detect "Other / Static". Leave defaults, because `vercel.json` instructs Vercel to:
   - run `npm install` and **`npm run build`**
   - serve static files from `dist/public`
   - expose the API at `/api/*` via the serverless function.

No environment variables are required for the current in-memory storage. If you later use the Drizzle `DATABASE_URL`, add it in **Project Settings → Environment Variables** and remove the in-memory storage.

## Local commands

```bash
npm i
npm run dev      # Vite + Express (development)
npm run build    # Builds client to dist/public, bundles server to dist/index.js
npm start        # Runs the Node server locally (serves dist/public)
```

## Notes

- On Vercel, **do not** run `npm start`. Vercel will serve the static build and route `/api/*` to the serverless function.
- The serverless runtime is stateless; any in-memory data will reset between deployments and periods of inactivity. For persistence, plug in a DB later.
