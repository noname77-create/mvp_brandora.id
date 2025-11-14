# Panduan Setup Database & RLS di Supabase

## Part 1: Setup Project Supabase

### Step 1: Buat Akun dan Project Baru

1. **Buka Website Supabase**
   - Kunjungi https://supabase.com
   - Klik "Start your project"

2. **Sign Up**
   - Gunakan GitHub, Google, atau email
   - Verifikasi email jika diperlukan

3. **Buat Project Baru**
   - Klik "New Project"
   - Isi informasi:
     - Organization: Buat baru atau pilih yang ada
     - Project Name: "Brandora" atau nama pilihan Anda
     - Database Password: Buat password yang kuat (simpan untuk kemudian)
     - Region: Pilih terdekat (untuk Indonesia: Singapore)
   - Klik "Create new project"

4. **Tunggu Project Siap**
   - Proses pembuatan memakan waktu 1-2 menit
   - Anda akan diarahkan ke dashboard saat selesai

### Step 2: Dapatkan Credentials

1. **Buka Settings > API**
   - Di sidebar kiri, klik "Settings" (ikon gear)
   - Pilih "API" dari submenu

2. **Copy Credentials**
   ```
   Project URL: https://xxxxx.supabase.co
   anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (JANGAN SHARE!)
   ```

3. **Buat File .env**
   - Di root project Anda, buat file `.env`:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   - Jangan commit file `.env` ke git!
   - `.gitignore` sudah include `.env`

---

## Part 2: Setup Database dengan Migrasi

### Step 1: Akses SQL Editor

1. **Buka SQL Editor**
   - Di sidebar kiri Supabase, klik "SQL Editor"
   - Atau buka dari: https://supabase.com/dashboard/project/[project-id]/sql/new

2. **Buat Query Baru**
   - Klik "+ New Query"
   - Atau klik "New SQL Query"

### Step 2: Copy & Jalankan Migration

1. **Copy Migration SQL**
   - Buka file migrasi: `supabase/migrations/20251112034918_create_brandora_schema.sql`
   - Copy seluruh isi file SQL

2. **Paste ke SQL Editor**
   - Paste ke SQL Editor window
   - Atau copy-paste per bagian jika terlalu panjang

3. **Jalankan SQL**
   - Klik tombol "Run" (atau Ctrl+Enter)
   - Tunggu hingga selesai
   - Anda akan melihat pesan sukses

### Step 3: Verifikasi Tabel Telah Dibuat

1. **Buka Table Editor**
   - Di sidebar kiri, klik "Table Editor"
   - Atau buka dari: https://supabase.com/dashboard/project/[project-id]/editor

2. **Lihat Daftar Tabel**
   ```
   public
   ├── profiles
   ├── brand_assets
   ├── templates
   ├── ideas
   ├── content_schedules
   ├── campaigns
   ├── experts
   ├── consultations
   └── user_settings
   ```

3. **Periksa Struktur Tabel**
   - Klik masing-masing tabel
   - Verifikasi kolom-kolom sudah ada

---

## Part 3: Setup Row Level Security (RLS)

### Apa itu RLS?

RLS (Row Level Security) adalah fitur keamanan database yang memastikan:
- User A hanya bisa akses data user A
- User B hanya bisa akses data user B
- Mencegah pembacaan/modifikasi data orang lain

### Step 1: Enable RLS per Tabel

Jika migrasi sudah berjalan, RLS sudah otomatis di-enable. Tapi untuk verifikasi:

1. **Buka Authentication > Policies**
   - Di sidebar kiri, klik "Authentication"
   - Pilih "Policies"

2. **Lihat Policies Existing**
   ```
   Tables dengan RLS:
   - profiles
   - brand_assets
   - templates
   - ideas
   - content_schedules
   - campaigns
   - consultations
   - user_settings
   - experts (read-only)
   ```

3. **Verifikasi RLS Status**
   - Klik "Table Editor"
   - Pilih tabel
   - Klik tab "RLS"
   - Pastikan toggle RLS dalam status ON

### Step 2: Cek Policies yang Ada

1. **Dari Policies Page**
   - Klik table untuk lihat policies
   - Anda akan melihat:
     ```
     - SELECT policy: Users can read own data
     - INSERT policy: Users can insert own data
     - UPDATE policy: Users can update own data
     - DELETE policy: Users can delete own data
     ```

### Step 3: Test RLS Policy

1. **Dari Table Editor**
   - Klik "Policies" (tab di atas tabel)
   - Lihat policy yang ada

2. **Tampilkan Policy Detail**
   - Klik policy name
   - Anda akan lihat SQL:
   ```sql
   -- SELECT Policy
   USING (auth.uid() = id)

   -- INSERT Policy
   WITH CHECK (auth.uid() = id)

   -- UPDATE Policy
   USING (auth.uid() = id)
   WITH CHECK (auth.uid() = id)

   -- DELETE Policy
   USING (auth.uid() = id)
   ```

---

## Part 4: Manual Setup Jika Migrasi Gagal

Jika migrasi otomatis tidak berhasil, ikuti langkah ini:

### Step 1: Create Tables Manual

```sql
-- 1. Create profiles table
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

-- 2. Create ideas table
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

-- 3. Create content_schedules table
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

-- 4. Create consultations table
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

-- 5. Create experts table (no user_id - public)
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

-- 6. Create user_settings table
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

-- 7. Create campaigns table
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

-- 8. Create brand_assets table
CREATE TABLE IF NOT EXISTS brand_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  file_url text,
  created_at timestamptz DEFAULT now()
);

-- 9. Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  preview_url text,
  content jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);
```

### Step 2: Enable RLS pada Setiap Tabel

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
```

### Step 3: Create Policies untuk Profiles Table

```sql
-- DROP existing policies if any
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- CREATE NEW POLICIES for profiles
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
```

### Step 4: Create Policies untuk Ideas Table

```sql
-- Drop existing
DROP POLICY IF EXISTS "Users can read own ideas" ON ideas;
DROP POLICY IF EXISTS "Users can insert own ideas" ON ideas;
DROP POLICY IF EXISTS "Users can update own ideas" ON ideas;
DROP POLICY IF EXISTS "Users can delete own ideas" ON ideas;

-- Create policies
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
```

### Step 5: Create Policies untuk Tabel Lainnya

Gunakan pattern yang sama untuk tabel lainnya:

```sql
-- Content Schedules
DROP POLICY IF EXISTS "Users can read own schedules" ON content_schedules;
DROP POLICY IF EXISTS "Users can insert own schedules" ON content_schedules;
DROP POLICY IF EXISTS "Users can update own schedules" ON content_schedules;
DROP POLICY IF EXISTS "Users can delete own schedules" ON content_schedules;

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

-- Campaigns
DROP POLICY IF EXISTS "Users can read own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can insert own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can update own campaigns" ON campaigns;
DROP POLICY IF EXISTS "Users can delete own campaigns" ON campaigns;

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

-- Consultations
DROP POLICY IF EXISTS "Users can read own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can insert own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can update own consultations" ON consultations;
DROP POLICY IF EXISTS "Users can delete own consultations" ON consultations;

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

-- Experts (READ ONLY - public)
DROP POLICY IF EXISTS "Anyone can read experts" ON experts;

CREATE POLICY "Anyone can read experts"
  ON experts FOR SELECT
  TO authenticated
  USING (true);

-- User Settings
DROP POLICY IF EXISTS "Users can read own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON user_settings;

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

-- Brand Assets
DROP POLICY IF EXISTS "Users can read own brand assets" ON brand_assets;
DROP POLICY IF EXISTS "Users can insert own brand assets" ON brand_assets;
DROP POLICY IF EXISTS "Users can update own brand assets" ON brand_assets;
DROP POLICY IF EXISTS "Users can delete own brand assets" ON brand_assets;

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

-- Templates
DROP POLICY IF EXISTS "Users can read own templates" ON templates;
DROP POLICY IF EXISTS "Users can insert own templates" ON templates;
DROP POLICY IF EXISTS "Users can update own templates" ON templates;
DROP POLICY IF EXISTS "Users can delete own templates" ON templates;

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
```

### Step 6: Insert Sample Data (Expert)

```sql
INSERT INTO experts (name, title, experience, rating, reviews, specialties, price, avatar_url, available)
VALUES
('Nizar Fathun Nazar', 'Senior Digital Marketing Strategist', '8+ tahun', 4.9, 127,
  ARRAY['Social Media Marketing', 'Content Strategy', 'Paid Advertising'],
  'Rp 150.000/jam',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  true),
('Khairunisa Wahyu H', 'E-commerce Marketing Expert', '6+ tahun', 4.8, 89,
  ARRAY['E-commerce', 'Conversion Optimization', 'Analytics'],
  'Rp 125.000/jam',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  true),
('Nana Andyana', 'Content Creator & Influencer Marketing', '5+ tahun', 4.7, 156,
  ARRAY['Content Creation', 'Influencer Marketing', 'Brand Partnerships'],
  'Rp 100.000/jam',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  false);
```

---

## Part 5: Verifikasi Koneksi dari React App

### Step 1: Test Connection di Browser

1. **Buka Aplikasi**
   ```bash
   npm run dev
   ```

2. **Buka Browser Console**
   - Tekan F12 atau Ctrl+Shift+I
   - Buka tab "Console"

3. **Sign Up Akun Baru**
   - Masukkan email dan password
   - Klik "Daftar Akun"

4. **Cek Console**
   - Jika berhasil, tidak ada error
   - Anda akan redirect ke dashboard

### Step 2: Verifikasi Data di Supabase

1. **Buka Supabase Dashboard**
   - Klik "Table Editor"
   - Pilih "profiles" table

2. **Lihat Data Baru**
   - Anda akan melihat row baru dengan user yang terdaftar
   - Pastikan user_id sesuai dengan auth.users

3. **Buka user_settings Table**
   - Cek apakah ada row untuk user baru
   - Verifikasi default values

### Step 3: Test CRUD Operations

1. **Create (INSERT)**
   ```
   - Buka Bank Ideation
   - Klik "Tambah Ide"
   - Isi form dan simpan
   - Cek di Supabase: ideas table
   ```

2. **Read (SELECT)**
   ```
   - Data akan otomatis tampil di aplikasi
   - Buka browser console, tidak ada error
   ```

3. **Update**
   ```
   - Buka Profile, klik Edit
   - Ubah nama dan simpan
   - Cek perubahan di profiles table
   ```

4. **Delete**
   ```
   - Buka Bank Ideation
   - Delete satu ide
   - Cek di Supabase: row hilang dari ideas table
   ```

### Step 4: Test RLS Security

1. **Create 2 User Account**
   - Sign out dari browser
   - Buat akun user kedua dengan email berbeda
   - Login dengan user kedua

2. **Verify RLS Working**
   ```
   - User 1 buat ide dengan judul "Ide User 1"
   - User 2 buat ide dengan judul "Ide User 2"
   - User 2 TIDAK akan melihat ide dari User 1
   - User 1 TIDAK akan melihat ide dari User 2
   ```

3. **Check SQL (Optional)**
   - Query dari User 1:
   ```sql
   SELECT * FROM ideas WHERE user_id = user1_id
   -- Hanya akan return data User 1

   -- Jika User 1 coba:
   SELECT * FROM ideas WHERE user_id = user2_id
   -- Permission denied! RLS block ini
   ```

---

## Part 6: Troubleshooting

### Error 1: "relations does not exist"
```
Penyebab: Tabel belum dibuat
Solusi:
1. Jalankan migrasi SQL lagi
2. Pastikan tidak ada error saat eksekusi
3. Refresh Table Editor
```

### Error 2: "new row violates row-level security policy"
```
Penyebab: RLS policy tidak benar atau user_id tidak sesuai
Solusi:
1. Cek policy di Authentication > Policies
2. Pastikan USING (auth.uid() = user_id) benar
3. Cek auth.uid() dari user yang login
```

### Error 3: "permission denied for schema public"
```
Penyebab: User tidak authenticated atau role tidak benar
Solusi:
1. Pastikan user sudah login
2. Cek token di browser > Application > Local Storage
3. Verifikasi anon key di .env benar
```

### Error 4: "relation "xxxx" does not exist"
```
Penyebab: Nama tabel typo atau belum di-create
Solusi:
1. Cek spelling nama tabel
2. Jalankan CREATE TABLE SQL lagi
3. Refresh browser
```

### Error 5: Data User 1 bisa dilihat User 2
```
Penyebab: RLS policy tidak bekerja atau USING clause salah
Solusi:
1. Buka Authentication > Policies
2. Lihat SELECT policy
3. Pastikan ada: USING (auth.uid() = user_id)
4. Jika tidak ada, DELETE policy lama dan CREATE policy baru
```

---

## Part 7: Best Practices

### 1. Always Enable RLS
```sql
-- GOOD
ALTER TABLE mytable ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own data" ON mytable
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- BAD - Don't do this!
ALTER TABLE mytable DISABLE ROW LEVEL SECURITY; -- NEVER!
```

### 2. Never Share Service Role Key
```
- anon key: OK untuk di-commit ke repo / frontend
- service_role key: JANGAN SHARE! Hanya untuk backend
- Jika di-leak, regenerate dari Settings > API
```

### 3. Use auth.uid() untuk Security
```sql
-- GOOD
WHERE auth.uid() = user_id

-- BAD
WHERE user_id = 'hardcoded-user-id'
WHERE true -- Ini membuka akses ke semua!
```

### 4. Test dengan Multiple User
```
- Jangan hanya test dengan 1 akun
- Test dengan minimal 2 akun berbeda
- Pastikan data terpisah per user
```

### 5. Monitor Query Performance
```
- Di Supabase Dashboard > Database > Query Performance
- Cek slow queries
- Add indexes jika perlu
```

---

## Summary Checklist

- [ ] Buat Supabase project
- [ ] Copy Project URL dan anon key
- [ ] Buat file .env dengan credentials
- [ ] Jalankan migrasi SQL (semua tabel + RLS)
- [ ] Verifikasi tabel di Table Editor
- [ ] Verifikasi policies di Authentication > Policies
- [ ] Test sign up / login di aplikasi
- [ ] Test CRUD operations (create idea, edit profile, dll)
- [ ] Test RLS dengan 2 user berbeda
- [ ] Pastikan data terpisah per user
- [ ] Test error handling di browser console
- [ ] Siap untuk production!

---

## Next Steps

1. **Setup Storage (Optional)**
   - Untuk upload avatar, brand assets, dll
   - Di Supabase: Storage > New Bucket

2. **Setup Realtime (Optional)**
   - Untuk live updates
   - Di Supabase: Replication > Enable

3. **Setup Backups (Recommended)**
   - Di Supabase: Database > Backups
   - Set automatic backups daily

4. **Monitor Costs**
   - Supabase memiliki free tier generous
   - Monitor penggunaan di Settings > Usage
