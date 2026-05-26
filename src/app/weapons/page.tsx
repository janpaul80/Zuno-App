"use client";

import Link from "next/link";

export default function WeaponsPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020617]">
      {/*
        Weapons target direction:
        - The artwork composition carries the full page.
        - The baked navbar was cropped out of /weapons-composition.png.
        - Real navbar remains from layout.tsx only.
        - No dashboard rebuild, no generic card system, no invented sections.
        - Clickable hotspots preserve real UI behavior without breaking composition.
      */}

      <section className="relative z-10 pt-24 sm:pt-24 md:pt-24 pb-10">
        <div className="relative mx-auto w-full max-w-[1365px] px-0 sm:px-4">
          <div className="relative mx-auto overflow-hidden bg-[#050816] shadow-[0_0_80px_rgba(0,0,0,0.45)]">
            <img
              src="/weapons-composition.png"
              alt="ZUNO Weapons Arsenal complete armory screen"
              className="block w-full h-auto select-none"
              draggable={false}
            />

            {/* Character rename overlays — keep visual identity, only replace labels. */}
            <div className="absolute left-[7.85%] top-[28.45%] h-[1.9%] w-[8.8%] bg-[#16080a]/95 rounded-sm pointer-events-none" />
            <div className="absolute left-[7.85%] top-[28.25%] w-[8.8%] text-center font-bangers text-[clamp(7px,1.05vw,14px)] italic tracking-[0.06em] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] pointer-events-none">
              JEAN
            </div>

            <div className="absolute left-[45.7%] top-[28.45%] h-[1.9%] w-[12.8%] bg-[#16051f]/95 rounded-sm pointer-events-none" />
            <div className="absolute left-[45.7%] top-[28.25%] w-[12.8%] text-center font-bangers text-[clamp(7px,0.95vw,13px)] italic tracking-[0.03em] text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] pointer-events-none">
              MARJORIE
            </div>

            {/* Real clickable UI hotspots aligned to the artwork composition. */}
            {/* Character selection */}
            <button aria-label="Select Jean" className="absolute left-[6.4%] top-[22.75%] h-[7.8%] w-[12.8%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/80" onClick={() => {}} />
            <button aria-label="Select Bambo" className="absolute left-[19.9%] top-[22.75%] h-[7.8%] w-[12.5%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ffd21f]/80" onClick={() => {}} />
            <button aria-label="Select Wolf" className="absolute left-[33.1%] top-[22.75%] h-[7.8%] w-[12.9%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Select Marjorie" className="absolute left-[46.7%] top-[22.75%] h-[7.8%] w-[12.7%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2bd6]/80" onClick={() => {}} />
            <button aria-label="Select Onyx" className="absolute left-[60.2%] top-[22.75%] h-[7.8%] w-[12.9%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd00ff]/80" onClick={() => {}} />

            {/* Weapon category tabs */}
            <button aria-label="All weapons" className="absolute left-[13.7%] top-[32.05%] h-[2.4%] w-[13.5%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Melee weapons" className="absolute left-[28.1%] top-[32.05%] h-[2.4%] w-[10.5%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2bd6]/80" onClick={() => {}} />
            <button aria-label="Ranged weapons" className="absolute left-[39.6%] top-[32.05%] h-[2.4%] w-[10.7%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2bd6]/80" onClick={() => {}} />
            <button aria-label="Elemental weapons" className="absolute left-[51.1%] top-[32.05%] h-[2.4%] w-[11.9%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2bd6]/80" onClick={() => {}} />
            <button aria-label="Legendary weapons" className="absolute left-[63.7%] top-[32.05%] h-[2.4%] w-[11.6%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/80" onClick={() => {}} />
            <button aria-label="My loadout" className="absolute left-[76.4%] top-[32.05%] h-[2.4%] w-[14.5%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2bd6]/80" onClick={() => {}} />

            {/* Weapon cards */}
            <button aria-label="Frost Blade weapon card" className="absolute left-[3.1%] top-[35.2%] h-[20.0%] w-[24.2%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ffd21f]/80" onClick={() => {}} />
            <button aria-label="Thunder Claws weapon card" className="absolute left-[29.0%] top-[35.2%] h-[20.0%] w-[17.6%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff2bd6]/80" onClick={() => {}} />
            <button aria-label="Solar Spear weapon card" className="absolute left-[47.5%] top-[35.2%] h-[20.0%] w-[17.6%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/80" onClick={() => {}} />
            <button aria-label="Ice Armor weapon card" className="absolute left-[66.3%] top-[35.2%] h-[20.0%] w-[17.0%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Void Lance weapon card" className="absolute left-[84.0%] top-[35.2%] h-[20.0%] w-[15.5%] rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd00ff]/80" onClick={() => {}} />

            {/* Upgrade buttons on cards */}
            <button aria-label="Upgrade Thunder Claws" className="absolute left-[30.5%] top-[52.05%] h-[2.55%] w-[14.2%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Upgrade Solar Spear" className="absolute left-[49.0%] top-[52.05%] h-[2.55%] w-[14.2%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/80" onClick={() => {}} />
            <button aria-label="Upgrade Ice Armor" className="absolute left-[67.8%] top-[52.05%] h-[2.55%] w-[13.8%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Upgrade Void Lance" className="absolute left-[85.3%] top-[52.05%] h-[2.55%] w-[12.8%] rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd00ff]/80" onClick={() => {}} />

            {/* Carousel arrows */}
            <button aria-label="Previous weapons" className="absolute left-[0.65%] top-[43.1%] h-[4.0%] w-[3.0%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Next weapons" className="absolute right-[0.65%] top-[43.1%] h-[4.0%] w-[3.0%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />

            {/* Upgrade path tiers */}
            <button aria-label="Upgrade path tier one shard edge" className="absolute left-[7.6%] top-[60.7%] h-[3.65%] w-[13.4%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Upgrade path tier two glacier fang" className="absolute left-[25.4%] top-[60.7%] h-[3.65%] w-[13.4%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Upgrade path tier three frost blade" className="absolute left-[43.5%] top-[60.2%] h-[4.2%] w-[14.5%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/80" onClick={() => {}} />
            <button aria-label="Upgrade path tier four absolute zero" className="absolute left-[62.3%] top-[60.7%] h-[3.65%] w-[13.4%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60" onClick={() => {}} />
            <button aria-label="Upgrade path tier five winter reign" className="absolute left-[80.0%] top-[60.7%] h-[3.65%] w-[13.4%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60" onClick={() => {}} />

            {/* Detail video/play area */}
            <button aria-label="Play Frost Blade preview video" className="absolute left-[73.6%] top-[71.1%] h-[9.9%] w-[20.8%] rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />

            {/* Loadout slots */}
            <button aria-label="Loadout slot one" className="absolute left-[5.7%] top-[83.2%] h-[6.3%] w-[8.8%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00c8ff]/80" onClick={() => {}} />
            <button aria-label="Loadout slot two" className="absolute left-[16.0%] top-[83.2%] h-[6.3%] w-[8.8%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ff7a00]/80" onClick={() => {}} />
            <button aria-label="Loadout slot three" className="absolute left-[25.5%] top-[83.2%] h-[6.3%] w-[8.8%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd00ff]/80" onClick={() => {}} />
            <button aria-label="Locked loadout slot four" className="absolute left-[35.1%] top-[83.2%] h-[6.3%] w-[8.8%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60" onClick={() => {}} />
            <button aria-label="Locked loadout slot five" className="absolute left-[44.7%] top-[83.2%] h-[6.3%] w-[8.8%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60" onClick={() => {}} />

            {/* Final CTA */}
            <Link
              href="/how-to-play"
              aria-label="Play ZUNO now"
              className="absolute left-[64.2%] top-[93.0%] h-[4.3%] w-[25.4%] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd21f]/80"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
