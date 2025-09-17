import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export async function signUp(email: string, password: string, userData: {
  username: string;
  sport: string;
  user_type: string;
}) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw authError;

  if (authData.user) {
    const { error: profileError } = await supabase.from('users').insert([
      {
        id: authData.user.id,
        email,
        username: userData.username,
        sport: userData.sport,
        user_type: userData.user_type,
        avatar_url: `https://ui-avatars.com/api/?name=${userData.username}&background=39FF14&color=000000`,
      },
    ]);

    if (profileError) throw profileError;
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Profile helpers
export async function updateProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Post helpers
export async function createPost(userId: string, content: string, mediaUrl?: string, mediaType?: 'image' | 'video') {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        user_id: userId,
        content,
        media_url: mediaUrl,
        media_type: mediaType,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPosts(userId?: string) {
  let query = supabase
    .from('posts')
    .select(`
      *,
      users (
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Follow helpers
export async function followUser(followerId: string, followingId: string) {
  const { data, error } = await supabase
    .from('follows')
    .insert([
      {
        follower_id: followerId,
        following_id: followingId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unfollowUser(followerId: string, followingId: string) {
  const { error } = await supabase
    .from('follows')
    .delete()
    .match({ follower_id: followerId, following_id: followingId });

  if (error) throw error;
}

// Like helpers
export async function likePost(userId: string, postId: string) {
  const { data, error } = await supabase
    .from('likes')
    .insert([
      {
        user_id: userId,
        post_id: postId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unlikePost(userId: string, postId: string) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .match({ user_id: userId, post_id: postId });

  if (error) throw error;
}

// Comment helpers
export async function addComment(userId: string, postId: string, content: string) {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        user_id: userId,
        post_id: postId,
        content,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Storage helpers
export async function uploadMedia(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from('media')
    .upload(path, file);

  if (error) throw error;
  return data;
}

export async function getMediaUrl(path: string) {
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}