// API Base URL - Update this based on your environment
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
    DELETE_ACCOUNT: '/user/delete-account',
  },
  
  // Wallet
  WALLET: {
    BALANCE: '/wallet/balance',
    TRANSACTIONS: '/wallet/transactions',
    RECHARGE: '/wallet/recharge',
    WITHDRAW: '/wallet/withdraw',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/read',
    DELETE: '/notifications/delete',
  },
  
  // Address
  ADDRESS: {
    LIST: '/address',
    CREATE: '/address',
    UPDATE: '/address',
    DELETE: '/address',
  },
  
  // Bus/Routes
  BUS: {
    NEARBY: '/bus/nearby',
    ROUTES: '/bus/routes',
    SCHEDULE: '/bus/schedule',
  },
} as const;

// Request timeout (milliseconds)
export const API_TIMEOUT = 30000;

// Request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
