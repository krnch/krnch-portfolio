# krnch.me — Personal Portfolio

Static personal portfolio for Karan Chaudhari, hosted on **Azure Static Web Apps**.

- Azure app: `krnch-portfolio`
- Resource group: `piu-portfolio-website`
- Current Azure URL: https://green-pebble-099281a10.7.azurestaticapps.net
- Intended custom domains: `krnch.me` and `www.krnch.me`
- Source branch: `main`

## Files

- `index.html` — main portfolio
- `hobby.html` — hobby-project detail page
- `admin.html` — **local-only prototype**, not a secure admin application
- `resume.pdf` — downloadable resume
- `chatbot/` — planned Cloudflare Worker + Gemini chatbot
- `DOMAIN-CUTOVER.md` — Namecheap-to-Azure DNS and SSL runbook
- `READINESS.md` — authoritative completed/pending checklist

## Deployment

Deployments currently use Azure Static Web Apps CLI and the Azure deployment token. GitHub Pages configuration is intentionally absent so it cannot compete for the `krnch.me` custom domain.

```bash
TOKEN=$(az staticwebapp secrets list \
  --name krnch-portfolio \
  --resource-group piu-portfolio-website \
  --query properties.apiKey -o tsv)

npx @azure/static-web-apps-cli deploy . \
  --deployment-token "$TOKEN" \
  --env production
```

Never commit the deployment token.

## Custom domain

Follow [`DOMAIN-CUTOVER.md`](DOMAIN-CUTOVER.md). DNS changes happen in Namecheap and Azure, not in this repository. Azure provisions and renews TLS after both domains validate.
