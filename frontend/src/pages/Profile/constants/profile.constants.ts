// Profile page constants
export const ProfileConstants = {
  // Page information
  PAGE_TITLE: 'Perfil do Usuário',
  PAGE_DESCRIPTION: 'Gerencie suas informações pessoais e configurações de conta.',
  BACK_BUTTON_TEXT: 'Voltar ao Início',

  // Form labels and placeholders
  PERSONAL_INFO_TITLE: 'Informações Pessoais',
  NAME_LABEL: 'Nome',
  NAME_PLACEHOLDER: 'Seu nome completo',
  EMAIL_LABEL: 'Email',
  EMAIL_PLACEHOLDER: 'seu@email.com',

  // Account information
  ACCOUNT_INFO_TITLE: 'Informações da Conta',
  USER_ID_LABEL: 'ID do Usuário',
  ACCOUNT_STATUS_LABEL: 'Status da Conta',
  ACCOUNT_STATUS_ACTIVE: 'Ativa',
  MEMBER_SINCE_LABEL: 'Membro desde',

  // Settings
  SETTINGS_TITLE: 'Configurações',
  SETTINGS_OPTIONS: [
    {
      label: 'Notificações por Email',
      defaultChecked: true
    },
    {
      label: 'Lembrar de Mim',
      defaultChecked: true
    },
    {
      label: 'Modo Escuro',
      defaultChecked: false
    }
  ],

  // Danger zone
  DANGER_ZONE_TITLE: 'Zona de Perigo',
  DANGER_ZONE_DESCRIPTION: 'Ações irreversíveis que afetam sua conta.',
  LOGOUT_BUTTON_TEXT: 'Fazer Logout',

  // Button texts
  SAVE_BUTTON_TEXT: 'Salvar Alterações',
  SAVING_TEXT: 'Salvando...',

  // Success messages
  SUCCESS_MESSAGES: {
    PROFILE_UPDATED: 'Perfil atualizado',
    PROFILE_SAVED: 'Suas informações foram salvas com sucesso.',
    SETTINGS_UPDATED: 'Configurações atualizadas',
    SETTINGS_SAVED: 'Suas configurações foram salvas com sucesso.'
  },

  // Error messages
  ERROR_MESSAGES: {
    SAVE_ERROR: 'Erro ao salvar',
    SAVE_FAILED: 'Não foi possível salvar suas informações.',
    SETTINGS_ERROR: 'Erro ao salvar configurações',
    SETTINGS_FAILED: 'Não foi possível salvar suas configurações.',
    LOAD_ERROR: 'Erro ao carregar dados do perfil'
  },

  // Validation rules
  VALIDATION_RULES: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 255
  }
};


