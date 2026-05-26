"use client";

import Image from "next/image";

export default function HowToPlayPage() {
  return (
    <div className="relative overflow-x-hidden bg-[#020617]">
      {/* ===== GLOBAL ANIMATED PARTICLES (floating across entire page) ===== */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ["#bd00ff", "#00c8ff", "#ff2bd6", "#ffd21f", "#ff7a00"][i % 5],
              opacity: 0.15 + Math.random() * 0.25,
              animation: `floatParticle ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      {/* ===== CINEMATIC HERO SECTION ===== */}
      <section className="relative z-10 pt-28 pb-8 md:pt-36 md:pb-12">
        {/* Atmospheric purple fog */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_30%,rgba(189,0,255,0.12),transparent_60%)]" style={{ animation: "pulseGlow 6s ease-in-out infinite" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(255,43,214,0.08),transparent_55%)]" style={{ animation: "pulseGlow 8s ease-in-out infinite 2s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(0,200,255,0.06),transparent_50%)]" style={{ animation: "pulseGlow 10s ease-in-out infinite 4s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-6 lg:gap-10">

            {/* LEFT: Typography Block */}
            <div className="text-center lg:text-left" style={{ animation: "fadeSlideUp 0.8s ease-out both" }}>
              <p className="font-russo text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#bd00ff] drop-shadow-[0_0_10px_rgba(189,0,255,0.6)]">
                ZUNO Combat Protocol
              </p>
              <h1 className="mt-3 font-bangers leading-[0.88]">
                <span className="block text-[clamp(2.2rem,5.5vw,4rem)] tracking-[0.03em] text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]">
                  TURN YOUR PHONE
                </span>
                <span className="block text-[clamp(3rem,8vw,6.5rem)] tracking-[0.02em] text-transparent bg-clip-text bg-[linear-gradient(135deg,#ff2bd6_0%,#bd00ff_50%,#7c3aed_100%)] drop-shadow-[0_5px_15px_rgba(189,0,255,0.4)]" style={{ WebkitTextStroke: "1px rgba(255,43,214,0.3)" }}>
                  SIDEWAYS
                </span>
                <span className="block text-[clamp(1rem,2.5vw,1.6rem)] tracking-[0.08em] text-[#ffd21f] font-russo italic drop-shadow-[0_0_12px_rgba(255,210,31,0.5)]">
                  FOR THE BEST EXPERIENCE
                </span>
              </h1>
              <p className="mt-4 max-w-md mx-auto lg:mx-0 text-white/70 text-sm md:text-base font-inter leading-relaxed">
                Rotate your device and step into the neon arena where every swipe, dodge, and strike decides the match.
              </p>

              {/* Rotate indicator card */}
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-[#bd00ff]/40 bg-[rgba(20,0,46,0.6)] px-5 py-3 shadow-[0_0_20px_rgba(189,0,255,0.15)]">
                <div className="w-10 h-10 rounded-lg border border-[#bd00ff]/50 bg-[#bd00ff]/10 flex items-center justify-center">
                  <span className="text-lg" style={{ animation: "rotatePhone 4s ease-in-out infinite" }}>📱</span>
                </div>
                <div className="text-left">
                  <p className="font-russo text-xs uppercase tracking-[0.13em] text-white">Rotate to Landscape</p>
                  <p className="text-[10px] text-white/50 font-inter">For full arena view</p>
                </div>
              </div>
            </div>

            {/* CENTER: Phone with Game Screen — THE CENTERPIECE */}
            <div className="relative flex justify-center" style={{ animation: "fadeSlideUp 1s ease-out 0.3s both" }}>
              {/* Outer glow behind phone */}
              <div className="absolute inset-0 -m-8 bg-[radial-gradient(ellipse_at_center,rgba(189,0,255,0.20),rgba(0,200,255,0.08),transparent_70%)] blur-xl" />

              {/* Reference image — cinematic centerpiece */}
              <div className="relative">
                <Image
                  src="/how to play.png"
                  alt="ZUNO gameplay — hands holding phone with live combat"
                  width={820}
                  height={520}
                  className="relative z-10 drop-shadow-[0_20px_60px_rgba(189,0,255,0.3)]"
                  priority
                />

                {/* Animated glow overlays on the phone screen area */}
                <div className="absolute top-[15%] left-[18%] right-[18%] bottom-[18%] z-20 pointer-events-none overflow-hidden rounded-lg">
                  {/* Damage flash */}
                  <div className="absolute inset-0 bg-[#ff2bd6]/0 rounded-lg" style={{ animation: "damageFlash 8s ease-in-out infinite" }} />

                  {/* Combat particles floating up from screen */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`sp-${i}`}
                      className="absolute rounded-full"
                      style={{
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                        left: `${15 + Math.random() * 70}%`,
                        bottom: `${Math.random() * 40}%`,
                        background: ["#ff7a00", "#00c8ff", "#ff2bd6", "#ffd21f"][i % 4],
                        opacity: 0.4,
                        animation: `floatParticle ${4 + Math.random() * 6}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 4}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Tap to Attack callout */}
            <div className="hidden lg:flex flex-col items-start gap-6" style={{ animation: "fadeSlideUp 1s ease-out 0.6s both" }}>
              {/* Attack callout */}
              <div className="rounded-xl border border-[#ff7a00]/40 bg-[rgba(20,0,46,0.7)] px-5 py-4 shadow-[0_0_20px_rgba(255,122,0,0.12)] max-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#ff7a00] bg-[#ff7a00]/15 flex items-center justify-center" style={{ "--btn-color": "#ff7a00", animation: "buttonPulse 2s ease-in-out infinite" } as React.CSSProperties}>
                    <span className="text-xs">⚔️</span>
                  </div>
                  <p className="font-russo text-xs uppercase tracking-[0.13em] text-[#ff7a00]">Tap to Attack</p>
                </div>
                <p className="text-[11px] text-white/60 font-inter leading-relaxed">Unleash powerful combo strikes against your opponent</p>
              </div>

              {/* Dodge callout */}
              <div className="rounded-xl border border-[#00c8ff]/40 bg-[rgba(20,0,46,0.7)] px-5 py-4 shadow-[0_0_20px_rgba(0,200,255,0.12)] max-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#00c8ff] bg-[#00c8ff]/15 flex items-center justify-center" style={{ "--btn-color": "#00c8ff", animation: "buttonPulse 2.5s ease-in-out infinite 0.5s" } as React.CSSProperties}>
                    <span className="text-xs">💨</span>
                  </div>
                  <p className="font-russo text-xs uppercase tracking-[0.13em] text-[#00c8ff]">Swipe to Dodge</p>
                </div>
                <p className="text-[11px] text-white/60 font-inter leading-relaxed">Perfect dodge triggers counter window</p>
              </div>

              {/* Ultimate callout */}
              <div className="rounded-xl border border-[#ffd21f]/40 bg-[rgba(20,0,46,0.7)] px-5 py-4 shadow-[0_0_20px_rgba(255,210,31,0.12)] max-w-[220px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full border-2 border-[#ffd21f] bg-[#ffd21f]/15 flex items-center justify-center" style={{ "--btn-color": "#ffd21f", animation: "buttonPulse 3s ease-in-out infinite 1s" } as React.CSSProperties}>
                    <span className="text-xs">⚡</span>
                  </div>
                  <p className="font-russo text-xs uppercase tracking-[0.13em] text-[#ffd21f]">Ultimate Strike</p>
                </div>
                <p className="text-[11px] text-white/60 font-inter leading-relaxed">When energy is full, detonate for massive damage</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== ANIMATED HUD STRIP ===== */}
      <section className="relative z-10 py-6">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl border border-[#bd00ff]/30 bg-[linear-gradient(180deg,rgba(20,0,46,0.7)_0%,rgba(2,6,23,0.9)_100%)] overflow-hidden shadow-[0_0_40px_rgba(189,0,255,0.12)]">
            {/* Shimmer bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, #bd00ff, #00c8ff, #ff2bd6, transparent)", backgroundSize: "200% 100%", animation: "shimmer 3s linear infinite" }} />

            <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-4">
              {/* HP bar */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#00c8ff] bg-[#00c8ff]/10 flex items-center justify-center text-sm">🐺</div>
                <div>
                  <p className="font-russo text-[9px] uppercase tracking-[0.15em] text-[#00c8ff]">RAYO — HP</p>
                  <div className="w-28 md:w-36 h-3 rounded-full bg-white/10 overflow-hidden mt-0.5">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#00c8ff,#00ff88)]" style={{ animation: "slideHpBar 6s ease-in-out infinite" }} />
                  </div>
                </div>
              </div>

              {/* Combo counter */}
              <div className="text-center" style={{ animation: "comboCount 4s ease-in-out infinite" }}>
                <p className="font-russo text-[9px] uppercase tracking-[0.15em] text-white/50">Combo</p>
                <p className="font-bangers text-2xl tracking-wider text-[#ffd21f] drop-shadow-[0_0_8px_rgba(255,210,31,0.5)]">x14</p>
              </div>

              {/* Timer */}
              <div className="text-center">
                <p className="font-russo text-[9px] uppercase tracking-[0.15em] text-white/50">Time</p>
                <p className="font-bangers text-lg tracking-wider text-white">01:30</p>
              </div>

              {/* Enemy HP */}
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-russo text-[9px] uppercase tracking-[0.15em] text-[#ff2bd6] text-right">BAMBO — HP</p>
                  <div className="w-28 md:w-36 h-3 rounded-full bg-white/10 overflow-hidden mt-0.5">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#ff2bd6,#ff7a00)]" style={{ width: "65%", animation: "slideHpBar 8s ease-in-out infinite 2s" }} />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-[#ff2bd6] bg-[#ff2bd6]/10 flex items-center justify-center text-sm">🐼</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MASTER THE CONTROLS ===== */}
      <section className="relative z-10 py-10 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.05),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10" style={{ animation: "fadeSlideUp 0.8s ease-out both" }}>
            <h2 className="font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em]">
              <span className="text-white">MASTER THE </span>
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f,#ff7a00)]">CONTROLS</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: "SWIPE", desc: "Move & dash", icon: "👆", color: "#00c8ff", delay: "0s" },
              { label: "ATK", desc: "Combo strikes", icon: "⚔️", color: "#ff7a00", delay: "0.15s" },
              { label: "DODGE", desc: "Perfect evade", icon: "💨", color: "#ff2bd6", delay: "0.3s" },
              { label: "ULT", desc: "Ultimate power", icon: "⚡", color: "#ffd21f", delay: "0.45s" },
              { label: "JUMP", desc: "Aerial combat", icon: "🦘", color: "#7cff00", delay: "0.6s" },
            ].map((btn) => (
              <div key={btn.label} className="flex flex-col items-center gap-3" style={{ animation: `fadeSlideUp 0.6s ease-out ${btn.delay} both` }}>
                <div
                  className="w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 rounded-full border-[3px] flex items-center justify-center text-xl"
                  style={{
                    borderColor: btn.color,
                    backgroundColor: `${btn.color}15`,
                    "--btn-color": btn.color,
                    animation: `buttonPulse 2.5s ease-in-out infinite ${btn.delay}`,
                  } as React.CSSProperties}
                >
                  {btn.icon}
                </div>
                <div className="text-center">
                  <p className="font-russo text-xs uppercase tracking-[0.13em]" style={{ color: btn.color }}>{btn.label}</p>
                  <p className="text-[10px] text-white/50 font-inter mt-0.5">{btn.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe indicator animation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={`la-${i}`} className="text-[#00c8ff] text-lg font-bold" style={{ animation: `swipeArrowLeft 1.5s ease-in-out infinite ${i * 0.15}s`, opacity: 0.3 + i * 0.3 }}>‹</span>
              ))}
            </div>
            <span className="font-russo text-[10px] uppercase tracking-[0.15em] text-white/50">Swipe to move</span>
            <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <span key={`ra-${i}`} className="text-[#00c8ff] text-lg font-bold" style={{ animation: `swipeArrow 1.5s ease-in-out infinite ${i * 0.15}s`, opacity: 0.3 + i * 0.3 }}>›</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ===== MASTER THE ARENA — 3 STEPS ===== */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(189,0,255,0.06),transparent_65%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em]">
              <span className="text-white">MASTER THE </span>
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#00c8ff,#bd00ff)]">ARENA</span>
            </h2>
            <p className="mt-3 text-white/50 text-sm font-inter max-w-lg mx-auto">Three core mechanics separate rookies from legends.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01", title: "SWIPE TO MOVE", color: "#00c8ff", glow: "rgba(0,200,255,0.15)",
                desc: "Drag fast to dash in and out of range. Control spacing, bait attacks, punish hard. Movement is survival.",
                tip: "Pro tip: Double-swipe triggers a speed burst",
              },
              {
                step: "02", title: "ATTACK & EVADE", color: "#ff2bd6", glow: "rgba(255,43,214,0.15)",
                desc: "Tap ATK for pressure. Hit DODGE at the last second to trigger a perfect counter window. Timing is everything.",
                tip: "Pro tip: Perfect dodge = 2x counter damage",
              },
              {
                step: "03", title: "UNLEASH ULTIMATE", color: "#ffd21f", glow: "rgba(255,210,31,0.15)",
                desc: "When energy is full, detonate ULT to break guard, stun enemies, and flip the round. Save it for the kill.",
                tip: "Pro tip: Combine with elemental for bonus effect",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="group rounded-xl border bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden"
                style={{ borderColor: `${s.color}33`, boxShadow: `0 0 24px ${s.glow}` }}
              >
                {/* Shimmer on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`, backgroundSize: "200% 100%", animation: "shimmer 2s linear infinite" }} />

                {/* Step badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bangers text-lg text-white" style={{ borderColor: s.color, backgroundColor: `${s.color}15`, "--btn-color": s.color, animation: "buttonPulse 3s ease-in-out infinite" } as React.CSSProperties}>
                    {s.step}
                  </div>
                  <p className="font-russo text-[10px] uppercase tracking-[0.2em]" style={{ color: s.color }}>Step {s.step}</p>
                </div>

                <h3 className="font-bangers text-xl tracking-[0.05em] text-white mb-3">{s.title}</h3>
                <p className="text-sm text-white/60 font-inter leading-relaxed mb-4">{s.desc}</p>

                {/* Energy bar */}
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 mb-3">
                  <div className="flex justify-between text-[9px] uppercase text-white/40 font-russo tracking-wider mb-1">
                    <span>Mastery</span><span>Advanced</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "75%", background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`, animation: "energyPulse 3s ease-in-out infinite" }} />
                  </div>
                </div>

                {/* Pro tip */}
                <p className="text-[10px] text-white/40 font-inter italic">💡 {s.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== ELEMENTAL POWERS ===== */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(0,200,255,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-bangers text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[0.04em]">
              <span className="text-white">ELEMENTAL </span>
              <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#7cff00,#00c8ff)]">POWERS</span>
            </h2>
            <p className="mt-3 text-white/50 text-sm font-inter max-w-xl mx-auto">
              Each hero channels a unique element. Chain elements together for devastating fusion attacks.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Fire", icon: "🔥", color: "#ff7a00", desc: "Burn stacks — damage over time", combo: "Fire + Ice = Steam Burst" },
              { name: "Ice", icon: "❄️", color: "#00c8ff", desc: "Freeze & slow enemies", combo: "Ice + Electric = Cryo Shock" },
              { name: "Rift", icon: "🌀", color: "#bd00ff", desc: "Warp space & teleport", combo: "Rift + Nature = Void Bloom" },
              { name: "Nature", icon: "🌿", color: "#7cff00", desc: "Shield regen & heal", combo: "Nature + Fire = Solar Flare" },
              { name: "Electric", icon: "⚡", color: "#ffd21f", desc: "Chain lightning shock", combo: "Electric + Rift = Plasma Storm" },
            ].map((el, i) => (
              <div
                key={el.name}
                className="group rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,0,46,0.65)_0%,rgba(2,6,23,0.85)_100%)] p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
                style={{ borderTop: `3px solid ${el.color}`, boxShadow: `0 0 20px ${el.color}15` }}
              >
                {/* Pulsing energy orb */}
                <div className="relative w-14 h-14 mx-auto mb-3">
                  <div className="absolute inset-0 rounded-full" style={{ backgroundColor: `${el.color}15`, animation: `energyPulse 2.5s ease-in-out infinite ${i * 0.3}s` }} />
                  <div className="absolute inset-[3px] rounded-full border-2 flex items-center justify-center text-2xl" style={{ borderColor: `${el.color}55`, "--btn-color": el.color, animation: `buttonPulse 3s ease-in-out infinite ${i * 0.5}s` } as React.CSSProperties}>
                    {el.icon}
                  </div>
                </div>
                <h3 className="font-russo text-xs uppercase tracking-[0.13em] mb-1" style={{ color: el.color }}>{el.name}</h3>
                <p className="text-[11px] text-white/60 font-inter mb-2">{el.desc}</p>
                <div className="rounded border border-white/5 bg-white/5 px-2 py-1">
                  <p className="text-[9px] text-white/40 font-inter italic">{el.combo}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fusion chain visual */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {["🔥", "→", "❄️", "→", "🌀", "→", "🌿", "→", "⚡"].map((item, i) => (
              <span
                key={`chain-${i}`}
                className={`${item === "→" ? "text-white/30 text-sm" : "text-lg"}`}
                style={item !== "→" ? { animation: `energyPulse 2s ease-in-out infinite ${i * 0.2}s` } : {}}
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-center mt-2 font-russo text-[9px] uppercase tracking-[0.2em] text-white/30">Element Fusion Chain</p>
        </div>
      </section>
      {/* ===== CINEMATIC CTA ===== */}
      <section className="relative z-10 py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,122,0,0.10),transparent_55%)]" style={{ animation: "pulseGlow 5s ease-in-out infinite" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(189,0,255,0.06),transparent_50%)]" />
        <div className="relative text-center max-w-2xl mx-auto px-4">
          <h2 className="font-bangers text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.92] tracking-[0.04em] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffd21f_0%,#ff7a00_45%,#ff2bd6_100%)] drop-shadow-[0_5px_8px_rgba(0,0,0,0.65)]">
            READY TO FIGHT?
          </h2>
          <p className="mt-4 text-white/60 text-sm md:text-base font-inter max-w-md mx-auto leading-relaxed">
            Step into the arena. Master your hero. Dominate every round. Your legend starts now.
          </p>

          {/* Animated action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg border-[2.5px] border-black bg-[linear-gradient(180deg,#ffd21f_0%,#ff7a00_100%)] text-black font-russo font-black uppercase tracking-[0.13em] text-sm shadow-[0_0_28px_rgba(255,122,0,0.55),5px_5px_0_#14002e] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,122,0,0.7),5px_7px_0_#14002e]"
            >
              🐾 Play Zuno Now
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border-2 border-[#bd00ff]/50 bg-[rgba(20,0,46,0.6)] text-white font-russo uppercase tracking-[0.13em] text-sm shadow-[0_0_16px_rgba(189,0,255,0.2)] transition-all hover:-translate-y-1 hover:border-[#bd00ff]/80 hover:shadow-[0_0_28px_rgba(189,0,255,0.35)]"
            >
              ▶ Watch Trailer
            </a>
          </div>

          {/* Floating character icons */}
          <div className="mt-10 flex items-center justify-center gap-6">
            {[
              { emoji: "🐺", color: "#00c8ff" },
              { emoji: "🦊", color: "#ff7a00" },
              { emoji: "🐱", color: "#ff2bd6" },
              { emoji: "🐼", color: "#7cff00" },
            ].map((c, i) => (
              <div
                key={c.emoji}
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl"
                style={{
                  borderColor: c.color,
                  backgroundColor: `${c.color}12`,
                  "--btn-color": c.color,
                  animation: `buttonPulse 3s ease-in-out infinite ${i * 0.4}s`,
                } as React.CSSProperties}
              >
                {c.emoji}
              </div>
            ))}
          </div>
          <p className="mt-3 font-russo text-[9px] uppercase tracking-[0.2em] text-white/30">Choose your hero</p>
        </div>
      </section>

      {/* ===== KEYFRAMES ===== */}
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          25% { transform: translate(15px, -30px) scale(1.3); opacity: 0.35; }
          50% { transform: translate(-10px, -60px) scale(0.8); opacity: 0.2; }
          75% { transform: translate(20px, -20px) scale(1.1); opacity: 0.3; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; filter: blur(20px); }
          50% { opacity: 0.8; filter: blur(30px); }
        }
        @keyframes slideHpBar {
          0%, 70% { width: 88%; }
          75% { width: 72%; }
          80%, 95% { width: 72%; }
          100% { width: 88%; }
        }
        @keyframes comboCount {
          0%, 60% { opacity: 1; transform: scale(1); }
          65% { opacity: 1; transform: scale(1.35); }
          70% { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes buttonPulse {
          0%, 100% { box-shadow: 0 0 8px var(--btn-color), inset 0 0 4px var(--btn-color); transform: scale(1); }
          50% { box-shadow: 0 0 20px var(--btn-color), inset 0 0 10px var(--btn-color); transform: scale(1.08); }
        }
        @keyframes swipeArrow {
          0%, 100% { transform: translateX(0); opacity: 0.4; }
          50% { transform: translateX(12px); opacity: 1; }
        }
        @keyframes swipeArrowLeft {
          0%, 100% { transform: translateX(0); opacity: 0.4; }
          50% { transform: translateX(-12px); opacity: 1; }
        }
        @keyframes energyPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes rotatePhone {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(90deg); }
          50%, 75% { transform: rotate(90deg); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes damageFlash {
          0%, 90%, 100% { opacity: 0; }
          92% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
