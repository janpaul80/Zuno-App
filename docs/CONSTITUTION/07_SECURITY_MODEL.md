# Security Model

Version: 1.0  
Status: Active

---

## Trust Boundaries
* Clients send intent; servers determine outcomes.  
* All game‑altering data is authenticated and verified server‑side.  

---

## Client vs Server Responsibilities

| Component | Responsible For | Authority |
|------------|----------------|-----------|
| **Client (Unity)** | UI, input, rendering | Non‑authoritative |
| **Backend (Next.js + Supabase)** | Validation, logic, persistence | Authoritative |

---

## Economy and Data Integrity
* Currency and inventory transactions execute server‑side only.  
* Every economy event written to auditable ledgers.  
* Supabase RLS enforces player‑scope access.  

---

## Anti‑Cheat Principles
* Protection through server authority rather than client obfuscation.  
* Validate packet checksums and save signatures on ingress.  
* Detect implausible progression through server‑side bounds checking.  
* Log and throttle suspicious activity rates.  

---

## Cloud Save Policy
* Stores player settings and non‑authoritative client data only.  
* Validates checksum and version on save.  
* Increments version number server‑side after each successful merge.  

---

## Authentication and Authorization
* Managed through Supabase Auth.  
* Session tokens validated on every request.  
* Service Role keys never transmitted to clients.  
* Backend logic enforced via Vercel serverless functions only.  

---

## Security Foundations
1. Never trust client input.  
2. Economy and progression remain server authoritative.  
3. All secrets stored in Vercel environment settings.  
4. Validate every API schema and authorization context.  
5. Apply principle of least privilege to all keys and roles.  

---

Security is non‑negotiable — player data integrity is paramount to fair gameplay and community trust.  