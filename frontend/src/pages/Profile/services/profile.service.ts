// Profile page specific services
import { AuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';
import { ProfileConstants } from '../constants/profile.constants';
import type { ProfileFormData, ProfileSettings } from '../types/profile.types';

export class ProfileService {
  // Update user profile
  static async updateProfile(formData: ProfileFormData): Promise<void> {
    try {
      // Validate form data
      const validation = this.validateProfileData(formData);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      NotificationService.success(
        ProfileConstants.SUCCESS_MESSAGES.PROFILE_UPDATED,
        ProfileConstants.SUCCESS_MESSAGES.PROFILE_SAVED,
        3000
      );
    } catch (error) {
      NotificationService.error(
        ProfileConstants.ERROR_MESSAGES.SAVE_ERROR,
        ProfileConstants.ERROR_MESSAGES.SAVE_FAILED,
        5000
      );
      throw error;
    }
  }

  // Validate profile form data
  static validateProfileData(formData: ProfileFormData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!formData.name || formData.name.trim().length === 0) {
      errors.push('Nome é obrigatório');
    }

    if (!formData.email || formData.email.trim().length === 0) {
      errors.push('Email é obrigatório');
    } else if (!this.isValidEmail(formData.email)) {
      errors.push('Email deve ter um formato válido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Email validation helper
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Update profile settings
  static async updateSettings(_settings: ProfileSettings): Promise<void> {
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      NotificationService.success(
        'Configurações atualizadas',
        'Suas configurações foram salvas com sucesso.',
        3000
      );
    } catch (error) {
      NotificationService.error(
        'Erro ao salvar configurações',
        'Não foi possível salvar suas configurações.',
        5000
      );
      throw error;
    }
  }

  // Get user profile data
  static async getProfileData(_userId: string): Promise<ProfileFormData> {
    try {
      // Simulate API call - replace with actual API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            name: 'Usuário Demo',
            email: 'demo@endereco.de'
          });
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
      throw new Error('Erro ao carregar dados do perfil');
    }
  }

  // Logout user
  static logout(): void {
    AuthService.logout();
  }

  // Get profile statistics
  static async getProfileStats(_userId: string): Promise<{
    accountAge: number;
    lastLogin: Date;
    totalSessions: number;
  }> {
    // Simulate API call - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          accountAge: 30, // days
          lastLogin: new Date(),
          totalSessions: 45
        });
      }, 200);
    });
  }
}


