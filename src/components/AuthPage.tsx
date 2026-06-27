import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  LogIn, 
  UserPlus, 
  Github, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle, 
  Briefcase, 
  ShieldCheck,
  Cpu,
  Globe,
  Users,
  Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthPageProps {
  onLoginSuccess: (email: string, provider: string, startupName?: string) => void;
  onBackToLanding: () => void;
}

type AuthMode = "signin" | "signup";
type FounderRole = "tech_founder" | "business_lead" | "product_designer" | "investor" | "solo_developer";

export default function AuthPage({ onLoginSuccess, onBackToLanding }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [startupName, setStartupName] = useState("");
  const [role, setRole] = useState<FounderRole>("tech_founder");
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  // Custom Validation States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState("");
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Real-time password strength calculation
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0, // 0 to 4
    label: "Weak",
    color: "bg-red-500",
    hasMinLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasUpper: false,
  });

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength({
        score: 0,
        label: "Too short",
        color: "bg-slate-700/50",
        hasMinLength: false,
        hasNumber: false,
        hasSpecial: false,
        hasUpper: false,
      });
      return;
    }

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasUpper = /[A-Z]/.test(password);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;
    if (hasUpper) score += 1;

    let label = "Weak";
    let color = "bg-red-500";

    if (score === 2) {
      label = "Fair";
      color = "bg-orange-500";
    } else if (score === 3) {
      label = "Good";
      color = "bg-blue-400";
    } else if (score === 4) {
      label = "Excellent (Unicorn level)";
      color = "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]";
    }

    setPasswordStrength({
      score,
      label,
      color,
      hasMinLength,
      hasNumber,
      hasSpecial,
      hasUpper,
    });
  }, [password]);

  // Real-time email validation
  useEffect(() => {
    if (!email) {
      setEmailError("");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  }, [email]);

  const handleOAuthLogin = (provider: "google" | "github") => {
    setIsSubmitting(true);
    setSubmitProgress(`Establishing encrypted handshake with ${provider}...`);
    
    setTimeout(() => {
      setSubmitProgress(`Verifying workspace authentication credentials...`);
    }, 1000);

    setTimeout(() => {
      setSuccessAnimation(true);
      setIsSubmitting(false);
    }, 2000);

    setTimeout(() => {
      onLoginSuccess(
        provider === "google" ? "founder@google-auth.co" : "founder@github-auth.co", 
        provider,
        startupName || "AlphaScale AI"
      );
    }, 3000);
  };

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick validation checks
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (emailError) return;

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (mode === "signup") {
      if (passwordStrength.score < 2) {
        setPasswordError("Please enter a stronger password");
        return;
      }
      if (!agreeTerms) {
        return;
      }
    }

    setIsSubmitting(true);
    setSubmitProgress(mode === "signin" ? "Decrypting secure session credentials..." : "Creating startup core telemetry database profile...");

    setTimeout(() => {
      setSubmitProgress(mode === "signin" ? "Authorizing access to founder panel..." : "Calibrating workspace modules for your role...");
    }, 1200);

    setTimeout(() => {
      setSuccessAnimation(true);
      setIsSubmitting(false);
    }, 2400);

    setTimeout(() => {
      onLoginSuccess(email, "email", startupName || undefined);
    }, 3400);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailError) {
      setEmailError("Valid email is required to dispatch reset payload");
      return;
    }
    setIsSubmitting(true);
    setSubmitProgress("Locating email node in system databases...");

    setTimeout(() => {
      setSubmitProgress("Dispatching quantum-encrypted password reset vector...");
    }, 1000);

    setTimeout(() => {
      setIsSubmitting(false);
      setResetSent(true);
    }, 2000);
  };

  return (
    <div id="auth-viewport" className="relative min-h-screen bg-[#02040a] text-white flex flex-col justify-between overflow-x-hidden font-sans select-none">
      
      {/* Animated Glowing Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#3b82f612] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8b5cf60f] rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[20%] w-[35%] h-[35%] bg-[#06b6d408] rounded-full blur-[90px]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Floating Sparkles Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between shrink-0">
        <button 
          onClick={onBackToLanding}
          className="flex items-center gap-2.5 group hover:opacity-80 transition-all cursor-pointer"
        >
          <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-black tracking-tight uppercase font-mono text-slate-300 group-hover:text-white transition-colors">
            STARTUP COPILOT <span className="text-blue-500 font-bold">AI</span>
          </span>
        </button>
        <button
          onClick={onBackToLanding}
          className="text-[10px] font-mono font-bold tracking-widest text-slate-500 hover:text-slate-200 transition-colors uppercase border border-white/5 bg-white/5 px-3 py-1.5 rounded-lg cursor-pointer"
        >
          &larr; Return to Overview
        </button>
      </header>

      {/* Core Onboarding Platform Interface */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          
          <AnimatePresence mode="wait">
            {forgotPasswordMode ? (
              // Forgot Password Form Panel
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              >
                {/* Visual Accent Ribbon */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50" />

                <div className="space-y-6">
                  <div className="space-y-2 text-center">
                    <div className="inline-flex p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-2 text-blue-400">
                      <Cpu className="w-6 h-6 animate-pulse" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight italic">
                      Quantum Recover Mode
                    </h2>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                      Enter your authorized startup founder email below. We'll broadcast a recovery payload directly to your Node.
                    </p>
                  </div>

                  {resetSent ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-2xl text-center space-y-3"
                    >
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                      <div>
                        <h4 className="text-xs font-black uppercase text-emerald-300">Payload Transmitted Successfully</h4>
                        <p className="text-[10px] text-slate-400 leading-normal mt-1">
                          A password restoration hyperlink has been sent to <span className="font-mono text-white">{email}</span>. Check your inbox and spam terminal vectors.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setResetSent(false);
                          setForgotPasswordMode(false);
                        }}
                        className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Return to Sign In Terminal
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-mono">
                          FOUNDER EMAIL
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                          <input 
                            type="email"
                            required
                            placeholder="e.g. founder@myunicorn.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full bg-black/40 border ${emailError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-blue-500/20"} rounded-xl pl-11 pr-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:border-blue-500/50 font-mono transition-all`}
                          />
                        </div>
                        {emailError && (
                          <p className="text-[9px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                            <AlertCircle className="w-3 h-3" /> {emailError}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                      >
                        Transmit Recovery Vector <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => setForgotPasswordMode(false)}
                          className="text-[10px] font-mono font-black tracking-wider text-slate-400 hover:text-white transition-colors uppercase"
                        >
                          &larr; Remembered Password? Log In
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </motion.div>
            ) : (
              // Standard Authenticate / Register Card
              <motion.div
                key="main-auth"
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                className="bg-[#0b0f19]/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
              >
                {/* Visual Top Bar Gradient */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

                {/* Tab Switcher Headers */}
                <div className="flex bg-black/40 border border-white/5 rounded-2xl p-1 mb-6">
                  <button 
                    onClick={() => {
                      setMode("signin");
                      setPasswordError("");
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mode === "signin" 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" /> Sign In
                  </button>
                  <button 
                    onClick={() => {
                      setMode("signup");
                      setPasswordError("");
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mode === "signup" 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Create Account
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Interactive Header Subtext */}
                  <div className="text-center space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-tight italic">
                      {mode === "signin" ? "Initialize Workspace" : "Recruit AI Co-Founder"}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {mode === "signin" 
                        ? "Enter credentials to restore your startup telemetry console." 
                        : "Configure onboarding parameters to spin up your virtual incubation office."}
                    </p>
                  </div>

                  {/* Third-party OAuth Hub */}
                  <div className="space-y-2.5">
                    <button 
                      onClick={() => handleOAuthLogin("google")}
                      className="w-full py-3 bg-white hover:bg-gray-100 text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.542 5.542 0 0 1 8.41 12.99a5.542 5.542 0 0 1 5.581-5.529c2.206 0 4.111 1.238 5.097 3.057l3.66-2.14C20.672 4.412 16.711 2.5 12.24 2.5a10 10 0 0 0-10 10 10 10 0 0 0 10 10c5.3 0 9.887-3.834 9.887-10 0-.61-.065-1.15-.178-1.715h-9.71z" />
                      </svg>
                      Continue with Google Secure Auth
                    </button>
                    <button 
                      onClick={() => handleOAuthLogin("github")}
                      className="w-full py-3 bg-[#161b22] hover:bg-[#21262d] border border-white/10 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                      <Github className="w-4 h-4 text-white" />
                      Continue with GitHub node
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="absolute inset-x-0 h-[1px] bg-white/5" />
                    <span className="relative z-10 px-4 bg-[#0b0f19] text-[9px] font-mono tracking-widest text-slate-500 uppercase">
                      or use direct terminal
                    </span>
                  </div>

                  {/* Credentials Form */}
                  <form onSubmit={handleCredentialSubmit} className="space-y-4">
                    
                    {/* Startup Customization (On Sign Up Only) */}
                    {mode === "signup" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        {/* Startup Name Prefill */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-mono">
                            STARTUP NAME
                          </label>
                          <div className="relative">
                            <Compass className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                            <input 
                              type="text"
                              placeholder="e.g. NeoScale Dynamics"
                              value={startupName}
                              onChange={(e) => setStartupName(e.target.value)}
                              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 font-mono transition-all"
                            />
                          </div>
                        </div>

                        {/* Founder Role Grid Selection */}
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 font-mono">
                            YOUR FOUNDER ARCHETYPE
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {[
                              { id: "tech_founder", label: "Tech Genius", desc: "Builds code core" },
                              { id: "business_lead", label: "Business Lead", desc: "Funder pitching" },
                              { id: "product_designer", label: "Product PM", desc: "Designs details" },
                              { id: "investor", label: "VC / Investor", desc: "Discovers alphas" },
                              { id: "solo_developer", label: "Solo Hacker", desc: "Does everything" }
                            ].map((archetype) => (
                              <button
                                key={archetype.id}
                                type="button"
                                onClick={() => setRole(archetype.id as FounderRole)}
                                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                                  role === archetype.id 
                                    ? "bg-blue-600/15 border-blue-500 shadow-md" 
                                    : "bg-black/30 border-white/5 hover:border-white/10"
                                }`}
                              >
                                <div className="text-[10px] font-black uppercase text-slate-200 tracking-tight group-hover:text-white transition-colors">{archetype.label}</div>
                                <div className="text-[8px] text-slate-500 mt-0.5 leading-none">{archetype.desc}</div>
                                {role === archetype.id && (
                                  <div className="absolute right-1 bottom-1 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Email Input */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-mono">
                        FOUNDER REGISTERED EMAIL
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type="email"
                          required
                          placeholder="founder@scaleups.ai"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full bg-black/40 border ${emailError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-blue-500/20"} rounded-xl pl-11 pr-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:border-blue-500/50 font-mono transition-all`}
                        />
                      </div>
                      {emailError && (
                        <p className="text-[9px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {emailError}
                        </p>
                      )}
                    </div>

                    {/* Password Input */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                          SESSION SECURITY KEY
                        </label>
                        {mode === "signin" && (
                          <button
                            type="button"
                            onClick={() => setForgotPasswordMode(true)}
                            className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-wider"
                          >
                            Forgot key?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="••••••••••••"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError("");
                          }}
                          className={`w-full bg-black/40 border ${passwordError ? "border-red-500/50 focus:ring-red-500/20" : "border-white/10 focus:ring-blue-500/20"} rounded-xl pl-11 pr-11 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:border-blue-500/50 font-mono transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="text-[9px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" /> {passwordError}
                        </p>
                      )}

                      {/* Password Strength Analyzer (On Sign Up Only) */}
                      {mode === "signup" && password && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 bg-black/30 border border-white/5 rounded-2xl p-3.5 space-y-2.5"
                        >
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className="text-slate-500">STRENGTH CHECK:</span>
                            <span className="font-bold text-slate-300 uppercase">{passwordStrength.label}</span>
                          </div>

                          {/* 4 segments */}
                          <div className="grid grid-cols-4 gap-1.5">
                            {[1, 2, 3, 4].map((idx) => (
                              <div 
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                  idx <= passwordStrength.score ? passwordStrength.color : "bg-slate-800"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Checklist */}
                          <div className="grid grid-cols-2 gap-1.5 text-[8px] font-mono text-slate-400">
                            <div className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasMinLength ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                              <span>Min 8 characters</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasUpper ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                              <span>Uppercase character</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasNumber ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                              <span>Numerical character</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${passwordStrength.hasSpecial ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
                              <span>Special symbol</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Agreement & Remember checkboxes */}
                    <div className="flex flex-col gap-2 pt-1">
                      {mode === "signup" ? (
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="rounded border-white/10 bg-black/50 text-blue-500 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[10px] text-slate-500 font-mono leading-tight">
                            I verify compliance with virtual startup incubation parameters.
                          </span>
                        </label>
                      ) : (
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="rounded border-white/10 bg-black/50 text-blue-500 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[10px] text-slate-500 font-mono leading-tight">
                            Remember my credentials in this browser workspace node
                          </span>
                        </label>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || (mode === "signup" && !agreeTerms)}
                      className="w-full py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.25)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {mode === "signin" ? "Decrypt Secure Key" : "Deploy Startup Database Node"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Safety compliance sign-off */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/40 border border-white/5 rounded-2xl text-[9px] font-mono text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Compliance verification: biometric encryption and quantum firewall standard v1.9 enabled.</span>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Incremental Onboarding Status Loader Overlay */}
      <AnimatePresence>
        {(isSubmitting || successAnimation) && (
          <motion.div 
            id="auth-loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center z-[200] p-4 text-center select-none"
          >
            <div className="relative w-16 h-16 flex items-center justify-center mb-6">
              {successAnimation ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/50 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </motion.div>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: "3s" }} />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-10 h-10 border-2 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full flex items-center justify-center"
                  />
                  <Cpu className="absolute w-5 h-5 text-indigo-400 animate-pulse" />
                </>
              )}
            </div>

            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-black uppercase tracking-widest text-blue-400 font-mono mb-2"
            >
              {successAnimation ? "Identity Authenticated" : "Handshake Broadcast Active"}
            </motion.h3>

            <motion.p 
              key={submitProgress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-slate-400 font-mono max-w-sm leading-normal"
            >
              {successAnimation 
                ? "Onboarding terminal complete. Spawning high-performance workspace nodes..." 
                : submitProgress}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold text-gray-600 uppercase tracking-[0.25em] z-10 gap-3">
        <div>Quantum Security Protocol v3.8</div>
        <div>&copy; 2026 Startup Copilot. Encrypted Node Connection.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">OS Code</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Shield</a>
        </div>
      </footer>

    </div>
  );
}
