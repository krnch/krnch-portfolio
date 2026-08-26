# Deploy "Ask Karan" Chatbot — Step-by-Step

## Prerequisites
- Node.js 18+ installed
- A Cloudflare account (free tier works fine)
- A free Gemini API key from Google AI Studio

---

## Step 1 — Create a Cloudflare Account

Go to [cloudflare.com](https://cloudflare.com) and sign up for a free account.
No credit card required for Workers (free tier: 100,000 requests/day).

---

## Step 2 — Install Wrangler (Cloudflare CLI)

```bash
npm install -g wrangler
```

Verify:
```bash
wrangler --version
```

---

## Step 3 — Log in to Cloudflare

```bash
wrangler login
```

This opens a browser window. Authorize Wrangler in your Cloudflare account.

---

## Step 4 — Get a Free Gemini API Key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API key** → **Create API key**
4. Copy the key (starts with `AIza...`)

The free tier includes generous limits (more than enough for a personal portfolio).

---

## Step 5 — Set the Gemini API Key as a Secret

```bash
cd /path/to/krnch-chatbot
wrangler secret put GEMINI_API_KEY
```

Paste your API key when prompted. This stores it securely in Cloudflare — it will **never** appear in your code or wrangler.toml.

---

## Step 6 — Deploy the Worker

```bash
wrangler deploy
```

You'll see output like:
```
✅ Successfully published your script to
   https://krnch-chatbot.YOUR-ACCOUNT-SUBDOMAIN.workers.dev
```

Copy that URL — you'll need it next.

---

## Step 7 — Update the Chat Widget URL

Open `chat-widget.html` and find this line near the top of the `<script>`:

```js
const WORKER_URL = "https://krnch-chatbot.ACCOUNT.workers.dev";
```

Replace `ACCOUNT` with your actual Cloudflare account subdomain from Step 6.

Example:
```js
const WORKER_URL = "https://krnch-chatbot.karan-xyz.workers.dev";
```

---

## Step 8 — Embed the Widget in Your Site

Open `chat-widget.html` and copy everything between the two comment markers:
```
<!-- ══ PASTE EVERYTHING BELOW ══ -->
...
<!-- ══ END OF CHAT WIDGET ══ -->
```

Paste it into your `index.html` just before the closing `</body>` tag.

That's it — the widget is self-contained (no npm, no build step).

---

## Step 9 — Redeploy Your Portfolio Site

Push your updated `index.html` to wherever you host krnch.me
(GitHub Pages, Cloudflare Pages, Netlify, etc.)

---

## Step 10 — (Optional) Point krnch.me DNS to Cloudflare

If you want the `/api/chat` endpoint on your own domain instead of `workers.dev`:

1. In the Cloudflare dashboard, add `krnch.me` as a site
2. Update your domain's nameservers to Cloudflare's (your registrar settings)
3. In Workers & Pages → your worker → Settings → Triggers → Add Custom Domain
4. Add `api.krnch.me` or configure a route like `krnch.me/api/*`
5. Update `WORKER_URL` in the widget to your custom domain

---

## Updating the Knowledge Base

The knowledge base lives in two places:

1. **`knowledge.md`** — the human-readable version. Update this file to add new info.
2. **`worker.js`** — the `KNOWLEDGE_BASE` const near the top mirrors the knowledge base content. When you update `knowledge.md`, also update the `KNOWLEDGE_BASE` const in `worker.js`, then redeploy:

```bash
wrangler deploy
```

### Quick update workflow:
```bash
# Edit worker.js to update KNOWLEDGE_BASE...
wrangler deploy
# Done — live in seconds
```

---

## Testing the Worker Locally

```bash
wrangler dev
```

This starts a local server at `http://localhost:8787`. Test with:

```bash
curl -X POST http://localhost:8787/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What does Karan do at Microsoft?"}'
```

Note: You'll need to set the secret locally too:
```bash
# In .dev.vars file (git-ignored):
echo 'GEMINI_API_KEY=your-key-here' > .dev.vars
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `wrangler: command not found` | Run `npm install -g wrangler` again |
| `Error: Missing GEMINI_API_KEY` | Run `wrangler secret put GEMINI_API_KEY` |
| CORS errors in browser | Check `ALLOWED_ORIGIN` in `wrangler.toml` matches your domain exactly |
| Widget not appearing | Check browser console for JS errors; verify `WORKER_URL` is set |
| `502 Bad Gateway` from worker | Check Cloudflare Worker logs in dashboard → Workers → your worker → Logs |
| Rate limit hit | Session limit is 20 messages; refresh page to reset |

---

## File Reference

| File | Purpose |
|------|---------|
| `worker.js` | Cloudflare Worker — handles API, calls Gemini |
| `wrangler.toml` | Worker config (name, vars) |
| `knowledge.md` | Human-readable knowledge base (update this) |
| `chat-widget.html` | Self-contained chat UI — copy into index.html |
| `DEPLOY.md` | This file |
