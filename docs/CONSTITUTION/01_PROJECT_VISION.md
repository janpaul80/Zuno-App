# ZUNO Project Vision

Version: 1.0  
Status: Active

---

## What ZUNO Is
ZUNO is a 3D action‑adventure platformer for Android, built with Unity and powered by a Next.js + Supabase backend.  
It combines speed, exploration, and precise mechanics within a secure server‑authoritative ecosystem.

## Long‑Term Vision
* Deliver a living action‑platformer world where skill and creativity determine progression.  
* Evolve from focused single‑player gameplay to connected cooperative experiences.  
* Keep fairness, performance, and accessibility at the core of all expansions.  

## Core Gameplay Philosophy
1. **Skill First** – Mastery and timing define success.  
2. **Fair Play** – No pay‑to‑win mechanics.  
3. **Meaningful Progression** – Players earn advancement through play, not payment.  
4. **Player Expression** – Customization through cosmetics only.  

## Server‑Authoritative Architecture
* All data—economy, inventory, progression, and unlocks—is validated and stored on the server.  
* Clients maintain non‑authoritative cloud saves containing only preferences and checkpoints.  
* Supabase provides enforced RLS policies and full auditability.  

## Cross‑Platform Goals
* **Primary:** Android distribution via APK.  
* **Secondary:** Web and desktop experiences reusing the backend.  
* **Long‑term:** optional console support pending engine parity.  

## Design Principles
* Server authority by default.  
* 60 FPS target on mid‑range devices.  
* Offline‑safe syncing for Cloud Saves.  
* Comprehensive accessibility options.  
* Lightweight network payloads.  
* Documentation before code.  

## Core Principles
1. Player trust comes first.  
2. Fair gameplay over monetization.  
3. Server authority over client trust.  
4. Simplicity before complexity.  
5. Documentation before implementation.  
6. Security by design.  
7. Every change must be verifiable.  
8. Build for maintainability.  

## Non‑Goals
* Pay‑to‑win monetization.  
* Client‑side economy or progression.  
* Secrets embedded in code.  
* Direct database access from client.  
* Manual or unreproducible deployments.  
* Avoidable complexity or unreviewed dependencies.  