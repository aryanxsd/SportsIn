/*
  # Add email column to users table

  1. Changes
    - Add email column to users table
    - Make email column required and unique
    - Add index for email lookups
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users ADD COLUMN email text NOT NULL;
    ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);
    CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);
  END IF;
END $$;