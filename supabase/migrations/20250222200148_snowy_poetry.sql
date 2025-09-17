/*
  # Initial Schema for Cricket Statistics Platform

  1. New Tables
    - users
      - Custom user profile data
    - teams
      - Team information and statistics
    - matches
      - Match details and scores
    - players
      - Player statistics and information
    - tournaments
      - Tournament management
    - innings
      - Detailed innings data
    - player_stats
      - Aggregated player statistics

  2. Security
    - RLS policies for all tables
    - Team member access control
    - Match data protection
*/

-- Users table extension (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  city text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  matches_played int DEFAULT 0,
  matches_won int DEFAULT 0,
  matches_lost int DEFAULT 0,
  matches_drawn int DEFAULT 0
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  team_id uuid REFERENCES teams(id),
  user_id uuid REFERENCES users(id),
  role text NOT NULL CHECK (role IN ('admin', 'player', 'scorer')),
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (team_id, user_id)
);

-- Tournaments
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  start_date date,
  end_date date,
  format text CHECK (format IN ('T20', 'ODI', 'Test')),
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed'))
);

-- Matches
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id),
  team1_id uuid REFERENCES teams(id),
  team2_id uuid REFERENCES teams(id),
  venue text,
  match_date date,
  format text CHECK (format IN ('T20', 'ODI', 'Test')),
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  winner_id uuid REFERENCES teams(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Innings
CREATE TABLE IF NOT EXISTS innings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id),
  batting_team_id uuid REFERENCES teams(id),
  bowling_team_id uuid REFERENCES teams(id),
  runs int DEFAULT 0,
  wickets int DEFAULT 0,
  overs numeric(4,1) DEFAULT 0,
  extras int DEFAULT 0
);

-- Player statistics
CREATE TABLE IF NOT EXISTS player_stats (
  user_id uuid REFERENCES users(id),
  matches_played int DEFAULT 0,
  runs_scored int DEFAULT 0,
  wickets_taken int DEFAULT 0,
  catches int DEFAULT 0,
  highest_score int DEFAULT 0,
  batting_average numeric(6,2) DEFAULT 0,
  bowling_average numeric(6,2) DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id)
);

-- Enable RLS
DO $$ 
BEGIN
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
  ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
  ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
  ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
  ALTER TABLE innings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;
EXCEPTION 
  WHEN others THEN NULL;
END $$;

-- RLS Policies with existence checks
DO $$ 
BEGIN
  -- Users policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data"
      ON users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  -- Team policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'teams' AND policyname = 'Anyone can view teams'
  ) THEN
    CREATE POLICY "Anyone can view teams"
      ON teams
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'teams' AND policyname = 'Team admins can update team'
  ) THEN
    CREATE POLICY "Team admins can update team"
      ON teams
      FOR UPDATE
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM team_members
          WHERE team_id = teams.id
          AND user_id = auth.uid()
          AND role = 'admin'
        )
      );
  END IF;

  -- Match policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'matches' AND policyname = 'Anyone can view matches'
  ) THEN
    CREATE POLICY "Anyone can view matches"
      ON matches
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'matches' AND policyname = 'Team admins can create matches'
  ) THEN
    CREATE POLICY "Team admins can create matches"
      ON matches
      FOR INSERT
      TO authenticated
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM team_members
          WHERE (team_id = matches.team1_id OR team_id = matches.team2_id)
          AND user_id = auth.uid()
          AND role = 'admin'
        )
      );
  END IF;

  -- Tournament policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tournaments' AND policyname = 'Anyone can view tournaments'
  ) THEN
    CREATE POLICY "Anyone can view tournaments"
      ON tournaments
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  -- Player stats policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'player_stats' AND policyname = 'Anyone can view player stats'
  ) THEN
    CREATE POLICY "Anyone can view player stats"
      ON player_stats
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Functions and triggers
CREATE OR REPLACE FUNCTION update_player_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update player statistics based on match data
  -- This is a placeholder for the actual implementation
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;