// Login page specific types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginValidationResult {
  isValid: boolean;
  errors: Partial<LoginCredentials>;
}

export interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
  showPassword: boolean;
  isLoading: boolean;
  error: string;
  emailError: string;
  passwordError: string;
}

export interface LoginPageProps {
  redirectTo?: string;
  showRememberMe?: boolean;
  autoFocus?: boolean;
}


