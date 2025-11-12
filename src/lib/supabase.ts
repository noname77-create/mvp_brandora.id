import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  address?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};

export type BrandAsset = {
  id: string;
  user_id: string;
  name: string;
  type: string;
  file_url?: string;
  created_at: string;
};

export type Template = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  preview_url?: string;
  content: any;
  created_at: string;
};

export type Idea = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  trend: string;
  engagement?: string;
  platform: string;
  tags: string[];
  saved: boolean;
  created_at: string;
};

export type ContentSchedule = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  platform: string;
  content_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: string;
  created_at: string;
};

export type Campaign = {
  id: string;
  user_id: string;
  name: string;
  platform: string;
  reach: string;
  engagement: string;
  ctr: string;
  conversion: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
};

export type Expert = {
  id: string;
  name: string;
  title: string;
  experience?: string;
  rating: number;
  reviews: number;
  specialties: string[];
  price?: string;
  avatar_url?: string;
  available: boolean;
  created_at: string;
};

export type Consultation = {
  id: string;
  user_id: string;
  expert_id: string;
  date: string;
  time: string;
  type: string;
  status: string;
  created_at: string;
};

export type UserSettings = {
  id: string;
  notifications_email: boolean;
  notifications_push: boolean;
  notifications_marketing: boolean;
  notifications_updates: boolean;
  theme: string;
  language: string;
  integration_instagram: boolean;
  integration_facebook: boolean;
  integration_tiktok: boolean;
  integration_linkedin: boolean;
  created_at: string;
  updated_at: string;
};
