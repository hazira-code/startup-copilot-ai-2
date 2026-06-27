import { 
  Cpu, 
  LayoutDashboard, 
  Sparkles, 
  Users, 
  TrendingUp, 
  FileText, 
  Coins, 
  Compass, 
  Layers, 
  Milestone, 
  MessageSquare,
  LogOut,
  Smartphone,
  Globe
} from "lucide-react";

export type NavItem = 
  | 'dashboard'
  | 'validation'
  | 'competitors'
  | 'market'
  | 'leancanvas'
  | 'revenue'
  | 'businessplan'
  | 'pitchdeck'
  | 'roadmap'
  | 'investors'
  | 'mentor'
  | 'appbuilder'
  | 'webbuilder';

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeItem, onNavigate, onLogout }: SidebarProps) {
  
  const menuItems: Array<{ id: NavItem; label: string; icon: any; color: string }> = [
    { id: 'dashboard', label: 'Founder Dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'validation', label: 'AI Idea Validation', icon: Sparkles, color: 'text-indigo-400' },
    { id: 'competitors', label: 'Competitor Matrix', icon: Users, color: 'text-cyan-400' },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp, color: 'text-emerald-400' },
    { id: 'leancanvas', label: 'Lean Canvas Generator', icon: Layers, color: 'text-yellow-400' },
    { id: 'revenue', label: 'Revenue & Simulator', icon: Coins, color: 'text-pink-400' },
    { id: 'businessplan', label: 'Business Planner', icon: FileText, color: 'text-purple-400' },
    { id: 'pitchdeck', label: 'Pitch Deck Studio', icon: FileText, color: 'text-orange-400' },
    { id: 'roadmap', label: 'Execution Roadmap', icon: Milestone, color: 'text-teal-400' },
    { id: 'investors', label: 'Investor Discovery', icon: Compass, color: 'text-red-400' },
    { id: 'appbuilder', label: 'App Builder', icon: Smartphone, color: 'text-violet-400' },
    { id: 'webbuilder', label: 'Website Builder', icon: Globe, color: 'text-blue-400' },
    { id: 'mentor', label: 'AI Startup Mentor', icon: MessageSquare, color: 'text-fuchsia-400' }
  ];

  return (
    <aside id="sidebar-panel" className="relative h-screen w-20 flex flex-col items-center justify-between py-6 bg-[#0a0f1f]/90 border-r border-white/5 shadow-[5px_0_30px_rgba(0,0,0,0.5)] z-20 backdrop-blur-xl">
      
      {/* Brand logo header */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative p-2.5 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-2xl shadow-[0_0_15px_rgba(99,102,241,0.3)] animate-pulse" style={{ animationDuration: "3s" }}>
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <span className="text-[10px] font-extrabold tracking-widest text-cyan-400 font-mono">OS V2</span>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col justify-center gap-2.5 w-full px-2.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              id={`nav-${item.id}`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative w-full aspect-square flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]" 
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? item.color : "text-slate-400 group-hover:text-slate-200"}`} />
              
              {/* Tooltip */}
              <div className="absolute left-[105%] ml-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-[0_4px_15px_rgba(0,0,0,0.4)] z-50">
                <span className="font-medium">{item.label}</span>
              </div>

              {/* Active neon dash */}
              {isActive && (
                <div className="absolute left-[-2px] w-1.5 h-6 rounded-r bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout triggers */}
      <div className="w-full px-2.5">
        <button
          id="nav-logout-btn"
          onClick={onLogout}
          className="group relative w-full aspect-square flex items-center justify-center rounded-xl hover:bg-red-950/20 hover:border-red-500/30 border border-transparent cursor-pointer transition-all duration-300 text-slate-500 hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <div className="absolute left-[105%] ml-2 px-3 py-1.5 rounded-lg bg-[#111827] border border-red-500/20 text-red-400 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-[0_4px_15px_rgba(0,0,0,0.4)] z-50">
            <span className="font-medium">Logout Platform</span>
          </div>
        </button>
      </div>

    </aside>
  );
}
