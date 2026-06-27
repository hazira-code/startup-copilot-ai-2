import React, { useState } from "react";
import { 
  FileText, 
  ChevronRight, 
  Play, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  Plus, 
  Trash2,
  ArrowDownToLine
} from "lucide-react";
import { PitchDeckResult, PitchDeckSlide } from "../types";

interface PitchDeckStudioProps {
  pitchDeck: PitchDeckResult;
}

export default function PitchDeckStudio({ pitchDeck }: PitchDeckStudioProps) {
  const [slides, setSlides] = useState<PitchDeckSlide[]>([...pitchDeck.slides]);
  const [activeIdx, setActiveIdx] = useState(0);

  const activeSlide = slides[activeIdx] || slides[0];

  const handleUpdateSlideField = (field: keyof PitchDeckSlide, value: any) => {
    const updated = [...slides];
    updated[activeIdx] = { ...activeSlide, [field]: value };
    setSlides(updated);
  };

  const handleAddBullet = () => {
    const updatedBullets = [...activeSlide.bulletPoints, "New bullet point details"];
    handleUpdateSlideField("bulletPoints", updatedBullets);
  };

  const handleUpdateBullet = (bulletIdx: number, val: string) => {
    const updatedBullets = [...activeSlide.bulletPoints];
    updatedBullets[bulletIdx] = val;
    handleUpdateSlideField("bulletPoints", updatedBullets);
  };

  const handleDeleteBullet = (bulletIdx: number) => {
    const updatedBullets = activeSlide.bulletPoints.filter((_, i) => i !== bulletIdx);
    handleUpdateSlideField("bulletPoints", updatedBullets);
  };

  const triggerExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(slides, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "Startup_Copilot_Pitch_Deck.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div id="pitchdeck-view" className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-[#050816] select-none">
      
      {/* Left Column: Slide Navigator List */}
      <div className="w-full lg:w-60 border-r border-white/5 bg-[#0a0f1f]/40 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Slide Directory</span>
          <button 
            onClick={triggerExport}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10"
            title="Export deck config"
          >
            <ArrowDownToLine className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-full p-3 text-left rounded-xl transition-all duration-300 flex items-center gap-3 border ${
                activeIdx === idx 
                  ? "bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 border-indigo-500/30 text-white" 
                  : "bg-white/0 border-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] font-mono font-bold text-slate-400">
                {slide.number}
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-semibold truncate">{slide.title}</span>
                <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">{slide.type}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Center Area: Large Widescreen Slide Preview */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto border-r border-white/5 justify-between">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 shrink-0">
          <div>
            <h2 className="text-sm font-semibold text-white">Pitch Deck Presentation View</h2>
            <p className="text-xs text-slate-500">Apple Vision Pro glassmorphic style templates</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              disabled={activeIdx === 0}
              onClick={() => setActiveIdx(activeIdx - 1)}
              className="p-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400">{activeIdx + 1} / {slides.length}</span>
            <button 
              disabled={activeIdx === slides.length - 1}
              onClick={() => setActiveIdx(activeIdx + 1)}
              className="p-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 16:9 Cinema Viewport */}
        <div className="w-full aspect-[16/9] max-w-4xl mx-auto rounded-3xl bg-gradient-to-tr from-[#0b0f19] to-[#070b14] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.7)] p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
          
          {/* Glowing orbs backing the preview */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[80px]" />

          {/* Slide Header */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">
              {activeSlide.type}
            </span>
            <span className="text-[10px] font-mono text-slate-500 tracking-widest">NEBULA SEED DECK</span>
          </div>

          {/* Slide Core Content */}
          <div className="relative z-10 my-6">
            <h1 className="text-2xl md:text-3.5xl font-extrabold tracking-tight text-white mb-2 leading-none">
              {activeSlide.title}
            </h1>
            <p className="text-xs md:text-sm text-cyan-400 font-light max-w-2xl leading-relaxed">
              {activeSlide.subtitle}
            </p>

            <ul className="mt-6 md:mt-8 space-y-3 max-w-2xl">
              {activeSlide.bulletPoints.map((bp, i) => (
                <li key={i} className="flex items-start gap-3 text-[11px] md:text-xs text-slate-300 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)] shrink-0 mt-1.5" />
                  <span>{bp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Slide Footer */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/5 pt-4 text-[9px] font-mono text-slate-500">
            <span>CONFIDENTIAL - FOR QUALIFIED INVESTORS ONLY</span>
            <span>SLIDE {activeSlide.number}</span>
          </div>

        </div>

        <div className="mt-4 shrink-0" />
      </div>

      {/* Right Column: Slide Editor Panel */}
      <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#0a0f1f]/20 flex flex-col shrink-0 p-5 overflow-y-auto">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3.5 mb-5">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
          <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Slide Blueprint Editor</span>
        </div>

        <div className="space-y-5">
          
          <div>
            <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Slide Title</label>
            <input 
              type="text" 
              value={activeSlide.title}
              onChange={(e) => handleUpdateSlideField("title", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 font-bold">Subtitle / Hook</label>
            <textarea 
              rows={2}
              value={activeSlide.subtitle}
              onChange={(e) => handleUpdateSlideField("subtitle", e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none leading-relaxed"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Bullet Highlights</label>
              <button 
                onClick={handleAddBullet}
                className="text-[10px] font-mono text-cyan-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> Add Highlight
              </button>
            </div>
            
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {activeSlide.bulletPoints.map((bp, i) => (
                <div key={i} className="flex gap-2 items-center bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <input 
                    type="text" 
                    value={bp}
                    onChange={(e) => handleUpdateBullet(i, e.target.value)}
                    className="flex-1 bg-transparent border-none text-[10px] text-slate-300 focus:outline-none focus:ring-0"
                  />
                  <button 
                    onClick={() => handleDeleteBullet(i)}
                    className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Design Suggestion block */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/10 to-transparent border border-indigo-500/20 mt-4">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block mb-1">AI Design Suggestions</span>
            <p className="text-[10px] text-slate-400 leading-relaxed">{activeSlide.designSuggestion}</p>
          </div>

        </div>
      </div>

    </div>
  );
}
