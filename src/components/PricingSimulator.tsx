import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";
import { RevenueModelResult } from "../types";

interface PricingSimulatorProps {
  revenueModel: RevenueModelResult;
}

export default function PricingSimulator({ revenueModel }: PricingSimulatorProps) {
  
  // Sliders states
  const [basePrice, setBasePrice] = useState(revenueModel.pricingSimulatorConfig.basePrice);
  const [subscriberCount, setSubscriberCount] = useState(50); // Initial 50 B2B nodes
  const [growthFactor, setGrowthFactor] = useState(1.10); // 10% monthly compounding

  // Calculate 12 Months Projection
  const projectionData = [];
  let currentSubscribers = subscriberCount;
  for (let month = 1; month <= 12; month++) {
    const revenue = Math.round(currentSubscribers * basePrice);
    projectionData.push({
      month: `M${month}`,
      revenue: Math.round(revenue / 1000), // in Thousands
      subscribers: Math.round(currentSubscribers)
    });
    currentSubscribers = currentSubscribers * growthFactor;
  }

  const finalYearlyRevenue = projectionData.reduce((acc, curr) => acc + curr.revenue * 1000, 0);

  return (
    <div id="pricing-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Upper models display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {revenueModel.suggestedModels.map((model, idx) => (
          <div key={idx} className="bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <span className="font-bold text-white text-sm">{model.modelName}</span>
                <span className={`text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase ${
                  model.revenuePotential === "High" 
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" 
                    : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                }`}>
                  {model.revenuePotential} Potential
                </span>
              </div>

              <p className="text-xs text-cyan-400 font-mono mb-4 bg-cyan-950/20 px-3 py-2 rounded-xl border border-cyan-500/20">{model.pricingStrategy}</p>

              <div className="grid grid-cols-2 gap-4 mt-2 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Strengths</span>
                  <ul className="list-disc list-inside text-[10px] text-slate-300 space-y-1 mt-1">
                    {model.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Considerations</span>
                  <ul className="list-disc list-inside text-[10px] text-slate-300 space-y-1 mt-1">
                    {model.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block mb-2">Monetization Milestones</span>
              <div className="space-y-1.5">
                {model.monetizationRoadmap.map((step, i) => (
                  <div key={i} className="flex gap-2 items-center text-[10px] text-slate-300">
                    <ArrowRight className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Simulator Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sliders Control Pane */}
        <div className="lg:col-span-5 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 border-b border-white/5 pb-4 mb-5">
              <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400">
                <Coins className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Revenue Simulator Console</h3>
                <p className="text-xs text-slate-500">Tune growth parameters & license factors</p>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Slider 1: Base Price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400">Monthly Licensing / Node Price</span>
                  <span className="font-mono text-xs text-cyan-400 font-bold">${basePrice.toLocaleString()} / mo</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="50000" 
                  step="500"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
              </div>

              {/* Slider 2: Subscriber count */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400">Initial Active Nodes / Customers</span>
                  <span className="font-mono text-xs text-indigo-400 font-bold">{subscriberCount} nodes</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="200" 
                  step="1"
                  value={subscriberCount}
                  onChange={(e) => setSubscriberCount(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400 focus:outline-none"
                />
              </div>

              {/* Slider 3: Growth Factor */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-400">Monthly Compounding Growth</span>
                  <span className="font-mono text-xs text-pink-400 font-bold">{Math.round((growthFactor - 1) * 100)}% / mo</span>
                </div>
                <input 
                  type="range" 
                  min="1.0" 
                  max="1.5" 
                  step="0.01"
                  value={growthFactor}
                  onChange={(e) => setGrowthFactor(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-400 focus:outline-none"
                />
              </div>

            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-center mt-6">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">PROJECTED YEAR 1 COMPOSITE REVENUE</span>
            <span className="text-3xl font-extrabold text-emerald-400 mt-1 block font-mono">${finalYearlyRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Projection visual Line Chart */}
        <div className="lg:col-span-7 bg-[#101827] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">12-Month Compounding Forecast</h3>
              <p className="text-xs text-slate-500">Estimated cumulative monthly revenues in USD Thousands ($K)</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              Compounding Active
            </span>
          </div>

          <div className="h-60 w-full font-mono text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                <XAxis dataKey="month" stroke="#64748b" tickLine={false} />
                <YAxis stroke="#64748b" tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
                  labelStyle={{ color: "#ffffff", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#ec4899" fillOpacity={1} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
