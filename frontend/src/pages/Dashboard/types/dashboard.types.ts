// Dashboard page specific types
import type { LucideIcon } from 'lucide-react';

export interface DashboardFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface DashboardStats {
  totalProjects: number;
  completedTasks: number;
  activeUsers: number;
  satisfactionRate: number;
}

export interface DashboardAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: number;
}

export interface DashboardPageProps {
  showFeatures?: boolean;
  showStats?: boolean;
  showAnalytics?: boolean;
}


