# krnch.me — Readiness and integration checklist

This file distinguishes working functionality from prototypes. It is the authoritative TODO list.

## Live and verified

- [x] Main portfolio, resume, hobby page, and admin prototype exist.
- [x] Azure Static Web App is deployed at `green-pebble-099281a10.7.azurestaticapps.net`.
- [x] Repository is `krnch/krnch-portfolio`.
- [x] Broken `G-PLACEHOLDER` requests removed; analytics remains disabled until a real GA4 ID is supplied.
- [x] Resume-click event code exists and safely no-ops while GA is disabled.
- [x] GitHub buttons use `https://github.com/krnch`.
- [x] LinkedIn buttons temporarily use `http://linkedin.krnch.me`, which redirects to the correct LinkedIn profile.
- [x] GitHub Pages `CNAME` and deployment workflow removed from this repository to avoid competing with Azure hosting.

## Urgent: custom domain and SSL

- [ ] Start Azure validation for `krnch.me` and `www.krnch.me`.
- [ ] Copy the Azure-generated apex TXT token; never invent it.
- [ ] Replace old GitHub Pages DNS records in Namecheap with Azure CNAME, TXT, and ALIAS records.
- [ ] Wait for both Azure custom domains to become `Ready`.
- [ ] Verify valid TLS in Safari and with `curl`/OpenSSL.
- [ ] Disable the old `krnch/webpage` GitHub Pages custom-domain claim after Azure is live.

Exact procedure: [`DOMAIN-CUTOVER.md`](DOMAIN-CUTOVER.md).

## Admin prototype — not production-ready

`admin.html` is an admin prototype, not secure authentication:

- [ ] Protect `/admin.html` with real server-side identity, preferably Cloudflare Access or another authenticated gateway.
- [ ] Remove the client-side hardcoded password.
- [ ] Implement authenticated knowledge-base persistence; `/api/admin/update` does not exist today.
- [ ] Implement actual resume upload, private storage, text extraction, validation, and deletion.
- [ ] Correct the UI: it currently records resume filename metadata locally but does not upload the file.
- [ ] Do not store Strava client secrets or tokens in browser `localStorage`.
- [ ] Remove any existing `krnch_strava_creds` localStorage entry from browsers used with the prototype.

Until these items are complete, do not enter secrets or sensitive documents in the admin prototype.

## Strava OAuth integration

- [ ] Create a Strava API application at `strava.com/settings/api`.
- [ ] Set the authorization callback domain to the final deployed backend domain.
- [ ] Implement server-side OAuth callback and state validation.
- [ ] Store the client secret and athlete refresh token as server-side encrypted secrets.
- [ ] Request only needed scopes, expected to include activity read access.
- [ ] Implement access-token refresh; Strava access tokens are short-lived.
- [ ] Implement `/api/strava` server-side and aggregate cycling/hiking totals from authorized activity data.
- [ ] Decide whether totals are updated on demand or by a scheduled job.
- [ ] Publish only aggregate totals approved by Karan—never private activity maps or raw location history.

Fallback: import a Strava export manually and commit only approved aggregate statistics to the knowledge base.

## Ask Karan chatbot

Source exists in `chatbot/`, but it is not live:

- [ ] Create/authorize a Cloudflare account.
- [ ] Create a Gemini API key and store it only as a Cloudflare Worker secret.
- [ ] Confirm the currently supported Gemini model and free-tier limits before deployment; do not rely on old quota claims in documentation.
- [ ] Deploy the Worker and verify `/health` and `/api/chat`.
- [ ] Replace the widget's placeholder Worker URL.
- [ ] Embed the widget or create a dedicated chatbot page.
- [ ] Lock CORS to final production origins (`https://krnch.me` and/or `https://www.krnch.me`).
- [ ] Add abuse/rate controls enforced server-side; a client-supplied message count is not sufficient security.
- [ ] Keep knowledge-base updates reviewed and deploy-controlled until secure admin persistence exists.

## Knowledge base and content

- [ ] Upload old resumes through a trusted private channel for extraction and review.
- [ ] Add all approved work and hobby projects.
- [ ] Add teaching/volunteering ventures.
- [ ] Add countries and US states visited.
- [ ] Add approved aggregate Strava cycling/hiking statistics.
- [ ] Add FAQ answers and explicitly mark unknown/private information.
- [ ] Add hobby-project screenshots after checking them for confidential data.

## Hobby and mobile experience

- [ ] Replace four “Screenshots coming soon” areas in `hobby.html`.
- [ ] Reproduce and fix the reported narrow-column/clipped Microsoft experience layout on mobile.
- [ ] Add automated mobile viewport checks for horizontal overflow and text wrapping.
- [ ] Recheck the form-resubmission warning after custom-domain/TLS cutover; the homepage currently has no HTML form.

## Analytics

- [ ] Create a GA4 property and set `window.GA_ID` to its real measurement ID, or choose a privacy-friendly alternative.
- [ ] Verify page views and `resume_click` events in the analytics dashboard.
- [ ] Add a privacy notice if analytics or persistent identifiers require one.

## Optional Cloudflare phase

Namecheap can remain the registrar while Cloudflare becomes authoritative DNS:

- [ ] Finish and verify Azure domain/TLS cutover first.
- [ ] Add `krnch.me` to Cloudflare and replace Namecheap nameservers only during a planned migration.
- [ ] Recreate all DNS records, including email-related records if any.
- [ ] Use Cloudflare for HTTPS social redirects, analytics/CDN controls, Worker routes, and admin access protection.
- [ ] Verify DNS, email, Azure origin, redirects, chatbot, and certificates before deleting old records.

Do not combine the Azure cutover and Cloudflare nameserver migration into one unverified change.
