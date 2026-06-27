import React from "react";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  Lightbulb, 
  AlertCircle, 
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { MarketResearchResult } from "../types";

interface MarketViewProps {
  market: MarketResearchResult;
}

export default function MarketView({ market }: MarketViewProps) {
  return (
    <div id="market-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Sizing description panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "SOM (Serviceable Obtainable Market)", val: `$${market.som}M`, desc: market.somExplanation, color: "border-l-cyan-500 bg-cyan-950/5 text-cyan-400" },
          { label: "SAM (Serviceable Addressable Market)", val: `$${market.sam}M`, desc: market.samExplanation, color: "border-l-indigo-500 bg-indigo-950/5 text-indigo-400" },
          { label: "TAM (Total Addressable Market)", val: `$${market.tam >= 1000 ? `${(market.tam/1000).toFixed(1)}B` : `${market.tam}M`}`, desc: market.tamExplanation, color: "border-l-purple-500 bg-purple-950/5 text-purple-400" }
        ].map((size, idx) => (
          <div key={idx} className={`bg-[#101827] border border-white/5 border-l-2 ${size.color} rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md`}>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold block">{size.label}</span>
              <span className="block text-3xl font-extrabold text-white mt-1.5">{size.val}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mt-4">{size.desc}</p>
          </div>
        ))}
      </div>

      {/* Personas & Trends row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Customer Personas */}
        <div className="lg:col-span-8 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Customer Persona Profiles</h3>
              <p className="text-xs text-slate-500">Representative archetypes and operational paint-points</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {market.customerPersonas.map((pers, idx) => (
              <div key={idx} className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="border-b border-white/5 pb-2 mb-3">
                    <span className="block font-bold text-white text-xs">{pers.name}</span>
                    <span className="text-[10px] font-mono text-cyan-400">{pers.role}</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-mono text-pink-400 uppercase font-semibold">Pain Points</span>
                      <ul className="list-disc list-inside text-[10px] text-slate-400 space-y-1 mt-1 leading-relaxed">
                        {pers.painPoints.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Gains Expected</span>
                      <ul className="list-disc list-inside text-[10px] text-slate-400 space-y-1 mt-1 leading-relaxed">
                        {pers.gains.map((gn, i) => (
                          <li key={i}>{gn}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Trends */}
        <div className="lg:col-span-4 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2.5 border-b border-white/5 pb-4">
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
              <TrendingUp className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">Macro Trends & Growth</h3>
              <p className="text-xs text-slate-500">Forces driving customer adoption curves</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 justify-center">
            {market.industryTrends.map((trend, i) => (
              <div key={i} className="flex gap-2 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 items-start">
                <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span>{trend}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
