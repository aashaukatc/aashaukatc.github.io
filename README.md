# AftabShaukat.me — Public Portfolio & Research Hub

This repository powers the public website at [aftabshaukat.me](https://aftabshaukat.me), including portfolio positioning, project ecosystem pages, and long-form research assets.

## Purpose

The site presents one unified operating narrative for Muhammad Aftab Shaukat:

- RCM Solutions Architect
- Healthcare Operations Strategist
- Business Analyst
- Process Optimization Specialist
- AI-assisted Product Builder

It is designed as public proof-of-work for collaboration, employment, sponsorship, and founder-style execution credibility.

## Public Page Map

- `/` — Portfolio homepage
- `/hospice-nursing-home-billing-rcm.html` — Hospice/SNF/Nursing Facility RCM research asset
- `/remote-monitoring-rcm-architecture.html` — RPM/RTM/Ambient remote-monitoring RCM architecture asset

## Project Ecosystem Links

- [DIRT](https://dirtrcm.app/) — Data Intelligence for Revenue Transformation
- [Masla Yeh Hai](https://maslayehhai.com/) — Pakistan-first public education and civic intelligence platform
- [AYNAMATE](http://aynamate.life/) — Beauty/wellness/local-services marketplace direction

## Design System

Core UI token direction (dark glassmorphic style):

```css
:root {
  --bg: #080b12;
  --bg-2: #0d111b;
  --panel: rgba(16, 22, 33, 0.72);
  --panel-soft: rgba(255, 255, 255, 0.045);
  --line: rgba(245, 241, 232, 0.13);
  --text: #f5f1e8;
  --muted: #d0c7b8;
  --gold: #d3a85c;
  --blue: #7bb6ff;
  --green: #6cae75;
  --pink: #ff8bc7;
}
```

Implementation rules:

- Preserve strong contrast for nav, table headers, body copy, and CTA buttons.
- Keep mobile-first readability and spacing discipline.
- Avoid visual clutter and keep section hierarchy obvious.

## Research Publication-Readiness Rules

Both research pages are structured for publication readiness, citation discipline, metadata quality, and future scholarly submission.

Required boundaries:

- Do not claim acceptance, indexing, peer review, or W-category qualification unless formally true.
- Keep caution statements that policy, reimbursement, and coding rules can change.
- Keep “not legal, billing, or compliance advice” intent clear where applicable.

## Public UI ORCID Rule

ORCID preparation materials may exist in this repository for future scholarly workflows (for example `.bib` and citation packs), but ORCID UI must not appear on public pages.

Do not show on public pages:

- ORCID badges
- ORCID profile blocks
- ORCID labels/sections
- ORCID-ready promotional callouts

## SEO Checklist

Homepage and research pages should maintain:

- Title tags
- Meta descriptions
- Canonical URLs
- Open Graph tags
- Twitter card tags
- JSON-LD structured data (`Person`, `WebSite`, `Article`, `FAQPage` where relevant)
- Semantic heading structure
- Internal linking across research assets

Site-level files:

- `robots.txt`
- `sitemap.xml`

## Compliance and Privacy Guardrails

- No PHI, patient data, payer credentials, or private client identifiers in public assets.
- DIRT is positioned publicly as a no-PHI architecture direction and intelligence layer.
- Do not represent unverified compliance certifications.

## Deployment Notes

- Repository: `aashaukatc/aashaukatc.github.io`
- Hosting: GitHub Pages with custom domain `aftabshaukat.me`
- Domain mapping via `CNAME`

## Maintenance Notes

- Update “Last updated” dates on long-form research pages when edits materially change policy logic or architecture content.
- Re-check citations periodically against current CMS/MAC guidance and applicable payer updates.