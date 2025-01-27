export const THEME = {
  colors: {
    primary: {
      light: '#0EA5E9',
      DEFAULT: '#0284C7',
      dark: '#0369A1'
    },
    gradient: {
      primary: 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]',
      primaryHover: 'hover:from-[#0284C7] hover:to-[#0EA5E9]',
      secondary: 'bg-gradient-to-br from-white/20 to-white/10',
      glass: 'bg-white/10'
    },
    text: {
      primary: 'text-[#0EA5E9]',
      light: 'text-white',
      dark: 'text-gray-900',
      muted: 'text-gray-600'
    }
  },
  effects: {
    glass: 'backdrop-blur-md',
    hover: {
      shadow: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)]',
      lift: 'hover:-translate-y-1',
      glow: 'hover:bg-white/20'
    },
    transition: 'transition-all duration-300'
  },
  components: {
    card: {
      base: 'rounded-2xl p-8 border border-white/20',
      glass: 'backdrop-blur-md bg-white/10',
      hover: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)] hover:-translate-y-1'
    },
    button: {
      base: 'inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold',
      primary: 'bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] text-white',
      hover: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)] hover:-translate-y-0.5'
    },
    section: {
      base: 'relative py-20',
      pattern: "bg-[url('/appliances-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    }
  }
} as const;

// Type for the theme object
export type Theme = typeof THEME;
