# krnch.me — Readiness Checklist

## ✅ Done (by Manager, $0, no accounts)
- [x] GA no longer sends broken calls — analytics only loads when a real GA_ID is
      set in `index.html` (was hardcoded `G-PLACEHOLDER`, firing broken requests).
- [x] `CNAME` added (krnch.me) for GitHub Pages custom domain.
- [x] `.github/workflows/pages.yml` — push to `main` auto-deploys the static site.
- [x] `README.md` documenting structure + deploy.

## 🔒 Needs Karan (identity / accounts / personal data)
- [ ] **Enable GitHub Pages**: repo Settings → Pages → Source = "GitHub Actions".
- [ ] **Point DNS**: at your domain registrar, set krnch.me → GitHub Pages
      (A records 185.199.108–111.153, or CNAME to krnch.github.io). GitHub's
      "custom domain" docs have the exact values.
- [ ] **(optional) Google Analytics**: create a GA4 property, paste the
      `G-XXXXXXXXXX` id into `window.GA_ID` in `index.html`.
- [ ] **Chatbot "Ask Karan"** (separate Cloudflare Worker — see `chatbot/DEPLOY.md`):
      needs a free Cloudflare account + a Gemini API key, then `wrangler deploy`.
      Until deployed, the widget just won't appear — the site works fine without it.
- [ ] **Fill personal data** in `chatbot/knowledge.md` (countries/states visited,
      Strava stats, favorite destination) — currently TODO. The AI skips blank
      fields gracefully, so this is optional polish.
- [ ] **Hobby-project screenshots** in `hobby.html` (currently "Screenshots coming
      soon" for VM Manager, AI Video Analyzer, Livesite Triage, AI Engineering
      Workflows). Add real screenshots when ready.

## Fastest path to "live"
1. Push this repo → 2. Settings→Pages→Source=GitHub Actions → 3. Point krnch.me DNS.
That gets the portfolio live at krnch.me in minutes. Chatbot + analytics + screenshots
are optional enhancements you can add anytime after.
