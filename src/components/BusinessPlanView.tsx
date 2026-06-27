import React, { useState } from "react";
import { 
  FileText, 
  ChevronRight, 
  Compass, 
  TrendingUp, 
  Briefcase, 
  ShieldAlert,
  ArrowDownToLine
} from "lucide-react";
import { BusinessPlanResult } from "../types";

interface BusinessPlanViewProps {
  businessPlan: BusinessPlanResult;
}

type TabType = "summary" | "product" | "market" | "marketing" | "operations" | "financial" | "growth";

export default function BusinessPlanView({ businessPlan }: BusinessPlanViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summary");

  const tabs: Array<{ id: TabType; label: string }> = [
    { id: "summary", label: "Executive Summary" },
    { id: "product", label: "Company & Product" },
    { id: "market", label: "Market Segments" },
    { id: "marketing", label: "Marketing & Sales" },
    { id: "operations", label: "Operational Plan" },
    { id: "financial", label: "Financial Analysis" },
    { id: "growth", label: "Growth & Risk" }
  ];

  // Helper to simulated download JSON/TXT document
  const triggerDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(businessPlan, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Startup_Copilot_Business_Plan.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="business-plan-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Upper folder header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#101827] border border-white/5 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
            <FileText className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Investor-Grade Business Plan</h2>
            <p className="text-xs text-slate-500">Formulated and structured according to standard venture templates</p>
          </div>
        </div>

        <button
          onClick={triggerDownload}
          className="px-4 py-2.5 text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <ArrowDownToLine className="w-4 h-4 text-purple-400" />
          Export Plan (JSON)
        </button>
      </div>

      {/* Main folder grid with tab column & content viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
        
        {/* Left Side: Tabs Column */}
        <div className="lg:col-span-3 flex flex-col gap-2 bg-[#101827] border border-white/5 rounded-2xl p-4">
          <span className="text-[9px] font-mono text-slate-500 block mb-2 uppercase tracking-wider font-semibold">PLAN DIRECTORY</span>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full px-4 py-3 text-left text-xs font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                activeTab === tab.id 
                  ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-sm" 
                  : "hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent"
              }`}
            >
              <span>{tab.label}</span>
              <ChevronRight className={`w-3.5 h-3.5 ${activeTab === tab.id ? "text-purple-400" : "text-slate-600"}`} />
            </button>
          ))}
        </div>

        {/* Right Side: Document Viewport */}
        <div className="lg:col-span-9 bg-[#101827] border border-white/5 rounded-2xl p-6 min-h-[450px] flex flex-col justify-between backdrop-blur-lg">
          
          <article className="prose prose-invert max-w-none text-slate-300 text-xs leading-relaxed space-y-5">
            
            {activeTab === "summary" && (
              <div>
                <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" /> Executive Summary
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed">{businessPlan.executiveSummary}</p>
              </div>
            )}

            {activeTab === "product" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-blue-400" /> Company Overview
                  </h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{businessPlan.companyOverview}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[9px] font-mono text-cyan-400 block uppercase font-semibold">Our Mission</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{businessPlan.missionStatement}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <span className="text-[9px] font-mono text-purple-400 block uppercase font-semibold">Our Vision</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{businessPlan.visionStatement}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3">Product Specifications</h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{businessPlan.productOverview}</p>
                </div>
              </div>
            )}

            {activeTab === "market" && (
              <div>
                <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Market Analysis & Segments
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed mb-4">{businessPlan.marketAnalysis}</p>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2 font-semibold">Target Customer Segments:</span>
                <div className="flex flex-col gap-2">
                  {businessPlan.customerSegments.map((seg, i) => (
                    <div key={i} className="flex gap-2.5 items-center p-2.5 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span>{seg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "marketing" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h3 className="text-xs font-bold text-white border-b border-white/5 pb-2 mb-3">Marketing Strategy</h3>
                  <p className="leading-relaxed text-xs text-slate-300">{businessPlan.marketingStrategy}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h3 className="text-xs font-bold text-white border-b border-white/5 pb-2 mb-3">Sales Strategy</h3>
                  <p className="leading-relaxed text-xs text-slate-300">{businessPlan.salesStrategy}</p>
                </div>
              </div>
            )}

            {activeTab === "operations" && (
              <div>
                <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-pink-400" /> Operational Blueprint
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed">{businessPlan.operationalPlan}</p>
              </div>
            )}

            {activeTab === "financial" && (
              <div>
                <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-yellow-400" /> Financial Model Summary
                </h3>
                <p className="whitespace-pre-wrap leading-relaxed">{businessPlan.financialPlan}</p>
              </div>
            )}

            {activeTab === "growth" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white border-b border-white/5 pb-2.5 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" /> Growth & Expansion Strategy
                  </h3>
                  <p className="whitespace-pre-wrap leading-relaxed">{businessPlan.growthStrategy}</p>
                </div>
                <div className="p-4 bg-red-950/10 border border-red-500/20 rounded-xl">
                  <h3 className="text-xs font-bold text-red-400 border-b border-red-500/20 pb-2 mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" /> Risk Analysis & Mitigation
                  </h3>
                  <p className="leading-relaxed text-xs text-slate-300">{businessPlan.riskAnalysis}</p>
                </div>
              </div>
            )}

          </article>

          <div className="border-t border-white/5 mt-6 pt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>STARTUP COPILOT COMPILER V2.0</span>
            <span>SECURE ENCRYPTED DOC</span>
          </div>

        </div>

      </div>

    </div>
  );
}
