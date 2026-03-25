import React, { useState, useEffect } from 'react';
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
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
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
        <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Zap className="w-5 h-5 text-white" />
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

const Navbar = ({ collapsed, setCollapsed }: any) => {
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
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
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

const useProfessionalVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    
    const loadVoicesAndSpeak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a professional male voice
      const maleVoice = voices.find(v => 
        (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google US English')) && 
        v.lang.startsWith('en')
      ) || voices.find(v => v.lang.startsWith('en'));
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      utterance.pitch = 0.9;
      utterance.rate = 0.9;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
    } else {
      loadVoicesAndSpeak();
    }
  };

  return { speak, isSpeaking };
};

const Speakable = ({ children, text, className, onSpeakChange }: { children: React.ReactNode, text?: string, className?: string, onSpeakChange?: (isSpeaking: boolean) => void }) => {
  const { speak, isSpeaking } = useProfessionalVoice();
  const content = text || (typeof children === 'string' ? children : '');

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
        "cursor-pointer transition-all duration-200 relative inline-block group",
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

const VideoExplanation = ({ videoId, title, description, isShort = true }: { videoId: string, title: string, description: string, isShort?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 aspect-video glass-card"
      >
        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-500" />
        <img 
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          alt={title}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-6">
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
      </motion.div>

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
                isShort ? "max-w-md aspect-[9/16]" : "max-w-5xl aspect-video"
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
    </>
  );
};

// --- Main App ---

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [isBrainSpeaking, setIsBrainSpeaking] = useState(false);
  const [isMuscleSpeaking, setIsMuscleSpeaking] = useState(false);

  const slides = [
    {
      id: 'intro',
      title: "The Future of SMEs",
      subtitle: "AI & Cloud Synergy",
      content: (
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="w-24 h-24 bg-gradient-brand rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/40">
            <Zap className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-6xl font-bold tracking-tight text-gradient leading-tight">
            <Speakable>Empowering Small Businesses with Digital Intelligence</Speakable>
          </h2>
          <p className="text-xl text-slate-400 leading-relaxed">
            <Speakable>
              Discover how the convergence of Artificial Intelligence and Cloud Computing is leveling the playing field for Small and Medium Enterprises globally.
            </Speakable>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { label: "Smart Automation", icon: Cpu, desc: "AI-driven workflows that save time and reduce costs." },
              { label: "Scalable Infrastructure", icon: Cloud, desc: "Cloud power that grows with your business needs." },
              { label: "Enterprise Security", icon: ShieldCheck, desc: "Protecting your most valuable digital assets." },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 rounded-3xl">
                <item.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <Speakable text={`${item.label}: ${item.desc}`}>
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
            Click on any highlighted text for a professional explanation
          </motion.div>
        </div>
      )
    },
    {
      id: 'ai',
      title: "Artificial Intelligence",
      subtitle: "The Digital Brain",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold tracking-tight text-purple-400">
              <Speakable>What is AI for SMEs?</Speakable>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              <Speakable>
                Artificial Intelligence isn't just for tech giants. For SMEs, it's about using software that can learn, reason, and act to solve real business problems.
              </Speakable>
            </p>
            <ul className="space-y-4">
              {[
                "Predictive Analytics for sales forecasting",
                "Natural Language Processing for customer support",
                "Computer Vision for quality control",
                "Machine Learning for personalized marketing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <Speakable>{item}</Speakable>
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
              title="What is AI?"
              description="A quick dive into the world of Artificial Intelligence and how it works."
              isShort={false}
            />
          </div>
        </div>
      )
    },
    {
      id: 'cloud',
      title: "Cloud Computing",
      subtitle: "The Digital Muscle",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold tracking-tight text-blue-400">
              <Speakable>What is Cloud Computing?</Speakable>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              <Speakable>
                Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, you can access technology services, such as computing power, storage, and databases.
              </Speakable>
            </p>
            <ul className="space-y-4">
              {[
                "On-demand self-service",
                "Broad network access",
                "Resource pooling",
                "Rapid elasticity",
                "Measured service"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-400">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Speakable>{item}</Speakable>
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
              title="AI & Cloud Synergy"
              description="A professional overview of how these technologies converge."
              isShort={false}
            />
          </div>
        </div>
      )
    },
    {
      id: 'synergy',
      title: "Cloud & AI Synergy",
      subtitle: "The Scalable Intelligence",
      content: (
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-bold tracking-tight text-gradient">
              <Speakable>The Power of Integration</Speakable>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              <Speakable>Cloud computing provides the "muscles" that power the AI "brain," creating a scalable ecosystem where intelligence meets infinite resources.</Speakable>
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
                      <p className="text-xs font-bold">AI Brain</p>
                    </motion.div>
                 </div>

                 <div className="flex justify-center relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 0px rgba(250,204,21,0)", "0 0 30px rgba(250,204,21,0.4)", "0 0 0px rgba(250,204,21,0)"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center border border-yellow-500/50 relative z-20"
                    >
                      <Zap className="w-8 h-8 text-yellow-400" />
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
                      <p className="text-xs font-bold">Cloud Muscle</p>
                    </motion.div>
                 </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Flexibility", desc: "Scale up or down instantly.", icon: Zap },
                  { title: "Cost-Effective", desc: "Pay only for what you use.", icon: TrendingUp },
                  { title: "Accessibility", desc: "Work from anywhere.", icon: Users },
                  { title: "Reliability", desc: "99.9% uptime guaranteed.", icon: ShieldCheck }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/5 transition-colors"
                  >
                    <item.icon className="w-5 h-5 text-blue-400 mb-2" />
                    <Speakable text={`${item.title}: ${item.desc}`}>
                      <h4 className="font-bold text-sm text-blue-400">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-tight">{item.desc}</p>
                    </Speakable>
                  </motion.div>
                ))}
              </div>

              <div className="glass-card p-6 rounded-3xl border-purple-500/20">
                <VideoExplanation 
                  videoId="y1jBWGcjTcM"
                  title="The Power of AI & Cloud"
                  description="A comprehensive look at how these technologies transform SMEs."
                  isShort={false}
                />
              </div>
            </div>
          </div>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto font-light italic text-center border-t border-white/5 pt-8">
            <Speakable>"Intelligence without power is a dream. Power without intelligence is a machine. Together, they are the future of business."</Speakable>
          </p>
        </div>
      )
    },
    {
      id: 'benefits',
      title: "Key Benefits",
      subtitle: "The SME Advantage",
      content: (
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Cost Reduction", value: "45%", desc: "Lower operational overhead", icon: TrendingUp, color: "text-purple-400" },
              { label: "Efficiency", value: "84%", desc: "Faster processing times", icon: Activity, color: "text-blue-400" },
              { label: "Security", value: "99.9%", desc: "Enterprise-grade protection", icon: ShieldCheck, color: "text-emerald-400" },
              { label: "Growth", value: "3.5x", desc: "Accelerated market expansion", icon: Zap, color: "text-yellow-400" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-3xl text-center"
              >
                <item.icon className={cn("w-10 h-10 mx-auto mb-4", item.color)} />
                <h3 className="text-4xl font-bold mb-2">{item.value}</h3>
                <Speakable text={`${item.label} is improved by ${item.value}, leading to ${item.desc}.`}>
                  <p className="font-bold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </Speakable>
              </motion.div>
            ))}
          </div>
          <div className="glass-card p-8 rounded-[3rem]">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <Speakable>Performance Impact Analysis</Speakable>
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'challenges',
      title: "Strategic Challenges",
      subtitle: "Overcoming Barriers",
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { 
              title: "Data Privacy & Ethics", 
              desc: "Navigating complex global regulations like GDPR while maintaining ethical AI standards.",
              icon: ShieldCheck,
              color: "text-rose-400"
            },
            { 
              title: "Legacy Integration", 
              desc: "Bridging the gap between modern cloud-native solutions and existing on-premise systems.",
              icon: Settings,
              color: "text-amber-400"
            },
            { 
              title: "The Skill Gap", 
              desc: "Upskilling existing teams to work alongside AI and manage cloud-first infrastructures.",
              icon: Users,
              color: "text-blue-400"
            }
          ].map((challenge, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:border-white/10 transition-all"
            >
              <div className={cn("w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8", challenge.color.replace('text', 'bg-opacity-10 bg'))}>
                <challenge.icon className={cn("w-8 h-8", challenge.color)} />
              </div>
              <Speakable text={`${challenge.title}: ${challenge.desc}`}>
                <h3 className="text-2xl font-bold mb-4">{challenge.title}</h3>
                <p className="text-slate-400 leading-relaxed">{challenge.desc}</p>
              </Speakable>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'conclusion',
      title: "Our Team & Conclusion",
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
              Meet the <span className="text-gradient">Visionaries</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {[
              { name: "ZAITI ABDERRAHMANE", role: "AI & Frontend Lead", img: "abdou-2.jpg" },
              { name: "HABIBI ABDELHADI", role: "Cloud & Design Architect", img: "habibi.jpg" },
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
                <Speakable text={`${member.name} is the ${member.role}.`}>
                  <h3 className="text-2xl font-bold mb-2 relative z-10">{member.name}</h3>
                  <p className="text-purple-400 font-medium relative z-10">{member.role}</p>
                </Speakable>
              </motion.div>
            ))}
          </div>

          <div className="pt-16 border-t border-white/5 max-w-2xl mx-auto space-y-8">
            <div className="space-y-4">
              <h3 className="text-4xl font-bold tracking-tight">Thank <span className="text-gradient">You</span></h3>
              <p className="text-slate-400 font-light">
                <Speakable>We appreciate your attention. We are ready to answer any questions about the future of digital intelligence.</Speakable>
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
                <span>Made with</span>
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-rose-500">♥</motion.span>
                <span>by zaiti & habibi Team</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(0)}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <TrendingUp className="w-3 h-3 text-purple-400" />
                Restart Journey
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>

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
            className="w-24 h-24 bg-gradient-brand rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-purple-500/40"
          >
            <Zap className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            Welcome to Our <span className="text-gradient">Presentation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed"
          >
            The future of SME intelligence starts here. Experience the synergy of AI and Cloud.
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
              Start Presentation <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-hidden flex flex-col">
      {/* Navbar */}
      <header className="h-20 glass border-b border-white/10 flex items-center justify-between px-12 relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">zaiti <span className="text-purple-400">& habibi</span></span>
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
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex items-center justify-center p-12">
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
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}
