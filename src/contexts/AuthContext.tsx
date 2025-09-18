import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Sport, UserType } from '../types';
import { mockUsers, defaultUser, STORAGE_KEYS, type MockUser } from '../lib/mockData';

interface AuthContextType {
  user: MockUser | null;
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
  updateProfile: (updates: Partial<MockUser>) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage or use default
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(defaultUser);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
      }
    } else {
      setUser(defaultUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (mock authentication)
    const foundUser = Object.values(mockUsers).find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    
    setUser(foundUser);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(foundUser));
  }

  async function signUp(data: {
    email: string;
    password: string;
    username: string;
    sport: Sport;
    userType: UserType;
  }): Promise<{ needsVerification: boolean }> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = Object.values(mockUsers).find(u => u.email === data.email || u.username === data.username);
    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }
    
    // Create new user
    const newUser: MockUser = {
      id: `user-${Date.now()}`,
      username: data.username,
      email: data.email,
      full_name: data.username,
      avatar_url: `https://ui-avatars.com/api/?name=${data.username}&background=39FF14&color=000000`,
      sport: data.sport,
      user_type: data.userType,
      bio: `${data.sport} ${data.userType.toLowerCase()}`,
      location: 'Location not set',
      followers_count: 0,
      following_count: 0,
      posts_count: 0,
      created_at: new Date().toISOString()
    };
    
    // In a real app, this would be sent to backend
    // For demo, we'll simulate email verification
    return { needsVerification: true };
  }

  async function resendVerification(email: string) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would trigger email resend
    console.log('Verification email resent to:', email);
  }

  async function signOut() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  async function updateProfile(updates: Partial<MockUser>) {
    if (!user) throw new Error('No user logged in');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
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