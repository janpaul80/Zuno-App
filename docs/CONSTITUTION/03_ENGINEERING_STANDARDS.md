# Engineering Standards

Version: 1.0  
Status: Active

---

## Architecture
* Repository → Service → API structure is mandatory.  
* Repositories handle persistence only.  
* Services contain domain logic and validation.  
* API routes serve as thin controllers calling services.  

## TypeScript
* Strict TypeScript mode must be enabled.  
* No `any` types permitted.  
* Shared domain types live in `src/lib/repositories/types.ts`.  

## API Standards
* Use `apiHandler` for consistent response wrapping.  
* Response envelope: `{ ok, data, requestId }`.  
* Validate requests with Zod schemas.  
* Handle errors through `ApiError` with specific HTTP status codes.  

## Database Rules
* Data is server‑authoritative.  
* Supabase RLS enabled by default.  
* Use constraints, foreign keys, and check policies.  
* All migrations are additive and version‑controlled.  

## Security Principles
* Never trust client input without validation.  
* Secrets exist only in Vercel Environment Variables.  
* No service‑role keys exposed to clients.  

## Performance
* Batch related queries to minimize round‑trips.  
* Avoid N + 1 query patterns.  
* Use transactions or RPCs for multi step writes.  

## Testing
* Unit tests for business logic.  
* Integration tests for repository and API behaviors.  
* Regression tests for bug fix validation.  

## Observability
* Every request gets a unique `requestId`.  
* Log server errors, excluding PII or secrets.  

## Documentation
* Update API_CONTRACT.md and domain docs for each feature.  
* Ensure Markdown renders on GitHub before commit.  

## Git Workflow
* Small, cohesive commits only.  
* Naming format: `feat(domain): description`.  
* Run `npm run lint && npm run build && npm test (if available)` before committing.  

## AI Contributor Rules
1. Read the Constitution before any change.  
2. Follow existing patterns—no inventing new architectures.  
3. Never fake tool output or successful builds.  
4. Document all changes and verify before commit.  
5. Ask for clarification if unsure instead of guessing.  