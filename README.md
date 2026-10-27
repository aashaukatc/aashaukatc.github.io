# AftabShaukat.me — professional portfolio

Canonical professional website for **Muhammad Aftab Shaukat**. Healthcare RCM · Operations · Data · Systems · AI.

- Live domain: [aftabshaukat.me](https://aftabshaukat.me/)
- Hosting: GitHub Pages (static)
- Profile and career data source: [aashaukatc/aashaukatc](https://github.com/aashaukatc/aashaukatc)

## Site map

| Route | Purpose |
|---|---|
| `/` | Premium homepage, validated operating scope and illustrative dashboard |
| `/services.html` | Healthcare RCM, business analysis, systems and AI capabilities |
| `/work.html` | Filterable portfolio and public project references |
| `/about.html` | Professional background, platform expertise and method |
| `/contact.html` | Consultation inquiry with working mailto fallback |
| `/resume.html` | Permanent print-ready professional résumé (preserved) |
| `/hospice-nursing-home-billing-rcm.html` | Public post-acute billing research (preserved) |
| `/remote-monitoring-rcm-architecture.html` | Public RPM/RTM research (preserved) |
| `/sehatyaab-*.html` | Existing visual product samples (preserved) |

## Front end

- `assets/css/portfolio-v2.css`: responsive design tokens, layouts, gradients and cards.
- `assets/js/portfolio-v2.js`: accessible mobile navigation, filterable portfolio, scroll effects and form behavior.
- Plain HTML, CSS and JavaScript; no bundler or runtime dependencies.

The homepage's dashboard **is a demonstration, not a live analytics product**. Trend visuals are synthetic. Operating-scope numbers are from the canonical career record, and are explicitly distinguished from demo charts.

## Contact handling

The default form opens the visitor's email application with their inquiry pre-filled. **The visitor must press Send.** No backend endpoint is presented as live unless it has actually been configured. For optional server-side handling, see `worker/index.js` and `docs/contact-backend.md`.

## Public publishing standard

- Do not invent work history, credentials, awards, reviews, clients or outcomes.
- Sanitize or synthesize PHI, PII, confidential data and screenshots before publication.
- Do not expose internal planning notes, API keys or unpublished commercial assumptions.
- Keep project lifecycle labels honest (research, concept, initiative, released product).
- Preserve canonical career facts from `resumes/resume.json` and `brand/career-profile-source.json` in the linked profile repository.
- Preserve research caveats and source dates; no unverified claim of formal journal publication.

## GitHub Pages

`CNAME` remains `aftabshaukat.me`; the GitHub Pages build deploys from the configured publication source. The URL structure is intentionally stable for SEO and existing links. Review changes on a feature branch, validate, then merge to main.
