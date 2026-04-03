import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { 
  LayoutDashboard, 
  Cpu, 
  Cloud, 
  Zap, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search, 
  Moon, 
  Sun,
  Mic,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Activity,
  ShieldCheck,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Maximize,
  Minimize,
  FileText,
  Download,
  Square,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import ShaderBackground from './components/ui/shader-background';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// --- Types ---
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

// --- Mock Data ---
const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
];

const barData = [
  { name: 'AI Cost', value: 45 },
  { name: 'Cloud Ops', value: 32 },
  { name: 'Automation', value: 78 },
  { name: 'Efficiency', value: 64 },
];

// --- Components ---

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed }: any) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai', label: 'AI Solutions', icon: Cpu },
    { id: 'cloud', label: 'Cloud Infra', icon: Cloud },
    { id: 'interdependence', label: 'Synergy', icon: Zap },
    { id: 'team', label: 'Our Team', icon: Users },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-full glass border-r border-white/10 z-50 flex flex-col"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-full h-full object-contain scale-125"
            referrerPolicy="no-referrer"
          />
        </div>
        {!collapsed && (
          <span className="font-bold text-xl tracking-tight">
            zaiti <span className="text-purple-400">& habibi</span>
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
              activeTab === item.id 
                ? "bg-white/10 text-white" 
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-purple-400" : "group-hover:text-purple-300")} />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            )}
            {activeTab === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute left-0 w-1 h-6 bg-purple-500 rounded-r-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:text-red-300 transition-colors">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

const Navbar = ({ collapsed, setCollapsed, isFullscreen, toggleFullscreen }: any) => {
  return (
    <header className={cn(
      "fixed top-0 right-0 h-16 glass border-b border-white/10 z-40 transition-all duration-300 flex items-center justify-between px-6",
      collapsed ? "left-20" : "left-[260px]"
    )}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-slate-400" />
        </button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search analytics..." 
            className="bg-slate-900/50 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleFullscreen}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-slate-400" />
          ) : (
            <Maximize className="w-5 h-5 text-slate-400" />
          )}
        </button>
        <button className="p-2 hover:bg-white/5 rounded-lg relative">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-slate-950"></span>
        </button>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Zaiti Abderrahmane</p>
            <p className="text-xs text-slate-400">Admin Account</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-brand p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain scale-125" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, color }: any) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-6 rounded-2xl relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 blur-3xl", color)}></div>
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl", color.replace('bg-', 'bg-opacity-20 bg-'))}>
          <Icon className={cn("w-6 h-6", color.replace('bg-', 'text-'))} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          trend > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
        )}>
          {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
    </motion.div>
  );
};

// --- Voice Logic ---

const extractText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (React.isValidElement(node) && node.props.children) return extractText(node.props.children);
  return '';
};

const useProfessionalVoice = (language: string = 'en') => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        return true;
      }
      return false;
    };

    if (!loadVoices()) {
      const interval = setInterval(() => {
        attempts++;
        if (loadVoices() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakWithGemini = async (text: string) => {
    try {
      setIsSpeaking(true);
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore is a deep male voice
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const binaryString = window.atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        try {
          // Try standard decoding first (WAV/MP3)
          const audioBuffer = await audioContext.decodeAudioData(bytes.buffer.slice(0));
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.onended = () => setIsSpeaking(false);
          source.start(0);
        } catch (e) {
          // If decoding fails, it's likely raw PCM 24kHz mono
          console.log("Standard decoding failed, attempting raw PCM playback...", e);
          const pcmData = new Int16Array(bytes.buffer);
          const audioBuffer = audioContext.createBuffer(1, pcmData.length, 24000);
          const channelData = audioBuffer.getChannelData(0);
          for (let i = 0; i < pcmData.length; i++) {
            channelData[i] = pcmData[i] / 32768.0;
          }
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.onended = () => setIsSpeaking(false);
          source.start(0);
        }
      } else {
        setIsSpeaking(false);
      }
    } catch (error) {
      console.error('Gemini TTS Error:', error);
      setIsSpeaking(false);
      // Fallback to browser TTS if Gemini fails
      speakWithBrowser(text);
    }
  };

  const speakWithBrowser = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (!text) return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    const langMap: Record<string, string> = {
      'ar': 'ar-SA',
      'fr': 'fr-FR',
      'en': 'en-US'
    };
    
    const targetLang = langMap[language] || 'en-US';
    utterance.lang = targetLang;

    const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    
    const isMaleVoice = (name: string) => {
      const maleKeywords = ['male', 'man', 'david', 'mark', 'daniel', 'paul', 'stefan', 'maged', 'naayf', 'guy', 'thomas', 'google uk english male', 'microsoft david', 'premium', 'natural', 'tarik', 'hamdan', 'zayd', 'hassan', 'omar'];
      return maleKeywords.some(keyword => name.toLowerCase().includes(keyword));
    };

    const langVoices = currentVoices.filter(v => {
      const l = v.lang.toLowerCase();
      const n = v.name.toLowerCase();
      return l.startsWith(language.toLowerCase()) || 
             l.includes(language.toLowerCase()) ||
             (language === 'ar' && (l.startsWith('ara') || n.includes('arabic')));
    });
    
    const voice = langVoices.find(v => v.name.toLowerCase().includes('google') && isMaleVoice(v.name)) ||
                  langVoices.find(v => v.name.toLowerCase().includes('google')) ||
                  langVoices.find(v => v.lang === targetLang && isMaleVoice(v.name)) ||
                  langVoices.find(v => isMaleVoice(v.name)) ||
                  langVoices.find(v => v.lang === targetLang) ||
                  langVoices.find(v => v.lang.startsWith(language)) ||
                  langVoices[0];
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.pitch = language === 'ar' ? 0.8 : 0.7; 
    utterance.rate = language === 'ar' ? 0.85 : 0.8;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('SpeechSynthesis Error:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const speak = (text: string) => {
    if (!text) return;

    // For Arabic, we want it to be INSTANT.
    // 1. Try to find a high-quality "Google" voice in the browser (Instant)
    // 2. If not found, try ANY Arabic voice in the browser (Instant)
    // 3. Only if NO Arabic voice exists in the browser, use Gemini TTS (High Quality but slower)
    if (language === 'ar') {
      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      const arabicVoices = currentVoices.filter(v => 
        v.lang.startsWith('ar') || v.lang.startsWith('ara') || v.name.toLowerCase().includes('arabic')
      );

      const googleArabicVoice = arabicVoices.find(v => v.name.toLowerCase().includes('google'));

      if (googleArabicVoice || arabicVoices.length > 0) {
        console.log(`Using instant browser voice for Arabic (${googleArabicVoice ? 'Google' : 'System'})`);
        speakWithBrowser(text);
      } else {
        console.log("No Arabic voice found in browser at all, using Gemini AI voice...");
        speakWithGemini(text);
      }
      return;
    }

    // For other languages, use browser TTS
    speakWithBrowser(text);
  };

  return { speak, isSpeaking };
};

const Speakable = ({ children, text, className, onSpeakChange, language = 'en' }: { children: React.ReactNode, text?: string, className?: string, onSpeakChange?: (isSpeaking: boolean) => void, language?: string }) => {
  const { speak, isSpeaking } = useProfessionalVoice(language);
  const content = text || extractText(children);

  useEffect(() => {
    onSpeakChange?.(isSpeaking);
  }, [isSpeaking, onSpeakChange]);

  return (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={(e) => {
        e.stopPropagation();
        speak(content);
      }}
      className={cn(
        "cursor-pointer transition-all duration-200 relative inline group",
        isSpeaking ? "text-purple-400" : "hover:text-purple-300",
        className
      )}
    >
      {children}
      <span className={cn(
        "absolute -bottom-1 left-0 h-[2px] bg-purple-500 transition-all duration-300",
        isSpeaking ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
      )} />
      {isSpeaking && (
        <motion.span 
          layoutId="speaking-indicator"
          className="absolute -top-6 left-1/2 -translate-x-1/2"
        >
          <span className="flex gap-1">
            {[1, 2, 3].map(i => (
              <motion.span
                key={i}
                animate={{ height: [4, 12, 4] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 bg-purple-500 rounded-full inline-block"
              />
            ))}
          </span>
        </motion.span>
      )}
    </motion.span>
  );
};

const VideoExplanation = ({ videoId, title, description, isShort = true, inlinePlayback = false }: { videoId: string, title: string, description: string, isShort?: boolean, inlinePlayback?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingInline, setIsPlayingInline] = useState(false);

  return (
    <>
      <div 
        className="relative group overflow-hidden rounded-[2.5rem] border border-white/10 aspect-video glass-card w-full bg-slate-900"
      >
        <div 
          className={cn("absolute inset-0 transition-opacity duration-500 cursor-pointer z-10", isPlayingInline ? "opacity-0 pointer-events-none" : "opacity-100")}
          onClick={() => {
            if (inlinePlayback) setIsPlayingInline(true);
            else setIsOpen(true);
          }}
        >
          <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            alt={title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-purple-500/20 transition-colors">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{isShort ? 'YouTube Short' : 'YouTube Video'}</p>
                <p className="text-sm font-bold text-white">{title}</p>
              </div>
            </div>
          </div>
        </div>

        {inlinePlayback && isPlayingInline && (
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
            className="w-full h-full absolute inset-0 z-30"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {!inlinePlayback && (
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-slate-950/90 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={cn(
                  "relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black",
                  isShort ? "max-w-md aspect-[9/16]" : "w-[95vw] h-[90vh] max-w-[2400px]"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors z-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

const VoiceChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isReportMode, setIsReportMode] = useState(false);
  const [isRecordingReport, setIsRecordingReport] = useState(false);
  const [reportTimer, setReportTimer] = useState(0);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string, isReport?: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatLanguage, setChatLanguage] = useState<'en' | 'fr' | 'ar'>('en');
  const { speak, isSpeaking } = useProfessionalVoice(chatLanguage);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isRecordingReport) {
      timerRef.current = setInterval(() => {
        setReportTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setReportTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecordingReport]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = isReportMode;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = chatLanguage === 'ar' ? 'ar-SA' : chatLanguage === 'fr' ? 'fr-FR' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        
        if (isReportMode) {
          setInputValue(prev => prev + ' ' + transcript);
        } else {
          handleSendMessage(transcript);
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        setIsRecordingReport(false);
      };

      recognitionRef.current.onend = () => {
        if (!isReportMode) setIsListening(false);
      };
    }
  }, [isReportMode, chatLanguage]);

  const toggleListening = () => {
    if (isListening || isRecordingReport) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setIsRecordingReport(false);
      if (isReportMode && inputValue.trim()) {
        handleSendMessage(inputValue, true);
      }
    } else {
      if (isReportMode) {
        setIsRecordingReport(true);
        setInputValue('');
      } else {
        setIsListening(true);
      }
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = async (text: string, isReport = false) => {
    if (!text.trim()) return;

    const userMessage = { role: 'user' as const, text, isReport };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3.1-flash-lite-preview";
      
      const systemPrompt = isReport 
        ? `You are an elite SME Consultant. Generate a "Professional Audio Report" based on the user's inquiry about AI, Cloud, or SMEs. 
           The report should be structured with:
           1. Executive Summary
           2. Strategic Analysis
           3. Recommended Implementation Roadmap
           
           CRITICAL: Respond in ${chatLanguage === 'en' ? 'English' : chatLanguage === 'fr' ? 'French' : 'Arabic'}.
           Keep the tone authoritative and visionary. Do not use markdown formatting. Use clear, spoken-word transitions.`
        : `You are an elite AI assistant specialized in AI, Cloud Computing, and SME digital transformation. Your expertise is strictly limited to these fields. 

           CRITICAL: You MUST respond in ${chatLanguage === 'en' ? 'English' : chatLanguage === 'fr' ? 'French' : 'Arabic'}. Even if the user speaks a different language, translate your response to ${chatLanguage === 'en' ? 'English' : chatLanguage === 'fr' ? 'French' : 'Arabic'}.

           If a user asks a question outside of AI, Cloud, or SMEs, you must respond with a highly professional, sophisticated, and creative message in ${chatLanguage === 'en' ? 'English' : chatLanguage === 'fr' ? 'French' : 'Arabic'}. Explain that your developer has specialized your intelligence specifically for AI, Cloud, and SME solutions.

           For Arabic responses, use a tone like: 'أنا ذكاء اصطناعي متخصص حصرياً في حلول الذكاء الاصطناعي، الحوسبة السحابية، والتحول الرقمي للمؤسسات. لقد صمم مطوري خبراتي بدقة لتتركز في هذه المجالات لضمان تقديم أعلى مستويات الاحترافية.'

           Keep all responses concise and professional. Do not use markdown formatting as the text will be read aloud.`;

      const response = await ai.models.generateContent({
        model,
        contents: [
          { role: 'user', parts: [{ text }] }
        ],
        config: {
          systemInstruction: systemPrompt,
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText, isReport }]);
      speak(aiText);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = "Sorry, I encountered an error.";
      setMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
      speak(errorMsg);
    }
  };

  const downloadReport = (text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Professional_SME_Report.txt";
    document.body.appendChild(element);
    element.click();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/40 z-[60] hover:scale-110 transition-transform active:scale-95"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] glass border border-white/10 rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">AI Assistant</h3>
                  <div className="flex gap-1 mt-0.5">
                    {(['en', 'fr', 'ar'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setChatLanguage(lang)}
                        className={cn(
                          "text-[8px] px-1 rounded border transition-all uppercase font-bold",
                          chatLanguage === lang 
                            ? "bg-purple-500 border-purple-500 text-white" 
                            : "border-white/20 text-white/40 hover:border-white/40"
                        )}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center animate-pulse">
                    <Mic className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">How can I help you today?</p>
                    <p className="text-xs text-white/40 mt-1">Ask me about AI, Cloud, or SME solutions.</p>
                    <button 
                      onClick={() => setIsReportMode(true)}
                      className="mt-4 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 text-xs font-bold hover:bg-purple-500/30 transition-all"
                    >
                      Consult the Expert (Report Mode)
                    </button>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm shadow-lg backdrop-blur-md",
                    msg.role === 'user' 
                      ? "bg-purple-600/80 text-white rounded-tr-none border border-white/10" 
                      : "bg-white/10 text-white/90 rounded-tl-none border border-white/5"
                  )}>
                    {msg.isReport && msg.role === 'ai' && (
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                        <FileText className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Professional Audio Report</span>
                      </div>
                    )}
                    {msg.text}
                    {msg.isReport && msg.role === 'ai' && (
                      <button 
                        onClick={() => downloadReport(msg.text)}
                        className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-bold transition-all border border-white/10"
                      >
                        <Download className="w-3 h-3" /> Download Transcript
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isSpeaking && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-2 rounded-full flex gap-1">
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              {isReportMode ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold text-purple-400 flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full bg-purple-500", isRecordingReport ? "animate-pulse" : "")} />
                      {isRecordingReport ? "RECORDING EXPERT INQUIRY..." : "READY TO RECORD"}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">{formatTime(reportTimer)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleListening}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 relative overflow-hidden",
                        isRecordingReport 
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/20" 
                          : "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                      )}
                    >
                      {isRecordingReport && (
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-white/20"
                        />
                      )}
                      {isRecordingReport ? <><Square className="w-4 h-4" /> Stop & Generate Report</> : <><Mic className="w-4 h-4" /> Start Recording Inquiry</>}
                    </button>
                    <button 
                      onClick={() => {
                        setIsReportMode(false);
                        setIsRecordingReport(false);
                        recognitionRef.current?.stop();
                      }}
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 transition-all border border-white/10"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative flex items-center gap-2">
                  <button 
                    onClick={() => setIsReportMode(true)}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-purple-400 transition-all border border-white/10"
                    title="Expert Report Mode"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Type your message..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                    <button
                      onClick={toggleListening}
                      className={cn(
                        "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all",
                        isListening ? "bg-red-500 text-white animate-pulse" : "text-white/40 hover:text-white"
                      )}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className="p-2.5 bg-purple-600 text-white rounded-xl shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:shadow-none transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Main App ---

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');

  const t = {
    en: {
      welcome: "Welcome to Our",
      presentation: "Presentation",
      start: "Start Presentation",
      subtitle: "The future of SME intelligence starts here. Experience the synergy of AI and Cloud.",
      future: "The Future of SMEs",
      synergy: "AI & Cloud Synergy",
      empowering: "Empowering Small Businesses with Digital Intelligence",
      discover: "Discover how the convergence of Artificial Intelligence and Cloud Computing is leveling the playing field for Small and Medium Enterprises globally.",
      automation: "Smart Automation",
      automationDesc: "AI-driven workflows that save time and reduce costs.",
      infrastructure: "Scalable Infrastructure",
      infrastructureDesc: "Cloud power that grows with your business needs.",
      security: "Enterprise Security",
      securityDesc: "Protecting your most valuable digital assets.",
      click: "Click on any highlighted text for a professional explanation",
      whatIsAi: "What is AI for SMEs?",
      aiDesc: "Artificial Intelligence isn't just for tech giants. For SMEs, it's about using software that can learn, reason, and act to solve real business problems.",
      aiPoints: [
        "Predictive Analytics for sales forecasting",
        "Natural Language Processing for customer support",
        "Computer Vision for quality control",
        "Machine Learning for personalized marketing"
      ],
      whatIsCloud: "What is Cloud Computing?",
      cloudDesc: "Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases.",
      cloudPoints: [
        "On-demand self-service",
        "Broad network access",
        "Resource pooling",
        "Rapid elasticity",
        "Measured service"
      ],
      integration: "The Power of Integration",
      synergyDesc: "Cloud computing provides the \"muscles\" that power the AI \"brain,\" creating a scalable ecosystem where intelligence meets infinite resources.",
      synergyPoints: [
        { title: "Flexibility", desc: "Scale up or down instantly." },
        { title: "Cost-Effective", desc: "Pay only for what you use." },
        { title: "Accessibility", desc: "Work from anywhere." },
        { title: "Reliability", desc: "99.9% uptime guaranteed." }
      ],
      quote: "\"Intelligence without power is a dream. Power without intelligence is a machine. Together, they are the future of business.\"",
      benefits: "Key Benefits",
      benefitsSubtitle: "The SME Advantage",
      benefitItems: [
        { label: "Cost Reduction", value: "45%", desc: "Lower operational overhead" },
        { label: "Efficiency", value: "84%", desc: "Faster processing times" },
        { label: "Security", value: "99.9%", desc: "Enterprise-grade protection" },
        { label: "Growth", value: "3.5x", desc: "Accelerated market expansion" }
      ],
      performance: "Performance Impact Analysis",
      performanceGrowth: "Monthly Performance Growth",
      efficiencyDistribution: "Operational Efficiency Distribution",
      challenges: "Strategic Challenges",
      challengesSubtitle: "Overcoming Barriers",
      challengeItems: [
        { title: "Data Privacy & Ethics", desc: "Navigating complex global regulations like GDPR while maintaining ethical AI standards." },
        { title: "Legacy Integration", desc: "Bridging the gap between modern cloud-native solutions and existing on-premise systems." },
        { title: "The Skill Gap", desc: "Upskilling existing teams to work alongside AI and manage cloud-first infrastructures." }
      ],
      visionaries: "Meet the Visionaries",
      thankYou: "Thank You",
      ready: "We appreciate your attention. We are ready to answer any questions about the future of digital intelligence.",
      restart: "Restart Journey"
    },
    fr: {
      welcome: "Bienvenue dans notre",
      presentation: "Présentation",
      start: "Commencer la Présentation",
      subtitle: "L'avenir de l'intelligence des PME commence ici. Découvrez la synergie de l'IA et du Cloud.",
      future: "L'Avenir des PME",
      synergy: "Synergie IA & Cloud",
      empowering: "Autonomiser les Petites Entreprises avec l'Intelligence Numérique",
      discover: "Découvrez comment la convergence de l'Intelligence Artificielle et du Cloud Computing nivelle le terrain de jeu pour les PME à l'échelle mondiale.",
      automation: "Automatisation Intelligente",
      automationDesc: "Flux de travail pilotés par l'IA qui font gagner du temps et réduisent les coûts.",
      infrastructure: "Infrastructure Évolutive",
      infrastructureDesc: "La puissance du Cloud qui grandit avec les besoins de votre entreprise.",
      security: "Sécurité d'Entreprise",
      securityDesc: "Protéger vos actifs numériques les plus précieux.",
      click: "Cliquez sur n'importe quel texte en surbrillance pour une explication professionnelle",
      whatIsAi: "Qu'est-ce que l'IA pour les PME ?",
      aiDesc: "L'Intelligence Artificielle n'est pas réservée aux géants de la technologie. Pour les PME, il s'agit d'utiliser des logiciels capables d'apprendre, de raisonner et d'agir pour résoudre de réels problèmes commerciaux.",
      aiPoints: [
        "Analytique prédictive pour les prévisions de ventes",
        "Traitement du langage naturel pour le support client",
        "Vision par ordinateur pour le contrôle qualité",
        "Apprentissage automatique pour le marketing personnalisé"
      ],
      whatIsCloud: "Qu'est-ce que le Cloud Computing ?",
      cloudDesc: "Le cloud computing est la fourniture à la demande de ressources informatiques via Internet avec une tarification à l'usage. Au lieu d'acheter, de posséder et d'entretenir des centres de données et des serveurs physiques, vous pouvez accéder à des services technologiques.",
      cloudPoints: [
        "Libre-service à la demande",
        "Accès réseau étendu",
        "Mise en commun des ressources",
        "Élasticité rapide",
        "Service mesuré"
      ],
      integration: "Le Pouvoir de l'Intégration",
      synergyDesc: "Le cloud computing fournit les « muscles » qui alimentent le « cerveau » de l'IA, créant un écosystème évolutif où l'intelligence rencontre des ressources infinies.",
      synergyPoints: [
        { title: "Flexibilité", desc: "Évoluez instantanément." },
        { title: "Rentable", desc: "Payez uniquement ce que vous utilisez." },
        { title: "Accessibilité", desc: "Travaillez de n'importe où." },
        { title: "Fiabilité", desc: "Disponibilité garantie à 99,9 %." }
      ],
      quote: "\"L'intelligence sans puissance est un rêve. La puissance sans intelligence est une machine. Ensemble, elles sont l'avenir des affaires.\"",
      benefits: "Avantages Clés",
      benefitsSubtitle: "L'Avantage PME",
      benefitItems: [
        { label: "Réduction des Coûts", value: "45%", desc: "Baisse des frais opérationnels" },
        { label: "Efficacité", value: "84%", desc: "Temps de traitement plus rapides" },
        { label: "Sécurité", value: "99,9%", desc: "Protection de niveau entreprise" },
        { label: "Croissance", value: "3,5x", desc: "Expansion accélérée du marché" }
      ],
      performance: "Analyse de l'Impact sur la Performance",
      performanceGrowth: "Croissance Mensuelle de la Performance",
      efficiencyDistribution: "Distribution de l'Efficacité Opérationnelle",
      challenges: "Défis Stratégiques",
      challengesSubtitle: "Surmonter les Barrières",
      challengeItems: [
        { title: "Confidentialité et Éthique", desc: "Naviguer dans des réglementations mondiales complexes comme le RGPD tout en maintenant des normes d'IA éthiques." },
        { title: "Intégration de l'Héritage", desc: "Combler le fossé entre les solutions cloud natives modernes et les systèmes sur site existants." },
        { title: "Le Manque de Compétences", desc: "Former les équipes existantes pour travailler aux côtés de l'IA et gérer des infrastructures cloud-first." }
      ],
      visionaries: "Rencontrez les Visionnaires",
      thankYou: "Merci",
      ready: "Nous apprécions votre attention. Nous sommes prêts à répondre à toutes vos questions sur l'avenir de l'intelligence numérique.",
      restart: "Redémarrer le Voyage"
    },
    ar: {
      welcome: "مرحباً بكم في",
      presentation: "عرضنا التقديمي",
      start: "بدء العرض",
      subtitle: "مستقبل ذكاء الشركات الصغيرة والمتوسطة يبدأ من هنا. اختبر التآزر بين الذكاء الاصطناعي والسحابة.",
      future: "مستقبل الشركات الصغيرة والمتوسطة",
      synergy: "تآزر الذكاء الاصطناعي والسحابة",
      empowering: "تمكين الشركات الصغيرة بالذكاء الرقمي",
      discover: "اكتشف كيف يساهم تقارب الذكاء الاصطناعي والحوسبة السحابية في تكافؤ الفرص للشركات الصغيرة والمتوسطة عالمياً.",
      automation: "الأتمتة الذكية",
      automationDesc: "سير عمل مدفوع بالذكاء الاصطناعي يوفر الوقت ويقلل التكاليف.",
      infrastructure: "بنية تحتية قابلة للتطوير",
      infrastructureDesc: "قوة سحابية تنمو مع احتياجات عملك.",
      security: "أمن المؤسسات",
      securityDesc: "حماية أصولك الرقمية الأكثر قيمة.",
      click: "انقر على أي نص مميز للحصول على شرح احترافي",
      whatIsAi: "ما هو الذكاء الاصطناعي للشركات الصغيرة والمتوسطة؟",
      aiDesc: "الذكاء الاصطناعي ليس فقط لعمالقة التكنولوجيا. بالنسبة للشركات الصغيرة والمتوسطة، يتعلق الأمر باستخدام برامج يمكنها التعلم والتفكير والتصرف لحل مشكلات العمل الحقيقية.",
      aiPoints: [
        "التحليلات التنبؤية لتوقعات المبيعات",
        "معالجة اللغات الطبيعية لدعم العملاء",
        "رؤية الكمبيوتر لمراقبة الجودة",
        "تعلم الآلة للتسويق الشخصي"
      ],
      whatIsCloud: "ما هي الحوسبة السحابية؟",
      cloudDesc: "الحوسبة السحابية هي توفير موارد تكنولوجيا المعلومات حسب الطلب عبر الإنترنت مع تسعير الدفع حسب الاستخدام. بدلاً من شراء وامتلاك وصيانة مراكز البيانات والخوادم المادية، يمكنك الوصول إلى الخدمات التكنولوجية.",
      cloudPoints: [
        "الخدمة الذاتية عند الطلب",
        "وصول واسع للشبكة",
        "تجميع الموارد",
        "المرونة السريعة",
        "خدمة مقاسة"
      ],
      integration: "قوة التكامل",
      synergyDesc: "توفر الحوسبة السحابية \"العضلات\" التي تغذي \"دماغ\" الذكاء الاصطناعي، مما يخلق نظاماً بيئياً قابلاً للتطوير حيث يلتقي الذكاء بموارد غير محدودة.",
      synergyPoints: [
        { title: "المرونة", desc: "التوسع الفوري حسب الحاجة." },
        { title: "فعالية التكلفة", desc: "ادفع فقط مقابل ما تستخدمه." },
        { title: "سهولة الوصول", desc: "العمل من أي مكان." },
        { title: "الموثوقية", desc: "ضمان وقت التشغيل بنسبة 99.9%." }
      ],
      quote: "\"الذكاء بدون قوة هو حلم. والقوة بدون ذكاء هي آلة. ومعاً، هما مستقبل الأعمال.\"",
      benefits: "الفوائد الرئيسية",
      benefitsSubtitle: "ميزة الشركات الصغيرة والمتوسطة",
      benefitItems: [
        { label: "تقليل التكاليف", value: "45%", desc: "خفض التكاليف التشغيلية" },
        { label: "الكفاءة", value: "84%", desc: "أوقات معالجة أسرع" },
        { label: "الأمن", value: "99.9%", desc: "حماية على مستوى المؤسسات" },
        { label: "النمو", value: "3.5x", desc: "تسريع التوسع في السوق" }
      ],
      performance: "تحليل تأثير الأداء",
      performanceGrowth: "نمو الأداء الشهري",
      efficiencyDistribution: "توزيع الكفاءة التشغيلية",
      challenges: "التحديات الاستراتيجية",
      challengesSubtitle: "التغلب على الحواجز",
      challengeItems: [
        { title: "خصوصية البيانات والأخلاقيات", desc: "التعامل مع اللوائح العالمية المعقدة مثل GDPR مع الحفاظ على معايير الذكاء الاصطناعي الأخلاقية." },
        { title: "تكامل الأنظمة القديمة", desc: "سد الفجوة بين الحلول السحابية الحديثة والأنظمة الحالية." },
        { title: "فجوة المهارات", desc: "رفع مهارات الفرق الحالية للعمل جنباً إلى جنب مع الذكاء الاصطناعي وإدارة البنى التحتية السحابية." }
      ],
      visionaries: "تعرف على المبتكرين",
      thankYou: "شكراً لكم",
      ready: "نحن نقدر اهتمامكم. نحن مستعدون للإجابة على أي أسئلة حول مستقبل الذكاء الرقمي.",
      restart: "إعادة الرحلة"
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const [isBrainSpeaking, setIsBrainSpeaking] = useState(false);
  const [isMuscleSpeaking, setIsMuscleSpeaking] = useState(false);

  const slides = [
    {
      id: 'intro',
      title: t[language].future,
      subtitle: t[language].synergy,
      content: (
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="w-32 h-32 bg-gradient-brand rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/40 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-pulse group-hover:scale-110 transition-transform" />
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-32 h-32 object-contain relative z-10 scale-125" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <h2 className="text-6xl font-bold tracking-tight leading-tight">
            <Speakable language={language} className="text-gradient">{t[language].empowering}</Speakable>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            <Speakable language={language}>
              {t[language].discover}
            </Speakable>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: t[language].automation, icon: Cpu, desc: t[language].automationDesc },
              { label: t[language].infrastructure, icon: Cloud, desc: t[language].infrastructureDesc },
              { label: t[language].security, icon: ShieldCheck, desc: t[language].securityDesc },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl">
                <item.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <Speakable language={language} text={`${item.label}: ${item.desc}`}>
                  <h4 className="font-bold mb-2">{item.label}</h4>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </Speakable>
              </div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-slate-400 mx-auto mt-12"
          >
            <Mic className="w-3 h-3 text-purple-400" />
            {t[language].click}
          </motion.div>
        </div>
      )
    },
    {
      id: 'ai',
      title: language === 'ar' ? "الذكاء الاصطناعي" : language === 'fr' ? "Intelligence Artificielle" : "Artificial Intelligence",
      subtitle: language === 'ar' ? "الدماغ الرقمي" : language === 'fr' ? "Le Cerveau Numérique" : "The Digital Brain",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold tracking-tight">
              <Speakable language={language} className="text-gradient">{t[language].whatIsAi}</Speakable>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              <Speakable language={language}>
                {t[language].aiDesc}
              </Speakable>
            </p>
            <ul className="space-y-4">
              {t[language].aiPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <Speakable language={language}>{item}</Speakable>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative space-y-6 flex flex-col items-center">
            <div className="w-full max-w-sm h-48 glass-card rounded-[2rem] flex items-center justify-center p-6 border-purple-500/20 overflow-hidden relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '30px 30px' }}
              />
              <Cpu className="w-32 h-32 text-purple-400 drop-shadow-[0_0_30px_rgba(139,92,246,0.5)] relative z-10" />
            </div>
            <VideoExplanation 
              videoId="kV7RuutRx-s"
              title={language === 'ar' ? "ما هو الذكاء الاصطناعي؟" : language === 'fr' ? "Qu'est-ce que l'IA ?" : "What is AI?"}
              description={language === 'ar' ? "نظرة سريعة على عالم الذكاء الاصطناعي وكيفية عمله." : language === 'fr' ? "Une plongée rapide dans le monde de l'IA." : "A quick dive into the world of Artificial Intelligence and how it works."}
              isShort={false}
              inlinePlayback
            />
          </div>
        </div>
      )
    },
    {
      id: 'cloud',
      title: language === 'ar' ? "الحوسبة السحابية" : language === 'fr' ? "Cloud Computing" : "Cloud Computing",
      subtitle: language === 'ar' ? "العضلات الرقمية" : language === 'fr' ? "Le Muscle Numérique" : "The Digital Muscle",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold tracking-tight">
              <Speakable language={language} className="text-gradient">{t[language].whatIsCloud}</Speakable>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              <Speakable language={language}>
                {t[language].cloudDesc}
              </Speakable>
            </p>
            <ul className="space-y-4">
              {t[language].cloudPoints.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Speakable language={language}>{item}</Speakable>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative space-y-6 flex flex-col items-center">
            <div className="w-full max-w-sm h-48 glass-card rounded-[2rem] flex items-center justify-center p-6 border-blue-500/20 overflow-hidden relative">
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}
              />
              <Cloud className="w-32 h-32 text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] relative z-10" />
            </div>
            <VideoExplanation 
              videoId="l1_6gGAPN10"
              title={language === 'ar' ? "تآزر الذكاء الاصطناعي والسحابة" : language === 'fr' ? "Synergie IA & Cloud" : "AI & Cloud Synergy"}
              description={language === 'ar' ? "نظرة عامة احترافية على كيفية تقارب هذه التقنيات." : language === 'fr' ? "Un aperçu professionnel de la convergence de ces technologies." : "A professional overview of how these technologies converge."}
              isShort={false}
              inlinePlayback
            />
          </div>
        </div>
      )
    },
    {
      id: 'synergy',
      title: t[language].synergy,
      subtitle: language === 'ar' ? "الذكاء القابل للتطوير" : language === 'fr' ? "L'Intelligence Évolutive" : "The Scalable Intelligence",
      content: (
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold tracking-tight">
              <Speakable language={language} className="text-gradient">{t[language].integration}</Speakable>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              <Speakable language={language}>{t[language].synergyDesc}</Speakable>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] flex items-center justify-center glass-card rounded-[3rem] p-8 border-white/5 overflow-hidden">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
              />
              
              <div className="relative w-full h-full flex flex-col justify-between py-12 z-10">
                 <div className="flex justify-center">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="glass-card p-6 rounded-2xl border-purple-500/30 text-center w-48"
                    >
                      <Cpu className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                      <p className="text-xs font-bold">{language === 'ar' ? "دماغ الذكاء الاصطناعي" : language === 'fr' ? "Cerveau IA" : "AI Brain"}</p>
                    </motion.div>
                 </div>

                 <div className="flex justify-center relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0px rgba(250,204,21,0)", "0 0 30px rgba(250,204,21,0.4)", "0 0 0px rgba(250,204,21,0)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center border border-yellow-500/50 relative z-20"
                    >
                      <img 
                        src="/logo.png" 
                        alt="Logo" 
                        className="w-20 h-20 object-contain scale-125"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    {/* Connection lines */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-48 bg-gradient-to-b from-purple-500/50 via-yellow-400 to-blue-500/50 -z-10" />
                 </div>

                 <div className="flex justify-center">
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="glass-card p-6 rounded-2xl border-blue-500/30 text-center w-48"
                    >
                      <Cloud className="w-10 h-10 text-blue-400 mx-auto mb-2" />
                      <p className="text-xs font-bold">{language === 'ar' ? "عضلات السحابة" : language === 'fr' ? "Muscles Cloud" : "Cloud Muscle"}</p>
                    </motion.div>
                 </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {t[language].synergyPoints.map((item, i) => {
                  const icons = [Zap, TrendingUp, Users, ShieldCheck];
                  const Icon = icons[i];
                  return (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                      className="p-4 bg-white/5 rounded-2xl border border-white/5 transition-colors"
                    >
                      <Icon className="w-5 h-5 text-blue-400 mb-2" />
                      <Speakable language={language} text={`${item.title}: ${item.desc}`}>
                        <h4 className="font-bold text-sm text-blue-400">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                      </Speakable>
                    </motion.div>
                  );
                })}
              </div>

              <div className="glass-card p-2 rounded-3xl border-purple-500/20 transform scale-[1.05] hover:scale-[1.1] transition-transform duration-500">
                <VideoExplanation 
                  videoId="y1jBWGcjTcM"
                  title={language === 'ar' ? "قوة الذكاء الاصطناعي والسحابة" : language === 'fr' ? "La Puissance de l'IA et du Cloud" : "The Power of AI & Cloud"}
                  description={language === 'ar' ? "نظرة شاملة على كيفية تحويل هذه التقنيات للشركات الصغيرة والمتوسطة." : language === 'fr' ? "Un regard complet sur la transformation des PME par ces technologies." : "A comprehensive look at how these technologies transform SMEs."}
                  isShort={false}
                />
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light italic text-center border-t border-white/5 pt-8">
            <Speakable language={language}>{t[language].quote}</Speakable>
          </p>
        </div>
      )
    },
    {
      id: 'benefits',
      title: t[language].benefits,
      subtitle: t[language].benefitsSubtitle,
      content: (
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t[language].benefitItems.map((item, i) => {
              const icons = [TrendingUp, Activity, ShieldCheck, Zap];
              const colors = ["text-purple-400", "text-blue-400", "text-emerald-400", "text-yellow-400"];
              const Icon = icons[i];
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-8 rounded-3xl text-center"
                >
                  <Icon className={cn("w-10 h-10 mx-auto mb-4", colors[i])} />
                  <h3 className="text-4xl font-bold mb-2">{item.value}</h3>
                  <Speakable language={language} text={`${item.label} is improved by ${item.value}, leading to ${item.desc}.`}>
                    <p className="font-bold text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </Speakable>
                </motion.div>
              );
            })}
          </div>
          <div className="glass-card p-8 rounded-[3rem] border-white/5">
            <h3 className="text-3xl font-bold mb-10 text-center text-gradient">
              <Speakable language={language}>{t[language].performance}</Speakable>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  <Speakable language={language}>{t[language].performanceGrowth}</Speakable>
                </h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '16px', 
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                          backdropFilter: 'blur(8px)'
                        }}
                        itemStyle={{ color: '#a78bfa', fontWeight: '600' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}
                        cursor={{ stroke: '#8b5cf6', strokeWidth: 2 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8b5cf6" 
                        strokeWidth={4} 
                        fill="url(#colorValue)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  <Speakable language={language}>{t[language].efficiencyDistribution}</Speakable>
                </h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '16px', 
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
                          backdropFilter: 'blur(8px)'
                        }}
                        itemStyle={{ color: '#60a5fa', fontWeight: '600' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} animationDuration={2000}>
                        {barData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#60a5fa' : '#3b82f6'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'challenges',
      title: t[language].challenges,
      subtitle: t[language].challengesSubtitle,
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t[language].challengeItems.map((challenge, i) => {
            const icons = [ShieldCheck, Settings, Users];
            const colors = ["text-rose-400", "text-amber-400", "text-blue-400"];
            const Icon = icons[i];
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all"
              >
                <div className={cn("w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8", colors[i].replace('text', 'bg-opacity-10 bg'))}>
                  <Icon className={cn("w-8 h-8", colors[i])} />
                </div>
                <Speakable language={language} text={`${challenge.title}: ${challenge.desc}`}>
                  <h3 className="text-2xl font-bold mb-4">{challenge.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{challenge.desc}</p>
                </Speakable>
              </motion.div>
            );
          })}
        </div>
      )
    },
    {
      id: 'conclusion',
      title: t[language].visionaries,
      subtitle: "The Future is Now",
      content: (
        <div className="space-y-16 max-w-6xl mx-auto text-center">
          <div className="space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block glass px-6 py-2 rounded-full text-purple-400 font-bold tracking-widest text-xs"
            >
              PROJECT LEADERSHIP
            </motion.div>
            <h2 className="text-6xl font-bold tracking-tighter">
              {language === 'ar' ? 'تعرف على ' : 'Meet the '} <span className="text-gradient">{language === 'ar' ? 'المبتكرين' : 'Visionaries'}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { name: "ZAITI ABDERRAHMANE", role: language === 'ar' ? "مسؤول الذكاء الاصطناعي والواجهة الأمامية" : "AI & Frontend Lead", img: "abdou-2.jpg" },
              { name: "HABIBI ABDELHADI", role: language === 'ar' ? "مهندس السحابة والتصميم" : "Cloud & Design Architect", img: "habibi.jpg" },
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-10 rounded-[3rem] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-32 h-32 rounded-full bg-gradient-brand p-1 mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <Speakable language={language} text={`${member.name} is the ${member.role}.`}>
                  <h3 className="text-2xl font-bold mb-2 relative z-10">{member.name}</h3>
                  <p className="text-purple-400 font-medium relative z-10">{member.role}</p>
                </Speakable>
              </motion.div>
            ))}
          </div>

          <div className="pt-16 border-t border-white/5 max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold tracking-tight">{t[language].thankYou}</h3>
              <p className="text-slate-400 font-light">
                <Speakable language={language}>{t[language].ready}</Speakable>
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                <span>{language === 'ar' ? 'صنع بـ' : 'Made with'}</span>
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-rose-500">♥</motion.span>
                <span>{language === 'ar' ? 'بواسطة فريق زايتي وحبيبي' : 'by zaiti & habibi Team'}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(0)}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-3 h-3 text-purple-400" />
                {t[language].restart}
              </motion.button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
        {/* Fullscreen & Language Toggle */}
        <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
          <div className="flex glass rounded-2xl border-white/10 overflow-hidden">
            {(['en', 'fr', 'ar'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-3 py-2 text-[10px] font-bold uppercase transition-all",
                  language === lang ? "bg-purple-500 text-white" : "text-slate-400 hover:bg-white/5"
                )}
              >
                {lang}
              </button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="p-3 glass rounded-2xl border-white/10 hover:bg-white/10 transition-all group"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-6 h-6 text-purple-400" />
            ) : (
              <Maximize className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
            )}
          </motion.button>
        </div>

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <ShaderBackground />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl text-center relative z-10"
        >
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-32 h-32 bg-gradient-brand rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-purple-500/40 relative group"
          >
            <div className="absolute inset-0 bg-white/20 rounded-[2.5rem] animate-pulse group-hover:scale-110 transition-transform" />
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-32 h-32 object-contain relative z-10 scale-125"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            {t[language].welcome} <span className="text-gradient">{t[language].presentation}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed"
          >
            {t[language].subtitle}
          </motion.p>

          <motion.button 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setHasStarted(true)}
            className="group relative px-12 py-5 bg-gradient-brand rounded-full text-white font-bold text-lg shadow-2xl shadow-purple-500/30 overflow-hidden mx-auto block"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              {t[language].start} <ChevronRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform", language === 'ar' ? "rotate-180" : "")} />
            </span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "min-h-screen text-slate-50 overflow-hidden flex flex-col",
        language === 'ar' ? "font-arabic" : ""
      )}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Navbar */}
      <header className="h-20 glass border-b border-white/10 flex items-center justify-between px-12 relative z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain scale-125"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-bold text-xl tracking-tight">zaiti <span className="text-purple-400">& habibi</span></span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex glass rounded-xl border-white/10 overflow-hidden">
              {(['en', 'fr', 'ar'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "px-2 py-1.5 text-[10px] font-bold uppercase transition-all",
                    language === lang ? "bg-purple-500 text-white" : "text-slate-400 hover:bg-white/5"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 glass rounded-xl border-white/10 hover:bg-white/10 transition-all group"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-purple-400" />
              ) : (
                <Maximize className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    currentSlide === i ? "w-6 bg-purple-500" : "w-1.5 bg-white/10"
                  )}
                />
              ))}
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{slides[currentSlide].subtitle}</p>
              <p className="text-xs font-bold">{slides[currentSlide].title}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex items-center justify-center p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="w-full h-full flex items-center justify-center"
          >
            {slides[currentSlide].content}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={cn(
            "absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center glass transition-all z-50 shadow-2xl border border-white/10",
            currentSlide === 0 ? "opacity-0 pointer-events-none" : "hover:bg-white/10 active:scale-90"
          )}
        >
          <ChevronRight className="w-8 h-8 rotate-180" />
        </button>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full text-sm font-bold z-50 border border-white/10">
          {currentSlide + 1} <span className="text-slate-500">/ {slides.length}</span>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className={cn(
            "absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-brand transition-all shadow-2xl shadow-purple-500/40 z-50",
            currentSlide === slides.length - 1 ? "opacity-0 pointer-events-none" : "hover:opacity-90 active:scale-90"
          )}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </main>

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ShaderBackground />
      </div>
      <VoiceChat />
    </div>
  );
}
