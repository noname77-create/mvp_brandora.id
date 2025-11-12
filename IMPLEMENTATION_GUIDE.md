# Brandora Digital Marketing Hub - Implementation Guide

## Setup Database & Environment

### 1. Buat Project Supabase
1. Kunjungi https://supabase.com dan buat project baru
2. Copy URL dan anon key dari Settings > API

### 2. Setup Environment Variables
Buat file `.env` di root project:
```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Jalankan Migrasi Database
Migrasi database sudah dilakukan otomatis. Struktur database sudah dibuat dengan tabel:
- profiles
- brand_assets
- templates
- ideas
- content_schedules
- campaigns
- experts
- consultations
- user_settings

## Fitur yang Sudah Diimplementasikan

### 1. Authentication (✓ CRUD Lengkap)
- **Create**: Sign up dengan email/password
- **Read**: Auto-login dengan session
- **Update**: Update profile
- **Delete**: Sign out
- File: `src/components/Auth/Login.tsx`, `src/contexts/AuthContext.tsx`

### 2. Dashboard (✓ Read)
- Menampilkan statistik dari database
- Real-time data kampanye dan konsultasi
- File: `src/components/Dashboard/Dashboard.tsx`

### 3. Bank Ideation (✓ CRUD Lengkap)
- **Create**: Tambah ide baru
- **Read**: List semua ide user
- **Update**: Toggle save, edit ide
- **Delete**: Hapus ide
- File: `src/components/BankIdeation/BankIdeation.tsx`

### 4. Content Planning (✓ CRUD Lengkap)
- **Create**: Buat jadwal konten baru
- **Read**: Tampilkan kalender & jadwal
- **Update**: Edit jadwal (belum UI)
- **Delete**: Hapus jadwal
- File: `src/components/ContentPlanning/ContentPlanning.tsx`

### 5. Profile (✓ CRUD Lengkap)
- **Read**: Tampilkan profile user
- **Update**: Edit profile (nama, telepon, alamat, bisnis)
- File: `src/components/Profile/Profile.tsx`

### 6. Settings (✓ CRUD Lengkap)
- **Create**: Auto-create saat sign up
- **Read**: Load settings user
- **Update**: Update notifikasi, tema, integrasi
- File: `src/components/Settings/Settings.tsx`

## Fitur yang Perlu Dilengkapi

### 1. Social Media Kit
Perlu implementasi:
- Upload brand assets ke Supabase Storage
- CRUD templates dengan preview
- File: `src/components/SocialMediaKit/SocialMediaKit.tsx`

### 2. Template Editor
Perlu implementasi:
- Save design ke database
- Load template dari database
- File: `src/components/Editor/TemplateEditor.tsx`

### 3. Performance Report
Perlu implementasi:
- CRUD campaigns
- Analytics dashboard
- File: `src/components/PerformanceReport/PerformanceReport.tsx`

### 4. Consultation Expert
Perlu implementasi:
- CRUD bookings
- List experts (already seeded)
- File: `src/components/ConsultationExpert/ConsultationExpert.tsx`

## Cara Melengkapi Fitur yang Tersisa

### Contoh: Social Media Kit - Brand Assets Upload

```typescript
// Di SocialMediaKit.tsx
const handleUploadAsset = async (file: File, assetName: string, assetType: string) => {
  try {
    // 1. Upload file ke Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('brand-assets')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('brand-assets')
      .getPublicUrl(fileName);

    // 3. Save to database
    const { error: dbError } = await supabase
      .from('brand_assets')
      .insert({
        user_id: profile?.id,
        name: assetName,
        type: assetType,
        file_url: publicUrl,
      });

    if (dbError) throw dbError;

    // 4. Refresh data
    await fetchBrandAssets();
    alert('Asset berhasil diupload!');
  } catch (error: any) {
    alert('Error: ' + error.message);
  }
};
```

### Contoh: Performance Report - CRUD Campaigns

```typescript
// Fetch campaigns
const fetchCampaigns = async () => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', profile?.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  setCampaigns(data || []);
};

// Create campaign
const handleCreateCampaign = async (campaignData: any) => {
  const { error } = await supabase.from('campaigns').insert({
    user_id: profile?.id,
    ...campaignData,
  });

  if (error) throw error;
  await fetchCampaigns();
};

// Update campaign
const handleUpdateCampaign = async (id: string, updates: any) => {
  const { error } = await supabase
    .from('campaigns')
    .update(updates)
    .eq('id', id);

  if (error) throw error;
  await fetchCampaigns();
};

// Delete campaign
const handleDeleteCampaign = async (id: string) => {
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  if (error) throw error;
  await fetchCampaigns();
};
```

### Contoh: Consultation Expert - Bookings

```typescript
// Fetch experts
const fetchExperts = async () => {
  const { data, error } = await supabase
    .from('experts')
    .select('*')
    .order('rating', { ascending: false });

  if (error) throw error;
  setExperts(data || []);
};

// Create consultation booking
const handleBookConsultation = async (bookingData: any) => {
  const { error } = await supabase.from('consultations').insert({
    user_id: profile?.id,
    expert_id: bookingData.expertId,
    date: bookingData.date,
    time: bookingData.time,
    type: bookingData.type,
    status: 'confirmed',
  });

  if (error) throw error;
  await fetchConsultations();
};

// Fetch user consultations
const fetchConsultations = async () => {
  const { data, error } = await supabase
    .from('consultations')
    .select('*, experts(*)')
    .eq('user_id', profile?.id)
    .order('date', { ascending: true });

  if (error) throw error;
  setConsultations(data || []);
};

// Cancel consultation
const handleCancelConsultation = async (id: string) => {
  const { error } = await supabase
    .from('consultations')
    .update({ status: 'cancelled' })
    .eq('id', id);

  if (error) throw error;
  await fetchConsultations();
};
```

## Testing

### 1. Test Authentication
```bash
# Buka browser ke http://localhost:5173
# Klik "Belum punya akun? Daftar di sini"
# Isi form: nama, email, password
# Login dengan kredensial yang baru dibuat
```

### 2. Test Bank Ideation
```bash
# Setelah login, navigasi ke "Bank Ideation"
# Klik "Tambah Ide"
# Isi form dan simpan
# Coba fitur search, filter, dan toggle save
# Test delete ide
```

### 3. Test Content Planning
```bash
# Navigasi ke "Content Planning"
# Klik "Buat Jadwal"
# Isi form schedule dan simpan
# Lihat di kalender
# Test delete schedule
```

### 4. Test Profile
```bash
# Navigasi ke "Profil Akun"
# Klik "Edit Profil"
# Ubah data dan simpan
# Cek data terupdate
```

### 5. Test Settings
```bash
# Navigasi ke "Settings"
# Toggle notifikasi
# Ubah tema dan bahasa
# Connect/disconnect integrasi platform
```

## Build & Deploy

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Error: Missing Supabase environment variables
- Pastikan file `.env` sudah dibuat dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY

### Error: relation does not exist
- Jalankan ulang migrasi database di Supabase Dashboard > SQL Editor

### Error: Row Level Security
- Pastikan user sudah login
- Cek policy di Supabase Dashboard > Authentication > Policies

### Data tidak muncul
- Buka Browser Console (F12) dan cek error
- Pastikan user sudah login dan profile tersedia
- Cek apakah ada error dari Supabase

## Next Steps

1. Lengkapi fitur-fitur yang belum sempurna:
   - Social Media Kit (upload assets)
   - Template Editor (save/load design)
   - Performance Report (CRUD campaigns)
   - Consultation Expert (bookings)

2. Tambahkan fitur validasi form yang lebih baik

3. Implementasi error handling yang lebih robust

4. Tambahkan loading states yang lebih baik

5. Implementasi file upload untuk avatars dan brand assets

6. Tambahkan search dan pagination untuk data yang banyak

7. Implementasi real-time updates dengan Supabase Realtime

8. Deploy ke Vercel/Netlify
