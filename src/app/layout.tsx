import type { Metadata } from "next";
import { Inter, Russo_One, Luckiest_Guy } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const russo = Russo_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-russo",
  display: "swap",
});

const luckiest = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-luckiest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZUNO — AI-Powered Animal Battle Adventure",
  description: "Explore the colorful, adventurous fantasy battle world of ZUNO. Level up your animal champions, earn coins, unlock upgrades, and explore an AI-balanced world created by Paul Hartmann.",
  keywords: ["ZUNO", "Animal Battle Game", "Mobile Game", "AI Game Director", "Paul Hartmann", "Action RPG", "Framer Motion", "Next.js Game"],
  authors: [{ name: "Paul Hartmann" }],
  openGraph: {
    title: "ZUNO — AI-Powered Animal Battle Adventure",
    description: "Explore the colorful, adventurous fantasy battle world of ZUNO. Level up your animal champions, earn coins, unlock upgrades, and explore an AI-balanced world.",
    url: "https://zunogame.app",
    siteName: "ZUNO Game",
    images: [
      {
        url: "/zuno-logo.png",
        width: 800,
        height: 600,
        alt: "ZUNO Animal Battle Adventure",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUNO — AI-Powered Animal Battle Adventure",
    description: "Explore the colorful, adventurous fantasy world of ZUNO created by Paul Hartmann.",
    images: ["/zuno-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${russo.variable} ${luckiest.variable}`}>
      <body className="bg-[#030214] text-white flex flex-col min-h-screen relative antialiased selection:bg-yellow-400 selection:text-black font-inter">
        
        {/* Saturated Cosmic Twilight Gaming Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          
          {/* Deep indigo background base */}
          <div className="absolute inset-0 bg-[#030214]" />
          
          {/* Saturated electric-blue light beams on left */}
          <div className="absolute top-0 left-[-10%] w-[80%] h-[90%] rounded-full bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.18)_0%,transparent_70%)] animate-nebula" />
          
          {/* Saturated magenta/fuchsia clouds on right */}
          <div className="absolute top-[20%] right-[-10%] w-[70%] h-[80%] rounded-full bg-[radial-gradient(circle_at_right,rgba(217,70,239,0.16)_0%,transparent_65%)] animate-pulse-slow" />
          
          {/* Saturated golden yellow/amber sunset glow at bottom left */}
          <div className="absolute bottom-[-10%] left-[5%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.12)_0%,transparent_60%)]" />

          {/* Saturated lime green flare spot */}
          <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[90px]" />

          {/* Videogame Halftone Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-80" />
          
          {/* Saturated horizontal glowing action lines */}
          <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
          <div className="absolute top-[70%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent" />

          {/* Floating Embers/Particles Effects */}
          <div className="absolute top-[80%] left-[15%] w-2.5 h-2.5 bg-yellow-400/40 rounded-full blur-[1px] animate-embers" style={{ animationDelay: "0s", animationDuration: "7s" }} />
          <div className="absolute top-[90%] left-[45%] w-1.5 h-1.5 bg-cyan-400/50 rounded-full blur-[0.5px] animate-embers" style={{ animationDelay: "2s", animationDuration: "9s" }} />
          <div className="absolute top-[75%] left-[70%] w-3 h-3 bg-pink-500/30 rounded-full blur-[1px] animate-embers" style={{ animationDelay: "4s", animationDuration: "8s" }} />
          <div className="absolute top-[85%] left-[85%] w-2 h-2 bg-emerald-400/40 rounded-full blur-[0.5px] animate-embers" style={{ animationDelay: "1s", animationDuration: "6s" }} />
          <div className="absolute top-[60%] left-[25%] w-1.5 h-1.5 bg-amber-500/35 rounded-full blur-[1px] animate-embers" style={{ animationDelay: "5.5s", animationDuration: "10s" }} />
        </div>

        {/* Global Transparent Navigation Console */}
        <Navbar />

        {/* Dynamic page container */}
        <main className="flex-grow pt-24 relative z-10">
          {children}
        </main>

        {/* Global Dark Theme Footer */}
        <Footer />
      </body>
    </html>
  );
}
