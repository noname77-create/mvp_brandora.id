/*
  # Skema Database Brandora Digital Marketing Hub

  ## Tables
  
  1. **profiles**
    - `id` (uuid, primary key, references auth.users)
    - `name` (text)
    - `email` (text)
    - `phone` (text)
    - `business_name` (text)
    - `address` (text)
    - `avatar_url` (text)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  2. **brand_assets**
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `name` (text)
    - `type` (text) - image, pdf, color, font
    - `file_url` (text)
    - `created_at` (timestamptz)

  3. **templates**
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `type` (text) - Feed Post, Stories, Reels, Carousel
    - `title` (text)
    - `preview_url` (text)
    - `content` (jsonb) - untuk menyimpan layer design
    - `created_at` (timestamptz)

  4. **ideas**
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `title` (text)
    - `description` (text)
    - `category` (text)
    - `trend` (text)
    - `engagement` (text)
    - `platform` (text)
    - `tags` (text[])
    - `saved` (boolean)
    - `created_at` (timestamptz)

  5. **content_schedules**
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `title` (text)
    - `description` (text)
    - `platform` (text)
    - `content_type` (text)
    - `scheduled_date` (date)
    - `scheduled_time` (time)
    - `status` (text) - draft, scheduled, published
    - `created_at` (timestamptz)

  6. **campaigns**
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `name` (text)
    - `platform` (text)
    - `reach` (text)
    - `engagement` (text)
    - `ctr` (text)
    - `conversion` (text)
    - `start_date` (date)
    - `end_date` (date)
    - `created_at` (timestamptz)

  7. **experts**
    - `id` (uuid, primary key)
    - `name` (text)
    - `title` (text)
    - `experience` (text)
    - `rating` (numeric)
    - `reviews` (integer)
    - `specialties` (text[])
    - `price` (text)
    - `avatar_url` (text)
    - `available` (boolean)
    - `created_at` (timestamptz)

  8. **consultations**
    - `id` (uuid, primary key)
    - `user_id` (uuid, references profiles)
    - `expert_id` (uuid, references experts)
    - `date` (date)
    - `time` (time)
    - `type` (text) - Video Call, Phone Call, In Person
    - `status` (text) - confirmed, cancelled, completed
    - `created_at` (timestamptz)

  9. **user_settings**
    - `id` (uuid, primary key, references auth.users)
    - `notifications_email` (boolean)
    - `notifications_push` (boolean)
    - `notifications_marketing` (boolean)
    - `notifications_updates` (boolean)
    - `theme` (text)
    - `language` (text)
    - `integration_instagram` (boolean)
    - `integration_facebook` (boolean)
    - `integration_tiktok` (boolean)
    - `integration_linkedin` (boolean)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
    - RLS enabled untuk semua tabel
    - Users dapat CRUD data mereka sendiri
    - Experts table read-only untuk users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  business_name text,
  address text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create brand_assets table
CREATE TABLE IF NOT EXISTS brand_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  file_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own brand assets"
  ON brand_assets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own brand assets"
  ON brand_assets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own brand assets"
  ON brand_assets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own brand assets"
  ON brand_assets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  preview_url text,
  content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own templates"
  ON templates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own templates"
  ON templates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON templates FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
  ON templates FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  trend text DEFAULT 'Stable',
  engagement text,
  platform text NOT NULL,
  tags text[] DEFAULT '{}',
  saved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own ideas"
  ON ideas FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ideas"
  ON ideas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ideas"
  ON ideas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ideas"
  ON ideas FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create content_schedules table
CREATE TABLE IF NOT EXISTS content_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  platform text NOT NULL,
  content_type text NOT NULL,
  scheduled_date date NOT NULL,
  scheduled_time time NOT NULL,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE content_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own schedules"
  ON content_schedules FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own schedules"
  ON content_schedules FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schedules"
  ON content_schedules FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own schedules"
  ON content_schedules FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  platform text NOT NULL,
  reach text DEFAULT '0',
  engagement text DEFAULT '0',
  ctr text DEFAULT '0%',
  conversion text DEFAULT '0%',
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own campaigns"
  ON campaigns FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own campaigns"
  ON campaigns FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own campaigns"
  ON campaigns FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own campaigns"
  ON campaigns FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create experts table
CREATE TABLE IF NOT EXISTS experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  experience text,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  specialties text[] DEFAULT '{}',
  price text,
  avatar_url text,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read experts"
  ON experts FOR SELECT
  TO authenticated
  USING (true);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  expert_id uuid REFERENCES experts(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  type text NOT NULL,
  status text DEFAULT 'confirmed',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own consultations"
  ON consultations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own consultations"
  ON consultations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own consultations"
  ON consultations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  notifications_email boolean DEFAULT true,
  notifications_push boolean DEFAULT false,
  notifications_marketing boolean DEFAULT true,
  notifications_updates boolean DEFAULT true,
  theme text DEFAULT 'light',
  language text DEFAULT 'id',
  integration_instagram boolean DEFAULT false,
  integration_facebook boolean DEFAULT false,
  integration_tiktok boolean DEFAULT false,
  integration_linkedin boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Insert sample experts data
INSERT INTO experts (name, title, experience, rating, reviews, specialties, price, avatar_url, available) VALUES
('Nizar Fathun Nazar', 'Senior Digital Marketing Strategist', '8+ tahun', 4.9, 127, ARRAY['Social Media Marketing', 'Content Strategy', 'Paid Advertising'], 'Rp 150.000/jam', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', true),
('Khairunisa Wahyu H', 'E-commerce Marketing Expert', '6+ tahun', 4.8, 89, ARRAY['E-commerce', 'Conversion Optimization', 'Analytics'], 'Rp 125.000/jam', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', true),
('Nana Andyana', 'Content Creator & Influencer Marketing', '5+ tahun', 4.7, 156, ARRAY['Content Creation', 'Influencer Marketing', 'Brand Partnerships'], 'Rp 100.000/jam', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', false)
ON CONFLICT DO NOTHING;
