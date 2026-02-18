export const ROUTES = {
  // Public routes
  ROOT: '/',
  WELCOME: '/welcome',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Authenticated routes
  TABS: '/tabs',
  TABS_HOME: '/tabs/homepage',
  TABS_PROFILE: '/tabs/profilepage',
  
  // Profile & Settings
  EDIT_PROFILE: '/edit-profile',
  SETTINGS: '/settings',
  CHANGE_PASSWORD: '/change-password',
  SECURITY: '/security',
  
  // Features
  WALLET: '/wallet',
  DISCOUNT: '/discount',
  NOTIFICATIONS: '/notifications',
  ADDRESS: '/address',
  
  // Info & Help
  PRIVACY_POLICY: '/privacy-policy',
  HELP: '/help',
  ABOUT: '/about',
  ACCOUNT_DELETION: '/account-deletion',
} as const;

export type RouteValue = typeof ROUTES[keyof typeof ROUTES];
