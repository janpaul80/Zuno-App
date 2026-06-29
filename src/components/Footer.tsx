import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Discord",
      href: "https://discord.gg/zuno",
      color: "hover:text-[#5865F2] hover:drop-shadow-[0_0_8px_#5865F2]",
      svg: (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/janpaul80/Zuno-App",
      color: "hover:text-[#f0f6fc] hover:drop-shadow-[0_0_8px_#ffffff]",
      svg: (
        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/zunogame",
      color: "hover:text-[#1DA1F2] hover:drop-shadow-[0_0_8px_#1DA1F2]",
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/zuno-game",
      color: "hover:text-[#0077B5] hover:drop-shadow-[0_0_8px_#0077B5]",
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/zunogame",
      color: "hover:text-[#E1306C] hover:drop-shadow-[0_0_8px_#E1306C]",
      svg: (
        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
  ];

  const siteLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Rewards", href: "/rewards" },
    { name: "Weapons", href: "/weapons" },
    { name: "Levels", href: "/levels" },
    { name: "Architecture", href: "/architecture" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "Support", href: "/support" },
    { name: "How To Play", href: "/how-to-play" },
    { name: "AI Operations", href: "/ai-operations" },
    { name: "Credits", href: "/credits" },
    { name: "Contact Us", href: "/contact" },
  ];

  const legalLinks = [
    { name: "Legal Hub", href: "/legal" },
    { name: "Terms of Use", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Code of Conduct", href: "/code-of-conduct" },
  ];

  return (
    <footer className="relative bg-[#020514] border-t border-white/10 text-gray-400 font-inter pt-12 sm:pt-16 pb-10 sm:pb-12 z-10 max-w-full overflow-x-hidden">
      {/* Decorative floating grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#060b26_1px,transparent_1px),linear-gradient(to_bottom,#060b26_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 sm:pb-12 border-b border-white/5">
          {/* Brand Presentation */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="/logo-zuno.png"
                alt="ZUNO"
                className="h-16 w-auto max-w-[10rem] object-contain drop-shadow-[0_0_8px_rgba(255,107,0,0.3)] hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 font-medium">
              ZUNO is a stylized 3D mobile platformer where players run through fantasy levels, earn coins and gems, unlock upgrades, and sync progress through an online backend.
            </p>
            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-10 w-10 items-center justify-center text-gray-500 transition-all duration-300 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-orbitron font-bold text-white tracking-widest text-sm uppercase mb-6 glow-text-blue">
              Game Guide
            </h3>
            <ul className="space-y-3.5">
              {siteLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-sm font-semibold hover:text-electric-blue transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Hub */}
          <div>
            <h3 className="font-orbitron font-bold text-white tracking-widest text-sm uppercase mb-6 glow-text-purple">
              Player Safeguard
            </h3>
            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block py-1.5 text-sm font-semibold hover:text-neon-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download & Ratings Portal */}
          <div className="space-y-8">
            <div>
              <h3 className="font-orbitron font-bold text-white tracking-widest text-sm uppercase mb-5 glow-text-orange">
                Download Now
              </h3>
              <div className="space-y-3.5">
                {/* Android App Portal */}
                <div className="flex items-center gap-3 bg-medium-navy/80 border border-white/10 rounded-xl p-3 glow-border-orange transition-all duration-300">
                  <div className="bg-black/40 rounded-lg p-1.5 text-neon-green">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.523 15.3l1.816 3.146a.545.545 0 0 1-.19.742.547.547 0 0 1-.741-.19l-1.838-3.187H7.43l-1.837 3.187a.547.547 0 0 1-.742.19.545.545 0 0 1-.189-.742L6.477 15.3H3.093A1.094 1.094 0 0 1 2 14.208V7.64A1.094 1.094 0 0 1 3.093 6.547h17.814A1.094 1.094 0 0 1 22 7.64v6.567a1.094 1.094 0 0 1-1.093 1.093h-3.384zM9 9.827a.827.827 0 1 0 0 1.654.827.827 0 0 0 0-1.654zm6 0a.827.827 0 1 0 0 1.654.827.827 0 0 0 0-1.654zm-3-5.597a.526.526 0 0 1-.527-.525V2.525c0-.29.236-.525.527-.525a.526.526 0 0 1 .527.525V3.7a.526.526 0 0 1-.527.527z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Get it on</div>
                    <div className="text-sm font-bold text-white tracking-wide">Android APK (Coming Soon)</div>
                  </div>
                </div>

                {/* Apple App Store Portal */}
                <div className="flex items-center gap-3 bg-medium-navy/80 border border-white/10 rounded-xl p-3 glow-border-blue transition-all duration-300">
                  <div className="bg-black/40 rounded-lg p-1.5 text-electric-blue">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.73-1.2 1.87-1.05 2.97 1.12.09 2.27-.58 3-1.41z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Download on the</div>
                    <div className="text-sm font-bold text-white tracking-wide">App Store (Coming Soon)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ESRB Ratings Placeholder */}
            <div>
              <div className="flex max-w-full items-center gap-4 bg-black/40 border border-white/5 rounded-lg p-3 sm:w-max">
                <div className="h-10 w-8 bg-white text-black font-black font-orbitron text-xl flex items-center justify-center rounded shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                  E
                </div>
                <div>
                  <div className="text-[9px] font-bold text-white tracking-widest font-orbitron uppercase">ESRB RATING</div>
                  <div className="text-[11px] font-extrabold text-white">Everyone</div>
                  <div className="text-[8px] text-gray-400">Comic Mischief, Fantasy Violence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower footer copyright, credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-semibold text-gray-500">
          <div className="text-center md:text-left space-y-1">
            <div>&copy; {currentYear} ZUNO Game Studio. All rights reserved.</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/imprint"
              className="inline-flex min-h-9 items-center text-electric-blue text-shadow-blue hover:text-white transition-colors duration-200"
            >
              Imprint
            </Link>
            <span className="hidden h-3 w-px bg-white/10 sm:inline-block" />
            <span className="text-gray-600">v1.0.0 (Production Build)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
