# Optional production contact backend

The public GitHub Pages site is fully usable **without an API**: `/contact.html` prepares an addressed email for the visitor to send from their email application. This avoids falsely promising a server-side delivery capability.

For a server-side form, `worker/index.js` implements a Cloudflare Worker for `POST /api/contact`. It uses Resend to deliver plain-text messages, validates and bounds input, restricts CORS origin, and keeps API credentials server-side. Client status messages never claim a message was sent until the Worker reports success.

## Deployment checklist

1. Create a Cloudflare Worker and set the entry point to `worker/index.js` (copy or import source).
2. Create a Cloudflare Workers KV namespace and bind it as `CONTACT_RL`.
3. Set these **server-only secrets/configuration** in Cloudflare: `RESEND_API_KEY`, `CONTACT_FROM` (a verified sender address), `CONTACT_TO`, and a random `RATE_SALT`.
4. Verify a sender domain with your email delivery provider. Enable Cloudflare WAF rate limiting, bot controls, and logging that excludes inquiry bodies.
5. Deploy a custom Worker route or workers.dev URL with HTTPS, then set `window.PORTFOLIO_CONTACT_ENDPOINT = "https://<your-worker-host>/api/contact"` **in site HTML before** loading `portfolio-v2.js`, once the endpoint passes end-to-end delivery tests.
6. Test valid delivery, invalid fields, unauthorized origins, failed upstream sends, throttling and accessible error feedback. Confirm privacy and data-retention requirements before enabling.

Do not commit keys, KV identifiers with private operational metadata, or patient/client sensitive information. The KV counters are best-effort: enforce strong production request limits at Cloudflare's edge.

The backend is **implemented but not deployed**. No website form currently collects or stores submitted visitor data server-side.
