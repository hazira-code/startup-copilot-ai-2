import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ScatterChart, 
  Scatter, 
  ZAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  Activity, 
  Award, 
  TrendingUp, 
  Users, 
  Fingerprint, 
  MapPin, 
  Layers, 
  ChevronRight, 
  RefreshCw, 
  HelpCircle 
} from "lucide-react";
import { 
  StartupState, 
  ScorecardResult, 
  MarketResearchResult, 
  CompetitorAnalysisResult 
} from "../types";

interface DashboardProps {
  startup: StartupState;
  scorecard: ScorecardResult;
  market: MarketResearchResult;
  competitors: CompetitorAnalysisResult;
  onUpdateStartup: (newStartup: StartupState) => void;
  onTriggerAIScan: () => Promise<void>;
  isScanning: boolean;
}

export default function Dashboard({ 
  startup, 
  scorecard, 
  market, 
  competitors, 
  onUpdateStartup, 
  onTriggerAIScan, 
  isScanning 
}: DashboardProps) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedStartup, setEditedStartup] = useState<StartupState>({ ...startup });

  const handleSave = () => {
    onUpdateStartup(editedStartup);
    setIsEditing(false);
  };

  // Convert TAM/SAM/SOM for Recharts area visual
  const marketChartData = [
    { name: "SOM", value: market.som, label: "Obtainable ($M)" },
    { name: "SAM", value: market.sam, label: "Serviceable ($M)" },
    { name: "TAM", value: market.tam, label: "Total Market ($M)" }
  ];

  // Recharts Radar Chart Data for DNA
  const radarData = [
    { subject: "Innovation", A: scorecard.innovation, fullMark: 100 },
    { subject: "Scalability", A: scorecard.scalability, fullMark: 100 },
    { subject: "Demand", A: scorecard.demand, fullMark: 100 },
    { subject: "Competition", A: scorecard.competition, fullMark: 100 },
    { subject: "Profitability", A: scorecard.profitability, fullMark: 100 },
    { subject: "Investment", A: scorecard.investmentPotential, fullMark: 100 }
  ];

  return (
    <div id="dashboard-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#101827] to-[#0d1324] rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">{startup.name || "Unnamed Startup Concept"}</h1>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono text-cyan-400 tracking-wider flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> {startup.region || "Global"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-3xl line-clamp-2">{startup.description}</p>
          <div className="flex flex-wrap gap-2 mt-2.5">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300">Industry: {startup.industry}</span>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300">Audience: {startup.targetAudience}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            id="reconfigure-concept-btn"
            onClick={() => {
              setEditedStartup({ ...startup });
              setIsEditing(true);
            }}
            className="px-4 py-2.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-md flex items-center gap-2"
          >
            Reconfigure Concept
          </button>
          <button
            id="trigger-ai-scan-btn"
            onClick={onTriggerAIScan}
            disabled={isScanning}
            className="relative overflow-hidden px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] disabled:opacity-50 flex items-center gap-2 group cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            {isScanning ? "SCANNING ENGINE..." : "SYNC AI COPILOT"}
          </button>
        </div>
      </div>

      {/* Scorecard Overview Progress Rings Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Health", value: scorecard.overallScore, color: "stroke-cyan-500 text-cyan-400 shadow-cyan-500/20", icon: Activity },
          { label: "Growth Potential", value: scorecard.scalability, color: "stroke-purple-500 text-purple-400 shadow-purple-500/20", icon: TrendingUp },
          { label: "Market Fit Opportunity", value: scorecard.demand, color: "stroke-emerald-500 text-emerald-400 shadow-emerald-500/20", icon: Layers },
          { label: "Investor Readiness", value: scorecard.investmentPotential, color: "stroke-pink-500 text-pink-400 shadow-pink-500/20", icon: Award }
        ].map((ring, idx) => {
          const radius = 35;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (ring.value / 100) * circumference;

          return (
            <div key={idx} className="bg-[#101827] border border-white/5 rounded-2xl p-5 flex items-center justify-between backdrop-blur-lg">
              <div>
                <span className="text-xs font-medium text-slate-500">{ring.label}</span>
                <span className="block text-2xl font-bold text-white mt-1">{ring.value} / 100</span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 mt-1.5 bg-white/5 px-2 py-0.5 rounded-md w-max border border-white/5">
                  <ring.icon className="w-3 h-3 text-slate-400" /> VC Standard Verified
                </span>
              </div>
              <div className="relative w-18 h-18">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="36" cy="36" r={radius} className="stroke-slate-800 fill-transparent" strokeWidth="4" />
                  <circle 
                    cx="36" 
                    cy="36" 
                    r={radius} 
                    className={`${ring.color} fill-transparent transition-all duration-1000 ease-out`} 
                    strokeWidth="4.5" 
                    strokeDasharray={circumference} 
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white font-mono">{ring.value}%</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts & Analytics Block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recharts TAM/SAM/SOM Area Chart */}
        <div className="bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Market Sizing Distribution</h3>
              <p className="text-xs text-slate-500">TAM, SAM, SOM representation in USD Millions</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              {market.marketGrowth} Growth
            </span>
          </div>
          <div className="h-60 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="name" stroke="#64748b" tickLine={false} />
                <YAxis stroke="#64748b" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
                  labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="value" stroke="#06b6d4" fillOpacity={1} fill="url(#marketGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mt-4">
            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="block text-[10px] font-mono text-slate-500">SOM</span>
              <span className="font-mono text-xs font-semibold text-white">${market.som}M</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="block text-[10px] font-mono text-slate-500">SAM</span>
              <span className="font-mono text-xs font-semibold text-white">${market.sam}M</span>
            </div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/5">
              <span className="block text-[10px] font-mono text-slate-500">TAM</span>
              <span className="font-mono text-xs font-semibold text-white">${market.tam}B</span>
            </div>
          </div>
        </div>

        {/* Competitor Quadrant Coordinates Map */}
        <div className="bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Competitor Positioning Quadrant</h3>
              <p className="text-xs text-slate-500">Innovation Quotient vs. Realized Market Share (%)</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              Gap Matrix Active
            </span>
          </div>
          <div className="h-60 w-full font-mono text-xs relative">
            
            {/* Visual Quadrant Text indicators inside background */}
            <div className="absolute top-2 left-10 text-[9px] text-slate-600 uppercase tracking-widest pointer-events-none">High Innovation / Low Share (Disruptor)</div>
            <div className="absolute top-2 right-4 text-[9px] text-slate-600 uppercase tracking-widest pointer-events-none">High Innovation / High Share (Leader)</div>
            <div className="absolute bottom-10 left-10 text-[9px] text-slate-600 uppercase tracking-widest pointer-events-none">Low Innovation / Low Share (Niche)</div>
            <div className="absolute bottom-10 right-4 text-[9px] text-slate-600 uppercase tracking-widest pointer-events-none">Low Innovation / High Share (Legacy)</div>

            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: -25 }}>
                <CartesianGrid stroke="#ffffff0a" />
                <XAxis type="number" dataKey="innovation" name="Innovation" unit="%" stroke="#64748b" domain={[0, 100]} />
                <YAxis type="number" dataKey="marketShare" name="Market Share" unit="%" stroke="#64748b" domain={[0, 100]} />
                <ZAxis type="number" range={[150, 450]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }} />
                <Scatter name="Competitors" data={competitors.positioning} fill="#3b82f6">
                  {competitors.positioning.map((entry, index) => (
                    <circle key={`cell-${index}`} r={10} fill={entry.name.includes(startup.name) ? "#8b5cf6" : "#3b82f6"} className="animate-pulse" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-4">
            {competitors.positioning.map((c, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/5 bg-white/5 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${c.name.includes(startup.name) ? "bg-purple-400" : "bg-blue-400"}`} />
                {c.name} ({c.innovation}% / {c.marketShare}%)
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* DNA Radar Fingerprinting Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hologram descriptor block */}
        <div className="lg:col-span-7 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                <Fingerprint className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Startup DNA & Synthesis Fingerprint</h3>
                <p className="text-xs text-slate-500">Autonomous clinical AI architecture analysis</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              {[
                { label: "Innovation DNA", text: scorecard.dnaAnalysis.innovationDNA, color: "border-l-blue-500" },
                { label: "Market DNA", text: scorecard.dnaAnalysis.marketDNA, color: "border-l-purple-500" },
                { label: "Founder DNA", text: scorecard.dnaAnalysis.founderDNA, color: "border-l-cyan-500" },
                { label: "Product DNA", text: scorecard.dnaAnalysis.productDNA, color: "border-l-pink-500" }
              ].map((dna, i) => (
                <div key={i} className={`p-4 bg-white/5 rounded-xl border border-white/5 border-l-2 ${dna.color}`}>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase font-semibold">{dna.label}</span>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">{dna.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recharts DNA Radar Chart */}
        <div className="lg:col-span-5 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center">
          <span className="text-xs font-semibold text-slate-400 font-mono tracking-wider mb-2">6-AXIS CAPABILITY SPECIFICATION</span>
          <div className="w-full h-80 flex items-center justify-center font-mono text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#ffffff0a" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#ffffff0f" />
                <Radar name="Startup Metrics" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Editing Concept Modal Overlay */}
      {isEditing && (
        <div id="reconfigure-modal" className="fixed inset-0 bg-[#050816]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#101827] border border-white/10 rounded-2xl w-full max-w-xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden">
            
            <div className="px-6 py-5 border-b border-white/5 bg-gradient-to-r from-blue-950/20 to-purple-950/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-white">Reconfigure Startup Concept</h3>
              </div>
              <button 
                onClick={() => setIsEditing(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm font-mono"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Startup Name</label>
                <input 
                  type="text" 
                  value={editedStartup.name}
                  onChange={(e) => setEditedStartup({ ...editedStartup, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="e.g. EcoSphere AI"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Concept Description</label>
                <textarea 
                  rows={3}
                  value={editedStartup.description}
                  onChange={(e) => setEditedStartup({ ...editedStartup, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none leading-relaxed"
                  placeholder="What does your startup build? Describe the core product."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Industry Focus</label>
                  <input 
                    type="text" 
                    value={editedStartup.industry}
                    onChange={(e) => setEditedStartup({ ...editedStartup, industry: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Target Audience</label>
                  <input 
                    type="text" 
                    value={editedStartup.targetAudience}
                    onChange={(e) => setEditedStartup({ ...editedStartup, targetAudience: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Problem Statement</label>
                <input 
                  type="text" 
                  value={editedStartup.problemStatement}
                  onChange={(e) => setEditedStartup({ ...editedStartup, problemStatement: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Launch Region</label>
                <input 
                  type="text" 
                  value={editedStartup.region}
                  onChange={(e) => setEditedStartup({ ...editedStartup, region: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/5 bg-[#0d1324] flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                id="save-reconfigure-btn"
                onClick={handleSave}
                className="px-5 py-2.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                Apply Reconfiguration
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
