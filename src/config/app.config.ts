export const APP_CONFIG = {
  // App Information
  APP_NAME: 'iKomyut',
  APP_VERSION: '0.0.1',
  
  // Feature Flags
  FEATURES: {
    DARK_MODE: true,
    QR_SCANNER: true,
    WALLET: true,
    NOTIFICATIONS: true,
  },
  
  // Storage Keys
  STORAGE_KEYS: {
    AUTH_TOKEN: 'authToken',
    REFRESH_TOKEN: 'refreshToken',
    IS_LOGGED_IN: 'isLoggedIn',
    DARK_MODE: 'darkMode',
    USER_PROFILE: 'userProfile',
  },
  
  // Validation Rules
  VALIDATION: {
    MOBILE_NUMBER: {
      MIN_LENGTH: 11,
      MAX_LENGTH: 11,
      PATTERN: /^09\d{9}$/,
    },
    PASSWORD: {
      MIN_LENGTH: 6,
      MAX_LENGTH: 50,
    },
    WALLET: {
      MIN_RECHARGE: 100,
      MIN_WITHDRAWAL: 100,
    },
  },
} as const;

export default APP_CONFIG;
