"use client";

import Link from "next/link";

export default function RewardsCoinsPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020617]">
      {/*
        Rewards & Coins target direction:
        - The reference composition carries the page.
        - Real navbar remains from layout.tsx only.
        - The baked navbar has been cropped out of /rewards-coins-composition.png.
        - No invented dashboard sections, no duplicate hero layer, no extra UI experiments.
      */}

      <section className="relative z-10 pt-24 sm:pt-24 md:pt-24 pb-10">
        <div className="relative mx-auto w-full max-w-[1365px] px-0 sm:px-4">
          <div className="relative mx-auto overflow-hidden bg-[#050816] shadow-[0_0_80px_rgba(0,0,0,0.45)]">
            <img
              src="/rewards-coins-composition.png"
              alt="ZUNO Rewards & Coins complete rewards command center"
              className="block w-full h-auto select-none"
              draggable={false}
            />

            {/* Real clickable UI hotspots aligned to the artwork composition. */}
            <Link
              href="/how-to-play"
              aria-label="Play and earn now"
              className="absolute left-[4.6%] top-[19.1%] h-[2.8%] w-[19%] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffd21f]/80"
            />

            <button
              aria-label="Claim bronze chest"
              className="absolute left-[6.2%] top-[58.5%] h-[2.1%] w-[8.8%] rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ffd21f]/80"
              onClick={() => {}}
            />

            <Link
              href="/how-to-play"
              aria-label="Play ZUNO now"
              className="absolute left-[62.3%] top-[93.7%] h-[4.1%] w-[24.5%] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd21f]/80"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
