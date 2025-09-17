export type Sport = 'Cricket' | 'Football' | 'Basketball';
export type UserType = 'Player' | 'Academy';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  sport: Sport;
  user_type: UserType;
  created_at: string;
}

export interface Academy {
  id: string;
  name: string;
  description: string;
  location: string;
  sports: Sport[];
  facilities: string[];
  coaches: string[];
  created_by: string;
  created_at: string;
}

export interface PlayerStats {
  id: string;
  user_id: string;
  sport: Sport;
  matches_played: number;
  wins: number;
  losses: number;
  performance_metrics: Record<string, number>;
  last_updated: string;
}

export interface AIInsight {
  id: string;
  user_id: string;
  type: 'strength' | 'improvement' | 'recommendation';
  title: string;
  description: string;
  metrics: Record<string, number>;
  created_at: string;
}