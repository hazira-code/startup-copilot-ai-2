import React from "react";
import { 
  Users, 
  CheckCircle, 
  TrendingUp, 
  AlertCircle, 
  Award, 
  Zap,
  ArrowRight
} from "lucide-react";
import { CompetitorAnalysisResult } from "../types";

interface CompetitorsViewProps {
  competitors: CompetitorAnalysisResult;
}

export default function CompetitorsView({ competitors }: CompetitorsViewProps) {
  return (
    <div id="competitors-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Competitors Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {competitors.competitors.map((comp, idx) => (
          <div key={idx} className="bg-[#101827] border border-white/5 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="font-bold text-white text-sm">{comp.name}</span>
                <span className={`text-[9px] font-mono tracking-widest px-2 py-0.5 rounded-full uppercase ${
                  comp.type === "Direct" 
                    ? "bg-red-500/10 border border-red-500/30 text-red-400" 
                    : comp.type === "Indirect" 
                      ? "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400" 
                      : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                }`}>
                  {comp.type} Competitor
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Core Features</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {comp.features.map((feat, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block uppercase font-semibold">Strength</span>
                    <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{comp.strength}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-pink-400 block uppercase font-semibold">Weakness</span>
                    <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{comp.weakness}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 mt-5 pt-3 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">ESTIMATED PRICING</span>
              <span className="text-xs font-mono font-bold text-cyan-400">{comp.pricing}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Gap Analysis & SWOT row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Gap Analysis */}
        <div className="lg:col-span-7 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Competitive Gap Analysis</h3>
              <p className="text-xs text-slate-500">Unexploited vacuums and strategic market openings</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-white/5 border border-white/5 p-4 rounded-xl">{competitors.gapAnalysis}</p>
        </div>

        {/* Competitor SWOT */}
        <div className="lg:col-span-5 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Market SWOT Synthesis</h3>
              <p className="text-xs text-slate-500">Consolidated competitive quadrant summary</p>
            </div>
          </div>
          
          <div className="space-y-3.5 flex-1 justify-center flex flex-col">
            {[
              { label: "Strengths", text: competitors.swot.strengths, color: "text-emerald-400 border-l-emerald-500" },
              { label: "Weaknesses", text: competitors.swot.weaknesses, color: "text-red-400 border-l-red-500" },
              { label: "Opportunities", text: competitors.swot.opportunities, color: "text-blue-400 border-l-blue-500" },
              { label: "Threats", text: competitors.swot.threats, color: "text-yellow-400 border-l-yellow-500" }
            ].map((swot, i) => (
              <div key={i} className={`p-3 rounded-xl border border-white/5 bg-white/5 border-l-2 ${swot.color}`}>
                <span className="text-[10px] font-mono tracking-wider block uppercase font-semibold">{swot.label}</span>
                <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">{swot.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
