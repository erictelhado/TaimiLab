// Home page specific types
export interface HomeActivity {
  id: string;
  type: 'login' | 'profile_update' | 'project_created' | 'task_completed' | 'team_join';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'info' | 'warning' | 'error';
}

export interface HomeStats {
  totalProjects: number;
  completedTasks: number;
  pendingTasks: number;
  teamMembers: number;
}

export interface HomePageProps {
  userId?: string;
  showActivities?: boolean;
  showStats?: boolean;
}


