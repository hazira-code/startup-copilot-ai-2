import { Sparkles, Play, Rocket, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div id="landing-container" className="relative min-h-screen bg-[#02040a] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* Animated Aurora Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#3b82f633] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "12s" }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf622] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: "18s" }}></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#06b6d411] rounded-full blur-[80px]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" style={{ animationDuration: "5s" }} />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">STARTUP COPILOT <span className="text-blue-500">AI</span></span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Intelligence</a>
          <a href="#" className="hover:text-white transition-colors">Investors</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            id="header-launch-btn"
            onClick={onStart}
            className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Launch App
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center px-10 py-12 gap-12 max-w-7xl mx-auto w-full">
        {/* Left side: Hero Text */}
        <div className="w-full md:w-1/2 space-y-8 text-left">
          
          {/* Tagline chip */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Next-Gen OS for Founders</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[52px] md:text-[72px] leading-[0.9] font-black tracking-tighter uppercase italic"
          >
            Build the <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Future's Next Unicorn
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-md leading-relaxed"
          >
            Validate ideas, analyze competitors, and generate investor-ready pitch decks using the most advanced AI co-founder ever built.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 pt-2"
          >
            <button 
              id="landing-cta-launch"
              onClick={onStart}
              className="px-8 py-4 bg-blue-600 rounded-xl font-bold text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform cursor-pointer"
            >
              Start Building Now
            </button>
            <button 
              id="landing-cta-demo"
              onClick={onStart}
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-lg backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer"
            >
              Watch Demo
            </button>
          </motion.div>

          {/* Floating Metrics (as per the Design HTML) */}
          <div className="flex gap-8 pt-6 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold">5,000+</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Ideas Validated</div>
            </div>
            <div>
              <div className="text-2xl font-bold">$1.2B+</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Funding Raised</div>
            </div>
            <div>
              <div className="text-2xl font-bold">95%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Right side: Interactive App Preview Card */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl overflow-hidden aspect-square flex flex-col justify-between">
            {/* Header of Mock UI */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-[10px] text-blue-400 uppercase font-bold tracking-widest mb-1">Project: NeoStream</div>
                <div className="text-2xl font-bold">Founder Dashboard</div>
              </div>
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-2xl">
                <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Startup Health</div>
                <div className="text-xl font-mono">89.4%</div>
              </div>
            </div>

            {/* Grid Layout for Widgets */}
            <div className="grid grid-cols-2 gap-4 flex-1 mb-16">
              {/* Market Share */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-tighter">TAM Analysis</div>
                <div className="flex items-end gap-2">
                  <div className="text-2xl font-bold">$42.5B</div>
                  <div className="text-green-400 text-xs mb-1">+12% YoY</div>
                </div>
                <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="w-[70%] h-full bg-blue-500"></div>
                </div>
              </div>
              
              {/* Competition */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                 <div className="text-xs text-gray-500 uppercase tracking-tighter">Market DNA</div>
                 <div className="flex justify-center py-1">
                   <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-purple-500 fill-purple-500/20 stroke-[2]">
                      <polygon points="50,5 95,30 95,75 50,95 5,75 5,30" />
                      <circle cx="50" cy="50" r="5" className="fill-white" />
                   </svg>
                 </div>
              </div>

              {/* Big Projector Graph */}
              <div className="col-span-2 bg-gradient-to-br from-white/5 to-transparent p-4 rounded-2xl border border-white/5">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold uppercase tracking-widest">Revenue Forecast</span>
                   <span className="text-[10px] text-gray-500">PROJECTION MODEL V4.2</span>
                 </div>
                 <div className="h-16 flex items-end gap-1 px-2">
                   <div className="w-full bg-blue-500/20 h-[20%] rounded-t-sm"></div>
                   <div className="w-full bg-blue-500/30 h-[35%] rounded-t-sm"></div>
                   <div className="w-full bg-blue-500/40 h-[25%] rounded-t-sm"></div>
                   <div className="w-full bg-blue-500/50 h-[55%] rounded-t-sm"></div>
                   <div className="w-full bg-blue-500/60 h-[75%] rounded-t-sm"></div>
                   <div className="w-full bg-blue-500/80 h-[65%] rounded-t-sm"></div>
                   <div className="w-full bg-blue-600 h-[100%] rounded-t-sm shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
                 </div>
              </div>
            </div>

            {/* Bottom Overlay AI Suggestion */}
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-blue-600/90 rounded-2xl backdrop-blur-xl border border-blue-400/30 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <div className="text-[11px] font-medium leading-tight">
                <span className="font-bold">AI Copilot:</span> "NeoStream shows high potential in the European market. Recommend competitor gap analysis."
              </div>
            </div>
          </div>

          {/* Tiny Floating Detail Elements */}
          <div className="absolute -top-4 -right-4 px-4 py-2 bg-purple-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl border border-purple-400/50">Unicorn Ready</div>
          <div className="absolute bottom-20 -left-10 px-4 py-3 bg-black/60 border border-white/10 rounded-xl backdrop-blur-lg flex gap-3 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-bold tracking-widest">Investor Feed Live</span>
          </div>
        </div>
      </main>

      {/* Bottom Bar Info / Footer */}
      <footer className="p-10 flex justify-between items-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em] z-20">
        <div>Silicon Valley | London | Singapore</div>
        <div>&copy; 2026 Startup Copilot. All Rights Reserved.</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </footer>

    </div>
  );
}
