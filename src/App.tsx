import React, { useState } from "react";
import { Sparkles, Cpu, LogIn, Github, Mail, AlertCircle, RefreshCw } from "lucide-react";

// Subcomponents
import Sidebar, { NavItem } from "./components/Sidebar";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AIWorkspace from "./components/AIWorkspace";
import ValidationView from "./components/ValidationView";
import CompetitorsView from "./components/CompetitorsView";
import MarketView from "./components/MarketView";
import LeanCanvasView from "./components/LeanCanvasView";
import PricingSimulator from "./components/PricingSimulator";
import BusinessPlanView from "./components/BusinessPlanView";
import PitchDeckStudio from "./components/PitchDeckStudio";
import RoadmapView from "./components/RoadmapView";
import InvestorDiscovery from "./components/InvestorDiscovery";

// Mock template fallback
import { 
  defaultStartup, 
  defaultValidation, 
  defaultCompetitors, 
  defaultMarket, 
  defaultRevenue, 
  defaultScorecard, 
  defaultBusinessPlan, 
  defaultPitchDeck, 
  defaultRoadmap, 
  defaultInvestors, 
  defaultLeanCanvas, 
  defaultUnicornPredictor 
} from "./data/mockData";

// Types
import { 
  StartupState, 
  IdeaValidationResult, 
  CompetitorAnalysisResult, 
  MarketResearchResult, 
  RevenueModelResult, 
  ScorecardResult, 
  BusinessPlanResult, 
  PitchDeckResult, 
  RoadmapResult, 
  InvestorDiscoveryResult, 
  LeanCanvasResult, 
  UnicornPredictorResult,
  MentorMessage
} from "./types";

export default function App() {
  
  // App routing and auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<"google" | "github" | "email" | null>(null);
  const [activeTab, setActiveTab] = useState<NavItem>("dashboard");

  // Core Startup State
  const [startup, setStartup] = useState<StartupState>({ ...defaultStartup });

  // Data modules
  const [validation, setValidation] = useState<IdeaValidationResult>({ ...defaultValidation });
  const [competitors, setCompetitors] = useState<CompetitorAnalysisResult>({ ...defaultCompetitors });
  const [market, setMarket] = useState<MarketResearchResult>({ ...defaultMarket });
  const [revenue, setRevenue] = useState<RevenueModelResult>({ ...defaultRevenue });
  const [scorecard, setScorecard] = useState<ScorecardResult>({ ...defaultScorecard });
  const [businessPlan, setBusinessPlan] = useState<BusinessPlanResult>({ ...defaultBusinessPlan });
  const [pitchDeck, setPitchDeck] = useState<PitchDeckResult>({ ...defaultPitchDeck });
  const [roadmap, setRoadmap] = useState<RoadmapResult>({ ...defaultRoadmap });
  const [investorDiscovery, setInvestorDiscovery] = useState<InvestorDiscoveryResult>({ ...defaultInvestors });
  const [leanCanvas, setLeanCanvas] = useState<LeanCanvasResult>({ ...defaultLeanCanvas });
  const [unicornPredictor, setUnicornPredictor] = useState<UnicornPredictorResult>({ ...defaultUnicornPredictor });

  // Stale tracking flags (mark true when startup is reconfigured, triggering incremental AI fetches when tabs are clicked)
  const [staleModules, setStaleModules] = useState<Record<NavItem, boolean>>({
    dashboard: false,
    validation: false,
    competitors: false,
    market: false,
    leancanvas: false,
    revenue: false,
    businessplan: false,
    pitchdeck: false,
    roadmap: false,
    investors: false,
    mentor: false
  });

  // Mentorship Chat history
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([
    {
      sender: "assistant",
      text: "Greetings, founder! I am JARVIS-Copilot, your executive startup advisor. I have analyzed your core objectives and scaled biometric parameters. How can I help accelerate your strategic growth today?",
      timestamp: "11:27 AM",
      suggestedPrompts: [
        "How do we prepare our seed pitch for Tier 1 VCs?",
        "Help me structure a financial projection model.",
        "What is our core technical risk and how do we resolve it?"
      ]
    }
  ]);

  // Loading & Scanning States
  const [isScanning, setIsScanning] = useState(false);
  const [isTabFetching, setIsTabFetching] = useState(false);
  const [fetchingTabName, setFetchingTabName] = useState("");
  const [scanProgressMessage, setScanProgressMessage] = useState("");

  const handleUpdateStartup = (newStartup: StartupState) => {
    setStartup(newStartup);
    
    // Mark all other analytics modules as stale, meaning they will fetch new customized AI data on tab-click!
    setStaleModules({
      dashboard: false,
      validation: true,
      competitors: true,
      market: true,
      leancanvas: true,
      revenue: true,
      businessplan: true,
      pitchdeck: true,
      roadmap: true,
      investors: true,
      mentor: false
    });
  };

  // Live incremental fetch of analytical data modules from backend Gemini API
  const fetchModuleData = async (tab: NavItem) => {
    setIsTabFetching(true);
    setFetchingTabName(tab);
    
    let endpointType = "";
    switch (tab) {
      case "validation": endpointType = "idea-validation"; break;
      case "competitors": endpointType = "competitor-analysis"; break;
      case "market": endpointType = "market-research"; break;
      case "leancanvas": endpointType = "lean-canvas"; break;
      case "revenue": endpointType = "revenue-model"; break;
      case "businessplan": endpointType = "business-plan"; break;
      case "pitchdeck": endpointType = "pitch-deck"; break;
      case "roadmap": endpointType = "roadmap"; break;
      case "investors": endpointType = "investor-discovery"; break;
      default: return;
    }

    try {
      const response = await fetch("/api/copilot/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: endpointType, startup })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Save corresponding state
      switch (tab) {
        case "validation": setValidation(data); break;
        case "competitors": setCompetitors(data); break;
        case "market": setMarket(data); break;
        case "leancanvas": setLeanCanvas(data); break;
        case "revenue": setRevenue(data); break;
        case "businessplan": setBusinessPlan(data); break;
        case "pitchdeck": setPitchDeck(data); break;
        case "roadmap": setRoadmap(data); break;
        case "investors": setInvestorDiscovery(data); break;
      }

      // Mark as fresh
      setStaleModules(prev => ({ ...prev, [tab]: false }));
    } catch (err) {
      console.error("Failed to sync live AI diagnostics:", err);
      // Fallback is kept so the user is never stuck with a broken screen
    } finally {
      setIsTabFetching(false);
      setFetchingTabName("");
    }
  };

  // Tab switching router
  const handleNavigate = (tab: NavItem) => {
    setActiveTab(tab);
    if (staleModules[tab]) {
      fetchModuleData(tab);
    }
  };

  // Full-Sync trigger (runs scorecard & DNA)
  const handleTriggerAIScan = async () => {
    setIsScanning(true);
    setScanProgressMessage("Initiating micro-sensor laser spectroscopy scanner...");
    
    setTimeout(() => {
      setScanProgressMessage("Compiling startup structural metrics across 6 vectors...");
    }, 1500);

    setTimeout(() => {
      setScanProgressMessage("Integrating multi-tier telemetry and forecasting indexes...");
    }, 3000);

    try {
      const response = await fetch("/api/copilot/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "scorecard", startup })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setScorecard(data);
    } catch (err) {
      console.error("Full AI sync failed:", err);
    } finally {
      setIsScanning(false);
      setScanProgressMessage("");
    }
  };

  // Send message to Startup Mentor
  const handleSendMentorMessage = async (text: string) => {
    const userMsg: MentorMessage = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMentorMessages(prev => [...prev, userMsg]);
    setIsScanning(true);

    try {
      const response = await fetch("/api/copilot/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...mentorMessages, userMsg], 
          startup 
        })
      });

      if (!response.ok) {
        throw new Error("Mentor response failed");
      }

      const data = await response.json();

      const aiMsg: MentorMessage = {
        sender: "assistant",
        text: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPrompts: data.suggestedPrompts
      };

      setMentorMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("Mentor chat failed:", err);
      // fallback reply
      const aiMsg: MentorMessage = {
        sender: "assistant",
        text: "My telemetry communication array experienced minor interference. Let us refocus. How shall we secure your funding strategy or product specification metrics?",
        timestamp: "Now"
      };
      setMentorMessages(prev => [...prev, aiMsg]);
    } finally {
      setIsScanning(false);
    }
  };

  // Simulated Custom OAuth Authentication
  const handleAuth = (method: "google" | "github" | "email") => {
    setAuthMethod(method);
    setIsScanning(true);
    setScanProgressMessage(`Securing multi-channel handshake tunnel...`);

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsScanning(false);
      setScanProgressMessage("");
    }, 1500);
  };

  // Rendering Routing Viewport
  const renderTabContent = () => {
    
    // If we are incrementally fetching the active tab's data from Gemini, show a stunning sci-fi scanner
    if (isTabFetching && fetchingTabName === activeTab) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#050816] text-center select-none animate-fade-in">
          <div className="relative w-16 h-16 flex items-center justify-center mb-6">
            <RefreshCw className="w-14 h-14 text-cyan-400 animate-spin" style={{ animationDuration: "2s" }} />
            <Cpu className="absolute w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <h2 className="text-sm font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
            AI Operating System Active
          </h2>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Synchronizing target coordinates for "{startup.name}". Compressing vector indexes and querying Gemini models...
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard 
            startup={startup}
            scorecard={scorecard}
            market={market}
            competitors={competitors}
            onUpdateStartup={handleUpdateStartup}
            onTriggerAIScan={handleTriggerAIScan}
            isScanning={isScanning}
          />
        );
      case "validation":
        return <ValidationView validation={validation} />;
      case "competitors":
        return <CompetitorsView competitors={competitors} />;
      case "market":
        return <MarketView market={market} />;
      case "leancanvas":
        return <LeanCanvasView canvas={leanCanvas} />;
      case "revenue":
        return <PricingSimulator revenueModel={revenue} />;
      case "businessplan":
        return <BusinessPlanView businessPlan={businessPlan} />;
      case "pitchdeck":
        return <PitchDeckStudio pitchDeck={pitchDeck} />;
      case "roadmap":
        return <RoadmapView roadmap={roadmap} />;
      case "investors":
        return <InvestorDiscovery investorDiscovery={investorDiscovery} startupName={startup.name} />;
      case "mentor":
        return (
          <AIWorkspace 
            startup={startup}
            messages={mentorMessages}
            onSendMessage={handleSendMentorMessage}
            isThinking={isScanning}
          />
        );
      default:
        return null;
    }
  };

  // Auth/Landing Gate
  if (!isAuthenticated) {
    return <LandingPage onStart={() => handleAuth("google")} />;
  }

  return (
    <div className="relative flex h-screen bg-[#02040a] text-white overflow-hidden font-sans select-none">
      
      {/* Animated Aurora Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#3b82f615] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf610] rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#06b6d405] rounded-full blur-[80px]"></div>
      </div>

      {/* Vertical Sidebar */}
      <Sidebar 
        activeItem={activeTab}
        onNavigate={handleNavigate}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Content Viewport */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden bg-transparent">
        
        {/* Top Control Bar with User profile mockup details */}
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between shrink-0 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">OS WORKSPACE STATUS:</span>
            <span className="flex items-center gap-1.5 text-green-400 text-[10px] font-mono font-bold uppercase tracking-wider bg-green-500/10 border border-green-500/30 px-2 py-0.5 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Secure Core online
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">abdulmalik30299@gmail.com</span>
            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shadow-md flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-pink-500 font-bold text-[10px] text-white tracking-tight">
              AM
            </div>
          </div>
        </header>

        {/* Tab content wrapper */}
        {renderTabContent()}

      </div>

      {/* Global telemetry loading overlay for full scans */}
      {isScanning && scanProgressMessage && (
        <div id="loading-overlay" className="fixed inset-0 bg-[#02040a]/90 backdrop-blur-md flex flex-col items-center justify-center z-[100] p-4 select-none animate-fade-in">
          <div className="relative w-16 h-16 flex items-center justify-center mb-6">
            <RefreshCw className="w-14 h-14 text-cyan-400 animate-spin" style={{ animationDuration: "2.5s" }} />
            <Cpu className="absolute w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <h2 className="text-sm font-semibold tracking-widest text-cyan-400 uppercase font-mono mb-2">
            AI Operating System Synchronization
          </h2>
          <p className="text-xs text-slate-400 max-w-sm text-center leading-relaxed font-mono">
            {scanProgressMessage}
          </p>
        </div>
      )}

    </div>
  );
}
