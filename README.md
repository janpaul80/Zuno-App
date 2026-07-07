# ZUNO App

ZUNO is my mobile game project. It is a 3D platformer and adventure game with characters, levels, coins, rewards, upgrades, inventory, shop systems, and a backend for player progress.

This repo is the web and backend side of the project. It shows the game world, the public pages, the trailer, and the service layer that would support accounts, rewards, purchases, and cloud saves.

Live site: [zunobattle.app](https://zunobattle.app)

## What is in here

- Next.js site for the game
- Pages for gameplay, levels, weapons, rewards, roadmap, support, and legal info
- Supabase services for player profiles, inventory, economy, quests, unlocks, and achievements
- API routes under `/api/v1/player/*` and `/api/v1/shop/*`
- Validators, repositories, and domain services for game data
- Trailer video, character art, weapons, rewards, and level assets

## Tech stack

- Next.js, React, TypeScript
- Tailwind CSS and CSS modules
- Supabase for player data
- Framer Motion and Lucide React
- Zod for validation

## Run it locally

```bash
git clone https://github.com/janpaul80/Zuno-App.git
cd Zuno-App
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` with Supabase values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Use local or test credentials while developing. Do not commit production secrets.

## Useful scripts

```bash
npm run dev      # Start local development
npm run build    # Build the app
npm run start    # Run the production build
npm run lint     # Run lint checks
```

## Notes

- `src/app/` has pages and API routes.
- `src/lib/services/` has progression, rewards, inventory, shop, and player services.
- `src/lib/repositories/` has the data access layer.
- `supabase/migrations/` has the schema work for the game systems.
- `public/` has the art, trailer, characters, weapons, and reward media.

## Status

Active prototype. The repo shows the web presence and backend plan for the game. A real release still needs the playable build, store packaging, security review, and live Supabase setup.
