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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,0.1)]">
      {/* Dynamic comic-diagonal stripes overlay inside the header */}
      <div className="absolute inset-0 comic-stripes opacity-[0.2] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-24 md:h-28">
          {/* Logo Section - Extra Enlarged for Maximum Impact */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center">
              <img
                src="/zuno-logo.png"
                alt="ZUNO Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain transition-all duration-200 group-hover:scale-105 group-hover:-rotate-1 filter drop-shadow-[2px_2px_0px_#000]"
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
                  className={`relative px-4 py-2 rounded font-russo text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-150 ${
                    isActive
                      ? "text-orange-600 bg-amber-50 border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                      : "text-slate-800 hover:text-black hover:bg-slate-100/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/how-to-play"
              className="ml-4 px-6 py-3 rounded-xl font-russo text-xs font-bold uppercase tracking-widest game-btn-gold"
            >
              Play Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] text-black hover:bg-slate-50 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden bg-[#fffbeb] border-b-4 border-black relative z-20">
          <div className="px-2 pt-4 pb-6 space-y-2 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded font-russo text-sm font-bold uppercase tracking-widest border-2 transition-all ${
                    isActive
                      ? "bg-amber-100 border-black text-orange-600 shadow-[2px_2px_0px_0px_#000]"
                      : "border-transparent text-slate-800 hover:bg-black/5"
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
                className="block text-center w-full px-6 py-3.5 rounded-xl font-russo text-sm font-bold uppercase tracking-widest game-btn-gold"
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
