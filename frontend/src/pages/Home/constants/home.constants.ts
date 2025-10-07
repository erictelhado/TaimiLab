// Home page constants
import type { HomeActivity, HomeStats } from '../types/home.types';

export const HomeConstants = {
  // Default activities shown on home page
  DEFAULT_ACTIVITIES: [
    {
      id: '1',
      type: 'login' as const,
      title: 'Login realizado',
      description: 'Você fez login no sistema',
      timestamp: new Date(),
      status: 'success' as const
    },
    {
      id: '2',
      type: 'profile_update' as const,
      title: 'Perfil atualizado',
      description: 'Suas informações foram atualizadas',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      status: 'info' as const
    },
    {
      id: '3',
      type: 'project_created' as const,
      title: 'Novo projeto criado',
      description: 'Um novo projeto foi adicionado',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: 'success' as const
    }
  ] as HomeActivity[],

  // Default statistics for home page
  DEFAULT_STATS: {
    totalProjects: 12,
    completedTasks: 45,
    pendingTasks: 8,
    teamMembers: 5
  } as HomeStats,

  // Page configuration
  PAGE_CONFIG: {
    title: 'Dashboard',
    description: 'Gerencie seus projetos e explore todas as funcionalidades',
    refreshInterval: 30000, // 30 seconds
    maxActivities: 10
  }
};


