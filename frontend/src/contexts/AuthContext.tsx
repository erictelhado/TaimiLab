import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { AuthContextType, AuthState, LoginCredentials, User } from '../types/auth';
import { AuthUtils } from '../utils/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check authentication status on mount and token change
  const checkAuth = useCallback(async () => {
    try {
      const token = AuthUtils.getToken();
      
      if (!token) {
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      if (!AuthUtils.isTokenValid(token)) {
        // Token expired, clear auth
        AuthUtils.clearAuth();
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      // Token is valid, get user from storage
      const user = AuthUtils.getUser();
      if (user) {
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // User not found in storage, clear auth
        AuthUtils.clearAuth();
        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      AuthUtils.clearAuth();
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Login function with rate limiting and validation
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    // Check rate limiting
    if (!AuthUtils.checkRateLimit()) {
      throw new Error('Too many login attempts. Please try again later.');
    }

    // Validate credentials
    if (!AuthUtils.validateEmail(credentials.email)) {
      throw new Error('Please enter a valid email address.');
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
        AuthUtils.setToken(token);
        AuthUtils.setUser(user);
        
        // Reset login attempts on successful login
        AuthUtils.resetLoginAttempts();
        
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Record failed attempt
        AuthUtils.recordLoginAttempt();
        throw new Error('Invalid email or password.');
      }
    } catch (error) {
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    AuthUtils.clearAuth();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  // Set up idle timer when authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      const cleanup = AuthUtils.startIdleTimer(() => {
        console.log('Session expired due to inactivity');
        logout();
      });

      return cleanup;
    }
  }, [authState.isAuthenticated, logout]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 