// Home page specific services
import { HomeConstants } from '../constants/home.constants';
import type { HomeActivity, HomeStats } from '../types/home.types';

export class HomeService {
  // Get recent activities for the home page
  static async getRecentActivities(): Promise<HomeActivity[]> {
    // Simulate API call - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HomeConstants.DEFAULT_ACTIVITIES);
      }, 500);
    });
  }

  // Get home page statistics
  static async getHomeStats(): Promise<HomeStats> {
    // Simulate API call - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HomeConstants.DEFAULT_STATS);
      }, 300);
    });
  }

  // Get user dashboard data
  static async getDashboardData(_userId: string): Promise<{
    activities: HomeActivity[];
    stats: HomeStats;
  }> {
    try {
      const [activities, stats] = await Promise.all([
        this.getRecentActivities(),
        this.getHomeStats()
      ]);

      return { activities, stats };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Erro ao carregar dados do dashboard');
    }
  }
}


