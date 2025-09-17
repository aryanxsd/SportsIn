import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Sport, UserType, UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: {
    email: string;
    password: string;
    username: string;
    sport: Sport;
    userType: UserType;
  }) => Promise<{ needsVerification: boolean }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchUserProfile(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setUser(data);
      } else {
        console.warn('No user profile found');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      // Check if user is null even when no explicit error is returned
      if (!data.user) {
        throw new Error('Invalid login credentials');
      }
      
      if (data.user && !data.user.email_confirmed_at) {
        throw new Error('Please verify your email before signing in');
      }
      if (data.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async function signUp(data: {
    email: string;
    password: string;
    username: string;
    sport: Sport;
    userType: UserType;
  }): Promise<{ needsVerification: boolean; userExists?: boolean }> {
    try {
      // Create auth user with email confirmation required
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/home`,
          data: {
            username: data.username,
            sport: data.sport,
            user_type: data.userType,
          }
        }
      });

      if (authError) {
        // Handle user already exists case without throwing error
        if (authError.message?.includes('User already registered') || authError.message?.includes('already registered')) {
          return { needsVerification: true, userExists: true };
        }
        throw authError;
      }

      // If user needs email verification, return early
      if (authData.user && !authData.user.email_confirmed_at) {
        return { needsVerification: true };
      }

      // If user is already confirmed (shouldn't happen in normal flow)
      if (authData.user && authData.user.email_confirmed_at) {
        await createUserProfile(authData.user.id, data);
        await fetchUserProfile(authData.user.id);
        return { needsVerification: false };
      }

      return { needsVerification: true };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async function createUserProfile(userId: string, data: {
    username: string;
    sport: Sport;
    userType: UserType;
  }) {
    // Create user profile
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: userId,
        username: data.username,
        sport: data.sport,
        user_type: data.userType,
        avatar_url: `https://ui-avatars.com/api/?name=${data.username}&background=39FF14&color=000000`,
      },
    ]);
    
    if (profileError) throw profileError;

    // Create initial player stats
    const { error: statsError } = await supabase.from('player_stats').insert([
      {
        user_id: userId,
      },
    ]);
    if (statsError) throw statsError;
  }

  async function resendVerification(email: string) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/home`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  async function updateProfile(updates: Partial<UserProfile>) {
    try {
      if (!user?.id) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      setUser({ ...user, ...data });
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}