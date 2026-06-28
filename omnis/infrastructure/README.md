# OMNIS Infrastructure Foundation

The founding infrastructure is separated into four controlled layers.

## Experience Layer
Next.js and TypeScript provide the tenant-aware web experience and documentation surfaces.

## Intelligence Layer
FastAPI services coordinate ingestion, evidence retrieval, scenario simulation, recommended actions, and audit events.

## Data Layer
Supabase provides PostgreSQL, authentication, storage, Row Level Security, and vector retrieval. The OMNIS project is isolated from the existing DIRT project.

## Cloud Layer
AWS is the commercial runtime target for edge protection, object storage, events, queues, workers, observability, and environment isolation.

No paid AWS resource should be provisioned before the corresponding infrastructure definition, cost estimate, and rollback path are reviewed.
