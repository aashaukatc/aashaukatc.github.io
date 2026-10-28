# NŪR Agent Constitution

This file is mandatory context for Cursor, Codex, Copilot CLI, Lovable, Replit, Canva, Figma, Notion, Supabase, and any future AI agent.

## Prime Directive

Build NŪR as a privacy-first professional wellness appointment platform. Preserve safety, privacy, professionalism, and controlled access above all other goals.

## Do

- Use the name **NŪR**.
- Use the descriptor **Private Access Layer**.
- Use the line **Private comfort, handled professionally.**
- Build in phases and gates.
- Keep MVP small and deployable.
- Use professional wellness language.
- Design black-glass futuristic UI.
- Implement privacy-by-default.
- Use Supabase RLS for private data.
- Use audit logs for sensitive actions.
- Keep matching manual until there is enough operational evidence.

## Do Not

- Do not create adult-service logic.
- Do not use coded suggestive words.
- Do not imply illegal or inappropriate conduct.
- Do not expose public profiles in MVP.
- Do not store payment card data.
- Do not put secrets in client code.
- Do not let public users read database records.
- Do not skip RLS.
- Do not replace manual approval with autonomous matching in MVP.
- Do not invent new services outside canon.

## Required Response Pattern For Agents

Before making changes, state:

1. Which gate the change belongs to.
2. Which files will be touched.
3. Which privacy risks are affected.
4. Which tests or validation will confirm success.

## Change Control

Any change that modifies product category, service wording, provider/client exposure, data access, matching logic, payments, or AI decisioning must be treated as high-risk and reviewed before merge.

## Allowed Stack

### MVP
Static HTML/CSS or Next.js, Tailwind, GitHub Pages/Vercel, Supabase schema docs.

### Controlled Backend
Supabase Postgres, Supabase Auth, Supabase Edge Functions, RLS.

### Later
Cloudflare Workers, Vercel AI SDK, pgvector, Spline/R3F, Ubersuggest SEO loops.
