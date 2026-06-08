import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#020514] flex flex-col items-center justify-start relative z-10 font-inter">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        {/* Artwork Container */}
        <div className="w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#020514] relative group">
          <img
            src="/aboutus_clean.png"
            alt="About ZUNO - Official Artwork"
            className="w-full h-auto object-cover select-none pointer-events-none"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
