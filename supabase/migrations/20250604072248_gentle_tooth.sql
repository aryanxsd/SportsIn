/*
  # Add user profile creation policy

  1. Security Changes
    - Add RLS policy to allow users to create their own profile
    - Policy ensures users can only create a profile with their own auth.uid()

  2. Changes
    - Add INSERT policy for users table
*/

CREATE POLICY "Users can create their own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);