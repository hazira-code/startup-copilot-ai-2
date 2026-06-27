import React from "react";
import { 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  ShieldAlert, 
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";
import { IdeaValidationResult } from "../types";

interface ValidationViewProps {
  validation: IdeaValidationResult;
}

export default function ValidationView({ validation }: ValidationViewProps) {
  return (
    <div id="validation-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Upper Score row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Validation Score", value: validation.validationScore, desc: "Viability threshold", color: "text-blue-400 bg-blue-500/10 border-blue-500/30" },
          { label: "Market Demand Score", value: validation.marketDemandScore, desc: "Audience sentiment", color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
          { label: "Success Probability", value: validation.successProbability, desc: "Statistical forecast", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
          { label: "Opportunity Score", value: validation.opportunityScore, desc: "Growth ceiling", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" }
        ].map((score, i) => (
          <div key={i} className={`p-5 rounded-2xl border ${score.color} flex flex-col justify-between h-32 backdrop-blur-md`}>
            <div>
              <span className="text-[10px] font-mono tracking-wider block uppercase font-semibold">{score.label}</span>
              <span className="text-[10px] font-mono text-slate-500 block">{score.desc}</span>
            </div>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-3xl font-extrabold tracking-tight">{score.value}%</span>
              <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-current" style={{ width: `${score.value}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Feasibility report */}
        <div className="lg:col-span-7 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">AI Feasibility Assessment</h3>
              <p className="text-xs text-slate-500">VC-standard structural technology analysis</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-white/5 border border-white/5 p-4 rounded-xl">{validation.feasibilityAnalysis}</p>
        </div>

        {/* Recommended Action steps */}
        <div className="lg:col-span-5 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Recommended Next Steps</h3>
              <p className="text-xs text-slate-500">Priority execution roadmap action steps</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {validation.recommendedNextSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3 rounded-xl border border-white/5 bg-white/5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-mono shrink-0">{idx + 1}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SWOT matrix grid block */}
      <div className="bg-[#101827] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-6">
          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Strategic SWOT Coordinates Matrix</h3>
            <p className="text-xs text-slate-500">Interactive internal capabilities & market friction points</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/10 to-transparent border border-emerald-500/20">
            <div className="flex items-center gap-2 text-emerald-400 mb-3 font-mono text-xs font-semibold uppercase">
              <CheckCircle className="w-4 h-4" /> Core Strengths (S)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {validation.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/10 to-transparent border border-red-500/20">
            <div className="flex items-center gap-2 text-red-400 mb-3 font-mono text-xs font-semibold uppercase">
              <ShieldAlert className="w-4 h-4" /> Key Weaknesses (W)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {validation.weaknesses.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <ArrowRight className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/10 to-transparent border border-blue-500/20">
            <div className="flex items-center gap-2 text-blue-400 mb-3 font-mono text-xs font-semibold uppercase">
              <Lightbulb className="w-4 h-4" /> Market Opportunities (O)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {validation.opportunities.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-950/10 to-transparent border border-yellow-500/20">
            <div className="flex items-center gap-2 text-yellow-400 mb-3 font-mono text-xs font-semibold uppercase">
              <AlertTriangle className="w-4 h-4" /> Critical Risks (T)
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {validation.risks.map((item, i) => (
                <li key={i} className="flex items-start gap-2 leading-relaxed">
                  <ArrowRight className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
