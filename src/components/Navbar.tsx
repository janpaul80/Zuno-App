"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#030214]/80 to-transparent backdrop-blur-sm transition-all duration-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo Section - Glowing Drop Shadow */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center">
              <img
                src="/zuno-logo.png"
                alt="ZUNO Logo"
                className="h-12 sm:h-16 w-auto object-contain transition-all duration-200 group-hover:scale-105 group-hover:-rotate-1 filter drop-shadow-[0_0_12px_rgba(0,210,255,0.4)]"
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
                  className={`relative px-4 py-2 font-russo text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "text-zuno-blue drop-shadow-[0_0_8px_#00d2ff]"
                      : "text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] hover:scale-105"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-zuno-blue to-zuno-purple" />
                  )}
                </Link>
              );
            })}
            
            {/* Play Now Skewed corner action button */}
            <Link
              href="/how-to-play"
              className="ml-6 px-6 py-2.5 rounded font-russo text-xs font-black uppercase tracking-widest game-skew-btn-gold"
            >
              <span>Play Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md border-2 border-zuno-blue bg-[#030214]/90 text-white shadow-[0_0_10px_rgba(0,210,255,0.3)] hover:bg-[#0c0824] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-[#030214]/95 border-b-2 border-zuno-blue backdrop-blur-md relative z-20">
          <div className="px-2 pt-4 pb-6 space-y-2 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 font-russo text-sm font-bold uppercase tracking-widest transition-all ${
                    isActive
                      ? "text-zuno-blue bg-white/5 border-l-4 border-zuno-blue"
                      : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
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
                className="block text-center w-full px-6 py-3.5 rounded font-russo text-sm font-bold uppercase tracking-widest game-skew-btn-gold"
              >
                <span>Play Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
