// Authentication Service
import type { User, LoginCredentials } from '../types/auth';
import { AuthUtils } from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://100.113.79.96:8000';

export class AuthService {
  // Login method
  static async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    // Check rate limiting
    if (!AuthUtils.checkRateLimit()) {
      throw new Error('Muitas tentativas de login. Tente novamente mais tarde.');
    }

    // Validate credentials
    if (!AuthUtils.validateEmail(credentials.email)) {
      throw new Error('Por favor, insira um endereço de email válido.');
    }

    const passwordValidation = AuthUtils.validatePassword(credentials.password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.errors[0]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          remember_me: credentials.rememberMe || false
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      // Transform API response to our User type
      const user: User = {
        id: data.user.id.toString(),
        email: data.user.email,
        name: data.user.full_name || data.user.username,
      };

      const token = data.access_token;
      
      // Store auth data
      AuthUtils.setToken(token, credentials.rememberMe || false);
      AuthUtils.setUser(user, credentials.rememberMe || false);
      
      // Reset login attempts on successful login
      AuthUtils.resetLoginAttempts();
      
      return { user, token };
    } catch (error) {
      // Record failed attempt
      AuthUtils.recordLoginAttempt();
      throw error;
    }
  }

  // Logout method
  static logout(): void {
    AuthUtils.clearAuth();
  }

  // Check authentication status
  static async checkAuth(): Promise<{ user: User | null; token: string | null; isAuthenticated: boolean }> {
    try {
      const token = AuthUtils.getToken();
      
      if (!token) {
        return {
          user: null,
          token: null,
          isAuthenticated: false,
        };
      }

      if (!AuthUtils.isTokenValid(token)) {
        // Token expired, clear auth
        AuthUtils.clearAuth();
        return {
          user: null,
          token: null,
          isAuthenticated: false,
        };
      }

      // Verify token with API
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Token invalid, clear auth
          AuthUtils.clearAuth();
          return {
            user: null,
            token: null,
            isAuthenticated: false,
          };
        }

        const userData = await response.json();
        
        // Transform API response to our User type
        const user: User = {
          id: userData.id.toString(),
          email: userData.email,
          name: userData.full_name || userData.username,
        };

        // Update stored user data
        AuthUtils.setUser(user, AuthUtils.isRememberMeEnabled());

        return {
          user,
          token,
          isAuthenticated: true,
        };
      } catch (apiError) {
        console.error('API auth check failed:', apiError);
        // Fallback to local storage
        const user = AuthUtils.getUser();
        if (user) {
          return {
            user,
            token,
            isAuthenticated: true,
          };
        } else {
          AuthUtils.clearAuth();
          return {
            user: null,
            token: null,
            isAuthenticated: false,
          };
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      AuthUtils.clearAuth();
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    }
  }

  // Refresh token
  static refreshToken(): string | null {
    return AuthUtils.refreshToken();
  }

  // Check if token should be refreshed
  static shouldRefreshToken(token: string): boolean {
    return AuthUtils.shouldRefreshToken(token);
  }

  // Get session info
  static getSessionInfo(): {
    isRememberMe: boolean;
    tokenExpiry: Date | null;
    sessionStatus: 'active' | 'expiring' | 'expired';
  } {
    const token = AuthUtils.getToken();
    const isRememberMe = AuthUtils.isRememberMeEnabled();
    
    if (token) {
      const decoded = AuthUtils.decodeToken(token);
      if (decoded) {
        const expiryDate = new Date(decoded.exp * 1000);
        const shouldRefresh = AuthUtils.shouldRefreshToken(token);
        
        return {
          isRememberMe,
          tokenExpiry: expiryDate,
          sessionStatus: shouldRefresh ? 'expiring' : 'active'
        };
      }
    }
    
    return {
      isRememberMe: false,
      tokenExpiry: null,
      sessionStatus: 'expired'
    };
  }
}
