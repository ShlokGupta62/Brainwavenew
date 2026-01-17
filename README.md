# LogiHub (MLH Demo)

LogiHub is a logistics platform demo with a static, multi-role UI (Home/Customer + Manager) and serverless APIs on Vercel.

## What’s “real value” AI + DB here?

- **MongoDB (Mongoose)** stores durable logistics state (users, shipments, orders, vehicles) and powers dashboard **aggregations**.
- **Google Gemini** is used only where it scales: turning operational context into **recommendations + explanations**.
- **MongoDB caching** (`AIInsight`) reduces repeated Gemini calls for the same context.

## Key Features (Demo)

- Customer booking flow:
  - Shipment recommendations
  - Route/delay insights
  - ETA/delay explainability (after booking)
- Customer support chatbot (with graceful fallback)
- Manager dashboard:
  - AI decision intelligence brief
  - Demand forecasting summary (uses MongoDB aggregates when available)

## Architecture

- UI: static HTML/CSS/JS (root pages + role folders)
- Backend: Vercel serverless functions in `api/`
  - Auth: `api/auth/login.js`, `api/auth/signup.js`
  - Shipments: `api/shipments/create.js`
  - AI: `api/ai/insight.js` (Gemini + Mongo cache)
  - Chat summaries: `api/chat-summaries.js`
  - Manager dashboard: `api/dashboard/manager.js`
- Models: `api/_models/*` (Mongoose schemas + indexes)
- Shared libs: `api/_lib/*` (DB connection, JWT, prompt templates, cache keys)

## Setup

1) Install

```bash
npm install
```

2) Configure environment

Create `.env` from `.env.example`:

- `MONGODB_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`

Important: do **not** hardcode API keys in source.

3) Run locally

Recommended (runs UI + serverless API locally):

```bash
npx vercel dev
```

Static UI only (no backend APIs):

```bash
npm run dev
```

## Deployment

- Deploy to Vercel.
- Set `MONGODB_URI`, `JWT_SECRET`, `GEMINI_API_KEY` in Vercel Project Settings.

## Notes

- If Gemini isn’t configured or fails, the UI falls back to safe, contextual responses.
- AI outputs are cached in MongoDB to keep demos fast and costs low.
