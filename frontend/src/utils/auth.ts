// Authentication utility functions
import type { User } from '../types/auth';

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const REMEMBER_ME_KEY = 'auth_remember_me';
const SESSION_TOKEN_KEY = 'session_auth_token';
const SESSION_USER_KEY = 'session_auth_user';

// Idle timeout in milliseconds (30 minutes)
const IDLE_TIMEOUT = 30 * 60 * 1000;

// Rate limiting
const LOGIN_ATTEMPTS_KEY = 'login_attempts';
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export class AuthUtils {
  // JWT token management
  static createToken(user: User): string {
    const payload: any = { // JWTToken type was removed, using 'any' for now
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iat: Math.floor(Date.now() / 1000),
      user
    };
    
    // In a real app, you'd use a proper JWT library
    // This is a simplified mock implementation
    return btoa(JSON.stringify(payload));
  }

  static decodeToken(token: string): any | null { // JWTToken type was removed, using 'any' for now
    try {
      const decoded = JSON.parse(atob(token));
      return decoded;
    } catch {
      return null;
    }
  }

  static isTokenValid(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return false;
    
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  // Storage management
  static setToken(token: string, rememberMe: boolean = false): void {
    if (rememberMe) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
    } else {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
      localStorage.setItem(REMEMBER_ME_KEY, 'false');
    }
  }

  static getToken(): string | null {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    
    if (rememberMe) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(SESSION_TOKEN_KEY);
    }
  }

  static removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  }

  static setUser(user: User, rememberMe: boolean = false): void {
    if (rememberMe) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
    }
  }

  static getUser(): User | null {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
    const userStr = rememberMe 
      ? localStorage.getItem(USER_KEY)
      : sessionStorage.getItem(SESSION_USER_KEY);
    
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static removeUser(): void {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(SESSION_USER_KEY);
  }

  static clearAuth(): void {
    this.removeToken();
    this.removeUser();
    localStorage.removeItem(REMEMBER_ME_KEY);
  }

  static isRememberMeEnabled(): boolean {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  }

  // Token refresh functionality
  static refreshToken(): string | null {
    const currentToken = this.getToken();
    if (!currentToken) return null;

    const decoded = this.decodeToken(currentToken);
    if (!decoded) return null;

    const user = decoded.user;
    if (!user) return null;

    // Create new token with extended expiration
    const newToken = this.createToken(user);
    const rememberMe = this.isRememberMeEnabled();
    
    // Update stored token
    this.setToken(newToken, rememberMe);
    
    return newToken;
  }

  static shouldRefreshToken(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return false;

    const now = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = decoded.exp - now;
    
    // Refresh if token expires in less than 1 hour
    return timeUntilExpiry < 3600;
  }

  // Session management
  static startIdleTimer(onTimeout: () => void): () => void {
    let timeoutId: number;
    
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(onTimeout, IDLE_TIMEOUT);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    resetTimer();

    // Return cleanup function
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }

  // Rate limiting
  static checkRateLimit(): boolean {
    const attempts = this.getLoginAttempts();
    const now = Date.now();
    
    if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
      if (now - attempts.lastAttempt < LOCKOUT_DURATION) {
        return false; // Still locked out
      } else {
        // Reset after lockout duration
        this.resetLoginAttempts();
        return true;
      }
    }
    
    return true;
  }

  static recordLoginAttempt(): void {
    const attempts = this.getLoginAttempts();
    const now = Date.now();
    
    attempts.count += 1;
    attempts.lastAttempt = now;
    
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
  }

  static resetLoginAttempts(): void {
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
  }

  private static getLoginAttempts(): { count: number; lastAttempt: number } {
    const attemptsStr = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    if (!attemptsStr) {
      return { count: 0, lastAttempt: 0 };
    }
    
    try {
      return JSON.parse(attemptsStr);
    } catch {
      return { count: 0, lastAttempt: 0 };
    }
  }

  // Validation
  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 