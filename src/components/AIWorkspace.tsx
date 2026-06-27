import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  Volume2, 
  Mic, 
  HelpCircle,
  Cpu
} from "lucide-react";
import { MentorMessage, StartupState } from "../types";

interface AIWorkspaceProps {
  startup: StartupState;
  messages: MentorMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isThinking: boolean;
}

export default function AIWorkspace({ startup, messages, onSendMessage, isThinking }: AIWorkspaceProps) {
  const [inputText, setInputText] = useState("");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev ? prev + " " + transcript : transcript);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setSpeechError("Microphone access blocked. Enable microphone in your browser settings.");
        } else if (event.error === "no-speech") {
          setSpeechError("No speech detected. Please speak clearly into your mic.");
        } else {
          setSpeechError(`Speech recognition helper issue: ${event.error}`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError("Speech recognition is not fully supported in this browser version. Try Chrome, Safari, or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        setSpeechError(null);
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = () => {
    if (!inputText.trim() || isThinking) return;
    onSendMessage(inputText);
    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Simulated Voice playback
  const triggerVoicePlayback = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 6000); // simulated speaking duration
  };

  return (
    <div id="mentor-view" className="flex-1 flex flex-col h-full bg-[#050816] select-none">
      
      {/* Hologram Core Banner */}
      <div className="p-6 border-b border-white/5 bg-gradient-to-r from-blue-950/10 via-purple-950/10 to-transparent flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Bot className="w-5 h-5 text-white animate-bounce" />
            <span className="absolute bottom-[-1px] right-[-1px] w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#050816] animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white flex items-center gap-2">
              JARVIS-Copilot <span className="text-[9px] font-mono border border-cyan-500/30 text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/40">ACTIVE SYSTEM</span>
            </h1>
            <p className="text-xs text-slate-500">VC-grade AI co-founder & fundraising analyst</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Simulated Voice read-out toggler */}
          <button 
            onClick={triggerVoicePlayback}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 text-xs ${
              isPlayingAudio 
                ? "bg-purple-500/15 border-purple-500/40 text-purple-400" 
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-bounce" : ""}`} />
            {isPlayingAudio ? "Voice Active" : "Speak Responses"}
          </button>
        </div>
      </div>

      {/* Conversation Scroll area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 flex flex-col">
        {messages.map((msg, index) => {
          const isUser = msg.sender === "user";
          return (
            <div 
              key={index} 
              className={`flex gap-4 max-w-[80%] ${isUser ? "self-end flex-row-reverse" : "self-start"}`}
            >
              <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border ${
                isUser 
                  ? "bg-indigo-600/10 border-indigo-500/30 text-indigo-400" 
                  : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="flex flex-col gap-2">
                <div className={`p-4 rounded-2xl border leading-relaxed text-xs shadow-md ${
                  isUser 
                    ? "bg-indigo-950/20 border-indigo-500/20 text-indigo-100 rounded-tr-none" 
                    : "bg-[#101827] border-white/5 text-slate-300 rounded-tl-none"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Suggestion Prompt Chips inside AI messages */}
                {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {msg.suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => onSendMessage(prompt)}
                        className="text-[10px] font-mono px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 cursor-pointer transition-all duration-300 shadow-sm"
                      >
                        ⚡ {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* AI Thinking Wave */}
        {isThinking && (
          <div className="flex gap-4 max-w-[80%] self-start">
            <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
              <Bot className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <div className="p-4 rounded-2xl border bg-[#101827] border-white/5 rounded-tl-none flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Synthesizing strategy</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Audio Wave Hologram (Visible when simulated speaking is active) */}
        {isPlayingAudio && (
          <div className="p-4 rounded-xl border border-purple-500/10 bg-purple-950/5 flex items-center justify-center gap-1 w-max mx-auto shrink-0 self-center animate-pulse">
            <span className="text-[10px] font-mono text-purple-400 mr-2 uppercase tracking-wider">Holographic Voice Wave:</span>
            {[1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((height, i) => (
              <span 
                key={i} 
                className="w-0.5 bg-purple-400 rounded" 
                style={{ 
                  height: `${height * 3}px`, 
                  animation: `bounce 1s infinite alternate`,
                  animationDelay: `${i * 60}ms`
                }} 
              />
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Console */}
      <div className="p-6 border-t border-white/5 bg-[#030612]/60 backdrop-blur-md">
        
        {/* Helper chips */}
        {messages.length === 1 && !isThinking && (
          <div className="mb-4">
            <span className="text-[10px] font-mono text-slate-500 block mb-2 font-semibold">SUGGESTED DISCUSSIONS:</span>
            <div className="flex flex-wrap gap-2">
              {[
                "How do we prepare our seed pitch for Tier 1 VCs?",
                "What is our core technical risk and how do we resolve it?",
                "Help me structure a financial projection model for the next 12 months.",
                "How do we design our B2B pricing model to optimize our LTV:CAC ratio?"
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(text)}
                  className="text-[10px] px-3 py-1.5 rounded-lg border border-white/5 bg-[#101827]/40 hover:bg-[#101827]/80 hover:border-indigo-500/30 text-slate-400 hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  ⚡ {text}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative flex items-center gap-3">
          <button
            onClick={toggleListening}
            disabled={isThinking}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer shrink-0 ${
              isListening 
                ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse ring-4 ring-red-500/10" 
                : "bg-[#0d1324] border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30"
            }`}
            title="Speak your ideas directly"
          >
            <Mic className={`w-4 h-4 ${isListening ? "animate-bounce" : ""}`} />
          </button>

          <div className="relative flex-1 flex items-center">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isThinking}
              placeholder={isListening ? "Listening... Speak your startup idea clearly..." : `Instruct JARVIS-Copilot regarding "${startup.name}"...`}
              className="w-full bg-[#0d1324] border border-white/10 rounded-2xl pl-4 pr-14 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            
            <button
              onClick={handleSend}
              disabled={isThinking || !inputText.trim()}
              className="absolute right-2 p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {speechError && (
          <p className="text-[10px] text-red-400/90 mt-2.5 flex items-center gap-1 font-mono">
            <span>⚠️</span> {speechError}
          </p>
        )}
        {isListening && (
          <p className="text-[10px] text-cyan-400 mt-2.5 flex items-center gap-1.5 font-mono animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" /> System listening... Speak your B2B model, competitor notes, or pitch deck plans now.
          </p>
        )}
      </div>

    </div>
  );
}
