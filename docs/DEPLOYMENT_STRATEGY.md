# Deployment Strategy

Version: 1.0
Status: Active

## Production Deployment
- Production domain: `zunobattle.app`
- Primary deployment platform: Vercel
- Source of truth branch: `main`
- Vercel deployment source: GitHub repository `origin/main`

## Deployment Flow
1. Changes are committed locally on `main`.
2. Changes are pushed to GitHub.
3. Vercel receives the updated `main` branch.
4. Vercel builds and deploys `zunobattle.app`.

## Environment and Secret Handling
- Production secrets are stored in local `.env` and platform-managed secret storage.
- `.env` files must never be committed.
- Only `.env.example` may be committed with placeholder values.
- Supabase credentials and Langdock API credentials must remain secret and environment-bound.

## Release Readiness Requirements
- `npm run lint` must pass.
- `npm run build` must pass.
- GitHub push to `origin/main` must succeed.
- Vercel must be configured to deploy from GitHub `main`.

## Future Deployment Notes
- Reward Engine, Economy v2, and AI Director features must remain deployment-safe and server-authoritative.
- Stripe remains sandbox-only until production readiness is documented.
