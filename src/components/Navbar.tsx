"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldAlert } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About ZUNO", path: "/about" },
    { name: "How To Play", path: "/how-to-play" },
    { name: "Rewards & Coins", path: "/rewards" },
    { name: "AI Operations", path: "/ai-operations" },
    { name: "Support", path: "/support" },
    { name: "Legal Hub", path: "/legal" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo Section - Enriched size and impact */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-2">
              <img
                src="/zuno-logo.png"
                alt="ZUNO Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,107,0,0.8)] filter drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative px-4 py-2 rounded-md font-orbitron text-sm font-semibold tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-neon-orange glow-text-orange"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-neon-orange rounded shadow-[0_0_8px_#ff6b00]" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/how-to-play"
              className="ml-4 px-6 py-2.5 rounded-full font-orbitron text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-neon-orange to-neon-purple text-white glow-border-orange transition-transform duration-300 hover:scale-105"
            >
              Play Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8 text-neon-orange" /> : <Menu className="h-8 w-8 text-electric-blue" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 backdrop-blur-xl animate-float">
          <div className="px-2 pt-4 pb-6 space-y-2 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-md font-orbitron text-base font-bold tracking-widest ${
                    isActive
                      ? "text-neon-orange bg-white/5 glow-text-orange"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 px-4">
              <Link
                href="/how-to-play"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full px-6 py-3.5 rounded-full font-orbitron text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-neon-orange to-neon-purple text-white text-shadow-orange shadow-[0_0_15px_rgba(255,107,0,0.5)]"
              >
                Play Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
