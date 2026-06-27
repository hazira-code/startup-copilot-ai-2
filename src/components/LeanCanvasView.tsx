import React from "react";
import { 
  Layers, 
  HelpCircle, 
  CheckCircle, 
  Zap, 
  Users, 
  TrendingUp, 
  Target,
  Coins,
  FileText
} from "lucide-react";
import { LeanCanvasResult } from "../types";

interface LeanCanvasViewProps {
  canvas: LeanCanvasResult;
}

export default function LeanCanvasView({ canvas }: LeanCanvasViewProps) {
  
  const blocks = [
    { label: "1. Problem", items: canvas.problem, icon: HelpCircle, color: "text-red-400 border-t-red-500/20" },
    { label: "2. Solution", items: canvas.solution, icon: CheckCircle, color: "text-emerald-400 border-t-emerald-500/20" },
    { label: "3. Key Metrics", items: canvas.keyMetrics, icon: TrendingUp, color: "text-purple-400 border-t-purple-500/20" },
    { label: "4. Unique Value Proposition", items: [canvas.uniqueValueProposition], icon: Zap, color: "text-yellow-400 border-t-yellow-500/20" },
    { label: "5. Customer Segments", items: canvas.customerSegments, icon: Users, color: "text-blue-400 border-t-blue-500/20" },
    { label: "6. Channels", items: canvas.channels, icon: Target, color: "text-cyan-400 border-t-cyan-500/20" },
    { label: "7. Revenue Streams", items: canvas.revenueStreams, icon: Coins, color: "text-pink-400 border-t-pink-500/20" },
    { label: "8. Cost Structure", items: canvas.costStructure, icon: FileText, color: "text-orange-400 border-t-orange-500/20" }
  ];

  return (
    <div id="leancanvas-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Banner */}
      <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-yellow-950/10 via-[#101827] to-transparent rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-400">
          <Layers className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Interactive Lean Canvas Generator</h2>
          <p className="text-xs text-slate-500">Continuous business-model mapping synthesized by AI</p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
        
        {/* Render 8 blocks in customized bento layout */}
        {blocks.map((block, idx) => {
          const Icon = block.icon;
          const isUvp = block.label.includes("Unique Value");
          
          return (
            <div 
              key={idx} 
              className={`bg-[#101827] border border-white/5 border-t-2 ${block.color} rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md ${isUvp ? "md:col-span-2" : ""}`}
            >
              <div>
                <div className="flex items-center gap-2 border-b border-white/5 pb-2.5 mb-3.5">
                  <Icon className={`w-4 h-4 ${block.color}`} />
                  <span className="text-[10px] font-mono uppercase tracking-widest font-semibold text-slate-200">{block.label}</span>
                </div>

                <div className="space-y-2.5">
                  {block.items.map((item, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                      <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}
