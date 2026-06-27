import React, { useState } from "react";
import { 
  Milestone, 
  CheckCircle, 
  Circle, 
  TrendingUp, 
  Award, 
  Target,
  ArrowRight
} from "lucide-react";
import { RoadmapResult, RoadmapMilestone } from "../types";

interface RoadmapViewProps {
  roadmap: RoadmapResult;
}

type PhaseType = "all" | "30" | "90" | "180" | "360";

export default function RoadmapView({ roadmap }: RoadmapViewProps) {
  const [activePhase, setActivePhase] = useState<PhaseType>("all");
  
  // Interactive checklist node tracker
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({
    "IP Protection & Optical Design": true,
    "Terrestrial Prototyping": false,
    "Seed Capital Closing": false,
    "Letters of Intent (LOIs)": false
  });

  const toggleCompleted = (title: string) => {
    setCompletedMilestones(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const phases = [
    { id: "all", label: "Full Horizon View" },
    { id: "30", label: "30-Day (Launchpad)" },
    { id: "90", label: "90-Day (Velocity)" },
    { id: "180", label: "6-Month (Scale)" },
    { id: "360", label: "1-Year (Dominance)" }
  ];

  return (
    <div id="roadmap-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Phases selector tabs bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#101827] border border-white/5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400">
            <Milestone className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Startup Execution Roadmap</h2>
            <p className="text-xs text-slate-500">Track and manage milestones, kpis, and execution deliverables</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-[#0d1324] p-1 rounded-xl border border-white/5">
          {phases.map((ph) => (
            <button
              key={ph.id}
              onClick={() => setActivePhase(ph.id as PhaseType)}
              className={`px-3 py-1.5 text-[10px] font-mono rounded-lg cursor-pointer transition-all ${
                activePhase === ph.id 
                  ? "bg-teal-500/10 text-teal-300 border border-teal-500/20" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {ph.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of milestones */}
      <div className="space-y-6 max-w-4xl mx-auto w-full">
        
        {/* Helper phase mapper */}
        {[
          { label: "Phase 1: 30-Day Horizon (Launchpad)", data: roadmap.plan30Days, id: "30", color: "border-l-cyan-500 text-cyan-400" },
          { label: "Phase 2: 90-Day Horizon (Velocity)", data: roadmap.plan90Days, id: "90", color: "border-l-indigo-500 text-indigo-400" },
          { label: "Phase 3: 6-Month Horizon (Scale)", data: roadmap.plan6Months, id: "180", color: "border-l-purple-500 text-purple-400" },
          { label: "Phase 4: 1-Year Horizon (Dominance)", data: roadmap.plan1Year, id: "360", color: "border-l-pink-500 text-pink-400" }
        ]
          .filter(ph => activePhase === "all" || activePhase === ph.id)
          .map((ph, idx) => (
            <div key={idx} className="space-y-4">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">{ph.label}</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ph.data.map((mil, i) => {
                  const isDone = !!completedMilestones[mil.title];
                  return (
                    <div 
                      key={i} 
                      className={`bg-[#101827] border border-white/5 border-l-2 ${ph.color} rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md transition-all duration-300 ${isDone ? "opacity-60 bg-[#101827]/40" : ""}`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2.5 mb-3.5">
                          <h4 className="font-bold text-white text-xs leading-snug">{mil.title}</h4>
                          <button 
                            onClick={() => toggleCompleted(mil.title)}
                            className="text-slate-400 hover:text-white cursor-pointer transition-colors"
                          >
                            {isDone ? <CheckCircle className="w-4 h-4 text-teal-400 fill-teal-400/10" /> : <Circle className="w-4 h-4 text-slate-600" />}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{mil.description}</p>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block font-semibold mb-2">KPI MEASURES & DELIVERABLES</span>
                        <div className="space-y-1.5">
                          {mil.kpis.map((kpi, kIdx) => (
                            <div key={kIdx} className="flex gap-2 items-center text-[10px] text-slate-300 leading-snug">
                              <Target className="w-3 h-3 text-slate-500 shrink-0" />
                              <span>{kpi}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

      </div>

    </div>
  );
}
