const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_URL || '';

export const ASSET_URLS = {
  // Common
  logout: `${ASSETS_BASE_URL}/assets/logout.png`,
  recipingFront: `${ASSETS_BASE_URL}/assets/recipingFront.png`,
  avatar: `${ASSETS_BASE_URL}/assets/avatar.png`,
  nonImage: `${ASSETS_BASE_URL}/assets/nonImage.jpeg`,
  eventPlaceholder: `${ASSETS_BASE_URL}/assets/event.jpg`,

  // Splash
  splash1: `${ASSETS_BASE_URL}/assets/splash1.png`,
  splash2: `${ASSETS_BASE_URL}/assets/splash2.png`,
  splash3: `${ASSETS_BASE_URL}/assets/splash3.png`,
};