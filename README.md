# ZUNO App

ZUNO is my mobile game project. It is a 3D platformer and adventure game with characters, levels, coins, rewards, upgrades, inventory, shop systems, and a backend for player progress.

This repo contains the Unity Android game client together with the web and backend services. The public site presents the game world, while the service layer supports accounts, rewards, purchases, and cloud saves.

Live site: [zunobattle.app](https://zunobattle.app)

## What is in here

- Next.js site for the game
- Pages for gameplay, levels, weapons, rewards, roadmap, support, and legal info
- Supabase services for player profiles, inventory, economy, quests, unlocks, and achievements
- API routes under `/api/v1/player/*` and `/api/v1/shop/*`
- Validators, repositories, and domain services for game data
- Trailer video, character art, weapons, rewards, and level assets
- Unity 6.3 Android client under `game/Zuno.Unity`
- Playable Grasslands vertical-slice foundation with mobile controls and offline gameplay

## Tech stack

- Next.js, React, TypeScript
- Tailwind CSS and CSS modules
- Supabase for player data
- Framer Motion and Lucide React
- Zod for validation
- Unity 6.3 LTS, URP, C#, and the Unity Input System for the Android client

## Run it locally

```bash
git clone https://github.com/janpaul80/Zuno-App.git
cd Zuno-App
npm install
npm run dev
```

Open `http://localhost:3000`.

## Run the Android game client

Install Unity `6000.3.20f1` with Android Build Support, OpenJDK, Android SDK,
and Android NDK through Unity Hub. Open `game/Zuno.Unity`, then load
`Assets/Scenes/GrasslandsVerticalSlice.unity` and press Play.

Keyboard controls in the Editor: WASD/arrow keys to move, Space to jump,
J to attack, and Left Shift to dash. The same slice exposes a virtual joystick
and action buttons on touch devices.

The current geometric Guardian and enemy bodies are gameplay greyboxes only.
They are deliberately isolated from gameplay code so approved Meshy/artist-made
models, rigs, animation controllers, VFX, and audio can replace them without
changing the combat and mission systems.

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

Active production prototype. The first Unity Android vertical slice now exists;
a release still needs approved 3D assets, animation/audio passes, device QA,
signed store packaging, security review, and live Supabase setup.
