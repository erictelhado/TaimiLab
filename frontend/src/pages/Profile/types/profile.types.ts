// Profile page specific types
export interface ProfileFormData {
  name: string;
  email: string;
}

export interface ProfileSettings {
  emailNotifications: boolean;
  rememberMe: boolean;
  darkMode: boolean;
}

export interface ProfileStats {
  accountAge: number; // in days
  lastLogin: Date;
  totalSessions: number;
}

export interface ProfileValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface ProfilePageProps {
  userId?: string;
  showSettings?: boolean;
  showStats?: boolean;
}


