import React, { useState, useEffect, useRef } from 'react';
import WaterRippleCanvas from './components/WaterRippleCanvas';
import { techIconMap } from './components/TechIcons';
import { 
  Code2, 
  Cpu, 
  Globe, 
  Mail, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Send,
  ChevronRight,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { THEMES, DEFAULT_THEME_ID } from './config/themes';
import { 
  personalInfo, 
  navLinks, 
  socialLinks, 
  highlights, 
  projectCategories, 
  projects, 
  skills,
  experience,
  education
} from './data/portfolioData';

const currentYear = new Date().getFullYear();

// Ensure URLs have proper protocol (e.g., https:// or mailto:)
const ensureUrl = (url) => {
  if (!url) return '#';
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') 
    ? url 
    : `https://${url}`;
};

const ensureEmail = (email) => {
  if (!email) return '#';
  return email.startsWith('mailto:') ? email : `mailto:${email}`;
};

// Resolve public asset paths with Vite base URL for GitHub Pages
const resolveAsset = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

// Clean Inline SVG Icons matching reference controls
const HomeIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const BellIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const LockIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const HelmIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="m16.24 16.24 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="m16.24 7.76 2.83-2.83" />
  </svg>
);

const SlidersIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" />
    <line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const DocumentIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
  </svg>
);

const PaletteIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const iconMap = { Cpu, Layers, Globe };

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [formStatus, setFormStatus] = useState('');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [statusToast, setStatusToast] = useState('All Systems Operational');
  const [showToast, setShowToast] = useState(false);

  // Load saved theme or fallback to DEFAULT_THEME_ID (oceanCyber)
  const [activeThemeId, setActiveThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'oceanCyber' || saved === 'neonMint' || saved === 'electricViolet') {
        return saved;
      }
      return DEFAULT_THEME_ID;
    } catch {
      return DEFAULT_THEME_ID;
    }
  });

  const activeThemeConfig = THEMES[activeThemeId] || THEMES[DEFAULT_THEME_ID];

  // Dynamically inject CSS variables when active theme changes
  useEffect(() => {
    const theme = THEMES[activeThemeId] || THEMES[DEFAULT_THEME_ID];
    const root = document.documentElement;

    root.style.setProperty('--theme-accent', theme.accentColor);
    root.style.setProperty('--theme-accent-hover', theme.accentHover);
    root.style.setProperty('--theme-accent-light', theme.accentLight);
    root.style.setProperty('--theme-accent-rgb', theme.accentRgb);
    root.style.setProperty('--theme-secondary', theme.secondaryColor || '#3b82f6');
    root.style.setProperty('--theme-secondary-rgb', theme.secondaryRgb || '59, 130, 246');
    root.style.setProperty('--theme-tertiary', theme.tertiaryColor || '#a855f7');
    root.style.setProperty('--theme-tertiary-rgb', theme.tertiaryRgb || '168, 85, 247');
    root.style.setProperty('--theme-bg', theme.neutralBg || '#050e1d');
    root.style.setProperty('--theme-glow', theme.glow);
    root.style.setProperty('--theme-gradient', theme.gradient);
    root.style.setProperty('--theme-orb-1', theme.orb1);
    root.style.setProperty('--theme-orb-2', theme.orb2);
    root.style.setProperty('--theme-orb-3', theme.orb3);

    document.body.style.backgroundColor = theme.neutralBg || '#050e1d';

    try {
      localStorage.setItem('portfolio-theme', activeThemeId);
    } catch {
      // ignore
    }
  }, [activeThemeId]);

  useEffect(() => {
    document.title = "Sunith | Portfolio";

    // Enforce manual scroll restoration so page always lands at Home upon refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Message transmitted successfully!');
    setTimeout(() => setFormStatus(''), 4000);
  };

  const handleBellClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Water Ripple Canvas Ref
  const waterCanvasRef = useRef(null);

  return (
    <div className="min-h-screen relative text-slate-100 selection:bg-white/20 selection:text-white bg-[#050e1d] overflow-x-hidden pb-32">
      
      {/* ==========================================================================
          Dark Liquid Chrome Metallic Wallpaper Background (Ocean & Violet)
          ========================================================================== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Animated 3D Liquid Chrome Fluid Silk Ribbons */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-35 mix-blend-screen transition-opacity duration-700" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          <defs>
            <linearGradient id="chromeFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#00f0ff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#050e1d" stopOpacity="0.95" />
              <stop offset="75%" stopColor="#a855f7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="chromeFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0e1f3d" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#00f0ff" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#050e1d" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path 
            className="liquid-bg-wave-1"
            fill="url(#chromeFlow1)" 
            d="M-100,320 C240,180 480,480 840,300 C1120,160 1360,380 1600,240 L1600,900 L-100,900 Z" 
          />
          <path 
            className="liquid-bg-wave-2"
            fill="url(#chromeFlow2)" 
            opacity="0.6"
            d="M-100,450 C180,590 520,310 920,490 C1240,630 1420,380 1600,420 L1600,900 L-100,900 Z" 
          />
        </svg>

        {/* Ambient Volumetric Mesh Blooms in Cyan, Ocean Blue, and Violet */}
        <div 
          className="absolute top-[-8%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-75 transition-colors duration-700" 
          style={{ background: activeThemeConfig.orb1 }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[160px] opacity-70 transition-colors duration-700" 
          style={{ background: activeThemeConfig.orb2 }}
        />
        <div 
          className="absolute top-[40%] left-[25%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-50 transition-colors duration-700" 
          style={{ background: activeThemeConfig.orb3 }}
        />
      </div>

      {/* Floating Status Notification Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 liquid-glass px-4 py-2 rounded-2xl flex items-center space-x-2 text-xs font-medium text-white shadow-2xl animate-fade-in border border-white/20">
          <span className="w-2 h-2 rounded-full liquid-neon-dot" />
          <span>{statusToast}</span>
        </div>
      )}

      {/* ==========================================================================
          Top Bar (Exact Match to Screenshot)
          ========================================================================== */}
      <header className="sticky top-4 z-40 max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-2 transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Top Left: Navigation Links [ Home | About | Skills | Projects ] */}
          <nav className="flex items-center space-x-1 liquid-pill-bar p-1.5 rounded-full shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 sm:px-4 lg:px-5 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-semibold text-slate-300 hover:text-white transition cursor-pointer hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Top Right: Theme Switcher Disc & Connect Button */}
          <div className="flex items-center space-x-2">
            
            {/* Theme Switcher Disc */}
            <div className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="liquid-disc w-11 h-11 rounded-full flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                title="Change Color Theme"
              >
                <PaletteIcon className="w-4 h-4" />
              </button>

              {themeMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setThemeMenuOpen(false)} />
                  <div className="absolute right-0 mt-3 p-2 rounded-3xl liquid-glass border border-white/20 shadow-2xl flex flex-col gap-1 z-50 min-w-[210px] animate-fade-in backdrop-blur-3xl">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5 tracking-wider">
                      Select Theme
                    </div>
                    {Object.values(THEMES).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveThemeId(t.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-2xl text-xs font-medium transition cursor-pointer text-left ${
                          activeThemeId === t.id
                            ? 'liquid-active-pill font-bold'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span 
                          className="w-3.5 h-3.5 rounded-full shadow-sm flex-shrink-0" 
                          style={{ 
                            backgroundColor: t.previewColor,
                            boxShadow: `0 0 10px ${t.previewColor}`
                          }}
                        />
                        <span>{t.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Connect -> Button */}
            <a 
              href="#contact" 
              className="theme-btn-connect px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow-lg tracking-wide"
            >
              <span>Connect</span>
              <span className="text-sm font-bold">→</span>
            </a>

          </div>
        </div>
      </header>

      {/* ==========================================================================
          Main Content Container
          ========================================================================== */}
      <main className="max-w-5xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-8 sm:pt-12 relative z-10 space-y-20 lg:space-y-28 xl:space-y-36">
        
        {/* ==========================================================================
            Home Section (Landing Page: Full Viewport Hero - Ambient Water Droplet Wave Animation)
            ========================================================================== */}
        <section 
          id="home" 
          className="min-h-[calc(100vh-6.5rem)] flex flex-col items-center justify-center text-center pb-12 scroll-mt-24 relative overflow-hidden select-none"
        >
          {/* Ambient Concentric Water Droplet Wave Rings Expanding in Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-40">
            <div className="liquid-water-ripple-ring animate-water-ripple-1" />
            <div className="liquid-water-ripple-ring animate-water-ripple-2" />
            <div className="liquid-water-ripple-ring animate-water-ripple-3" />
          </div>

          {/* Dynamic Ambient Water Drop Ripple Simulation Canvas */}
          <WaterRippleCanvas 
            ref={waterCanvasRef}
            accentColor={activeThemeConfig.accentColor || '#00f0ff'}
            secondaryColor={activeThemeConfig.tertiaryColor || '#a855f7'}
          />

          <div className="relative z-10 space-y-4 max-w-4xl mx-auto px-4 pointer-events-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-pill-bar text-xs font-semibold text-slate-300 shadow-lg border border-cyan-500/20 mb-1">
              <span className="w-2 h-2 rounded-full liquid-neon-dot" />
              <span>Full-Stack &amp; Systems Engineer</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {personalInfo.headline} <br />
              <span className="theme-text-gradient drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">
                {personalInfo.headlineGradient}
              </span>
            </h1>

            {/* Subtle Action Buttons */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <a 
                href="#about"
                className="px-6 py-2.5 rounded-full theme-btn-primary font-bold text-xs sm:text-sm transition flex items-center space-x-1.5 cursor-pointer shadow-lg"
              >
                <span>About Me</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#projects"
                className="liquid-disc px-5 py-2.5 rounded-full text-slate-200 font-medium text-xs sm:text-sm flex items-center space-x-1.5 cursor-pointer hover:text-white"
              >
                <span>Explore Projects</span>
              </a>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            About Section
            ========================================================================== */}
        <section id="about" className="space-y-8 scroll-mt-24">
          
          {/* About Overview Card with Sunith's Profile Image */}
          <div className="liquid-glass rounded-[32px] p-6 sm:p-10 lg:p-12 xl:p-14 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
              
              {/* Left Column: Profile Picture Card in About Section */}
              <div className="lg:col-span-5 xl:col-span-4 flex justify-center">
                <div className="relative group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none">
                  
                  {/* Outer Liquid Glass Frame */}
                  <div className="liquid-avatar-frame aspect-square w-full transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="liquid-avatar-inner w-full h-full relative">
                      
                      {/* Profile Photo */}
                      <img
                        src={resolveAsset(personalInfo.avatarUrl)}
                        alt={personalInfo.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }
                        }}
                      />

                      {/* Fallback Initials Avatar */}
                      <div 
                        className="hidden w-full h-full items-center justify-center font-extrabold text-5xl text-white"
                        style={{ background: activeThemeConfig.gradient }}
                      >
                        {personalInfo.name.charAt(0)}
                      </div>

                      {/* Top Refractive Curvature Sheen */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none rounded-t-[37px]" />
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />
                    </div>
                  </div>

                  {/* Floating Identity Capsule below the image */}
                  <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 bg-[#0c162d]/90 backdrop-blur-xl px-4 py-1.5 rounded-full flex items-center space-x-2 text-xs font-bold text-white shadow-2xl border border-white/20 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full liquid-neon-dot" />
                    <span>{personalInfo.name}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio, Header, Availability, Chips, and Action Buttons */}
              <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full liquid-active-pill">
                      About Me
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-3">
                      Passionate Software Developer
                    </h2>
                  </div>
                  
                  {/* Availability pill with green dot */}
                  <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full liquid-pill-bar text-xs font-medium shadow-inner border border-cyan-500/25 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full liquid-neon-dot" />
                    <span className="text-slate-300">{personalInfo.status}</span>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
                  {personalInfo.bio}
                </p>

                {/* Location & Role Chips */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
                  <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span>{personalInfo.role}</span>
                  </div>
                  <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>{personalInfo.location}</span>
                  </div>
                </div>

                {/* Connect & Social Action Buttons */}
                <div className="flex items-center flex-wrap gap-4 pt-4 border-t border-white/10">
                  <a 
                    href="#projects" 
                    className="px-7 py-3 rounded-full theme-btn-primary font-bold text-xs sm:text-sm transition flex items-center space-x-2 cursor-pointer shadow-xl tracking-wide"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Explore Portfolio</span>
                  </a>
                  
                  <a 
                    href={ensureUrl(socialLinks.github)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="liquid-disc px-5 py-3 rounded-full text-slate-200 font-medium text-xs sm:text-sm flex items-center space-x-2 cursor-pointer hover:text-white"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a 
                    href={ensureUrl(socialLinks.linkedin)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="liquid-disc px-5 py-3 rounded-full text-slate-200 font-medium text-xs sm:text-sm flex items-center space-x-2 cursor-pointer hover:text-white"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>

                  <a 
                    href={ensureEmail(socialLinks.email)} 
                    className="liquid-disc px-5 py-3 rounded-full text-slate-200 font-medium text-xs sm:text-sm flex items-center space-x-2 cursor-pointer hover:text-white"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================================================
            Experience Section
            ========================================================================== */}
        <section id="experience" className="space-y-8 scroll-mt-24">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full liquid-active-pill">
              Career Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">Experience</h2>
            <p className="text-slate-400 text-sm mt-1">Industry track record and practical software development experience.</p>
          </div>

          <div className="space-y-5">
            {experience.map((item) => (
              <div 
                key={item.id}
                className="liquid-glass-card rounded-[28px] p-7 space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{item.role}</h3>
                    <div className="text-sm font-semibold text-cyan-400 mt-0.5">{item.company}</div>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-slate-300 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {item.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 rounded-xl bg-white/[0.04] text-[11px] font-medium text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            Education Section
            ========================================================================== */}
        <section id="education" className="space-y-8 scroll-mt-24">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full liquid-active-pill">
              Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3">Academic Background</h2>
            <p className="text-slate-400 text-sm mt-1">Foundational knowledge in computing, engineering, and system design.</p>
          </div>

          <div className="space-y-5">
            {education.map((item) => (
              <div 
                key={item.id}
                className="liquid-glass-card rounded-[28px] p-7 space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{item.degree}</h3>
                      <div className="text-sm font-semibold text-purple-300 mt-0.5">{item.institution}</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-slate-300 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            Projects Showcase Section
            ========================================================================== */}
        <section id="projects" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">Featured Engineering Works</h2>
              <p className="text-slate-400 text-sm mt-1">High-concurrency systems, distributed storage, and polished interfaces.</p>
            </div>
            
            {/* Project Category Filter Pills */}
            <div className="flex items-center space-x-1 liquid-pill-bar p-1.5 rounded-full self-start sm:self-auto overflow-x-auto">
              {projectCategories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition cursor-pointer ${
                    activeTab === tab.id
                      ? 'liquid-active-pill font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="liquid-glass-card rounded-[32px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-cyan-400/40 hover:shadow-[0_20px_40px_-15px_rgba(0,240,255,0.18)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />

                <div className="space-y-4">
                  {/* Project Cover Image */}
                  {project.image && (
                    <div className="relative w-full aspect-[16/9] sm:h-56 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-900/50">
                      <img 
                        src={resolveAsset(project.image)} 
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Dark gradient overlay for text contrast and specular depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050e1d]/90 via-[#050e1d]/20 to-transparent pointer-events-none" />

                      {/* Floating Category Pill */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span className="text-[11px] uppercase tracking-wider font-bold px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20 text-cyan-300 shadow-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Floating Action Links */}
                      <div className="absolute top-3.5 right-3.5 z-10 flex items-center space-x-2">
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-8.5 h-8.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20 flex items-center justify-center text-slate-200 hover:text-white hover:border-cyan-400/50 hover:bg-black/70 transition shadow-sm"
                          title="View Source on GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-8.5 h-8.5 rounded-full backdrop-blur-md bg-black/50 border border-white/20 flex items-center justify-center text-slate-200 hover:text-white hover:border-cyan-400/50 hover:bg-black/70 transition shadow-sm"
                          title="Live Deployment"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="pt-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 text-sm font-light leading-relaxed mt-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 rounded-xl bg-white/[0.04] text-[11px] font-medium text-slate-300 border border-white/10 group-hover:border-white/20 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            Technical Arsenal Section
            ========================================================================== */}
        <section id="skills" className="liquid-glass rounded-[32px] p-8 sm:p-10 lg:p-12 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full liquid-neon-dot" />
                <span>Core Capabilities & Tooling</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">Technical Arsenal</h2>
              <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl font-light">
                Modern enterprise frameworks, distributed architectures, database engines, and continuous integration workflows.
              </p>
            </div>
            <div className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 w-fit">
              <span className="text-cyan-400 font-bold">{skills.length}</span> Core Technologies
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-4.5">
            {skills.map((skill, index) => {
              const IconComponent = techIconMap[skill.id] || Code2;
              return (
                <div 
                  key={skill.id || index} 
                  className="group relative p-4 sm:p-5 rounded-2xl liquid-pill-bar hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(0,240,255,0.14)] flex flex-col items-center justify-center text-center gap-3 overflow-hidden cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center p-2.5 bg-white/[0.05] border border-white/10 group-hover:border-cyan-400/40 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300 shadow-inner relative z-10">
                    <IconComponent className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all" />
                  </div>

                  <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors tracking-tight relative z-10">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==========================================================================
            Contact Section
            ========================================================================== */}
        <section id="contact" className="liquid-glass rounded-[32px] p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1.5px] liquid-specular-edge" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full liquid-active-pill">
                  Get in Touch
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-3">
                  {personalInfo.contactTitle}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base mt-2 font-light leading-relaxed">
                  {personalInfo.contactSubtitle}
                </p>
              </div>

              {/* Quick direct contact info cards */}
              <div className="space-y-3 pt-2">
                <a 
                  href={ensureEmail(socialLinks.email)}
                  className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Direct Email</div>
                    <div className="text-sm font-medium text-white">{personalInfo.email}</div>
                  </div>
                </a>

                <div className="flex items-center space-x-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/30 flex items-center justify-center text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Location</div>
                    <div className="text-sm font-medium text-white">{personalInfo.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name" 
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none theme-focus transition"
                />
                <input 
                  type="email" 
                  required
                  placeholder="Email Address" 
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none theme-focus transition"
                />
              </div>
              <textarea 
                rows={4} 
                required
                placeholder="Your Message..." 
                className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none theme-focus transition resize-none"
              ></textarea>
              
              <div className="flex items-center justify-between pt-2">
                <button 
                  type="submit" 
                  className="px-7 py-3.5 rounded-2xl theme-btn-primary font-bold text-sm transition flex items-center space-x-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                {formStatus && (
                  <span className="text-xs font-semibold text-cyan-400 flex items-center space-x-1.5 animate-fade-in">
                    <span className="w-2 h-2 rounded-full liquid-neon-dot" />
                    <span>{formStatus}</span>
                  </span>
                )}
              </div>
            </form>
          </div>
        </section>

      </main>

      {/* ==========================================================================
          Bottom Floating Liquid Pill Dock
          ========================================================================== */}
      <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="liquid-pill-bar p-2 rounded-full flex items-center space-x-2 shadow-2xl border border-white/20 backdrop-blur-3xl">
          
          {/* Active Home Pill */}
          <a
            href="#"
            className="liquid-active-pill px-4 py-2 rounded-full flex items-center space-x-2 text-xs font-bold"
            title="Home"
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </a>

          {/* Search Disc */}
          <a
            href="#projects"
            className="liquid-disc w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
            title="Explore Projects"
          >
            <SearchIcon className="w-4 h-4" />
          </a>

          {/* Skills Disc */}
          <a
            href="#skills"
            className="liquid-disc w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
            title="Technical Skills"
          >
            <SlidersIcon className="w-4 h-4" />
          </a>

          {/* Contact Disc */}
          <a
            href="#contact"
            className="liquid-disc w-10 h-10 rounded-full flex items-center justify-center text-slate-300 hover:text-white"
            title="Contact"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </aside>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-xs text-slate-500 relative z-10 flex flex-col items-center gap-3">
        <div className="flex items-center space-x-4">
          <a href={ensureUrl(socialLinks.github)} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
            <GithubIcon className="w-4 h-4" />
          </a>
          <a href={ensureUrl(socialLinks.linkedin)} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a href={ensureEmail(socialLinks.email)} className="text-slate-400 hover:text-white transition">
            <Mail className="w-4 h-4" />
          </a>
        </div>
        <p>© {currentYear} {personalInfo.footerCopyright}</p>
      </footer>

    </div>
  );
}
