import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Globe, 
  Plus, 
  Trash2, 
  Code, 
  Layout, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Check, 
  Copy, 
  Settings, 
  ListPlus, 
  RefreshCw, 
  Mail, 
  DollarSign, 
  MessageSquare,
  HelpCircle,
  Award,
  ChevronRight,
  Database
} from "lucide-react";

export interface WebSection {
  id: string;
  type: "hero" | "features" | "stats" | "pricing" | "contact" | "testimonials" | "faq" | "footer";
  title: string;
  subtitle: string;
  badge?: string;
  buttonText?: string;
  buttonTextSecondary?: string;
  featuresList?: string[];
  pricingCards?: Array<{ planName: string; price: string; period: string; features: string[]; isPopular?: boolean }>;
  testimonialsList?: Array<{ name: string; role: string; text: string; avatarUrl: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  statsItems?: Array<{ label: string; value: string }>;
}

export default function WebBuilder() {
  // Website themes presets
  const colorThemes = {
    aurora: {
      id: "aurora",
      name: "Space Aurora",
      bg: "bg-[#02040a]",
      textColor: "text-white",
      badgeClass: "bg-blue-500/10 border-blue-500/20 text-blue-400",
      accentGrad: "from-blue-400 via-purple-400 to-pink-400",
      buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/10",
      buttonSecondary: "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
      cardBg: "bg-white/5 border-white/10",
      highlightText: "text-blue-400",
      accentBg: "bg-blue-500"
    },
    emerald: {
      id: "emerald",
      name: "Forest Emerald",
      bg: "bg-[#020804]",
      textColor: "text-white",
      badgeClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      accentGrad: "from-emerald-400 via-teal-400 to-cyan-400",
      buttonPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10",
      buttonSecondary: "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
      cardBg: "bg-white/5 border-white/10",
      highlightText: "text-emerald-400",
      accentBg: "bg-emerald-500"
    },
    amber: {
      id: "amber",
      name: "Sunset Amber",
      bg: "bg-[#0d0702]",
      textColor: "text-white",
      badgeClass: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      accentGrad: "from-amber-400 via-orange-400 to-yellow-400",
      buttonPrimary: "bg-amber-600 hover:bg-amber-700 text-black shadow-amber-500/10",
      buttonSecondary: "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
      cardBg: "bg-white/5 border-white/10",
      highlightText: "text-amber-400",
      accentBg: "bg-amber-500"
    },
    cyberpunk: {
      id: "cyberpunk",
      name: "Cyberpunk Glow",
      bg: "bg-[#0b0312]",
      textColor: "text-white",
      badgeClass: "bg-pink-500/10 border-pink-500/20 text-pink-400",
      accentGrad: "from-pink-400 via-purple-500 to-cyan-400",
      buttonPrimary: "bg-pink-600 hover:bg-pink-700 text-white shadow-pink-500/10",
      buttonSecondary: "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10",
      cardBg: "bg-white/5 border-white/10",
      highlightText: "text-pink-400",
      accentBg: "bg-pink-500"
    },
    nordic: {
      id: "nordic",
      name: "Nordic Clean Light",
      bg: "bg-[#f8fafc]",
      textColor: "text-slate-900",
      badgeClass: "bg-slate-200 border-slate-300 text-slate-800",
      accentGrad: "from-slate-800 via-indigo-950 to-slate-900",
      buttonPrimary: "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10",
      buttonSecondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
      cardBg: "bg-white border-slate-200",
      highlightText: "text-indigo-600",
      accentBg: "bg-slate-900"
    }
  };

  // Starter templates
  const webTemplates = {
    saas: [
      {
        id: "hero_01",
        type: "hero" as const,
        title: "Scale Your Startup with AI-Powered Intelligence",
        subtitle: "The ultimate B2B SaaS system for founders. Validate concepts, model revenue forecasts, create slide decks, and discover premium VC investors in one single portal.",
        badge: "Next-Gen AI Workspace",
        buttonText: "Claim Free Trial",
        buttonTextSecondary: "Request Sandbox Demo"
      },
      {
        id: "features_01",
        type: "features" as const,
        title: "Engineered to Automate Growth",
        subtitle: "Launch features faster with highly localized AI models running on the cloud.",
        featuresList: [
          "Instant TAM/SAM/SOM Sizing Analytics",
          "Automated Peer Competitor Quadrant Generation",
          "Ready-to-use PPTX Slide Presentation Generators",
          "6-Axis Product DNA Capability Scoring"
        ]
      },
      {
        id: "stats_01",
        type: "stats" as const,
        title: "Unrivaled Industry Performance Metrics",
        subtitle: "Supporting world-class founders worldwide to structure operations.",
        statsItems: [
          { label: "Ideas Validated", value: "12,000+" },
          { label: "VC Funding Sourced", value: "$1.4B+" },
          { label: "AI Scans Per Day", value: "98,400" },
          { label: "Satisfaction", value: "99.4%" }
        ]
      },
      {
        id: "pricing_01",
        type: "pricing" as const,
        title: "Simple, Scalable Tier Models",
        subtitle: "Deploy co-pilot power for founders and team stakeholders alike.",
        pricingCards: [
          {
            planName: "Bootstrap Core",
            price: "$49",
            period: "month",
            features: ["5 AI Idea scans monthly", "Standard competitive matrices", "Basic Lean Canvas", "Email support"],
            isPopular: false
          },
          {
            planName: "Scale Growth",
            price: "$149",
            period: "month",
            features: ["Unlimited scans", "Automated investor lists", "Power Pitch Deck Exporter", "Live Chat AI Mentor", "Simulated Database Access"],
            isPopular: true
          }
        ]
      },
      {
        id: "contact_01",
        type: "contact" as const,
        title: "Claim Your Startup Sandbox",
        subtitle: "Leave your contact details. Our VC copilot expert team will provision your secure core instantly."
      },
      {
        id: "footer_01",
        type: "footer" as const,
        title: "STARTUP COPILOT AI",
        subtitle: "Silicon Valley | London | Singapore. All rights reserved."
      }
    ],
    agency: [
      {
        id: "hero_02",
        type: "hero" as const,
        title: "We Engineer Custom AI Systems",
        subtitle: "Delivering bespoke, state-of-the-art machine learning models, autonomous chatbots, and full-stack software from scratch for forward-thinking enterprises.",
        badge: "Elite AI Systems Agency",
        buttonText: "Schedule Call",
        buttonTextSecondary: "Explore Portfolio"
      },
      {
        id: "features_02",
        type: "features" as const,
        title: "Tailored AI Execution",
        subtitle: "From strategy blueprints to production Kubernetes deployments.",
        featuresList: [
          "Bespoke LLM Finetuning & Quantization",
          "Vector Databases & Semantic Search Layers",
          "Enterprise Privacy Safe Guarding",
          "Automated Pipeline Deployment Services"
        ]
      },
      {
        id: "pricing_02",
        type: "pricing" as const,
        title: "Transparent Project Pricing",
        subtitle: "Billed on fixed-milestones with strict code handover guarantees.",
        pricingCards: [
          {
            planName: "Blueprint Architecture",
            price: "$2,500",
            period: "one-time",
            features: ["System workflow mapping", "GCP/AWS Costing forecast", "API security blueprints", "3 Consultation calls"],
            isPopular: false
          },
          {
            planName: "Full Production Build",
            price: "$12,500",
            period: "milestone-based",
            features: ["End-to-end cloud build", "Tailwind + React applet frontend", "Secure backend Express API", "Gemini LLM pipeline integration", "30-Day handover support"],
            isPopular: true
          }
        ]
      },
      {
        id: "contact_02",
        type: "contact" as const,
        title: "Consult Our Lead Engineer",
        subtitle: "Describe your custom project requirements below."
      }
    ]
  };

  // State Management
  const [sections, setSections] = useState<WebSection[]>(webTemplates.saas);
  const [activeSectionId, setActiveSectionId] = useState<string>("hero_01");
  const [activeThemeId, setActiveThemeId] = useState<keyof typeof colorThemes>("aurora");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"inspector" | "code" | "leads">("inspector");
  const [copied, setCopied] = useState<boolean>(false);

  // Simulated captured leads state
  const [leads, setLeads] = useState<Array<{ name: string; email: string; project: string; date: string }>>([
    { name: "Robert Sterling", email: "robert@apexledger.xyz", project: "Decentralized crypto vault", date: "04:22 AM" },
    { name: "Emily Zhao", email: "emily@healthtrack.ai", project: "Athlete fitness logging SaaS", date: "04:31 AM" }
  ]);

  // Form Fields simulator
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>("");

  const [simulatedToast, setSimulatedToast] = useState<string | null>(null);

  const theme = colorThemes[activeThemeId];

  // Helper Toast
  const showToast = (msg: string) => {
    setSimulatedToast(msg);
    setTimeout(() => setSimulatedToast(null), 3000);
  };

  const loadTemplate = (key: keyof typeof webTemplates) => {
    const data = webTemplates[key];
    setSections(data);
    setActiveSectionId(data[0].id);
    showToast(`Loaded ${key.toUpperCase()} preset website template!`);
  };

  // Generate with AI prompt heuristics
  const generateWebsiteWithAI = () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const promptLower = aiPrompt.toLowerCase();
      let customSections: WebSection[] = [];

      if (promptLower.includes("health") || promptLower.includes("med") || promptLower.includes("doctor") || promptLower.includes("wellness")) {
        customSections = [
          {
            id: "fit_hero",
            type: "hero",
            title: "Holistic Health Intel for Founders",
            subtitle: "Optimize focus, track daily vital trends, manage stress loops, and maintain physical durability to make your unicorn journey sustainable.",
            badge: "SaaS Wellness Core",
            buttonText: "Schedule Vital Audit",
            buttonTextSecondary: "Explore Metrics"
          },
          {
            id: "fit_feats",
            type: "features",
            title: "Designed for Founder Durability",
            subtitle: "Maintain cognitive clarity during stress-heavy growth sprints.",
            featuresList: [
              "Daily cortisol response monitoring logs",
              "Interactive breathing rate stabilizers",
              "Caffeine and sleep optimization planners",
              "Biometric alert sync for wearable rings"
            ]
          },
          {
            id: "fit_pricing",
            type: "pricing",
            title: "Choose Your Wellness Plan",
            subtitle: "Affordable access to physical audit checks and co-pilot health tracking.",
            pricingCards: [
              { planName: "Basic Tracker", price: "$19", period: "month", features: ["Wearable API synchronization", "Cortisol tracking charts", "Basic breathing guide"], isPopular: false },
              { planName: "Elite Performance Pro", price: "$69", period: "month", features: ["Advanced stress logs", "Direct consultations with human doctors", "Custom dietary planners", "AI vital warnings"], isPopular: true }
            ]
          },
          {
            id: "fit_contact",
            type: "contact",
            title: "Request Live Vital Demo",
            subtitle: "Leave your email. Our team will schedule an audit on your calendar."
          }
        ];
      } else {
        const titleCase = aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1);
        customSections = [
          {
            id: "gen_hero",
            type: "hero",
            title: `Bespoke Landing for ${titleCase}`,
            subtitle: `Empowering high-growth projects with elite software and interactive user flows. Refine and custom style this layout to fit your branding strategy perfectly.`,
            badge: "Generated Concept Launch",
            buttonText: "Get Instant Access",
            buttonTextSecondary: "Read Case Study"
          },
          {
            id: "gen_feats",
            type: "features",
            title: "Core Capabilities Built From Scratch",
            subtitle: "Engineered to deliver high performance, beautiful typography, and clean grids.",
            featuresList: [
              "Fully custom modular section layouts",
              "Responsive Desktop/Tablet/Mobile viewports",
              "Interactive Leads/Feedback DB controllers",
              "Direct output of production-ready React code"
            ]
          },
          {
            id: "gen_stats",
            type: "stats",
            title: "Enterprise Scale Verified",
            subtitle: "Rely on robust structures that load in under 100 milliseconds.",
            statsItems: [
              { label: "Active Customers", value: "850+" },
              { label: "Uptime SLA Guarantee", value: "99.99%" },
              { label: "NPS Customer Score", value: "76" },
              { label: "Vulnerability Scans", value: "Pass" }
            ]
          },
          {
            id: "gen_contact",
            type: "contact",
            title: "Get In Touch Now",
            subtitle: "Leave your message below to request customization blueprints."
          }
        ];
      }

      setSections(customSections);
      setActiveSectionId(customSections[0].id);
      setIsGenerating(false);
      setAiPrompt("");
      showToast("🚀 Website Created Successfully!");
    }, 1200);
  };

  // Section Outliner actions
  const moveSection = (direction: "up" | "down", id: string) => {
    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setSections(copy);
  };

  const deleteSection = (id: string) => {
    if (sections.length <= 1) {
      showToast("⚠ Keep at least one section.");
      return;
    }
    const filtered = sections.filter(s => s.id !== id);
    setSections(filtered);
    if (activeSectionId === id) {
      setActiveSectionId(filtered[0].id);
    }
    showToast("Section Deleted");
  };

  const addSectionTemplate = (type: WebSection["type"]) => {
    const newId = `${type}_${Date.now()}`;
    let newSec: WebSection;

    switch (type) {
      case "hero":
        newSec = { id: newId, type: "hero", title: "Dynamic Hero Heading", subtitle: "Write a high-converting subtitle description here.", badge: "New Feature", buttonText: "Get Started Now", buttonTextSecondary: "Learn More" };
        break;
      case "features":
        newSec = { id: newId, type: "features", title: "Our Powerful Benefits", subtitle: "Detail 3-4 features of your product strategy.", featuresList: ["Feature point one description", "Feature point two details", "Feature point three details"] };
        break;
      case "stats":
        newSec = { id: newId, type: "stats", title: "By The Numbers", subtitle: "Key performance figures confirming scale.", statsItems: [{ label: "Growth YoY", value: "240%" }, { label: "Happy Accounts", value: "4.8/5 ⭐" }] };
        break;
      case "pricing":
        newSec = { id: newId, type: "pricing", title: "Flexible Packages", subtitle: "Prices scaled to company volume sizes.", pricingCards: [{ planName: "Solo Plan", price: "$29", period: "mo", features: ["1 Account", "Standard access"], isPopular: true }] };
        break;
      case "testimonials":
        newSec = { id: newId, type: "testimonials", title: "Loved by Operators", subtitle: "Real testimonials from founders in our cohort.", testimonialsList: [{ name: "Sanjay Gupta", role: "CEO, FinTechFlow", text: "Startup Copilot slashed our product design feedback loop by weeks. A total game-changer.", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60" }] };
        break;
      case "contact":
        newSec = { id: newId, type: "contact", title: "Let's Build Together", subtitle: "Connect with our platform team today." };
        break;
      default:
        newSec = { id: newId, type: "footer", title: "FOOTER DIRECTORY", subtitle: "Copyright © 2026. All rights reserved." };
    }

    setSections([...sections, newSec]);
    setActiveSectionId(newId);
    showToast(`Appended ${type.toUpperCase()} Section`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim()) {
      showToast("⚠ Please provide a valid email.");
      return;
    }

    const newLead = {
      name: formName || "Anonymous Operator",
      email: formEmail,
      project: formMessage || "Interested in custom onboarding.",
      date: new Date().toLocaleTimeString()
    };

    setLeads(prev => [newLead, ...prev]);
    setFormName("");
    setFormEmail("");
    setFormMessage("");
    showToast("🎉 Lead submitted to virtual Database!");
  };

  // Compile React + Tailwind Code
  const getCompiledCode = () => {
    let code = `import React, { useState } from 'react';\n\n`;
    code += `export default function ModernLandingPage() {\n`;
    code += `  const [submitted, setSubmitted] = useState(false);\n`;
    code += `  const [leads, setLeads] = useState([]);\n\n`;
    code += `  const handleSubmit = (e) => {\n`;
    code += `    e.preventDefault();\n`;
    code += `    const email = e.target.email.value;\n`;
    code += `    setLeads(prev => [...prev, email]);\n`;
    code += `    setSubmitted(true);\n`;
    code += `    alert('Successfully subscribed email: ' + email);\n`;
    code += `  };\n\n`;
    code += `  return (\n`;
    code += `    <div className="min-h-screen ${theme.bg} ${theme.textColor} font-sans select-none relative overflow-hidden">\n`;
    code += `      {/* Background radial overlays */}\n`;
    code += `      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl pointer-events-none" />\n\n`;

    sections.forEach(sec => {
      code += `      {/* SECTION: ${sec.type.toUpperCase()} */}\n`;
      if (sec.type === "hero") {
        code += `      <section className="relative py-24 px-10 max-w-6xl mx-auto flex flex-col items-center text-center z-10">\n`;
        if (sec.badge) code += `        <div className="px-3 py-1 text-xs font-bold rounded-full border mb-6 ${theme.badgeClass}">${sec.badge}</div>\n`;
        code += `        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight max-w-4xl">\n`;
        code += `          <span className="bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGrad}">\n`;
        code += `            ${sec.title}\n`;
        code += `          </span>\n`;
        code += `        </h1>\n`;
        code += `        <p className="text-base md:text-lg text-slate-400 mt-6 max-w-2xl leading-relaxed">${sec.subtitle}</p>\n`;
        code += `        <div className="flex gap-4 mt-10">\n`;
        code += `          <button className="px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg transition-transform hover:scale-105 ${theme.buttonPrimary}">${sec.buttonText}</button>\n`;
        code += `          <button className="px-8 py-3.5 rounded-xl font-bold text-sm transition-colors ${theme.buttonSecondary}">${sec.buttonTextSecondary}</button>\n`;
        code += `        </div>\n`;
        code += `      </section>\n\n`;
      } else if (sec.type === "features") {
        code += `      <section className="py-20 px-10 max-w-6xl mx-auto border-t border-white/5 z-10 relative">\n`;
        code += `        <div className="text-center mb-12">\n`;
        code += `          <h2 className="text-3xl font-black uppercase italic tracking-tighter">${sec.title}</h2>\n`;
        code += `          <p className="text-sm text-slate-500 mt-2">${sec.subtitle}</p>\n`;
        code += `        </div>\n`;
        code += `        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\n`;
        sec.featuresList?.forEach((feat, index) => {
          code += `          <div className="p-6 rounded-2xl border ${theme.cardBg} flex gap-4">\n`;
          code += `            <div className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">${index + 1}</div>\n`;
          code += `            <div>\n`;
          code += `              <h4 className="font-bold text-white text-sm">${feat}</h4>\n`;
          code += `              <p className="text-xs text-slate-500 mt-1">Autonomous systems running under microsecond constraints.</p>\n`;
          code += `            </div>\n`;
          code += `          </div>\n`;
        });
        code += `        </div>\n`;
        code += `      </section>\n\n`;
      } else if (sec.type === "stats") {
        code += `      <section className="py-16 px-10 max-w-6xl mx-auto border-t border-white/5 bg-white/5 rounded-3xl mb-12 z-10 relative">\n`;
        code += `        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">\n`;
        sec.statsItems?.forEach(item => {
          code += `          <div>\n`;
          code += `            <span className="block text-3xl font-extrabold text-white">${item.value}</span>\n`;
          code += `            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mt-1 block">${item.label}</span>\n`;
          code += `          </div>\n`;
        });
        code += `        </div>\n`;
        code += `      </section>\n\n`;
      } else if (sec.type === "pricing") {
        code += `      <section className="py-20 px-10 max-w-6xl mx-auto border-t border-white/5 z-10 relative">\n`;
        code += `        <div className="text-center mb-12">\n`;
        code += `          <h2 className="text-3xl font-black uppercase italic tracking-tighter">${sec.title}</h2>\n`;
        code += `          <p className="text-sm text-slate-500 mt-2">${sec.subtitle}</p>\n`;
        code += `        </div>\n`;
        code += `        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">\n`;
        sec.pricingCards?.forEach(card => {
          code += `          <div className="p-8 rounded-3xl border flex flex-col justify-between ${theme.cardBg} ${card.isPopular ? "ring-2 ring-blue-500" : ""}">\n`;
          code += `            <div>\n`;
          code += `              <div className="flex justify-between items-center">\n`;
          code += `                <h3 className="text-lg font-bold">${card.planName}</h3>\n`;
          if (card.isPopular) code += `                <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-black text-[9px] font-black uppercase tracking-widest">Popular</span>\n`;
          code += `              </div>\n`;
          code += `              <div className="flex items-baseline gap-2 mt-4">\n`;
          code += `                <span className="text-3xl font-black">${card.price}</span>\n`;
          code += `                <span className="text-xs text-slate-500">/ ${card.period}</span>\n`;
          code += `              </div>\n`;
          code += `              <ul className="space-y-2 mt-6 text-xs text-slate-400">\n`;
          card.features.forEach(f => {
            code += `                <li className="flex items-center gap-2">✓ ${f}</li>\n`;
          });
          code += `              </ul>\n`;
          code += `            </div>\n`;
          code += `            <button className="w-full mt-8 py-3 rounded-xl font-bold text-xs bg-white text-black hover:bg-slate-200 transition-colors">Choose Plan</button>\n`;
          code += `          </div>\n`;
        });
        code += `        </div>\n`;
        code += `      </section>\n\n`;
      } else if (sec.type === "contact") {
        code += `      <section className="py-20 px-10 max-w-xl mx-auto border-t border-white/5 z-10 relative">\n`;
        code += `        <div className="text-center mb-8">\n`;
        code += `          <h2 className="text-3xl font-black uppercase italic tracking-tighter">${sec.title}</h2>\n`;
        code += `          <p className="text-xs text-slate-500 mt-2">${sec.subtitle}</p>\n`;
        code += `        </div>\n`;
        code += `        <form onSubmit={handleSubmit} className="space-y-4">\n`;
        code += `          <input type="email" name="email" required placeholder="Enter active email..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs" />\n`;
        code += `          <button type="submit" className="w-full py-3 rounded-xl font-bold text-xs ${theme.buttonPrimary}">Request Free Blueprint</button>\n`;
        code += `        </form>\n`;
        code += `      </section>\n\n`;
      } else if (sec.type === "footer") {
        code += `      <footer className="py-12 border-t border-white/10 text-center text-xs text-slate-600 font-mono">\n`;
        code += `        <p className="font-extrabold tracking-widest text-white">${sec.title}</p>\n`;
        code += `        <p className="mt-2 text-[10px]">${sec.subtitle}</p>\n`;
        code += `      </footer>\n`;
      }
    });

    code += `    </div>\n`;
    code += `  );\n`;
    code += `}\n`;
    return code;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCompiledCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("📋 Web Code Copied!");
  };

  const updateSectionField = (field: keyof WebSection, value: any) => {
    setSections(prev => prev.map(sec => {
      if (sec.id === activeSectionId) {
        return { ...sec, [field]: value };
      }
      return sec;
    }));
  };

  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div id="web-builder-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Globe className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Website Builder Studio</h1>
              <p className="text-xs text-slate-500">Structure responsive landing pages from scratch, test active marketing submission forms, and copy production code.</p>
            </div>
          </div>
        </div>

        {/* Global theme selection and presets */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-800 rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => loadTemplate("saas")} 
              className="px-3 py-1.5 rounded text-xs font-bold hover:bg-white/5 transition-colors"
            >
              💻 SaaS Launch
            </button>
            <button 
              onClick={() => loadTemplate("agency")} 
              className="px-3 py-1.5 rounded text-xs font-bold hover:bg-white/5 transition-colors"
            >
              💼 Elite Agency
            </button>
          </div>
          
          <select 
            value={activeThemeId}
            onChange={(e) => setActiveThemeId(e.target.value as keyof typeof colorThemes)}
            className="px-3 py-2 bg-slate-900 border border-white/10 rounded-xl text-xs text-white"
          >
            {Object.values(colorThemes).map(t => (
              <option key={t.id} value={t.id}>🎨 {t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* AI Prompt Generator */}
      <div className="p-4 bg-gradient-to-r from-blue-950/20 to-indigo-950/20 rounded-2xl border border-blue-500/20 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-2 text-blue-400 shrink-0 font-mono text-xs font-black uppercase">
          <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
          <span>Prompt Landing Generator</span>
        </div>
        <input 
          type="text" 
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="e.g. Modern wellness and longevity landing page / Web3 coin dashboard with hero and pricing"
          className="flex-1 bg-black/40 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          onKeyDown={(e) => e.key === "Enter" && generateWebsiteWithAI()}
        />
        <button 
          onClick={generateWebsiteWithAI}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/10 shrink-0"
        >
          {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {isGenerating ? "Assembling Blocks..." : "Generate Page"}
        </button>
      </div>

      {/* Workspace split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* L Pane (Grid cols 3) - Section Outliner and appending */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Outliner panel */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Layout className="w-4 h-4 text-blue-400" /> Page Outline</span>
              <span className="text-[10px] font-mono text-slate-500">[{sections.length} BLOCKS]</span>
            </h3>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {sections.map((sec, index) => (
                <div 
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    sec.id === activeSectionId 
                      ? "bg-blue-500/10 border-blue-500/40 text-white" 
                      : "bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <span className="font-bold flex items-center gap-2">
                    <span className="text-[9px] font-mono bg-white/5 text-slate-400 w-5 h-5 flex items-center justify-center rounded-md">{index + 1}</span>
                    {sec.type.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 md:opacity-100">
                    <button 
                      onClick={(e) => { e.stopPropagation(); moveSection("up", sec.id); }}
                      className="p-1 hover:text-blue-400 text-slate-500 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); moveSection("down", sec.id); }}
                      className="p-1 hover:text-blue-400 text-slate-500 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteSection(sec.id); }}
                      className="p-1 hover:text-red-400 text-slate-500 transition-colors"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Append Section templates block */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 mb-4 pb-2 border-b border-white/10 flex items-center gap-1.5">
              <ListPlus className="w-4 h-4 text-blue-400" /> Insert Blocks
            </h3>

            <div className="grid grid-cols-1 gap-2">
              <button 
                onClick={() => addSectionTemplate("hero")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between text-slate-300 hover:text-white"
              >
                <span>🚀 Hero Header</span>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button 
                onClick={() => addSectionTemplate("features")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between text-slate-300 hover:text-white"
              >
                <span>⚡ Bento Features</span>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button 
                onClick={() => addSectionTemplate("stats")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between text-slate-300 hover:text-white"
              >
                <span>📊 Statistics Row</span>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button 
                onClick={() => addSectionTemplate("pricing")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between text-slate-300 hover:text-white"
              >
                <span>💵 Pricing Cards</span>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button 
                onClick={() => addSectionTemplate("testimonials")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between text-slate-300 hover:text-white"
              >
                <span>💬 Review Testimonials</span>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
              </button>
              <button 
                onClick={() => addSectionTemplate("contact")}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between text-slate-300 hover:text-white"
              >
                <span>✉ Contact Form</span>
                <Plus className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

        </div>

        {/* M Pane (Grid cols 5) - Real Live website viewport simulator */}
        <div className="lg:col-span-5 flex flex-col items-center">
          
          {/* Viewport bar selector */}
          <div className="w-full max-w-lg flex justify-between items-center mb-3 bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-xs">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Active viewport</span>
            <div className="flex bg-slate-800 p-1 rounded-lg border border-white/5">
              <button 
                onClick={() => setViewport("desktop")}
                className={`p-1.5 rounded transition-all cursor-pointer ${viewport === "desktop" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewport("tablet")}
                className={`p-1.5 rounded transition-all cursor-pointer ${viewport === "tablet" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewport("mobile")}
                className={`p-1.5 rounded transition-all cursor-pointer ${viewport === "mobile" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive visual canvas mockup */}
          <div 
            className={`bg-[#02040a] rounded-3xl border-4 border-slate-800 shadow-2xl overflow-y-auto transition-all ${
              viewport === "desktop" ? "w-full h-[520px]" : viewport === "tablet" ? "w-[440px] h-[520px]" : "w-[300px] h-[520px]"
            } relative`}
          >
            {/* Dynamic visual preview of sections */}
            <div className={`${theme.bg} ${theme.textColor} min-h-full font-sans transition-all`}>
              
              {sections.map((sec) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <div 
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`relative p-6 border-b border-dashed border-white/5 group transition-all ${
                      isActive ? "bg-blue-950/10 ring-1 ring-blue-500/50" : "hover:bg-white/5 cursor-pointer"
                    }`}
                  >
                    {/* Visual Badge overlay */}
                    <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 bg-blue-600/90 text-white font-bold font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded shadow z-40">
                      {sec.type} block
                    </div>

                    {/* HERO block renderer */}
                    {sec.type === "hero" && (
                      <div className="py-12 flex flex-col items-center text-center max-w-md mx-auto">
                        {sec.badge && (
                          <div className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold font-mono mb-4 uppercase tracking-wider ${theme.badgeClass}`}>
                            {sec.badge}
                          </div>
                        )}
                        <h1 className={`text-2xl md:text-3xl font-black uppercase italic tracking-tighter leading-tight`}>
                          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.accentGrad}`}>
                            {sec.title}
                          </span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-4 leading-relaxed">{sec.subtitle}</p>
                        
                        <div className="flex gap-3 mt-6 flex-wrap justify-center">
                          <button className={`px-5 py-2 rounded-xl text-xs font-bold transition-transform hover:scale-105 ${theme.buttonPrimary}`}>
                            {sec.buttonText}
                          </button>
                          <button className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${theme.buttonSecondary}`}>
                            {sec.buttonTextSecondary}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* FEATURES block renderer */}
                    {sec.type === "features" && (
                      <div className="py-8">
                        <div className="text-center mb-6">
                          <h2 className="text-lg font-black uppercase italic tracking-tighter">{sec.title}</h2>
                          <p className="text-[10px] text-slate-500 mt-1">{sec.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {sec.featuresList?.map((feat, idx) => (
                            <div key={idx} className={`p-3 rounded-xl border ${theme.cardBg} flex gap-3 items-start`}>
                              <div className="p-1 bg-blue-500/10 text-blue-400 rounded-lg font-mono text-[9px] font-bold">0{idx + 1}</div>
                              <div>
                                <h4 className="text-xs font-bold">{feat}</h4>
                                <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">Optimized algorithms running natively on Cloud Sandbox architecture.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STATISTICS block renderer */}
                    {sec.type === "stats" && (
                      <div className="py-6 bg-white/5 rounded-2xl p-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          {sec.statsItems?.map((st, idx) => (
                            <div key={idx}>
                              <span className="block text-xl font-extrabold text-white">{st.value}</span>
                              <span className="text-[8px] text-slate-500 uppercase tracking-widest font-mono mt-0.5 block">{st.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PRICING block renderer */}
                    {sec.type === "pricing" && (
                      <div className="py-8">
                        <div className="text-center mb-6">
                          <h2 className="text-lg font-black uppercase italic tracking-tighter">{sec.title}</h2>
                          <p className="text-[10px] text-slate-500 mt-1">{sec.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {sec.pricingCards?.map((cd, i) => (
                            <div key={i} className={`p-5 rounded-2xl border flex flex-col justify-between ${theme.cardBg} ${cd.isPopular ? "ring-1 ring-blue-400" : ""}`}>
                              <div>
                                <div className="flex justify-between items-center">
                                  <h4 className="text-xs font-bold text-white">{cd.planName}</h4>
                                  {cd.isPopular && <span className="px-1.5 py-0.5 bg-blue-500 text-black text-[7px] font-black uppercase tracking-widest rounded-full">POPULAR</span>}
                                </div>
                                <div className="flex items-baseline gap-1.5 mt-2">
                                  <span className="text-xl font-black text-white">{cd.price}</span>
                                  <span className="text-[9px] text-slate-500">/ {cd.period}</span>
                                </div>
                                <ul className="space-y-1 mt-3 text-[9px] text-slate-400 font-mono">
                                  {cd.features.map((feat, key) => (
                                    <li key={key} className="flex items-center gap-1.5">✓ {feat}</li>
                                  ))}
                                </ul>
                              </div>
                              <button className="w-full py-1.5 bg-white text-black text-[10px] font-bold rounded-lg mt-4 hover:bg-slate-200 transition-colors">
                                Buy Package
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TESTIMONIALS block renderer */}
                    {sec.type === "testimonials" && (
                      <div className="py-6">
                        <div className="text-center mb-4">
                          <h2 className="text-lg font-black uppercase italic tracking-tighter">{sec.title}</h2>
                        </div>
                        {sec.testimonialsList?.map((ts, idx) => (
                          <div key={idx} className={`p-4 rounded-xl border ${theme.cardBg} space-y-3`}>
                            <p className="text-[11px] text-slate-300 italic leading-relaxed">"{ts.text}"</p>
                            <div className="flex items-center gap-2.5">
                              <img src={ts.avatarUrl} className="w-6 h-6 rounded-full object-cover" alt="testimonial avatar" />
                              <div>
                                <h5 className="text-[10px] font-bold text-white leading-none">{ts.name}</h5>
                                <span className="text-[8px] text-slate-500 font-mono">{ts.role}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CONTACT Form block renderer */}
                    {sec.type === "contact" && (
                      <div className="py-8">
                        <div className="text-center mb-6">
                          <h2 className="text-lg font-black uppercase italic tracking-tighter">{sec.title}</h2>
                          <p className="text-[10px] text-slate-500 mt-1">{sec.subtitle}</p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-3 max-w-xs mx-auto">
                          <input 
                            type="text" 
                            required 
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Your operator name" 
                            className="w-full bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs placeholder-slate-500 focus:outline-none" 
                          />
                          <input 
                            type="email" 
                            required 
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="founder@venture.com" 
                            className="w-full bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs placeholder-slate-500 focus:outline-none" 
                          />
                          <textarea 
                            rows={2}
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            placeholder="Message details..." 
                            className="w-full bg-white/5 border border-white/10 p-2.5 rounded-lg text-xs placeholder-slate-500 focus:outline-none" 
                          />
                          <button type="submit" className={`w-full py-2.5 rounded-xl font-bold text-xs ${theme.buttonPrimary}`}>
                            Submit Contact Inquiry
                          </button>
                        </form>
                      </div>
                    )}

                    {/* FOOTER block renderer */}
                    {sec.type === "footer" && (
                      <div className="py-8 border-t border-white/5 text-center text-[10px] text-slate-600 font-mono space-y-1">
                        <p className="font-bold text-slate-400">{sec.title}</p>
                        <p>{sec.subtitle}</p>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>
          </div>
        </div>

        {/* R Pane (Grid cols 4) - Section properties editing */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Tab buttons */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-1.5 flex gap-1 shadow-md">
            <button 
              onClick={() => setActiveTab("inspector")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "inspector" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Text Inspector
            </button>
            <button 
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "code" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Copy Code
            </button>
            <button 
              onClick={() => setActiveTab("leads")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "leads" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Leads list
            </button>
          </div>

          {/* Rendering Panels */}
          {activeTab === "inspector" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 pb-2 border-b border-white/10 flex justify-between items-center">
                <span>Section Content Editor</span>
                <span className="font-mono text-[9px] text-blue-400">ACTIVE: {activeSection?.type.toUpperCase()}</span>
              </h3>

              {!activeSection ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  Choose any section layout on the visual frame to begin modifying title strings and lists.
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Section Title</label>
                    <textarea 
                      value={activeSection.title}
                      onChange={(e) => updateSectionField("title", e.target.value)}
                      rows={2}
                      className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Subtitle / Secondary Text</label>
                    <textarea 
                      value={activeSection.subtitle}
                      onChange={(e) => updateSectionField("subtitle", e.target.value)}
                      rows={3}
                      className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  {/* Hero buttons details */}
                  {activeSection.type === "hero" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Button</label>
                        <input 
                          type="text"
                          value={activeSection.buttonText || ""}
                          onChange={(e) => updateSectionField("buttonText", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Secondary Button</label>
                        <input 
                          type="text"
                          value={activeSection.buttonTextSecondary || ""}
                          onChange={(e) => updateSectionField("buttonTextSecondary", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Features list details */}
                  {activeSection.type === "features" && activeSection.featuresList && (
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-3">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">Configure Features List</span>
                      {activeSection.featuresList.map((f, i) => (
                        <div key={i} className="space-y-1">
                          <label className="text-[8px] font-mono text-slate-500">Feature #{i+1}</label>
                          <input 
                            type="text"
                            value={f}
                            onChange={(e) => {
                              const list = [...(activeSection.featuresList || [])];
                              list[i] = e.target.value;
                              updateSectionField("featuresList", list);
                            }}
                            className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-blue-400" /> Compiled JSX Code
                </span>
                <button 
                  onClick={copyCode}
                  className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-lg transition-colors flex items-center gap-1 text-[10px]"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-black/60 border border-white/5 p-4 rounded-xl max-h-96 overflow-y-auto font-mono text-[9px] text-slate-300 leading-relaxed whitespace-pre pr-2">
                {getCompiledCode()}
              </div>

              <p className="text-[10px] text-slate-500 leading-normal font-mono">
                💡 This react code features pre-configured Tailwind layouts that precisely match your selected color theme: <strong>{theme.name}</strong>.
              </p>
            </div>
          )}

          {activeTab === "leads" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 pb-2 border-b border-white/10 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-blue-400" /> Captured Leads Inbox ({leads.length})
              </h3>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {leads.length === 0 ? (
                  <div className="p-8 text-center text-slate-600 text-xs font-mono">
                    No leads captured. Test the Contact Form on the preview viewport.
                  </div>
                ) : (
                  leads.map((l, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1.5 text-[10px] font-mono leading-normal">
                      <div className="flex justify-between items-center text-slate-500">
                        <span>DATE: {l.date}</span>
                        <span className="text-blue-400 font-bold">LEAD TARGET</span>
                      </div>
                      <div className="text-slate-200 font-bold">{l.name} ({l.email})</div>
                      <div className="text-slate-400 bg-white/5 p-2 rounded border border-white/5 italic">
                        "{l.project}"
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Simulated toast notifier */}
      {simulatedToast && (
        <div className="fixed bottom-6 right-6 p-4 bg-slate-900 border border-blue-500/40 text-slate-100 rounded-2xl shadow-2xl z-50 flex items-center gap-2.5 animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
          <span className="text-xs font-mono font-bold">{simulatedToast}</span>
        </div>
      )}

    </div>
  );
}
