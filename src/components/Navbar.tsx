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
    { name: "About", path: "/about" },
    { name: "Rewards", path: "/rewards" },
    { name: "Weapons", path: "/weapons" },
    { name: "Levels", path: "/levels" },
    { name: "Architecture", path: "/architecture" },
    { name: "Support", path: "/support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 w-full max-w-full overflow-x-hidden bg-[#030214]/80 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-20 sm:h-24 min-w-0">
          <div className="flex-shrink-0 flex items-center min-w-0">
            <Link href="/" className="group flex items-center min-w-0">
              <img
                src="/logo-zuno.png"
                alt="ZUNO"
                className="h-10 sm:h-12 w-auto max-w-[8rem] object-contain drop-shadow-[0_0_12px_rgba(255,107,0,0.4)] group-hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3 xl:gap-5 absolute left-1/2 -translate-x-1/2">
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
          </div>

          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-zuno-blue bg-[#030214]/90 text-white shadow-[0_0_10px_rgba(0,210,255,0.3)] hover:bg-[#0c0824] focus:outline-none focus:ring-2 focus:ring-zuno-blue/60"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed left-0 right-0 top-20 sm:top-24 z-20 max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-6rem)] max-w-full overflow-y-auto overflow-x-hidden bg-[#030214]/95 border-b-2 border-zuno-blue backdrop-blur-md">
          <div className="px-3 pt-4 pb-6 space-y-2 sm:px-4">
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
          </div>
        </div>
      )}
    </nav>
  );
}
