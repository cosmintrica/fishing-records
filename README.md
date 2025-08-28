# FishLog — Romania & Black Sea Fishing Records

A modern web app for logging catches, leaderboards, waterbodies, and species across Romania and the Black Sea. Built as a Vite + React SPA with an Express API (deployed as Vercel Serverless Functions).

---

## ✨ Features

* Catch records with photos & metadata
* Waterbodies (Dunărea, Olt, etc.) and species catalog
* Leaderboards & verification flow
* User auth (Firebase) and user profiles stored securely in Firestore
* Map view for locations (Leaflet)

## 🧱 Tech Stack

* **Frontend:** Vite, React, TypeScript
* **API:** Express mounted in **`/api`** (serverless on Vercel)
* **Auth & DB:** Firebase Auth + Firestore (client) / Firebase Admin (API)
* **Maps:** Leaflet via `react-leaflet`
* **Deploy:** Vercel (zero-config via `vercel.json`)

## 🗂️ Project Structure

```
root/
├─ api/                    # Vercel Serverless Functions
│  ├─ index.ts             # Express app entry (mounted by Vercel)
│  ├─ firebaseAdmin.ts     # Firebase Admin init (server-only)
│  ├─ middleware/
│  │  └─ auth.ts           # Verify Firebase ID token middleware
│  └─ routes/
│     └─ profile.ts        # Example protected route (CRUD user profile)
├─ client/
│  ├─ src/
│  │  ├─ main.tsx
│  │  ├─ App.tsx
│  │  ├─ lib/
│  │  │  └─ firebase.ts    # Firebase Client SDK init (browser)
│  │  ├─ components/
│  │  │  ├─ auth/
│  │  │  │  ├─ LoginForm.tsx
│  │  │  │  └─ SignUpForm.tsx
│  │  │  └─ Map.tsx         # Leaflet map component
│  │  └─ styles/
│  │     └─ map.css         # Map height and visual fixes
│  └─ index.html
├─ shared/                  # Shared TS types/interfaces
├─ vercel.json              # Build & routing config
├─ package.json
└─ README.md
```

> Note: Some files are added by the Firebase integration; if they don't exist in your repo yet, create them using the snippets below.

## 🔐 Environment Variables

### Client (Vite) — `.env.local`

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
```

### Server (Vercel Project Settings → Environment Variables)

```
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

> Keep `PRIVATE_KEY` escaped (with `\n`). On local dev you can put it in `.env` as a single line with `\n` newlines.

## 🚀 Local Development

```bash
npm i
npm run dev           # Vite dev server (frontend) + API proxy

npm run build         # Production build (client → dist/public)
npm start             # Serve built client and API locally
```

## 🧭 Deployment (Vercel)

1. Push to GitHub.
2. Import repo in Vercel → **New Project**.
3. Add the server env vars above (Production/Preview/Development as needed).
4. Deploy. The SPA is served from `dist/public`, API under `/api/*`.

## 🔑 Firebase Setup

1. Create a Firebase project → Enable **Authentication** (Email/Password, optionally Google).
2. Create a **Web App** and copy client config into `.env.local` (`VITE_FIREBASE_*`).
3. Create a **Service Account** (Project → Settings → Service Accounts) and add its credentials in Vercel as `FIREBASE_*`.
4. Create **Firestore** in **Native mode**.

### Security Rules (minimal example)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, update, delete: if request.auth != null && request.auth.uid == uid;
      allow create: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## 🧩 API Endpoints (sample)

* `GET /api/profile` → returns the authenticated user's profile (Firestore: `users/{uid}`)
* `PUT /api/profile` → upserts profile

All protected routes require an `Authorization: Bearer <Firebase ID Token>` header.

## 🗺️ Maps

* Uses Leaflet via `react-leaflet`.
* Ensure `leaflet/dist/leaflet.css` is imported (e.g., in `main.tsx`).
* Map container **must have explicit height** (see `styles/map.css`).
* Fix default marker icons (Vite bundling) — see `Map.tsx` snippet.

## 🧰 Troubleshooting

* **Map not visible:** container height is 0, CSS not imported, or missing token/tiles.
* **401 from API:** missing/expired Firebase ID token in `Authorization` header.
* **Admin private key:** must contain `\n` line breaks in env var.
* **Cold starts:** first API call after idle may be slower on serverless.

---

## 📄 License

MIT
