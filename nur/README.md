# NŪR — Private Access Layer

**NŪR** is a privacy-first professional wellness appointment platform.

**Core line:** Private comfort, handled professionally.  
**Domain:** `nuur.info`  
**Canon category:** verified wellness appointment interface  
**MVP mode:** static front door + controlled backend foundation + manual matching.

## Hard Boundary

NŪR is for lawful professional wellness, recovery, relaxation, and appointment coordination only.

The platform must never be redesigned into:
- an adult-services marketplace
- an escort-style service
- a coded/suggestive booking system
- a platform that implies inappropriate conduct is allowed
- a system that exposes private client/provider data publicly

## Source of Truth

Use these files as the locked project memory for all AI agents:

| File | Purpose |
|---|---|
| `docs/MASTER_FOUNDATION_LOCK.md` | One-page product constitution |
| `docs/PHASES_AND_GATES.md` | MVP vs later roadmap |
| `docs/agents/AGENT_CONSTITUTION.md` | Rules for Cursor, Codex, Copilot, Lovable, Replit |
| `docs/architecture/ARCHITECTURE_MAP.md` | End-to-end system map |
| `backend/supabase/migrations/0001_nur_core_schema.sql` | Backend DB foundation |
| `backend/supabase/migrations/0002_rls_policies.sql` | Privacy/security access rules |
| `docs/brand/BRAND_SYSTEM.md` | Visual identity and UI lock |
| `prompts/CODEX_MASTER_PROMPT.md` | Build prompt for code agents |

## Figma / Notion Links

- Figma brand board: https://www.figma.com/design/PgvitCC9LhGsgtc3QEpVPa
- FigJam architecture map: https://www.figma.com/board/4p37pEF5jerNcEfmW7yhqY
- Notion foundation page: https://app.notion.com/p/39870145a8c281598e0ae02a15559cad

## Build Priority

1. Static site and content lock.
2. Supabase schema + RLS.
3. Admin review dashboard.
4. Manual matching workflow.
5. AI intake assistant only after security gates exist.
6. Edge scale only after demand signal.
