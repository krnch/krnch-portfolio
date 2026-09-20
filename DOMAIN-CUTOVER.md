# krnch.me Namecheap → Azure SSL cutover

## Why Safari currently warns

As verified on 2026-09-20:

- `krnch.me` resolves to old GitHub Pages IPs `192.30.252.153` and `192.30.252.154`.
- `www.krnch.me` is a CNAME to `krnch.github.io`.
- The certificate served for `krnch.me` is issued to `*.github.com`, not `krnch.me`.
- The old `krnch/webpage` repository still claims `krnch.me`; HTTPS enforcement is disabled.
- Azure Static Web App `krnch-portfolio` has no custom domains yet.

This is a DNS/hosting mismatch. Buying another domain or moving the registration to GoDaddy does not fix it. Until cutover completes, use **Go Back** on browser certificate warnings; do not bypass them.

## Target

- Static site: `green-pebble-099281a10.7.azurestaticapps.net`
- Public names: `https://krnch.me` and `https://www.krnch.me`
- TLS: issued and renewed automatically by Azure Static Web Apps

## Safe cutover sequence

### 1. Start Azure validation

For `www`, Azure uses CNAME delegation. For the apex domain, Azure uses a DNS TXT token:

```bash
az staticwebapp hostname set \
  --name krnch-portfolio \
  --resource-group piu-portfolio-website \
  --hostname www.krnch.me \
  --validation-method cname-delegation \
  --no-wait

az staticwebapp hostname set \
  --name krnch-portfolio \
  --resource-group piu-portfolio-website \
  --hostname krnch.me \
  --validation-method dns-txt-token \
  --no-wait
```

Retrieve the apex validation token from Azure before editing DNS. Never invent the token.

### 2. Change Namecheap Advanced DNS

Delete the old GitHub Pages records:

```text
A      @      192.30.252.153
A      @      192.30.252.154
CNAME  www    krnch.github.io
```

Add:

```text
CNAME  www    green-pebble-099281a10.7.azurestaticapps.net
TXT    @      <exact Azure validation token>
ALIAS  @      green-pebble-099281a10.7.azurestaticapps.net
```

Use Namecheap's ALIAS record for `@`; do not use a plain CNAME at the apex. Keep the TXT record while Azure validates ownership.

### 3. Verify DNS

```bash
dig www.krnch.me CNAME +short
dig krnch.me A +short
dig krnch.me TXT +short
```

`www` must return the Azure hostname. The apex result may show flattened Azure addresses because Namecheap resolves the ALIAS.

### 4. Verify Azure and TLS

```bash
az staticwebapp hostname list \
  --name krnch-portfolio \
  --resource-group piu-portfolio-website \
  --output table

curl -I https://krnch.me
curl -I https://www.krnch.me
```

Azure may need 10–30 minutes after DNS validation to issue certificates; DNS changes can take longer. Do not keep changing records while status is `Adding`.

### 5. Retire the old GitHub Pages claim

After Azure serves both names successfully, disable Pages for `krnch/webpage` or remove its old custom-domain configuration. Do not enable GitHub Pages for this repository while Azure is the selected host.

## Social shortcuts

Namecheap currently provides:

- `http://github.krnch.me` → `https://github.com/krnch`
- `http://linkedin.krnch.me` → `https://www.linkedin.com/in/karanchaudhari/`

These begin with an unencrypted HTTP hop. They are temporary shortcuts, not the main-site TLS solution. Direct HTTPS social URLs are preferable long term, or move the redirects to Cloudflare where HTTPS can be managed at the edge.

## Optional Cloudflare phase

Cloudflare can later replace Namecheap DNS while Namecheap remains the registrar. Benefits include managed HTTPS redirects for social subdomains, DNS/CDN analytics, DDoS controls, and a Worker route for the chatbot. Do not change nameservers during the Azure certificate cutover; complete and verify one migration at a time.
