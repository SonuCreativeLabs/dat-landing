// Image URLs for products and other assets

export const HERO_IMAGES = {
  AC: "https://ik.imagekit.io/projectassets/Assets/AC.jpg?updatedAt=1737896181752",
  FRIDGE: "https://ik.imagekit.io/projectassets/Assets/Refrigerator.jpg?updatedAt=1737896178714",
  WASHING_MACHINE: "https://ik.imagekit.io/projectassets/Assets/Washing%20machine.jpg?updatedAt=1737896178813",
  WATER_PURIFIER: "https://ik.imagekit.io/projectassets/Assets/Water%20purifier.jpg?updatedAt=1737896178721",
  MAIN: "https://ik.imagekit.io/projectassets/Assets/DAT%20MAIN-02.png?updatedAt=1737896983644",
} as const;

// About section images
export const ABOUT_IMAGES = {
  TEAM: "coming_soon", // Add URL when available
  OFFICE: "coming_soon", // Add URL when available
} as const;

// Service section images
export const SERVICE_IMAGES = {
  INSTALLATION: "coming_soon", // Add URL when available
  MAINTENANCE: "coming_soon", // Add URL when available
  REPAIR: "coming_soon", // Add URL when available
} as const;

// Company logos and branding
export const BRAND_ASSETS = {
  LOGO: "https://ik.imagekit.io/projectassets/Assets/DAT%20MAIN-01.png?updatedAt=1737896983874",
  FAVICON: "https://ik.imagekit.io/projectassets/Assets/DAT-favicon.png?updatedAt=1738346982241",
  JUSTDIAL: "https://ik.imagekit.io/projectassets/Assets/Just-Dial.png?updatedAt=1738345672241",
} as const;

export const ASSETS = {
  LOGO: {
    MAIN: 'https://ik.imagekit.io/projectassets/Assets/DAT%20MAIN-01.png?updatedAt=1737896983644',
    MINI: 'https://ik.imagekit.io/projectassets/Assets/DAT%20MAIN-02.png?updatedAt=1737896983644',
    ALT: 'DAT Appliances Logo'
  },
  HERO: {
    MAIN: '/hero/hero-main.jpg',
    ALT: 'DAT Appliances Hero Image'
  },
  ABOUT: {
    TEAM: '/about/team.jpg',
    STORE: '/about/store.jpg',
    SERVICE: '/about/service.jpg'
  },
  PRODUCTS: {
    REFRIGERATOR: '/products/refrigerator.jpg',
    WASHING_MACHINE: '/products/washing-machine.jpg',
    AC: '/products/ac.jpg',
    WATER_PURIFIER: '/products/water-purifier.jpg'
  },
  PATTERNS: {
    APPLIANCES: '/appliances-pattern.svg',
    DOTS: '/patterns/dots.svg',
    WAVES: '/patterns/waves.svg'
  },
  PARTNERS: {
    JUSTDIAL: "https://ik.imagekit.io/projectassets/Assets/Just-Dial.png?updatedAt=1738345672241"
  }
} as const;
