/**
 * Color Themes Configuration
 * Exact Color Scheme extracted from Reference Image:
 * - Background:   #050E1D (Deep Midnight Ocean)
 * - Primary/Cyan: #00F0FF (Neon Cyber Cyan)
 * - Secondary:    #3B82F6 (Electric Azure Blue)
 * - Tertiary:     #A855F7 (Cosmic Violet)
 * - Magenta:      #E879F9 (Neon Orchid)
 * - Green Dot:    #22C55E (Live Indicator)
 */

export const DEFAULT_THEME_ID = 'oceanCyber';

export const THEMES = {
  oceanCyber: {
    id: 'oceanCyber',
    name: 'Cyber Cyan & Violet (Image Exact)',
    accentColor: '#00f0ff',
    accentHover: '#00c8e0',
    accentLight: '#70f7ff',
    accentRgb: '0, 240, 255',
    secondaryColor: '#3b82f6',
    secondaryRgb: '59, 130, 246',
    tertiaryColor: '#a855f7',
    tertiaryRgb: '168, 85, 247',
    magentaColor: '#e879f9',
    neutralBg: '#050e1d',
    cardBg: 'rgba(15, 32, 67, 0.55)',
    glow: 'rgba(0, 240, 255, 0.55)',
    gradient: 'linear-gradient(90deg, #00f0ff 0%, #38bdf8 35%, #a855f7 75%, #e879f9 100%)',
    buttonGradient: 'linear-gradient(90deg, #00d2ff 0%, #3b82f6 50%, #a855f7 100%)',
    connectGradient: 'linear-gradient(90deg, #0284c7 0%, #4f46e5 50%, #9333ea 100%)',
    orb1: 'rgba(0, 240, 255, 0.22)',
    orb2: 'rgba(59, 130, 246, 0.20)',
    orb3: 'rgba(168, 85, 247, 0.22)',
    previewColor: '#00f0ff'
  },
  neonMint: {
    id: 'neonMint',
    name: 'Neon Mint (#39FF85)',
    accentColor: '#39FF85',
    accentHover: '#29E073',
    accentLight: '#7AFFAB',
    accentRgb: '57, 255, 133',
    secondaryColor: '#00E5FF',
    secondaryRgb: '0, 229, 255',
    tertiaryColor: '#7000FF',
    tertiaryRgb: '112, 0, 255',
    neutralBg: '#0B132B',
    glow: 'rgba(57, 255, 133, 0.55)',
    gradient: 'linear-gradient(135deg, #39FF85 0%, #00E5FF 50%, #7000FF 100%)',
    buttonGradient: 'linear-gradient(90deg, #39FF85 0%, #00E5FF 50%, #7000FF 100%)',
    connectGradient: 'linear-gradient(90deg, #39FF85 0%, #00E5FF 100%)',
    orb1: 'rgba(57, 255, 133, 0.24)',
    orb2: 'rgba(0, 229, 255, 0.20)',
    orb3: 'rgba(112, 0, 255, 0.20)',
    previewColor: '#39FF85'
  },
  electricViolet: {
    id: 'electricViolet',
    name: 'Electric Violet (#A855F7)',
    accentColor: '#a855f7',
    accentHover: '#9333ea',
    accentLight: '#c084fc',
    accentRgb: '168, 85, 247',
    secondaryColor: '#00f0ff',
    secondaryRgb: '0, 240, 255',
    tertiaryColor: '#38bdf8',
    tertiaryRgb: '56, 189, 248',
    neutralBg: '#070b18',
    glow: 'rgba(168, 85, 247, 0.55)',
    gradient: 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #00f0ff 100%)',
    buttonGradient: 'linear-gradient(90deg, #a855f7 0%, #6366f1 50%, #00f0ff 100%)',
    connectGradient: 'linear-gradient(90deg, #9333ea 0%, #00f0ff 100%)',
    orb1: 'rgba(168, 85, 247, 0.28)',
    orb2: 'rgba(0, 240, 255, 0.22)',
    orb3: 'rgba(56, 189, 248, 0.20)',
    previewColor: '#a855f7'
  }
};
