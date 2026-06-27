import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  Award, 
  MapPin, 
  CheckCircle, 
  Cpu, 
  RefreshCw, 
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { InvestorDiscoveryResult, Investor } from "../types";

interface InvestorDiscoveryProps {
  investorDiscovery: InvestorDiscoveryResult;
  startupName: string;
}

export default function InvestorDiscovery({ investorDiscovery, startupName }: InvestorDiscoveryProps) {
  
  const [activePitchInvestor, setActivePitchInvestor] = useState<Investor | null>(null);
  const [pitchingState, setPitchingState] = useState<"idle" | "scanning" | "success">("idle");
  const [pitchLog, setPitchLog] = useState<string[]>([]);

  const triggerPitchSubmittal = (investor: Investor) => {
    setActivePitchInvestor(investor);
    setPitchingState("scanning");
    setPitchLog(["Initializing cryptographic pitch envelope...", "Injecting Startup DNA fingerprint signatures..."]);

    setTimeout(() => {
      setPitchLog(prev => [...prev, `Resolving target compatibility coordinates with ${investor.name}...`, "Compressing pitch deck slide modules..."]);
    }, 1200);

    setTimeout(() => {
      setPitchLog(prev => [...prev, "Uploading encrypted vector indices to server...", "Awaiting investor gateway clinical triage response..."]);
    }, 2400);

    setTimeout(() => {
      setPitchingState("success");
    }, 4000);
  };

  return (
    <div id="investor-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* upper description banner */}
      <div className="flex items-center justify-between gap-4 p-5 bg-[#101827] border border-white/5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">VC Match Directory</h2>
            <p className="text-xs text-slate-500">Autonomous recommendation vectors mapping matching fund scopes</p>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
        {investorDiscovery.investors.map((inv, idx) => (
          <div key={idx} className="bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="font-bold text-white text-sm">{inv.name}</span>
                <span className={`text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase ${
                  inv.type === "Venture Capital" 
                    ? "bg-purple-500/10 border border-purple-500/30 text-purple-400" 
                    : inv.type === "Angel" 
                      ? "bg-pink-500/10 border border-pink-500/30 text-pink-400" 
                      : "bg-teal-500/10 border border-teal-500/30 text-teal-400"
                }`}>
                  {inv.type}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Focus Scopes</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {inv.focusAreas.map((area, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 block uppercase font-semibold">Active Stage</span>
                    <span className="text-xs text-slate-200 font-bold mt-0.5 block">{inv.fundingStage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 block uppercase font-semibold">Ticket Size</span>
                    <span className="text-xs text-slate-200 font-bold mt-0.5 block">{inv.range}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerPitchSubmittal(inv)}
              className="mt-6 w-full py-3 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
            >
              <span>Transmit DNA Pitch Envelope</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ))}
      </div>

      {/* Simulated pitch scanning modal overlay */}
      {activePitchInvestor && (
        <div id="pitch-modal" className="fixed inset-0 bg-[#050816]/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-[#101827] border border-white/10 rounded-2xl w-full max-w-lg shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            <div className="px-6 py-5 border-b border-white/5 bg-gradient-to-r from-red-950/20 to-indigo-950/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h3 className="font-semibold text-white">Transmitting Pitch: {activePitchInvestor.name}</h3>
              </div>
              {pitchingState === "success" && (
                <button 
                  onClick={() => {
                    setActivePitchInvestor(null);
                    setPitchingState("idle");
                  }}
                  className="text-slate-500 hover:text-white cursor-pointer transition-colors text-xs font-mono"
                >
                  ✕ CLOSE
                </button>
              )}
            </div>

            <div className="p-6 flex flex-col gap-5 min-h-[250px] justify-center">
              
              {pitchingState === "scanning" && (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                    <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin" style={{ animationDuration: "2s" }} />
                    <Sparkles className="absolute w-4.5 h-4.5 text-indigo-400 animate-bounce" />
                  </div>
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-semibold">Active telemetry beam scanner</span>
                  
                  {/* Console logs */}
                  <div className="mt-5 w-full bg-[#0d1324] border border-white/5 p-4 rounded-xl font-mono text-[9px] text-slate-400 space-y-1.5 h-32 overflow-y-auto">
                    {pitchLog.map((log, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <span className="text-indigo-400">⚡</span>
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {pitchingState === "success" && (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-white text-base">TRANSMISSION ENVELOPE SECURED</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-sm">
                    {activePitchInvestor.name} matches {startupName} at an active compatibility rank of <b>94%</b>.
                  </p>

                  <div className="mt-5 p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-xl flex items-center gap-3.5 text-left w-full">
                    <Calendar className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase font-semibold block">INVESTOR RESPONSE CALENDAR PROPOSAL</span>
                      <p className="text-xs text-slate-200 mt-0.5 font-bold">Tuesday at 2:00 PM (15-Min telemetry slot proposal sent!)</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {pitchingState === "success" && (
              <div className="px-6 py-4 border-t border-white/5 bg-[#0d1324] flex items-center justify-end">
                <button 
                  onClick={() => {
                    setActivePitchInvestor(null);
                    setPitchingState("idle");
                  }}
                  className="px-5 py-2.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  Accept & Log Slot
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
