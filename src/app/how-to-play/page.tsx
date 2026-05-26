"use client";

export default function HowToPlayPage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* ============= CINEMATIC INTRO ============= */}
      <section className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,200,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(189,0,255,0.08),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-russo text-xs uppercase tracking-[0.2em] text-[#00c8ff] drop-shadow-[0_0_8px_rgba(0,200,255,0.5)]">
            ZUNO Combat Protocol
          </p>
          <h1 className="mt-4 font-bangers text-[clamp(2.8rem,8vw,6rem)] leading-[0.90] tracking-[0.04em] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
            TURN YOUR PHONE SIDEWAYS
            <span className="block text-transparent bg-clip-text bg-[linear-gradient(90deg,#00c8ff_0%,#ff2bd6_100%)]">
              TO ENTER BATTLE
            </span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-white/80 text-sm md:text-base font-inter leading-relaxed">
            Lock in. Rotate your device and step into the neon arena where every swipe, dodge, and strike decides the match.
          </p>
          {/* Swipe arrows */}
          <div className="mt-8 flex items-center justify-center gap-6 text-[#00c8ff]">
            <span className="text-3xl animate-bounce drop-shadow-[0_0_8px_rgba(0,200,255,0.6)]">←</span>
            <span className="font-russo text-xs uppercase tracking-[0.15em] text-white/70">Swipe to Move</span>
            <span className="text-3xl animate-bounce drop-shadow-[0_0_8px_rgba(0,200,255,0.6)]">→</span>
          </div>
        </div>
      </section>

      {/* ============= GAMEPLAY HUD PREVIEW ============= */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,122,0,0.06),transparent_55%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Glowing frame */}
          <div className="relative">
            <div className="absolute inset-[-3px] rounded-2xl bg-[linear-gradient(135deg,#00c8ff,#ff2bd6)] blur-sm opacity-70" />
            <div className="relative rounded-2xl border-2 border-[#00c8ff]/60 bg-[#020617] overflow-hidden shadow-[0_0_40px_rgba(0,200,255,0.2)]">
              {/* HUD Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#030214]/80">
                <div className="flex items-center gap-2">
                  <span className="font-russo text-[10px] uppercase tracking-wider text-[#00c8ff]">HP</span>
                  <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-3/4 rounded-full bg-[linear-gradient(90deg,#00c8ff,#00ff88)]" />
                  </div>
                </div>
                <div className="font-bangers text-sm tracking-wider text-[#ff2bd6] drop-shadow-[0_0_6px_rgba(255,43,214,0.5)]">
                  COMBO x12
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-russo text-[10px] uppercase tracking-wider text-[#ffd21f]">Energy</span>
                  <div className="w-24 h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-[linear-gradient(90deg,#ffd21f,#ff7a00)]" />
                  </div>
                </div>
              </div>

              {/* Arena Area */}
              <div className="relative min-h-[320px] md:min-h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(0,200,255,0.08),rgba(189,0,255,0.05),transparent_70%)]">
                {/* Left character placeholder */}
                <div className="absolute left-6 md:left-16 bottom-20 md:bottom-24">
                  <div className="w-28 h-36 md:w-40 md:h-52 rounded-t-full rounded-b-2xl border-3 border-[#00c8ff]/60 bg-[linear-gradient(180deg,rgba(0,200,255,0.25),rgba(0,200,255,0.05))] shadow-[0_0_30px_rgba(0,200,255,0.3)] animate-pulse" />
                </div>
                {/* Right character placeholder */}
                <div className="absolute right-6 md:right-16 bottom-16 md:bottom-20">
                  <div className="w-32 h-40 md:w-44 md:h-56 rounded-t-full rounded-b-2xl border-3 border-[#ff2bd6]/60 bg-[linear-gradient(180deg,rgba(255,43,214,0.25),rgba(255,43,214,0.05))] shadow-[0_0_30px_rgba(255,43,214,0.3)] animate-pulse" />
                </div>
                {/* Clash zone label */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-24 md:bottom-28">
                  <p className="font-bangers text-lg md:text-2xl tracking-[0.15em] text-[#ffd21f] drop-shadow-[0_0_12px_rgba(255,210,31,0.5)] animate-pulse">
                    ⚔ CLASH ZONE ⚔
                  </p>
                </div>
                {/* Floating combat text */}
                <span className="absolute top-12 left-1/4 font-russo text-[10px] uppercase tracking-wider text-[#00c8ff]/70">Perfect Dodge</span>
                <span className="absolute top-20 right-1/4 font-russo text-[10px] uppercase tracking-wider text-[#ff2bd6]/70">Ultimate Ready</span>
                <span className="absolute bottom-36 left-1/3 font-russo text-[10px] uppercase tracking-wider text-[#ffd21f]/70">Critical Hit +250</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ============= CONTROLS ============= */}
      <section className="relative z-10 py-12 md:py-16 bg-[#020617]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-center font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
            BATTLE <span className="text-[#ff7a00]">CONTROLS</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "ATK", desc: "Tap to attack", color: "#ffd21f", shadow: "rgba(255,210,31,0.4)" },
              { label: "ULT", desc: "Ultimate power", color: "#ff2bd6", shadow: "rgba(255,43,214,0.4)" },
              { label: "D", desc: "Dodge / evade", color: "#ff7a00", shadow: "rgba(255,122,0,0.4)" },
              { label: "J", desc: "Jump / leap", color: "#00c8ff", shadow: "rgba(0,200,255,0.4)" },
            ].map((btn) => (
              <div key={btn.label} className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] flex items-center justify-center font-bangers text-2xl md:text-3xl text-white animate-pulse"
                  style={{
                    borderColor: btn.color,
                    backgroundColor: `${btn.color}22`,
                    boxShadow: `0 0 24px ${btn.shadow}, inset 0 0 12px ${btn.shadow}`,
                  }}
                >
                  {btn.label}
                </div>
                <span className="font-russo text-[10px] uppercase tracking-[0.13em] text-white/70">{btn.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ============= 3 STEPS ============= */}
      <section className="relative z-10 py-14 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(189,0,255,0.06),transparent_65%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-center font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
            MASTER THE <span className="text-[#00c8ff]">ARENA</span>
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { step: "01", title: "SWIPE TO MOVE", desc: "Drag fast to dash in and out of range. Control spacing, bait attacks, punish hard.", border: "#00c8ff", glow: "rgba(0,200,255,0.15)" },
              { step: "02", title: "ATTACK & EVADE", desc: "Tap ATK for pressure. Hit DODGE at the last second to trigger a perfect counter window.", border: "#ff2bd6", glow: "rgba(255,43,214,0.15)" },
              { step: "03", title: "UNLEASH ULTIMATE", desc: "When energy is full, detonate ULT to break guard, stun enemies, and flip the round.", border: "#ffd21f", glow: "rgba(255,210,31,0.15)" },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 transition hover:-translate-y-1"
                style={{ borderColor: `${s.border}55`, boxShadow: `0 0 24px ${s.glow}` }}
              >
                <p className="font-russo text-[10px] uppercase tracking-[0.2em]" style={{ color: s.border }}>
                  Step {s.step}
                </p>
                <h3 className="mt-2 font-bangers text-xl tracking-[0.05em] text-white">{s.title}</h3>
                <p className="mt-3 text-sm text-white/70 font-inter leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ============= ELEMENTAL POWERS ============= */}
      <section className="relative z-10 py-14 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(0,200,255,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-center font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em] text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
            ELEMENTAL <span className="text-[#7cff00]">POWERS</span>
          </h2>
          <p className="mt-4 text-center text-white/60 text-sm font-inter max-w-xl mx-auto">
            Each hero channels a unique element. Combine elements for devastating combo attacks.
          </p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Fire", icon: "🔥", color: "#ff7a00", desc: "Burn stacks" },
              { name: "Ice", icon: "❄️", color: "#00c8ff", desc: "Freeze & slow" },
              { name: "Rift", icon: "🌀", color: "#bd00ff", desc: "Warp & blink" },
              { name: "Nature", icon: "🌿", color: "#7cff00", desc: "Shield & heal" },
              { name: "Electric", icon: "⚡", color: "#ffd21f", desc: "Chain shock" },
            ].map((el) => (
              <div
                key={el.name}
                className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-5 text-center transition hover:-translate-y-1 hover:scale-105"
                style={{ borderTop: `3px solid ${el.color}`, boxShadow: `0 0 20px ${el.color}18` }}
              >
                <div className="text-3xl mb-2">{el.icon}</div>
                <h3 className="font-russo text-xs uppercase tracking-[0.13em]" style={{ color: el.color }}>{el.name}</h3>
                <p className="mt-1 text-[11px] text-white/60 font-inter">{el.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ============= CTA ============= */}
      <section className="relative z-10 py-16 md:py-20 bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,122,0,0.08),transparent_55%)]" />
        <div className="relative text-center">
          <h2 className="font-bangers text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)] drop-shadow-[0_5px_8px_rgba(0,0,0,0.65)]">
            READY TO FIGHT?
          </h2>
          <p className="mt-4 text-white/70 text-sm font-inter max-w-md mx-auto">
            Step into the arena. Master your hero. Dominate every round.
          </p>
          <a
            href="#"
            className="mt-8 inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition hover:-translate-y-0.5"
          >
            🐾 Play Zuno Now
          </a>
        </div>
      </section>
    </div>
  );
}
