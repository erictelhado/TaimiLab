// Login page constants
export const LoginConstants = {
  // App information
  APP_NAME: 'TaimiLab',
  PAGE_TITLE: 'Entrar',
  PAGE_DESCRIPTION: 'Acesse sua conta para continuar',

  // Form placeholders
  EMAIL_PLACEHOLDER: 'demo@endereco.de',
  PASSWORD_PLACEHOLDER: 'Endereco123',

  // Default values
  DEFAULT_EMAIL: 'demo@endereco.de',
  DEFAULT_PASSWORD: 'Endereco123',

  // Validation rules
  VALIDATION_RULES: {
    MIN_PASSWORD_LENGTH: 8,
    MAX_EMAIL_LENGTH: 255,
    MAX_PASSWORD_LENGTH: 128
  },

  // Rate limiting
  RATE_LIMIT: {
    MAX_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    ATTEMPT_WINDOW: 5 * 60 * 1000 // 5 minutes
  },

  // UI configuration
  UI_CONFIG: {
    SHOW_PASSWORD_DEFAULT: false,
    REMEMBER_ME_DEFAULT: false,
    AUTO_FOCUS_EMAIL: true
  }
};


