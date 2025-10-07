// Dashboard page constants
import { Shield, Zap, Users } from 'lucide-react';
import type { DashboardFeature, DashboardStats } from '../types/dashboard.types';

export const DashboardConstants = {
  // App information
  APP_NAME: 'TaimiLab',
  HERO_DESCRIPTION: 'Plataforma completa para gerenciamento e desenvolvimento de projetos inovadores',
  
  // Button texts
  CTA_BUTTON_TEXT: 'Começar Agora',
  SECONDARY_BUTTON_TEXT: 'Saiba Mais',
  CTA_TITLE: 'Pronto para começar?',
  CTA_DESCRIPTION: 'Junte-se a milhares de usuários que já transformaram seus projetos.',
  CTA_ACTION_TEXT: 'Acessar Agora',

  // Features configuration
  FEATURES: [
    {
      id: '1',
      title: 'Rápido e Eficiente',
      description: 'Ferramentas otimizadas para máxima produtividade e resultados excepcionais.',
      icon: Zap,
      color: 'blue'
    },
    {
      id: '2',
      title: 'Seguro e Confiável',
      description: 'Proteção de dados de nível empresarial com criptografia avançada.',
      icon: Shield,
      color: 'green'
    },
    {
      id: '3',
      title: 'Colaboração',
      description: 'Trabalhe em equipe de forma eficiente com ferramentas colaborativas.',
      icon: Users,
      color: 'purple'
    }
  ] as DashboardFeature[],

  // Default statistics
  DEFAULT_STATS: {
    totalProjects: 100,
    completedTasks: 500,
    activeUsers: 50,
    satisfactionRate: 98
  } as DashboardStats,

  // Page configuration
  PAGE_CONFIG: {
    title: 'Dashboard - TaimiLab',
    description: 'Plataforma completa para gerenciamento de projetos',
    refreshInterval: 60000, // 1 minute
    animationDuration: 300
  }
};


