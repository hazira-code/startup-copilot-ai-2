import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Smartphone, 
  Plus, 
  Trash2, 
  Settings, 
  Play, 
  Edit3, 
  Download, 
  Copy, 
  Check, 
  Database, 
  Code, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Layers, 
  Tv, 
  Smartphone as PhoneIcon, 
  Eye, 
  Laptop, 
  ListPlus,
  GripVertical,
  RefreshCw,
  Info,
  ChevronRight,
  User,
  ShoppingBag,
  Grid,
  Bell,
  Heart
} from "lucide-react";

export interface AppElement {
  id: string;
  type: "text" | "heading" | "button" | "input" | "image" | "card" | "list" | "progress" | "metric" | "toggle";
  content: string;
  label?: string;
  placeholder?: string;
  imageUrl?: string;
  actionType?: "toast" | "navigate" | "submit" | "none";
  actionTarget?: string; // Screen name to navigate to, or list to save to
  themeColor?: string;
  metricValue?: string;
  metricUnit?: string;
  isCompleted?: boolean;
}

export interface AppScreen {
  id: string;
  name: string;
  elements: AppElement[];
}

export default function AppBuilder() {
  // Preset templates
  const templates = {
    ecommerce: [
      {
        id: "scr_home",
        name: "Shop Home",
        elements: [
          { id: "el_head", type: "heading", content: "⚡ URBAN KICKS", label: "Premium Sneakers Store" },
          { id: "el_img", type: "image", content: "Air Max Pro Edition", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60" },
          { id: "el_metric", type: "metric", content: "Trending Hot", metricValue: "$189.00", metricUnit: "USD" },
          { id: "el_desc", type: "text", content: "Engineered with maximum response cushioning for athletes and city wanderers." },
          { id: "el_btn_cart", type: "button", content: "Add to Active Cart", actionType: "toast", actionTarget: "Sneaker added to your shopping cart!" },
          { id: "el_btn_nav", type: "button", content: "Go to Checkout ➜", actionType: "navigate", actionTarget: "Checkout Screen" }
        ]
      },
      {
        id: "scr_checkout",
        name: "Checkout Screen",
        elements: [
          { id: "el_chk_head", type: "heading", content: "Secure Checkout", label: "Order Summary" },
          { id: "el_inp_name", type: "input", content: "", label: "Full Name", placeholder: "Enter your name" },
          { id: "el_inp_addr", type: "input", content: "", label: "Shipping Address", placeholder: "Street, City, ZIP" },
          { id: "el_prog", type: "progress", content: "Order Completion Progress", metricValue: "75" },
          { id: "el_btn_pay", type: "button", content: "Confirm and Pay Now", actionType: "submit", actionTarget: "orders" }
        ]
      }
    ],
    delivery: [
      {
        id: "scr_dash",
        name: "Delivery Dashboard",
        elements: [
          { id: "el_del_head", type: "heading", content: "⚡ QUICK-BITE AI", label: "Instant Food Hub" },
          { id: "el_del_stat", type: "metric", content: "Active Courier Status", metricValue: "12 mins", metricUnit: "Away" },
          { id: "el_del_desc", type: "text", content: "Your delicious pepperoni pizza is freshly baked and out for hot delivery." },
          { id: "el_del_img", type: "image", content: "Hot fresh pizza selection", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60" },
          { id: "el_del_tgl", type: "toggle", content: "Leave order at my front door", isCompleted: true },
          { id: "el_del_notif", type: "button", content: "Ping Courier Support", actionType: "toast", actionTarget: "Courier team notified. We will call you instantly!" }
        ]
      }
    ],
    saas: [
      {
        id: "scr_saas_home",
        name: "Workspace Hub",
        elements: [
          { id: "el_saas_head", type: "heading", content: "CO-PILOT CONTEXT", label: "Enterprise Workspace" },
          { id: "el_saas_metric", type: "metric", content: "Monthly Recurring Revenue", metricValue: "$48,250", metricUnit: "ARR v3.1" },
          { id: "el_saas_prog", type: "progress", content: "Server CPU Load Capacity", metricValue: "34" },
          { id: "el_saas_btn", type: "button", content: "Provision New Server VM", actionType: "toast", actionTarget: "Kubernetes Pod spinning up in cloud-run..." },
          { id: "el_saas_inp", type: "input", content: "", label: "Task Invite Email", placeholder: "colleague@startup.com" },
          { id: "el_saas_submit", type: "button", content: "Send System Invite", actionType: "submit", actionTarget: "invites" }
        ]
      }
    ]
  };

  // State Management
  const [screens, setScreens] = useState<AppScreen[]>(templates.ecommerce);
  const [activeScreenId, setActiveScreenId] = useState<string>("scr_home");
  const [selectedElementId, setSelectedElementId] = useState<string | null>("el_head");
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<"violet" | "blue" | "emerald" | "amber" | "cyber">("violet");
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"editor" | "code" | "db">("editor");

  // Drag and Drop States
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const [draggedElementId, setDraggedElementId] = useState<string | null>(null);
  const [showSplitCode, setShowSplitCode] = useState<boolean>(true);

  // Simulated Database
  const [submittedData, setSubmittedData] = useState<Array<{ timestamp: string; collection: string; data: any }>>([
    { timestamp: "04:31:02", collection: "orders", data: { name: "Sarah Jenkins", address: "102 Infinite Loop, Cupertino" } },
    { timestamp: "04:35:45", collection: "invites", data: { email: "investor@sequoia.com" } }
  ]);

  // Toast log
  const [simulatedToast, setSimulatedToast] = useState<string | null>(null);

  // Active Screen helper
  const activeScreen = screens.find(s => s.id === activeScreenId) || screens[0] || { id: "empty", name: "No Screen", elements: [] };

  // Theme configuration
  const themes = {
    violet: { bg: "bg-violet-950/20", border: "border-violet-500/30", text: "text-violet-400", button: "bg-violet-600 hover:bg-violet-700 shadow-violet-500/20", glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]" },
    blue: { bg: "bg-blue-950/20", border: "border-blue-500/30", text: "text-blue-400", button: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20", glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
    emerald: { bg: "bg-emerald-950/20", border: "border-emerald-500/30", text: "text-emerald-400", button: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20", glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
    amber: { bg: "bg-amber-950/20", border: "border-amber-500/30", text: "text-amber-400", button: "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20", glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]" },
    cyber: { bg: "bg-[#090e1a]/80", border: "border-pink-500/30", text: "text-pink-400", button: "bg-pink-600 hover:bg-pink-700 shadow-pink-500/20", glow: "shadow-[0_0_20px_rgba(236,72,153,0.3)]" },
  };

  const colors = themes[activeTheme];

  // Load a Template
  const loadTemplate = (key: keyof typeof templates) => {
    const data = templates[key];
    setScreens(data);
    setActiveScreenId(data[0].id);
    setSelectedElementId(data[0].elements[0]?.id || null);
    setInteractiveMode(false);
  };

  // Generate App via AI Heuristics
  const generateAppWithAI = () => {
    if (!aiPrompt.trim()) return;
    setIsAiGenerating(true);

    setTimeout(() => {
      const promptLower = aiPrompt.toLowerCase();
      let customScreens: AppScreen[] = [];

      if (promptLower.includes("fit") || promptLower.includes("gym") || promptLower.includes("health")) {
        customScreens = [
          {
            id: "fit_dash",
            name: "Gym Progress",
            elements: [
              { id: "fit_h", type: "heading", content: "⚡ ATHLETE PULSE", label: "Smart Fitness Suite" },
              { id: "fit_met", type: "metric", content: "Daily Calories Burnt", metricValue: "640 kcal", metricUnit: "Active Burn" },
              { id: "fit_img", type: "image", content: "Workout motivation", imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=60" },
              { id: "fit_tgl", type: "toggle", content: "Heart Rate Monitor Active", isCompleted: true },
              { id: "fit_btn1", type: "button", content: "Log Running Miles Now", actionType: "toast", actionTarget: "Logged 3.5 miles in your active tracker!" },
              { id: "fit_btn2", type: "button", content: "View Routine Schedule ➜", actionType: "navigate", actionTarget: "Routine Planner" }
            ]
          },
          {
            id: "fit_routine",
            name: "Routine Planner",
            elements: [
              { id: "fit_plan_h", type: "heading", content: "Weekly Routines", label: "Interactive Planner" },
              { id: "fit_plan_inp", type: "input", content: "", label: "Add Custom Activity", placeholder: "e.g. 50 Pushups, Squats" },
              { id: "fit_plan_sub", type: "button", content: "Commit Activity", actionType: "submit", actionTarget: "fitness_logs" },
              { id: "fit_plan_prog", type: "progress", content: "Overall Routine Progress", metricValue: "42" }
            ]
          }
        ];
      } else if (promptLower.includes("crypto") || promptLower.includes("wallet") || promptLower.includes("coin") || promptLower.includes("bank")) {
        customScreens = [
          {
            id: "cryp_home",
            name: "My Crypto Wallet",
            elements: [
              { id: "cryp_h", type: "heading", content: "💎 APEX LEDGER", label: "Decentralized Asset Hub" },
              { id: "cryp_met", type: "metric", content: "Net Wallet Balance", metricValue: "14.28 ETH", metricUnit: "($36,120 USD)" },
              { id: "cryp_prog", type: "progress", content: "Gas Fee Optimization Alert", metricValue: "18" },
              { id: "cryp_btn1", type: "button", content: "Trigger Instant Swap", actionType: "toast", actionTarget: "Swap initiated on Uniswap liquidity pools!" },
              { id: "cryp_btn2", type: "button", content: "Go to Transfer Form ➜", actionType: "navigate", actionTarget: "Send Assets" }
            ]
          },
          {
            id: "cryp_send",
            name: "Send Assets",
            elements: [
              { id: "cryp_send_h", type: "heading", content: "Transfer Funds", label: "Enter Payment Parameters" },
              { id: "cryp_inp_addr", type: "input", content: "", label: "Recipient ENS/Hex Address", placeholder: "0x... or name.eth" },
              { id: "cryp_inp_amt", type: "input", content: "", label: "Ethereum Amount", placeholder: "0.00" },
              { id: "cryp_btn_sub", type: "button", content: "Sign Transaction", actionType: "submit", actionTarget: "blockchain_txs" }
            ]
          }
        ];
      } else {
        // Generic app template matched to user input
        const capitalizedTopic = aiPrompt.charAt(0).toUpperCase() + aiPrompt.slice(1);
        customScreens = [
          {
            id: "gen_home",
            name: `${capitalizedTopic} Hub`,
            elements: [
              { id: "gen_h", type: "heading", content: `⚡ ${capitalizedTopic.toUpperCase()} AI`, label: "Co-founder Sandbox Instance" },
              { id: "gen_desc", type: "text", content: `Welcome to your custom generated application centered around "${aiPrompt}". Edit details to perfect this concept.` },
              { id: "gen_met", type: "metric", content: "Current Operational Load", metricValue: "99.8%", metricUnit: "Uptime" },
              { id: "gen_btn1", type: "button", content: "Interactive Ping Call", actionType: "toast", actionTarget: `${capitalizedTopic} concept responds successfully!` },
              { id: "gen_btn2", type: "button", content: "Configure Forms ➜", actionType: "navigate", actionTarget: "Setup Form" }
            ]
          },
          {
            id: "gen_form",
            name: "Setup Form",
            elements: [
              { id: "gen_form_h", type: "heading", content: "Submit Feedback", label: "Concept Data Collector" },
              { id: "gen_inp_name", type: "input", content: "", label: "Full Profile Name", placeholder: "Your name" },
              { id: "gen_inp_note", type: "input", content: "", label: "Startup Vision Details", placeholder: "Describe your strategy" },
              { id: "gen_btn_sub", type: "button", content: "Log to AI Workspace", actionType: "submit", actionTarget: "logs" }
            ]
          }
        ];
      }

      setScreens(customScreens);
      setActiveScreenId(customScreens[0].id);
      setSelectedElementId(customScreens[0].elements[0]?.id || null);
      setIsAiGenerating(false);
      setAiPrompt("");
      showToast("🚀 App Structure Built Successfully!");
    }, 1200);
  };

  // Helper Toast
  const showToast = (message: string) => {
    setSimulatedToast(message);
    setTimeout(() => {
      setSimulatedToast(null);
    }, 3000);
  };

  // Handle Interactive Simulator Click
  const handleSimulatorElementClick = (element: AppElement) => {
    if (!interactiveMode) {
      setSelectedElementId(element.id);
      return;
    }

    // Interactive Action Logic
    if (element.type === "button") {
      if (element.actionType === "toast" && element.actionTarget) {
        showToast(element.actionTarget);
      } else if (element.actionType === "navigate" && element.actionTarget) {
        const destScreen = screens.find(s => s.name.toLowerCase() === element.actionTarget?.toLowerCase());
        if (destScreen) {
          setActiveScreenId(destScreen.id);
          showToast(`Switched to screen: ${destScreen.name}`);
        } else {
          showToast(`Screen "${element.actionTarget}" not configured!`);
        }
      } else if (element.actionType === "submit" && element.actionTarget) {
        // Collect form data on active screen
        const formValues: any = {};
        activeScreen.elements.forEach(el => {
          if (el.type === "input") {
            formValues[el.label || "input"] = el.content || "Placeholder value";
          }
        });
        const newRecord = {
          timestamp: new Date().toLocaleTimeString(),
          collection: element.actionTarget,
          data: Object.keys(formValues).length > 0 ? formValues : { action: "clicked submit", timestamp: Date.now() }
        };
        setSubmittedData(prev => [newRecord, ...prev]);
        showToast(`✔ Submitted to database: [${element.actionTarget}]`);
      }
    } else if (element.type === "toggle") {
      // Toggle value locally
      setScreens(prev => prev.map(scr => {
        if (scr.id === activeScreenId) {
          return {
            ...scr,
            elements: scr.elements.map(el => el.id === element.id ? { ...el, isCompleted: !el.isCompleted } : el)
          };
        }
        return scr;
      }));
      showToast(`${element.content} state toggled!`);
    }
  };

  // Screen CRUD
  const addScreen = () => {
    const newId = `scr_${Date.now()}`;
    const newName = `New Screen ${screens.length + 1}`;
    const newScreen: AppScreen = {
      id: newId,
      name: newName,
      elements: [
        { id: `el_${Date.now()}_h`, type: "heading", content: "New Screen", label: "Edit this layout" },
        { id: `el_${Date.now()}_t`, type: "text", content: "Add premium UI elements using the palette." }
      ]
    };
    setScreens([...screens, newScreen]);
    setActiveScreenId(newId);
    setSelectedElementId(`el_${Date.now()}_h`);
    showToast(`Added Screen: ${newName}`);
  };

  const deleteScreen = (id: string) => {
    if (screens.length <= 1) {
      showToast("⚠ You must retain at least one screen.");
      return;
    }
    const filtered = screens.filter(s => s.id !== id);
    setScreens(filtered);
    if (activeScreenId === id) {
      setActiveScreenId(filtered[0].id);
    }
    showToast("Screen Deleted");
  };

  // Element CRUD & Sorting
  const addElement = (type: AppElement["type"]) => {
    const newId = `el_${Date.now()}`;
    let newEl: AppElement = {
      id: newId,
      type,
      content: type === "button" ? "Click Action" : type === "heading" ? "Primary Title" : `Configure standard ${type} item content.`,
      label: type === "input" ? "Form Label" : type === "metric" ? "KPI Metric Title" : undefined,
      placeholder: type === "input" ? "Enter value..." : undefined,
      imageUrl: type === "image" ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60" : undefined,
      actionType: type === "button" ? "toast" : undefined,
      actionTarget: type === "button" ? "Task simulated successfully!" : undefined,
      metricValue: type === "metric" ? "120" : type === "progress" ? "60" : undefined,
      metricUnit: type === "metric" ? "units" : undefined,
      isCompleted: type === "toggle" ? false : undefined
    };

    setScreens(prev => prev.map(scr => {
      if (scr.id === activeScreenId) {
        return {
          ...scr,
          elements: [...scr.elements, newEl]
        };
      }
      return scr;
    }));
    setSelectedElementId(newId);
    showToast(`Added ${type.toUpperCase()} component`);
  };

  const deleteElement = (elementId: string) => {
    setScreens(prev => prev.map(scr => {
      if (scr.id === activeScreenId) {
        return {
          ...scr,
          elements: scr.elements.filter(el => el.id !== elementId)
        };
      }
      return scr;
    }));
    if (selectedElementId === elementId) {
      setSelectedElementId(null);
    }
    showToast("Element Removed");
  };

  const moveElement = (direction: "up" | "down", elementId: string) => {
    setScreens(prev => prev.map(scr => {
      if (scr.id === activeScreenId) {
        const index = scr.elements.findIndex(el => el.id === elementId);
        if (index === -1) return scr;
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= scr.elements.length) return scr;

        const updated = [...scr.elements];
        const temp = updated[index];
        updated[index] = updated[targetIndex];
        updated[targetIndex] = temp;

        return { ...scr, elements: updated };
      }
      return scr;
    }));
  };

  const reorderElements = (draggedId: string, targetId: string) => {
    setScreens(prev => prev.map(scr => {
      if (scr.id === activeScreenId) {
        const draggedIndex = scr.elements.findIndex(el => el.id === draggedId);
        const targetIndex = scr.elements.findIndex(el => el.id === targetId);
        if (draggedIndex === -1 || targetIndex === -1) return scr;
        
        const updated = [...scr.elements];
        const [draggedItem] = updated.splice(draggedIndex, 1);
        updated.splice(targetIndex, 0, draggedItem);
        return { ...scr, elements: updated };
      }
      return scr;
    }));
    showToast("↕ Component order updated");
  };

  const addElementAtPosition = (type: AppElement["type"], index: number) => {
    const newId = `el_${Date.now()}`;
    let newEl: AppElement = {
      id: newId,
      type,
      content: type === "button" ? "Click Action" : type === "heading" ? "Primary Title" : `Configure standard ${type} item content.`,
      label: type === "input" ? "Form Label" : type === "metric" ? "KPI Metric Title" : undefined,
      placeholder: type === "input" ? "Enter value..." : undefined,
      imageUrl: type === "image" ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60" : undefined,
      actionType: type === "button" ? "toast" : undefined,
      actionTarget: type === "button" ? "Task simulated successfully!" : undefined,
      metricValue: type === "metric" ? "120" : type === "progress" ? "60" : undefined,
      metricUnit: type === "metric" ? "units" : undefined,
      isCompleted: type === "toggle" ? false : undefined
    };

    setScreens(prev => prev.map(scr => {
      if (scr.id === activeScreenId) {
        const updated = [...scr.elements];
        updated.splice(index, 0, newEl);
        return { ...scr, elements: updated };
      }
      return scr;
    }));
    setSelectedElementId(newId);
    showToast(`Added ${type.toUpperCase()} component here`);
  };

  const updateElementProperty = (field: keyof AppElement, value: any) => {
    if (!selectedElementId) return;
    setScreens(prev => prev.map(scr => {
      if (scr.id === activeScreenId) {
        return {
          ...scr,
          elements: scr.elements.map(el => el.id === selectedElementId ? { ...el, [field]: value } : el)
        };
      }
      return scr;
    }));
  };

  // Selected Element info
  const selectedElement = activeScreen.elements.find(el => el.id === selectedElementId);

  // Generate React Source Code
  const getCompiledCode = () => {
    let code = `import React, { useState } from 'react';\n`;
    code += `import { Smartphone, Check, HelpCircle, ArrowRight } from 'lucide-react';\n\n`;
    code += `export default function CustomAppSimulator() {\n`;
    code += `  const [activeScreen, setActiveScreen] = useState('${screens[0]?.name || "Home"}');\n`;
    code += `  const [dbLogs, setDbLogs] = useState([]);\n`;
    code += `  const [formInputs, setFormInputs] = useState({});\n\n`;
    code += `  const handleAction = (el) => {\n`;
    code += `    if (el.actionType === 'toast') {\n`;
    code += `      alert(el.actionTarget);\n`;
    code += `    } else if (el.actionType === 'navigate') {\n`;
    code += `      setActiveScreen(el.actionTarget);\n`;
    code += `    } else if (el.actionType === 'submit') {\n`;
    code += `      setDbLogs(prev => [{ time: new Date().toLocaleTimeString(), data: formInputs }, ...prev]);\n`;
    code += `      alert('Successfully logged to simulated collection: ' + el.actionTarget);\n`;
    code += `    }\n`;
    code += `  };\n\n`;
    code += `  return (\n`;
    code += `    <div className="min-h-screen bg-[#02040a] text-white flex flex-col items-center justify-center p-6">\n`;
    code += `      <div className="w-[380px] h-[780px] bg-slate-900 border-4 border-slate-700 rounded-[45px] p-5 flex flex-col justify-between overflow-hidden shadow-2xl relative">\n`;
    code += `        {/* Status Bar */}\n`;
    code += `        <div className="flex justify-between items-center text-[10px] text-slate-400 px-3 py-1 font-mono">\n`;
    code += `          <span>04:44 AM</span>\n`;
    code += `          <div className="w-12 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" />\n`;
    code += `          <span>100% 🔋</span>\n`;
    code += `        </div>\n\n`;
    code += `        {/* Body rendering */}\n`;

    screens.forEach((scr, idx) => {
      code += `        {activeScreen === '${scr.name}' && (\n`;
      code += `          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pt-6 pb-4">\n`;
      scr.elements.forEach(el => {
        if (el.type === "heading") {
          code += `            <div>\n`;
          code += `              <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">${el.content}</h1>\n`;
          if (el.label) code += `              <p className="text-xs text-slate-400 font-mono">${el.label}</p>\n`;
          code += `            </div>\n`;
        } else if (el.type === "text") {
          code += `            <p className="text-sm text-slate-300 leading-relaxed">${el.content}</p>\n`;
        } else if (el.type === "button") {
          code += `            <button onClick={() => handleAction({ actionType: '${el.actionType}', actionTarget: '${el.actionTarget}' })} className="w-full py-3 bg-violet-600 rounded-xl font-bold hover:bg-violet-700 transition-colors">${el.content}</button>\n`;
        } else if (el.type === "input") {
          code += `            <div className="space-y-1.5">\n`;
          code += `              <label className="text-xs font-semibold text-slate-400">${el.label}</label>\n`;
          code += `              <input type="text" placeholder="${el.placeholder}" onChange={(e) => setFormInputs({...formInputs, '${el.label}': e.target.value})} className="w-full px-4 py-2.5 bg-slate-800 rounded-xl border border-white/5 text-sm" />\n`;
          code += `            </div>\n`;
        } else if (el.type === "image") {
          code += `            <div className="rounded-xl overflow-hidden border border-white/5">\n`;
          code += `              <img src="${el.imageUrl}" className="w-full h-40 object-cover" alt="element image" />\n`;
          code += `            </div>\n`;
        } else if (el.type === "metric") {
          code += `            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between items-center">\n`;
          code += `              <div>\n`;
          code += `                <span className="text-xs text-slate-400 font-mono">${el.content}</span>\n`;
          code += `                <h3 className="text-xl font-extrabold text-white mt-1">${el.metricValue}</h3>\n`;
          code += `              </div>\n`;
          if (el.metricUnit) code += `              <span className="text-[10px] text-violet-400 font-mono">${el.metricUnit}</span>\n`;
          code += `            </div>\n`;
        } else if (el.type === "progress") {
          code += `            <div className="space-y-1.5">\n`;
          code += `              <div className="flex justify-between text-xs text-slate-400">\n`;
          code += `                <span>${el.content}</span>\n`;
          code += `                <span>${el.metricValue}%</span>\n`;
          code += `              </div>\n`;
          code += `              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">\n`;
          code += `                <div className="bg-violet-500 h-full" style={{ width: '${el.metricValue}%' }} />\n`;
          code += `              </div>\n`;
          code += `            </div>\n`;
        } else if (el.type === "toggle") {
          code += `            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">\n`;
          code += `              <span className="text-sm text-slate-300">${el.content}</span>\n`;
          code += `              <div className="w-10 h-6 bg-violet-600 rounded-full flex items-center px-1 cursor-pointer">\n`;
          code += `                <div className="w-4 h-4 bg-white rounded-full translate-x-4 transition-transform" />\n`;
          code += `              </div>\n`;
          code += `            </div>\n`;
        }
      });
      code += `          </div>\n`;
      code += `        )}\n`;
    });

    code += `        {/* Navigation Indicator */}\n`;
    code += `        <div className="h-1 w-28 bg-slate-400 rounded-full mx-auto mt-2" />\n`;
    code += `      </div>\n`;
    code += `    </div>\n`;
    code += `  );\n`;
    code += `}\n`;
    return code;
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(getCompiledCode());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    showToast("📋 React Code Copied!");
  };

  return (
    <div id="app-builder-view" className="flex-1 flex flex-col gap-6 p-6 overflow-y-auto select-none">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-400">
              <Smartphone className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">App Builder Studio</h1>
              <p className="text-xs text-slate-500">Design mobile mockups, configure actions, test interactive database logs, and export source code.</p>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-800 rounded-lg p-1 border border-white/5">
            <button 
              onClick={() => loadTemplate("ecommerce")} 
              className="px-3 py-1.5 rounded text-xs font-bold hover:bg-white/5 transition-colors"
            >
              👟 E-Commerce
            </button>
            <button 
              onClick={() => loadTemplate("saas")} 
              className="px-3 py-1.5 rounded text-xs font-bold hover:bg-white/5 transition-colors"
            >
              💻 SaaS Core
            </button>
            <button 
              onClick={() => loadTemplate("delivery")} 
              className="px-3 py-1.5 rounded text-xs font-bold hover:bg-white/5 transition-colors"
            >
              🍕 Delivery AI
            </button>
          </div>
          
          <button 
            onClick={() => {
              setScreens([
                { id: "scr_home", name: "Scratch Home", elements: [{ id: "el_sc_h", type: "heading", content: "Fresh Concept", label: "Build your layout from scratch" }] }
              ]);
              setActiveScreenId("scr_home");
              setSelectedElementId("el_sc_h");
              showToast("🧼 Cleaned Canvas. Start building!");
            }}
            className="px-4 py-2 border border-red-500/20 hover:border-red-500/40 text-red-400 rounded-xl text-xs font-bold transition-all bg-red-950/10 cursor-pointer"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      {/* AI Prompt Bar */}
      <div className="p-4 bg-gradient-to-r from-violet-950/20 to-indigo-950/20 rounded-2xl border border-violet-500/20 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center gap-2 text-violet-400 shrink-0">
          <Sparkles className="w-5 h-5 text-violet-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider font-mono">Build with AI Assistant</span>
        </div>
        <input 
          type="text" 
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="e.g. Fit tracker app with workout log / Crypto wallet with Send screen / Custom B2B dashboard"
          className="flex-1 bg-black/40 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
          onKeyDown={(e) => e.key === "Enter" && generateAppWithAI()}
        />
        <button 
          onClick={generateAppWithAI}
          disabled={isAiGenerating}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-violet-500/10 shrink-0"
        >
          {isAiGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {isAiGenerating ? "Assembling App..." : "Generate App"}
        </button>
      </div>

      {/* Main split workarea */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* L Pane (Grid cols 4) - Left Controls and components list */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Active Screens List Manager */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-violet-400" /> Active Screens ({screens.length})
              </span>
              <button 
                onClick={addScreen}
                className="p-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 rounded-lg transition-colors"
                title="Add Screen"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {screens.map(screen => (
                <div 
                  key={screen.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                    screen.id === activeScreenId 
                      ? "bg-violet-500/10 border-violet-500/40 text-white" 
                      : "bg-transparent border-white/5 text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  }`}
                >
                  <button 
                    onClick={() => {
                      setActiveScreenId(screen.id);
                      setSelectedElementId(screen.elements[0]?.id || null);
                    }}
                    className="flex-1 text-left font-bold cursor-pointer"
                  >
                    📱 {screen.name}
                  </button>
                  <button 
                    onClick={() => deleteScreen(screen.id)}
                    className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                    title="Delete Screen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Palette Panel - Add new component elements */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <ListPlus className="w-4 h-4 text-violet-400" /> Elements Palette
              </h3>
              <span className="text-[9px] text-slate-500 font-mono">DRAG OR CLICK</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "heading");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("heading")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Edit3 className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Title Block</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "text");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("text")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Info className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Paragraph text</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "button");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("button")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Play className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Action Button</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "input");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("input")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Settings className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Form Input</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "image");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("image")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Laptop className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Image Block</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "metric");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("metric")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Database className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Metric Card</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "progress");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("progress")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Layers className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Progress Bar</span>
              </div>

              <div 
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", "toggle");
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement("toggle")}
                className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/30 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="w-2.5 h-2.5 text-slate-500" />
                </div>
                <Check className="w-4 h-4 text-violet-400" />
                <span className="font-mono text-[10px]">Toggle Switch</span>
              </div>
            </div>
          </div>
        </div>

        {/* M Pane (Grid cols 4) - iPhone Frame with simulator */}
        <div className="lg:col-span-4 flex flex-col items-center">
          
          {/* Active Mode switch inside Bezel container */}
          <div className="w-[340px] flex justify-between items-center mb-3 bg-slate-900 border border-white/5 rounded-xl px-4 py-2 text-xs">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Simulator Settings</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setInteractiveMode(false)}
                className={`px-2.5 py-1 rounded text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                  !interactiveMode ? "bg-violet-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Edit Mode
              </button>
              <button 
                onClick={() => setInteractiveMode(true)}
                className={`px-2.5 py-1 rounded text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                  interactiveMode ? "bg-emerald-600 text-white" : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Live Sim
              </button>
            </div>
          </div>

          {/* iPhone visual Bezel */}
          <div className="relative w-[340px] h-[640px] bg-[#02040a] rounded-[48px] border-[6px] border-slate-800 p-4 shadow-2xl flex flex-col justify-between overflow-hidden relative">
            
            {/* Ambient inner gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-violet-500/5 to-transparent blur-2xl" />
              <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent blur-2xl" />
            </div>

            {/* Simulated hardware elements */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-8" />
              <div className="w-8 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Phone Status Bar */}
            <div className="relative z-10 flex justify-between items-center text-[9px] text-slate-500 px-4 pt-1 pb-2 font-mono">
              <span>04:44 AM</span>
              <span className="flex items-center gap-1">
                <span>5G</span>
                <span>100% 🔋</span>
              </span>
            </div>

            {/* Inner scrollable Canvas container */}
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                const draggedId = e.dataTransfer.getData("elementId");
                const type = e.dataTransfer.getData("text/plain") as AppElement["type"];
                
                if (draggedId) {
                  // Reorder to the very end
                  reorderElements(draggedId, activeScreen.elements[activeScreen.elements.length - 1]?.id);
                } else if (type && ["text", "heading", "button", "input", "image", "card", "list", "progress", "metric", "toggle"].includes(type)) {
                  addElement(type);
                }
              }}
              className={`relative z-10 flex-1 overflow-y-auto px-2 py-4 flex flex-col gap-4 transition-all duration-200 ${
                isDraggingOver ? "bg-violet-500/10 ring-2 ring-dashed ring-violet-500/50 rounded-2xl" : ""
              }`}
            >
              {activeScreen.elements.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-3xl bg-white/5">
                  <Smartphone className="w-10 h-10 text-violet-500/40 mb-3 animate-bounce" />
                  <p className="text-xs text-slate-400 font-bold mb-1">Canvas is Empty</p>
                  <p className="text-[11px] text-slate-500 leading-normal max-w-[200px]">Drag components from the Elements Palette and drop them here, or click them directly!</p>
                </div>
              ) : (
                activeScreen.elements.map((el, index) => {
                  const isSelected = selectedElementId === el.id && !interactiveMode;
                  const isBeingDragged = draggedElementId === el.id;
                  return (
                    <div 
                      key={el.id}
                      draggable={!interactiveMode}
                      onDragStart={(e) => {
                        setDraggedElementId(el.id);
                        e.dataTransfer.setData("elementId", el.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragEnd={() => {
                        setDraggedElementId(null);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const draggedId = e.dataTransfer.getData("elementId");
                        if (draggedId && draggedId !== el.id) {
                          reorderElements(draggedId, el.id);
                        } else {
                          const type = e.dataTransfer.getData("text/plain") as AppElement["type"];
                          if (type && ["text", "heading", "button", "input", "image", "card", "list", "progress", "metric", "toggle"].includes(type)) {
                            addElementAtPosition(type, index);
                          }
                        }
                      }}
                      onClick={() => handleSimulatorElementClick(el)}
                      className={`relative rounded-2xl transition-all cursor-pointer select-none group ${
                        isSelected 
                          ? "ring-2 ring-violet-500/80 bg-violet-950/20" 
                          : "hover:ring-1 hover:ring-white/10"
                      } ${isBeingDragged ? "opacity-40 scale-95 border-2 border-dashed border-violet-500" : ""}`}
                    >
                      {/* Interactive indicator bar */}
                      {!interactiveMode && (
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-black/80 backdrop-blur border border-white/10 rounded px-1.5 py-0.5 z-40 text-[8px] font-mono">
                          <button onClick={(e) => { e.stopPropagation(); moveElement("up", el.id); }} className="hover:text-violet-400">▲</button>
                          <button onClick={(e) => { e.stopPropagation(); moveElement("down", el.id); }} className="hover:text-violet-400">▼</button>
                          <button onClick={(e) => { e.stopPropagation(); deleteElement(el.id); }} className="hover:text-red-400 ml-1">✕</button>
                        </div>
                      )}

                      {/* Display Components conditionally by type */}
                      {el.type === "heading" && (
                        <div className="p-2">
                          <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">{el.content || "Empty Title"}</h2>
                          {el.label && <p className="text-[10px] text-slate-400 font-mono mt-0.5">{el.label}</p>}
                        </div>
                      )}

                      {el.type === "text" && (
                        <p className="text-xs text-slate-300 leading-relaxed p-2">{el.content || "Placeholder content sentence..."}</p>
                      )}

                      {el.type === "button" && (
                        <div className="p-1">
                          <button 
                            className={`w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all flex items-center justify-center gap-2 ${colors.button}`}
                          >
                            {el.content}
                            {el.actionType === "navigate" && <ChevronRight className="w-3.5 h-3.5" />}
                          </button>
                          {/* Label info if in editor */}
                          {!interactiveMode && el.actionType !== "none" && (
                            <span className="block text-[8px] text-slate-500 font-mono text-center mt-1">
                              Action: {el.actionType} ({el.actionTarget})
                            </span>
                          )}
                        </div>
                      )}

                      {el.type === "input" && (
                        <div className="space-y-1 p-2">
                          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{el.label || "Input Label"}</label>
                          <input 
                            type="text" 
                            disabled={!interactiveMode}
                            value={el.content}
                            onChange={(e) => {
                              if (interactiveMode) {
                                setScreens(prev => prev.map(scr => {
                                  if (scr.id === activeScreenId) {
                                    return {
                                      ...scr,
                                      elements: scr.elements.map(item => item.id === el.id ? { ...item, content: e.target.value } : item)
                                    };
                                  }
                                  return scr;
                                }));
                              }
                            }}
                            placeholder={el.placeholder || "Enter text..."}
                            className="w-full px-3 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white focus:outline-none"
                          />
                        </div>
                      )}

                      {el.type === "image" && (
                        <div className="p-2">
                          <div className="rounded-xl overflow-hidden border border-white/5 h-28 relative">
                            <img 
                              src={el.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60"} 
                              className="w-full h-full object-cover" 
                              alt="custom build" 
                            />
                            {el.content && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1.5 text-[10px] font-mono text-center truncate">
                                {el.content}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {el.type === "metric" && (
                        <div className="p-2">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex justify-between items-center">
                            <div>
                              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-mono block">{el.content}</span>
                              <span className="text-lg font-black text-white mt-0.5 block">{el.metricValue}</span>
                            </div>
                            {el.metricUnit && (
                              <span className="text-[10px] bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded font-mono border border-violet-500/20">
                                {el.metricUnit}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {el.type === "progress" && (
                        <div className="p-2 space-y-1.5">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold">{el.content}</span>
                            <span className="font-mono text-violet-400">{el.metricValue}%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                              style={{ width: `${Math.min(100, Math.max(0, parseInt(el.metricValue || "50")))}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {el.type === "toggle" && (
                        <div className="p-2">
                          <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl">
                            <span className="text-xs text-slate-300 font-medium">{el.content}</span>
                            <div className={`w-9 h-5 rounded-full flex items-center p-0.5 transition-all ${el.isCompleted ? "bg-violet-600 justify-end" : "bg-white/10 justify-start"}`}>
                              <div className="w-4 h-4 bg-white rounded-full shadow" />
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom hardware indicator bar */}
            <div className="relative z-10 py-1.5 flex justify-center shrink-0">
              <div className="w-24 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* R Pane (Grid cols 4) - Properties Inspector or Exporter */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          
          {/* Split Mode Toggle bar */}
          <div className="flex items-center justify-between px-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
            <span className="text-[10px] font-black tracking-widest text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
              SPLIT ARCHITECTURE PREVIEW
            </span>
            <button 
              onClick={() => setShowSplitCode(!showSplitCode)}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-black tracking-wider transition-all cursor-pointer ${
                showSplitCode ? "bg-violet-600 text-white shadow-md shadow-violet-500/20" : "bg-white/5 text-slate-500 hover:text-slate-300"
              }`}
            >
              {showSplitCode ? "ON (SIDE-BY-SIDE)" : "OFF (TABS)"}
            </button>
          </div>

          {/* View Tab Selector */}
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-1.5 flex gap-1 shadow-md">
            <button 
              onClick={() => setActiveTab("editor")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "editor" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Element Inspector
            </button>
            <button 
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "code" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Export Code
            </button>
            <button 
              onClick={() => setActiveTab("db")}
              className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition-all cursor-pointer ${
                activeTab === "db" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Database Logs
            </button>
          </div>

          {/* Render Active Tab */}
          {activeTab === "editor" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Properties Inspector</span>
                <span className="font-mono text-[9px] text-violet-400">MODE: {interactiveMode ? "LIVE SIM" : "EDITOR"}</span>
              </h3>

              {!selectedElement ? (
                <div className="p-6 text-center text-slate-500 text-xs">
                  <Settings className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  Select any component in the visual preview frame to adjust parameters.
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  
                  {/* General details */}
                  <div className="flex justify-between items-center bg-white/5 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Element ID</span>
                    <span className="text-[10px] font-mono text-violet-400">{selectedElement.id}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white/5 px-3 py-1.5 rounded-xl">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Component Type</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">{selectedElement.type}</span>
                  </div>

                  {/* Primary text content */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Content / Text</label>
                    <textarea 
                      value={selectedElement.content}
                      onChange={(e) => updateElementProperty("content", e.target.value)}
                      rows={2}
                      className="w-full bg-black/40 border border-white/10 p-2.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  {/* Heading / Input specific label */}
                  {(selectedElement.type === "heading" || selectedElement.type === "input" || selectedElement.type === "metric") && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Label Subtitle / Hint</label>
                      <input 
                        type="text"
                        value={selectedElement.label || ""}
                        onChange={(e) => updateElementProperty("label", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                      />
                    </div>
                  )}

                  {/* Input Placeholder specific */}
                  {selectedElement.type === "input" && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placeholder Value</label>
                      <input 
                        type="text"
                        value={selectedElement.placeholder || ""}
                        onChange={(e) => updateElementProperty("placeholder", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                      />
                    </div>
                  )}

                  {/* Image specific URL */}
                  {selectedElement.type === "image" && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Image Source URL</label>
                      <input 
                        type="text"
                        value={selectedElement.imageUrl || ""}
                        onChange={(e) => updateElementProperty("imageUrl", e.target.value)}
                        className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white font-mono text-[10px]"
                      />
                    </div>
                  )}

                  {/* Metric Specific KPI */}
                  {(selectedElement.type === "metric" || selectedElement.type === "progress") && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metric Value</label>
                        <input 
                          type="text"
                          value={selectedElement.metricValue || ""}
                          onChange={(e) => updateElementProperty("metricValue", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Metric Unit</label>
                        <input 
                          type="text"
                          value={selectedElement.metricUnit || ""}
                          onChange={(e) => updateElementProperty("metricUnit", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Button Click Action configurations */}
                  {selectedElement.type === "button" && (
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-3">
                      <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest block">Action Handlers</span>
                      
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">On Click Trigger</label>
                        <select 
                          value={selectedElement.actionType || "none"}
                          onChange={(e) => updateElementProperty("actionType", e.target.value)}
                          className="w-full bg-black/40 border border-white/10 px-2 py-1.5 rounded text-xs text-white"
                        >
                          <option value="none">Do Nothing</option>
                          <option value="toast">Trigger Toast Notice</option>
                          <option value="navigate">Navigate to Screen</option>
                          <option value="submit">Submit Form Input</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Action Payload / Target</label>
                        <input 
                          type="text"
                          value={selectedElement.actionTarget || ""}
                          onChange={(e) => updateElementProperty("actionTarget", e.target.value)}
                          placeholder="e.g. Screen Name or Toast text"
                          className="w-full bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Delete Element Row */}
                  <button 
                    onClick={() => deleteElement(selectedElement.id)}
                    className="w-full py-2.5 bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-red-400 font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Component
                  </button>

                </div>
              )}
            </div>
          )}

          {activeTab === "code" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-violet-400" /> Compiled React Code
                </span>
                <button 
                  onClick={copyCodeToClipboard}
                  className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-lg transition-colors flex items-center gap-1 text-[10px]"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copiedCode ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-black/60 border border-white/5 p-4 rounded-xl max-h-96 overflow-y-auto font-mono text-[9px] text-slate-300 leading-relaxed whitespace-pre pr-2">
                {getCompiledCode()}
              </div>

              <p className="text-[10px] text-slate-500 leading-normal font-mono">
                💡 This is raw high-fidelity React + Tailwind markup compiled from your current canvas elements. Drop it directly into any Vite project.
              </p>
            </div>
          )}

          {activeTab === "db" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 pb-2 border-b border-white/10 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-violet-400" /> Simulated Database Records
              </h3>

              <p className="text-[10px] text-slate-400 leading-normal font-mono">
                When you click a button with action <strong>"Submit Form Input"</strong> in live simulator mode, values entered in form inputs are written to these persistent collections.
              </p>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {submittedData.length === 0 ? (
                  <div className="p-8 text-center text-slate-600 text-xs font-mono">
                    No logs logged. Submit a simulated form on screen.
                  </div>
                ) : (
                  submittedData.map((rec, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-1.5 text-[10px] font-mono leading-normal">
                      <div className="flex justify-between items-center text-slate-500">
                        <span>TIMESTAMP: {rec.timestamp}</span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">COLLECTION: {rec.collection}</span>
                      </div>
                      <div className="text-slate-300 bg-white/5 p-2 rounded border border-white/5">
                        {JSON.stringify(rec.data, null, 2)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Live Code Preview Panel when showSplitCode is active and we are not already viewing the code tab */}
          {showSplitCode && activeTab !== "code" && (
            <div className="bg-gradient-to-br from-[#0c101b] to-black border border-violet-500/20 rounded-2xl p-5 shadow-2xl space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                    Live Code Preview
                  </span>
                </div>
                <button 
                  onClick={copyCodeToClipboard}
                  className="px-2.5 py-1 bg-violet-600/10 border border-violet-500/30 hover:bg-violet-600/30 text-violet-300 rounded-lg transition-colors flex items-center gap-1 text-[9px] font-black uppercase tracking-wider"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copiedCode ? "Copied!" : "Copy Code"}
                </button>
              </div>

              <div className="bg-black/80 border border-white/5 p-4 rounded-xl max-h-72 overflow-y-auto font-mono text-[9px] text-emerald-400 leading-normal whitespace-pre pr-2 scrollbar-thin">
                {getCompiledCode()}
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                ⚡ updates instantly with every drag, drop, and edit. Paste directly into your project.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Global Interactive simulated Toast notification popup */}
      {simulatedToast && (
        <div className="fixed bottom-6 right-6 p-4 bg-slate-900 border border-violet-500/40 text-slate-100 rounded-2xl shadow-2xl z-50 flex items-center gap-2.5 animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
          <span className="text-xs font-mono font-bold">{simulatedToast}</span>
        </div>
      )}

    </div>
  );
}
