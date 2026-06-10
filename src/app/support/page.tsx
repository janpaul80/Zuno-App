"use client";

import { useState } from "react";
import { HelpCircle, Mail, MessageSquare, Send, ShieldAlert, Sparkles, AlertTriangle } from "lucide-react";

export default function SupportPage() {
  // Chat Widget State
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Greetings Champion! I am the ZUNO AI Operations Support Assistant. How can I help you in your adventure today?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // FAQ Active State
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is ZUNO and who created it?",
      a: "ZUNO is an adventurous animal battle fantasy game where players level up elemental champions, gather currency, and explore balanced worlds. ZUNO was created by Paul Hartmann.",
    },
    {
      q: "How does the AI-powered progression balance work?",
      a: "ZUNO integrates five distinct AI operations layers. Our AI Level Balancer and AI Game Director continuously inspect telemetry metrics to adjust difficulty ranges, drop ratios, and ensure cheat-free gameplay.",
    },
    {
      q: "When can we download the Android APK and iOS Apple App?",
      a: "We are actively polishing the mobile client builds! The Android APK and Apple App Store editions are marked as 'Coming Soon' and will be released following our production smoke reviews.",
    },
    {
      q: "Are coin changes secured on the server?",
      a: "Absolutely. All currency accumulation, shop purchases, and upgrades must pass through strict server-side validation logic. The AI operations layer screens telemetry to block cheating.",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let reply = "I am processing your query across the ZUNO operations matrix. Let me review your champion state.";
      const lower = userText.toLowerCase();

      if (lower.includes("coin") || lower.includes("reward") || lower.includes("upgrade")) {
        reply = "All coin economy adjustments are securely validated by our server database to prevent duplication cheats. You can review available upgrades inside our Rewards page!";
      } else if (lower.includes("play") || lower.includes("control") || lower.includes("keys")) {
        reply = "ZUNO uses a responsive keyboard layout (W-A-S-D to navigate, Space to Dodge, Q/E to cast elemental spells). You can review all bindings in our How To Play section.";
      } else if (lower.includes("creator") || lower.includes("paul") || lower.includes("hartmann")) {
        reply = "ZUNO was created by Paul Hartmann, built upon custom modern art direction and advanced AI operations integration.";
      } else if (lower.includes("bug") || lower.includes("exploit") || lower.includes("cheat")) {
        reply = "Please use our Bug Report or Contact forms on this page. All telemetry logs are monitored by the AI Economy layer to isolate issues.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative z-10 font-inter overflow-x-hidden">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <MessageSquare className="h-4 w-4 text-neon-orange" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-neon-orange glow-text-orange">
              Player Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-tight sm:leading-none break-words">
            Support & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange via-neon-purple to-electric-blue">FAQ</span>
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Have questions about combat mechanics, server validation, or mobile releases? Get in touch with us directly.
          </p>
        </div>

        {/* Dynamic Split Layout: Chat Assistant + FAQ Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* AI Support Chatbot Widget */}
          <div className="glass-panel rounded-3xl p-4 sm:p-6 glow-border-purple space-y-4 bg-gradient-to-b from-[#060b26]/80 to-[#030712]/95 backdrop-blur-md min-w-0">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 bg-neon-purple/15 flex items-center justify-center rounded-lg text-neon-purple">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-white text-sm uppercase tracking-wider">AI Support Assistant</h3>
                  <span className="text-[10px] text-neon-green font-bold uppercase tracking-wider">Online &bull; Level Telemetry Active</span>
                </div>
              </div>
              <span className="h-2 w-2 bg-neon-green rounded-full animate-ping" />
            </div>

            {/* Chat Messages Logs */}
            <div className="h-64 sm:h-80 max-h-[60vh] overflow-y-auto space-y-4 p-3 bg-black/40 rounded-2xl scrollbar-thin scrollbar-thumb-neon-orange">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-neon-purple text-white rounded-tr-none"
                        : "bg-medium-navy border border-white/10 text-gray-300 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-medium-navy border border-white/10 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                    AI Assistant is thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Chat Send Input Form */}
            <form onSubmit={handleSendMessage} className="flex gap-2 min-w-0">
              <input
                type="text"
                placeholder="Ask about controls, coin validations, creator..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="min-w-0 flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-purple transition-all placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center bg-neon-purple text-white rounded-xl shadow-[0_0_12px_rgba(189,0,255,0.4)] hover:scale-105 transition-transform duration-200"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* FAQ accordions */}
          <div className="space-y-4">
            <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-neon-orange" /> Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFAQ === index;
                return (
                  <div
                    key={index}
                    className="glass-panel rounded-2xl overflow-hidden border border-white/5 transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFAQ(isOpen ? null : index)}
                      className="w-full text-left px-4 sm:px-6 py-5 flex items-start justify-between gap-4 font-orbitron font-bold text-sm tracking-wider uppercase text-white hover:bg-white/5 transition-colors duration-200"
                    >
                      <span>{faq.q}</span>
                      <span className={`text-xl font-bold text-neon-orange transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-gray-400 font-semibold border-t border-white/5 pt-4 bg-black/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Contact Us & Bug Report Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
          
          {/* General Contact Form */}
          <div className="glass-panel p-5 sm:p-8 rounded-3xl glow-border-blue space-y-6 min-w-0">
            <div className="space-y-1">
              <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Mail className="h-6 w-6 text-electric-blue" /> Send Message
              </h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email support: support@zunogame.app</p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-electric-blue"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-electric-blue"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-electric-blue"
              />
              <textarea
                rows={4}
                placeholder="Tell us what is on your mind..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-electric-blue"
              />
              <button
                type="button"
                onClick={() => alert("Message simulated! Production endpoints will hook here.")}
                className="w-full py-4 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-electric-blue to-neon-purple text-white shadow-[0_0_12px_rgba(0,210,255,0.4)] hover:scale-105 transition-transform duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Bug Report Form */}
          <div className="glass-panel p-5 sm:p-8 rounded-3xl glow-border-orange space-y-6 min-w-0">
            <div className="space-y-1">
              <h3 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-neon-orange" /> File Bug Report
              </h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Reports evaluated autonomously by AI Economy checks</p>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Player Username"
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
                />
                <select className="bg-[#060b26] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-gray-400 focus:outline-none focus:border-neon-orange">
                  <option>Easy Meadows Bug</option>
                  <option>Medium Volcano Bug</option>
                  <option>Hard Rift Boss Bug</option>
                  <option>Upgrade Shop Error</option>
                  <option>Cheating False Alert</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Game Client Version (e.g. v1.0.0)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
              />
              <textarea
                rows={4}
                placeholder="Provide detailed reproduction steps..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-white focus:outline-none focus:border-neon-orange"
              />
              <button
                type="button"
                onClick={() => alert("Bug report logged! All event parameters queued for VPS telemetry analysis.")}
                className="w-full py-4 rounded-xl font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-neon-orange to-neon-purple text-white shadow-[0_0_12px_rgba(255,107,0,0.4)] hover:scale-105 transition-transform duration-200"
              >
                Log Bug Report
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
