export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          email: string
          full_name: string | null
          avatar_url: string | null
          sport: 'Cricket' | 'Football' | 'Basketball'
          user_type: 'Player' | 'Academy'
          bio: string | null
          location: string | null
          website: string | null
          followers_count: number
          following_count: number
          posts_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          sport: 'Cricket' | 'Football' | 'Basketball'
          user_type: 'Player' | 'Academy'
          bio?: string | null
          location?: string | null
          website?: string | null
          followers_count?: number
          following_count?: number
          posts_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          sport?: 'Cricket' | 'Football' | 'Basketball'
          user_type?: 'Player' | 'Academy'
          bio?: string | null
          location?: string | null
          website?: string | null
          followers_count?: number
          following_count?: number
          posts_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      player_stats: {
        Row: {
          user_id: string
          matches_played: number
          matches_won: number
          matches_lost: number
          matches_drawn: number
          performance_rating: number
          form_status: string
          updated_at: string
        }
        Insert: {
          user_id: string
          matches_played?: number
          matches_won?: number
          matches_lost?: number
          matches_drawn?: number
          performance_rating?: number
          form_status?: string
          updated_at?: string
        }
        Update: {
          matches_played?: number
          matches_won?: number
          matches_lost?: number
          matches_drawn?: number
          performance_rating?: number
          form_status?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'Player' | 'Academy'
      sport_type: 'Cricket' | 'Football' | 'Basketball'
    }
  }
}