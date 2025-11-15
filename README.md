# Quack — Rate your housing (Hackathon starter)

Quick starter React app (Vite) using Tailwind via CDN for rapid styling. Includes a tiny OpenRouter helper to demo using your $10 credit. Keep secrets out of the frontend in production.

Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Create a local .env from the example if you want to use OpenRouter features:

   ```bash
   cp .env.example .env
   # edit .env and paste your VITE_OPENROUTER_KEY
   ```

   Note: In Vite, variables prefixed with VITE_ are embedded into the client bundle at build time.

3. Run the dev server

   ```bash
   # start only the frontend
   npm run dev

   # or run the server proxy (see below) in a separate terminal:
   npm run server

   # to start both in parallel (needs dev dependency npm-run-all):
   npm start
   ```

4. Open http://localhost:5173 (Vite default) and try adding a rating.

OpenRouter usage and your $10 credits

- You received $10 in credits for OpenRouter. The minimal example in `src/utils/openrouter.js` supports two modes:

   1. Direct client mode: set `VITE_OPENROUTER_KEY` in the project root `.env` and the frontend will call OpenRouter directly. This is quick but exposes the key.
   2. Proxy mode (recommended): put your API key in `server/.env` as `OPENROUTER_KEY` and set `VITE_OPENROUTER_PROXY=true` in the client `.env` (or use the provided `.env.example`). Then run `npm run server` and the frontend will POST to `/api/openrouter` which forwards the request server-side.

   Monitor usage and quotas in the OpenRouter dashboard to avoid unexpected charges.

VS Code live collaboration

- Install the Live Share extension (or Live Share extension pack) in VS Code.
- Start a Live Share session and invite your partner. They can join and you'll both edit in real-time.

Next steps (ideas)

- Add persistence (localStorage, Firebase, or a tiny backend) so ratings survive reloads.
- Add authentication (GitHub/Google) to attribute ratings.
- Improve the OpenRouter integration to generate summaries, tag listings, or moderate content.
