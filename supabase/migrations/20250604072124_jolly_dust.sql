/*
  # Add sport and user type columns to users table

  1. Changes
    - Add sport_type enum type
    - Add user_type enum type
    - Add sport column to users table
    - Add user_type column to users table

  2. Security
    - No changes to RLS policies needed
*/

-- Create enum types if they don't exist
DO $$ BEGIN
  CREATE TYPE sport_type AS ENUM ('Cricket', 'Football', 'Basketball');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE user_type AS ENUM ('Player', 'Academy');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add columns to users table if they don't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'sport'
  ) THEN
    ALTER TABLE users ADD COLUMN sport sport_type;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'user_type'
  ) THEN
    ALTER TABLE users ADD COLUMN user_type user_type;
  END IF;
END $$;