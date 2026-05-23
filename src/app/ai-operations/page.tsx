import Link from "next/link";
import { Cpu, Terminal, ShieldAlert, BarChart3, HelpCircle, Calendar, Sparkles } from "lucide-react";

export default function AIOperationsPage() {
  const operationsModules = [
    {
      name: "AI Game Director",
      desc: "Procedurally compiles high-impact level structures, distributes foliage/light configurations, and dictates ambient visual themes depending on game progression.",
      icon: <Terminal className="h-5 w-5 text-neon-orange" />,
      color: "glow-border-orange",
      metricName: "Level Variations Generated",
      metricVal: "14,802 / hr",
    },
    {
      name: "AI Level Balancer",
      desc: "Analyzes player win/loss records across stages in real-time, automatically adjusting combat parameters, cooldowns, and entity attack speeds.",
      icon: <BarChart3 className="h-5 w-5 text-neon-green" />,
      color: "glow-border-green",
      metricName: "Win-Ratio Target Drift",
      metricVal: "< 0.02%",
    },
    {
      name: "AI Economy Monitor",
      desc: "Performs real-time telemetry analysis of coin drops and upgrade costs, immediately intercepting memory manipulation or duplicate transaction attempts.",
      icon: <ShieldAlert className="h-5 w-5 text-electric-blue" />,
      color: "glow-border-blue",
      metricName: "Economy Integrity Score",
      metricVal: "99.98% Healthy",
    },
    {
      name: "AI Content Planner",
      desc: "Generates custom suggestions for upcoming seasonal events, quests, unique cosmetics, and skin ideas aligned with community playstyles.",
      icon: <Calendar className="h-5 w-5 text-neon-purple" />,
      color: "glow-border-purple",
      metricName: "Theme Ideas in Queue",
      metricVal: "48 Active",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 font-inter">
      <div className="space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <Cpu className="h-4 w-4 text-electric-blue" />
            <span className="text-xs font-orbitron font-extrabold uppercase tracking-widest text-electric-blue glow-text-blue">
              Game Telemetry
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-orbitron font-extrabold uppercase text-white tracking-wide leading-none">
            AI Operations
          </h1>
          <p className="text-gray-400 font-medium sm:text-lg">
            Inside the ZUNO backend, five distinct AI operations layers continuously supervise game dynamics, balance, and security.
          </p>
        </div>

        {/* Realtime Live Dashboard Mock */}
        <div className="glass-panel p-8 rounded-3xl glow-border-blue bg-gradient-to-br from-[#060b26]/70 to-[#030712]/95 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <h2 className="text-2xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-electric-blue animate-pulse" /> Live Telemetry Dashboard
              </h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">ZUNO VPS Operation Monitor &bull; Port 3006</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 bg-neon-green rounded-full animate-ping" />
              <span className="text-xs font-bold text-neon-green uppercase tracking-wider">Operational Integrity Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Telemetry Streams</div>
              <div className="text-xl font-orbitron font-extrabold text-white">41,208 / sec</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nginx Proxy Health</div>
              <div className="text-xl font-orbitron font-extrabold text-neon-green">100% Routed</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">PM2 Server Load</div>
              <div className="text-xl font-orbitron font-extrabold text-electric-blue">12.4% (PM2: zuno-app)</div>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Economy Safety Rate</div>
              <div className="text-xl font-orbitron font-extrabold text-neon-purple">99.999% Secured</div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {operationsModules.map((mod) => (
            <div key={mod.name} className={`glass-panel p-8 rounded-2xl ${mod.color} flex flex-col justify-between space-y-6`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/5 rounded-xl">{mod.icon}</div>
                  <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider">{mod.name}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-semibold">{mod.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-wider">{mod.metricName}:</span>
                <span className="text-white font-orbitron font-bold">{mod.metricVal}</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Support Assistant Callout */}
        <div className="glass-panel p-8 rounded-3xl glow-border-purple max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-orbitron font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-neon-purple" /> AI Support Assistant
            </h3>
            <p className="text-gray-400 text-sm font-semibold max-w-lg leading-relaxed">
              Facing questions or level difficulties? Our smart support assistant helps review level logs, answers combat questions, and generates bug tickets directly on the Support page.
            </p>
          </div>
          <Link
            href="/support"
            className="px-6 py-3 rounded-full font-orbitron font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-neon-purple to-electric-blue text-white shadow-[0_0_12px_#bd00ff] hover:scale-105 transition-transform duration-300 flex-shrink-0"
          >
            Chat with AI Support
          </Link>
        </div>

      </div>
    </div>
  );
}
