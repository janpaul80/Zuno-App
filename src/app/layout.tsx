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
      <body className="bg-sky-50 text-slate-800 flex flex-col min-h-screen relative antialiased selection:bg-yellow-400 selection:text-black">
        
        {/* Saturated Daylight Gaming Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Saturated Daylight sky base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-50 to-amber-50" />
          
          {/* Vibrant glowing sunburst spots */}
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-yellow-300/15 blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-200/15 blur-[120px]" />
          
          {/* Subtle cartoon mesh pattern grids */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-75" />
          
          {/* Floating clouds shapes blur */}
          <div className="absolute top-[25%] right-[15%] w-80 h-32 bg-white/20 rounded-full blur-[40px]" />
          <div className="absolute top-[60%] left-[10%] w-96 h-40 bg-white/35 rounded-full blur-[50px]" />
        </div>

        {/* Global Navigation Console Deck */}
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
