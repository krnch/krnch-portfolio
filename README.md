# krnch.me — Personal Portfolio

Static personal portfolio for Karan Chaudhari + an "Ask Karan" AI chatbot
(Cloudflare Worker + Gemini). Deploys as a static site (GitHub Pages) with the
chatbot as a separate Cloudflare Worker.

## Files
- `index.html` — main portfolio (experience, projects, hobby projects, skills, education, contact)
- `hobby.html` — hobby projects detail page
- `admin.html` — content admin panel
- `resume.pdf` — downloadable resume
- `chatbot/` — "Ask Karan" AI widget (Cloudflare Worker; see `chatbot/DEPLOY.md`)
- `CNAME` — custom domain (krnch.me)

## Deploy (GitHub Pages)
Pushing to `main` auto-deploys via `.github/workflows/pages.yml`. Then in GitHub:
Settings → Pages → Source: GitHub Actions. Point the `krnch.me` DNS (A/CNAME) at
GitHub Pages per GitHub's custom-domain docs.

## Readiness checklist
See `READINESS.md` for exactly what's done vs. what needs Karan (personal data,
accounts, DNS).
