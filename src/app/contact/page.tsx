"use client";

import Link from "next/link";
import { Mail, MessageSquare, Send, Compass, Zap, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const contactCards = [
    {
      title: "General Inquiries",
      desc: "Questions about game lore, partner relations, or press operations.",
      val: "hello@zunogame.app",
      icon: <Compass className="h-5 w-5 text-neon-orange" />,
    },
    {
      title: "Player Support",
      desc: "Having combat errors or coin balance validation issues?",
      val: "support@zunogame.app",
      icon: <Zap className="h-5 w-5 text-electric-blue" />,
    },
    {
      title: "Security & Exploits",
      desc: "Report cheating patterns or VPS telemetry anomalies.",
      val: "security@zunogame.app",
      icon: <ShieldAlert className="h-5 w-5 text-neon-purple" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Mail className="h-4 w-4 text-electric-blue" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-electric-blue glow-text-blue">
              Contact Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">ZUNO</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Have ideas, feedback, or telemetry issues to report? Reach out to our operational team.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCards.map((card) => (
            <div key={card.title} className="glass-panel p-6 rounded-2xl glow-border-blue flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="p-2 w-max bg-white/5 rounded-lg">
                  {card.icon}
                </div>
                <h3 className="font-orbitron font-bold text-white uppercase text-sm tracking-wider">{card.title}</h3>
                <p className="text-gray-400 text-xs font-semibold leading-relaxed">{card.desc}</p>
              </div>
              <div className="text-sm font-bold text-white tracking-wide font-orbitron hover:text-electric-blue transition-colors duration-200 cursor-pointer pt-2">
                {card.val}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form Container */}
        <div className="max-w-3xl mx-auto glass-panel p-8 rounded-3xl glow-border-orange bg-gradient-to-br from-[#060b26]/80 to-[#030712]/95 space-y-6">
          <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Send className="h-5 w-5 text-neon-orange animate-pulse" /> Launch Message Vector
          </h3>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name / Character Tag"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
              />
            </div>
            <input
              type="text"
              placeholder="Query Subject"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
            />
            <textarea
              rows={5}
              placeholder="Detail your request or event telemetry..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
            />
            <button
              type="button"
              onClick={() => alert("Message simulated! Active VPS endpoint integrations will capture this packet.")}
              className="w-full py-4 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-neon-orange to-neon-purple text-white shadow-[0_0_12px_rgba(255,107,0,0.4)] hover:scale-105 transition-transform duration-200"
            >
              Submit Ticket
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
