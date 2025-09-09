import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

const translations = {
  en: {
    'auth.login': 'Login',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.loginButton': 'Sign In',
    'auth.demoCredentials': 'Demo: demo@endereco.de / Endereco123',
    'auth.loginError': 'Invalid email or password. Please try again.',
    'general.loading': 'Loading...',
  },
  de: {
    'auth.login': 'Anmelden',
    'auth.email': 'E-Mail',
    'auth.password': 'Passwort',
    'auth.loginButton': 'Anmelden',
    'auth.demoCredentials': 'Demo: demo@endereco.de / Endereco123',
    'auth.loginError': 'Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.',
    'general.loading': 'Lädt...',
  },
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 