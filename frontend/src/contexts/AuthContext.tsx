import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { AuthContextType, AuthState, LoginCredentials } from '../types/auth';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
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
      const { user, token, isAuthenticated } = await AuthService.checkAuth();
      setAuthState({
        user,
        token,
        isAuthenticated,
        isLoading: false,
      });
    } catch (error) {
      console.error('Auth check failed:', error);
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
    try {
      const { user, token } = await AuthService.login(credentials);
      
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      // Show success notification
      NotificationService.success(
        'Login realizado com sucesso!',
        `Bem-vindo, ${user.name || user.email}!`,
        3000
      );
    } catch (error) {
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    AuthService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });

    // Show logout notification
    NotificationService.info(
      'Logout realizado',
      'Você foi desconectado com sucesso.',
      2000
    );
  }, []);

  // Set up idle timer and token refresh when authenticated
  useEffect(() => {
    if (authState.isAuthenticated && authState.token) {
      // Set up idle timer
      const cleanup = AuthUtils.startIdleTimer(() => {
        console.log('Session expired due to inactivity');
        
        // Show session expired notification
        NotificationService.warning(
          'Sessão expirada',
          'Sua sessão expirou devido à inatividade.',
          5000
        );
        
        logout();
      });

      // Set up token refresh interval
      const refreshInterval = setInterval(() => {
        if (authState.token && AuthService.shouldRefreshToken(authState.token)) {
          const newToken = AuthService.refreshToken();
          if (newToken) {
            setAuthState(prev => ({
              ...prev,
              token: newToken
            }));
            console.log('Token refreshed automatically');
            
            // Show refresh notification
            NotificationService.info(
              'Sessão renovada',
              'Sua sessão foi renovada automaticamente.',
              2000
            );
          }
        }
      }, 5 * 60 * 1000); // Check every 5 minutes

      return () => {
        cleanup();
        clearInterval(refreshInterval);
      };
    }
  }, [authState.isAuthenticated, authState.token, logout]);

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