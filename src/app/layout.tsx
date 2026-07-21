import type { Metadata } from "next";
import { Inter, Russo_One, Luckiest_Guy, Bangers, Orbitron } from "next/font/google";
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

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZUNO — 3D Mobile Platformer Adventure",
  description: "Explore ZUNO, a stylized Android 3D action-platformer with guided-camera levels, coins, gems, weapons, gadgets, online login, cloud inventory, shop, and multiplayer-ready backend services.",
  keywords: ["ZUNO", "3D Platformer", "Android APK", "Mobile Game", "Online Game", "Supabase", "Vercel", "Action Adventure", "Paul Hartmann"],
  authors: [{ name: "Paul-Hartmann LLC" }],
  openGraph: {
    title: "ZUNO — 3D Mobile Platformer Adventure",
    description: "Explore the colorful fantasy world of ZUNO with action-platformer levels, coins, upgrades, online progression, shop, and multiplayer-ready backend services.",
    url: "https://zunogame.app",
    siteName: "ZUNO Game",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZUNO — 3D Mobile Platformer Adventure",
    description: "Explore the stylized Android action-platformer world of ZUNO from Paul-Hartmann LLC.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${russo.variable} ${luckiest.variable} ${bangers.variable} ${orbitron.variable}`}>

      <body className="bg-[#020617] text-white flex flex-col min-h-screen w-full max-w-full relative antialiased selection:bg-[#ffd21f] selection:text-black font-inter overflow-x-hidden">
        {/* Cosmic background — deep navy base */}
        <div className="fixed inset-0 z-0 w-full max-w-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#020617]" />
          {/* Magenta nebula right */}
          <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_top_right,rgba(255,43,214,0.12),transparent_70%)]" />
          {/* Cyan nebula left */}
          <div className="absolute top-0 left-0 w-[70%] h-[70%] bg-[radial-gradient(circle_at_top_left,rgba(0,200,255,0.10),transparent_65%)]" />
          {/* Golden glow bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[50%] bg-[radial-gradient(circle_at_bottom,rgba(255,162,0,0.08),transparent_60%)]" />
          {/* Lime spark top center */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(124,255,0,0.06),transparent_70%)]" />
        </div>

        {/* Transparent Navigation */}
        <Navbar />

        {/* Dynamic page container */}
        <main className="flex-grow relative z-10 w-full max-w-full overflow-x-hidden pt-24 sm:pt-28">
          {children}
        </main>

        {/* Global Dark Theme Footer */}
        <Footer />
      </body>
    </html>
  );
}
