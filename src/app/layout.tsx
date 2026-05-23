import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
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
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="bg-deep-navy text-gray-100 flex flex-col min-h-screen relative antialiased selection:bg-neon-orange selection:text-white">
        
        {/* Dynamic Background Layout */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Neon orange ambient orb */}
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-neon-orange/10 blur-[120px] animate-pulse-slow" />
          
          {/* Electric blue ambient orb */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-electric-blue/10 blur-[130px] animate-pulse-slow" />

          {/* Purple ambient center orb */}
          <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[150px]" />

          {/* Glowing gaming mesh grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#060b26_1px,transparent_1px),linear-gradient(to_bottom,#060b26_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20" />
        </div>

        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic page container */}
        <main className="flex-grow pt-28 md:pt-36 relative z-10">
          {children}
        </main>

        {/* Global Dark Theme Footer */}
        <Footer />
      </body>
    </html>
  );
}
