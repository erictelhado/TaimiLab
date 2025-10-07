// Login page specific services
import { AuthService } from '../../../services/auth.service';
import { LoginConstants } from '../constants/login.constants';
import type { LoginCredentials, LoginValidationResult } from '../types/login.types';

export class LoginService {
  // Validate login credentials
  static validateCredentials(credentials: LoginCredentials): LoginValidationResult {
    const errors: Partial<LoginCredentials> = {};
    let isValid = true;

    // Email validation
    if (!credentials.email) {
      errors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!this.isValidEmail(credentials.email)) {
      errors.email = 'Por favor, insira um endereço de email válido';
      isValid = false;
    }

    // Password validation
    if (!credentials.password) {
      errors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (!this.isValidPassword(credentials.password)) {
      errors.password = 'A senha deve ter pelo menos 8 caracteres';
      isValid = false;
    }

    return {
      isValid,
      errors
    };
  }

  // Email validation helper
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation helper
  private static isValidPassword(password: string): boolean {
    return password.length >= 8;
  }

  // Perform login with enhanced error handling
  static async performLogin(credentials: LoginCredentials): Promise<{ user: any; token: string }> {
    try {
      // Validate credentials first
      const validation = this.validateCredentials(credentials);
      if (!validation.isValid) {
        throw new Error('Credenciais inválidas');
      }

      // Use the main AuthService for actual login
      return await AuthService.login(credentials);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Check if user can attempt login (rate limiting)
  static canAttemptLogin(): boolean {
    // This could be enhanced with more sophisticated rate limiting
    return true;
  }

  // Get login form default values
  static getDefaultCredentials(): LoginCredentials {
    return {
      email: LoginConstants.DEFAULT_EMAIL,
      password: LoginConstants.DEFAULT_PASSWORD,
      rememberMe: false
    };
  }
}


