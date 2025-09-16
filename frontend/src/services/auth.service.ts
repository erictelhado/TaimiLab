// Authentication Service
import type { User, LoginCredentials } from '../types/auth';
import { AuthUtils } from '../utils/auth';

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - in real app, this would be an API call
      if (credentials.email === 'demo@endereco.de' && credentials.password === 'Endereco123') {
        const user: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
        };

        const token = AuthUtils.createToken(user);
        
        // Store auth data
        AuthUtils.setToken(token, credentials.rememberMe || false);
        AuthUtils.setUser(user, credentials.rememberMe || false);
        
        // Reset login attempts on successful login
        AuthUtils.resetLoginAttempts();
        
        return { user, token };
      } else {
        // Record failed attempt
        AuthUtils.recordLoginAttempt();
        throw new Error('Email ou senha inválidos.');
      }
    } catch (error) {
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

      // Token is valid, get user from storage
      const user = AuthUtils.getUser();
      if (user) {
        return {
          user,
          token,
          isAuthenticated: true,
        };
      } else {
        // User not found in storage, clear auth
        AuthUtils.clearAuth();
        return {
          user: null,
          token: null,
          isAuthenticated: false,
        };
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
