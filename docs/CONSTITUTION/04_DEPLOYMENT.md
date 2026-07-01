# Deployment Strategy

Version: 1.0  
Status: Active

---

## Hosting and Deployment
* Hosted entirely on **Vercel** for both frontend and backend.  
* Deployed automatically from **GitHub** pushes.  

### Environment Model

| Environment | Source | Purpose |
|--------------|---------|----------|
| **Local** | Developer machine | Local testing and development. |
| **Preview** | Feature/PR branches | Temporary QA deployments. |
| **Staging** | Integration branch (optional) | Pre‑release environment for QA. |
| **Production** | Main branch | Deployed to `https://zunobattle.app`. |

### Environment Variables
* All secrets and keys live in Vercel configuration, not source control.  
* Dummy values used in `.env.example` for local setup.  

---

## Android Distribution
* Distributed as **APK‑only** for now.  
* Release APKs target the Production backend.  
* QA APKs may target Preview or Staging.  

### Future Play Store Plan
* Publish after Vercel infrastructure and LiveOps mature.  
* Releases built and signed from GitHub CI/CD tags.  

---

## Deployment Principles
1. **GitHub is source of truth.**  
2. Every production version originates from a verified commit.  
3. Deployments must be reproducible and auditable.  
4. No manual or untracked builds in production.  
5. Environment secrets never exposed in repository.  