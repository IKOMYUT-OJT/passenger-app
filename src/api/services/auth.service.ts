import { apiClient } from '../client';
import { API_ENDPOINTS } from '../../config/api.config';
import { APP_CONFIG } from '../../config/app.config';

export interface LoginCredentials {
  mobileNumber: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  email?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    mobileNumber: string;
    email?: string;
  };
}

export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials) {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    if (response.success && response.data) {
      // Store tokens
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.IS_LOGGED_IN, 'true');
    }
    
    return response;
  },
  
  /**
   * Sign up new user
   */
  async signup(data: SignupData) {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.SIGNUP,
      data
    );
    
    if (response.success && response.data) {
      // Store tokens
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.IS_LOGGED_IN, 'true');
    }
    
    return response;
  },
  
  /**
   * Logout user
   */
  async logout() {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    
    // Clear local storage
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.IS_LOGGED_IN);
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.USER_PROFILE);
    
    return response;
  },
  
  /**
   * Request password reset
   */
  async forgotPassword(mobileNumber: string) {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { mobileNumber });
  },
  
  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
  },
};

export default authService;
