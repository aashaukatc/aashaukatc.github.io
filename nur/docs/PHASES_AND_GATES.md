# NŪR Phases and Gates

## Gate 0 — Foundation Lock

**Goal:** Prevent drift before writing real code.

Deliverables: brand system, architecture map, agent constitution, backend schema draft, RLS model, public copy rules, SVG logo/icon assets, repository structure, AI agent prompts.

Exit criteria: every agent has the same source package, all risky/coded language removed, MVP/later boundaries are explicit.

## Gate 1 — Static MVP Front Door

**Goal:** Go live fast without storing sensitive data on static hosting.

Deliverables: Home, Services, Request Access, Apply as Professional, Safety, Privacy, Terms, Contact, GitHub Pages or Vercel deployment, `CNAME` for `nuur.info`.

Exit criteria: website loads mobile-first, no sensitive direct storage in client, forms point to secure placeholder or backend endpoint, analytics only after privacy review.

## Gate 2 — Controlled Backend MVP

**Goal:** Make intake real and secure.

Stack: Supabase Postgres, Supabase Auth, RLS, Edge Functions.

Deliverables: schema migrations, submit request function, submit professional application function, admin-only update functions, audit logging, blocklist, input filters.

Exit criteria: public can only submit, public cannot read records, admin access is role-based, every sensitive update creates audit log.

## Gate 3 — Admin Operations Dashboard

**Goal:** Let operators work requests safely.

Deliverables: admin login, request queue, professional verification queue, match board, appointment events, incident log, blocklist, audit log viewer.

Exit criteria: no public profile exposure, details released only after approval, manual matching is controlled.

## Gate 4 — AI Assist Layer

**Goal:** Speed intake without losing control.

Allowed AI: safe intake summarization, admin drafting, duplicate detection, policy flagging, FAQ assistant.

Not allowed AI: autonomous matching without approval, unsafe suggestions, direct provider/client exposure, unlogged personal-data reads.

Exit criteria: AI has policy guardrails, AI outputs are reviewed, AI actions are audited.

## Gate 5 — Scale Layer

**Goal:** Speed, SEO, edge routing, analytics.

Allowed: Cloudflare Workers, rate limiting, queues, cached public pages, Ubersuggest keyword loops, Vercel/Cloudflare edge deployment, Spline/R3F visual layer.

Exit criteria: demand is validated, operations dashboard is stable, privacy controls are tested.
