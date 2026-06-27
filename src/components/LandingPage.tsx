import { Sparkles, Play, Rocket, TrendingUp, ShieldCheck, Cpu } from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div id="landing-container" className="relative min-h-screen bg-[#050816] text-white flex flex-col justify-between overflow-hidden font-sans select-none">
      
      {/* Aurora gradients & Moving background layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-cyan-500/20 via-blue-600/10 to-transparent blur-[120px] animate-pulse" style={{ animationDuration: "18s" }} />
        <div className="absolute top-[30%] left-[40%] w-[350px] h-[350px] rounded-full bg-pink-500/10 blur-[90px]" />
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
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            STARTUP COPILOT <span className="text-cyan-400 text-xs tracking-widest font-mono border border-cyan-500/30 px-1.5 py-0.5 rounded ml-1 bg-cyan-950/40">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            id="header-launch-btn"
            onClick={onStart}
            className="px-5 py-2 text-sm font-medium tracking-wide bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl transition-all duration-300 backdrop-blur-md"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
          
          {/* Tagline chip */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium tracking-wider shadow-[0_0_15px_rgba(99,102,241,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span>THE NEXT-GEN STARTUP OS IS HERE</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl"
          >
            Build Your Next <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(129,140,248,0.2)]">
              Unicorn With AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl font-light leading-relaxed tracking-wide"
          >
            Validate startup ideas, analyze competitors, generate investor-ready pitch decks, discover revenue models, and accelerate growth using your AI co-founder.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <button 
              id="landing-cta-launch"
              onClick={onStart}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl font-semibold tracking-wide text-white transition-all duration-300 shadow-[0_4px_25px_rgba(79,70,229,0.45)] hover:shadow-[0_8px_35px_rgba(79,70,229,0.6)] cursor-pointer flex items-center gap-2 overflow-hidden hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              <span className="relative z-10 flex items-center gap-2">
                Launch Startup Copilot <Rocket className="w-5 h-5 text-white animate-bounce" />
              </span>
            </button>
            <button 
              id="landing-cta-demo"
              onClick={onStart}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-medium tracking-wide text-slate-300 transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-102"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              Watch Demo
            </button>
          </motion.div>

          {/* Features Grid Panel Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="w-full max-w-4xl mt-12 relative p-1.5 rounded-3xl bg-gradient-to-b from-white/10 to-white/0 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-cyan-500/10 to-transparent blur-md pointer-events-none" />
            <div className="bg-[#070b1a]/80 rounded-[22px] px-6 py-8 border border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center text-left">
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">AI Validation Score</h3>
                  <p className="text-xs text-slate-500">Real-time feasibility scan</p>
                </div>
              </div>

              <div className="h-px md:h-12 w-full md:w-px bg-white/10" />

              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">TAM/SAM/SOM Modeling</h3>
                  <p className="text-xs text-slate-500">Interactive financial charts</p>
                </div>
              </div>

              <div className="h-px md:h-12 w-full md:w-px bg-white/10" />

              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Investor Ready Deck</h3>
                  <p className="text-xs text-slate-500">Auto slide layouts & PPT export</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer statistics counters */}
      <footer className="relative z-10 w-full bg-[#030612]/60 border-t border-white/5 backdrop-blur-lg py-8">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-2xl md:text-3xl font-extrabold text-white tracking-tight">5,000+</span>
            <span className="text-xs font-mono text-slate-500 tracking-wider">IDEAS VALIDATED</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-extrabold text-cyan-400 tracking-tight">1,200+</span>
            <span className="text-xs font-mono text-slate-500 tracking-wider">DECKS CREATED</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-extrabold text-indigo-400 tracking-tight">95%</span>
            <span className="text-xs font-mono text-slate-500 tracking-wider">FOUNDER SATISFACTION</span>
          </div>
          <div>
            <span className="block text-2xl md:text-3xl font-extrabold text-pink-400 tracking-tight">50+</span>
            <span className="text-xs font-mono text-slate-500 tracking-wider">INDUSTRIES COVERED</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
