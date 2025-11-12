# Brandora Digital Marketing Hub

Platform lengkap untuk mengelola kampanye digital marketing dengan fitur Bank Ideation, Content Planning, Performance Report, dan Consultation Expert.

## Fitur Lengkap dengan CRUD

### 1. Authentication System
- Sign up dengan email/password
- Login/Logout
- Auto-create profile dan settings saat sign up
- Session management dengan Supabase Auth

### 2. Dashboard
- Real-time statistik dari database
- Menampilkan konten terjadwal, engagement, reach, dan konsultasi aktif
- List campaign terbaru
- Notifikasi jadwal konsultasi

### 3. Bank Ideation (CRUD Lengkap)
- **Create**: Tambah ide konten baru dengan kategori, platform, dan tags
- **Read**: List semua ide user dengan filter dan search
- **Update**: Toggle save/unsave ide
- **Delete**: Hapus ide
- Filter berdasarkan kategori dan sektor

### 4. Content Planning (CRUD Lengkap)
- **Create**: Buat jadwal posting konten
- **Read**: Kalender view dengan jadwal per tanggal
- **Update**: (UI belum lengkap)
- **Delete**: Hapus jadwal konten
- Statistik bulan ini dan distribusi platform

### 5. Consultation Expert (CRUD Lengkap)
- **Create**: Book konsultasi dengan expert
- **Read**: List experts dan jadwal konsultasi user
- **Delete**: Batalkan booking
- Filter experts berdasarkan rating dan availability

### 6. Profile (CRUD Lengkap)
- **Read**: Tampilkan profil user
- **Update**: Edit nama, telepon, nama bisnis, alamat
- Statistik bisnis dan subscription info

### 7. Settings (CRUD Lengkap)
- **Create**: Auto-create saat sign up
- **Read**: Load settings user
- **Update**: Update notifikasi, tema, bahasa, integrasi platform
- Toggle untuk semua pengaturan

## Setup Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase

#### Buat Project Supabase
1. Buka https://supabase.com
2. Buat project baru
3. Copy URL dan anon key dari Settings > API

#### Setup Environment Variables
Buat file `.env` di root project:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Jalankan Migrasi Database
Migrasi sudah otomatis dijalankan, tapi jika perlu manual:

1. Buka Supabase Dashboard > SQL Editor
2. Copy isi dari migration file yang sudah dibuat
3. Jalankan SQL

Database akan otomatis membuat:
- Tables: profiles, brand_assets, templates, ideas, content_schedules, campaigns, experts, consultations, user_settings
- Row Level Security (RLS) policies
- Sample data untuk experts

### 3. Run Development Server
```bash
npm run dev
```

Buka browser ke http://localhost:5173

### 4. Build untuk Production
```bash
npm run build
```

## Cara Menggunakan

### 1. Sign Up
1. Buka aplikasi
2. Klik "Belum punya akun? Daftar di sini"
3. Isi nama lengkap, email, dan password
4. Sistem akan otomatis membuat:
   - Profile di table `profiles`
   - Settings di table `user_settings`

### 2. Login
1. Masukkan email dan password
2. Sistem akan redirect ke dashboard

### 3. Bank Ideation
1. Klik "Bank Ideation" di sidebar
2. Klik "Tambah Ide" untuk membuat ide baru
3. Isi form (judul, deskripsi, kategori, platform, tags)
4. Gunakan filter dan search untuk mencari ide
5. Toggle bookmark untuk save ide
6. Delete ide yang tidak diperlukan

### 4. Content Planning
1. Klik "Content Planning" di sidebar
2. Klik "Buat Jadwal" untuk membuat jadwal baru
3. Pilih tanggal, platform, jenis konten, dan waktu
4. Lihat kalender view dengan semua jadwal
5. Delete jadwal jika perlu

### 5. Consultation Expert
1. Klik "Consultation Expert" di sidebar
2. Pilih expert yang tersedia
3. Klik "Book Konsultasi"
4. Pilih tanggal, waktu, dan jenis konsultasi
5. Lihat daftar booking di atas
6. Batalkan booking jika perlu

### 6. Profile
1. Klik "Profil Akun" di sidebar
2. Klik "Edit Profil"
3. Update data (nama, telepon, bisnis, alamat)
4. Simpan perubahan

### 7. Settings
1. Klik "Settings" di sidebar
2. Toggle notifikasi sesuai preferensi
3. Pilih tema (light/dark/system)
4. Pilih bahasa (Indonesia/English)
5. Connect/disconnect integrasi platform

## Struktur Database

### Tables
- **profiles**: Data profil user
- **brand_assets**: Asset brand (logo, guideline, dll)
- **templates**: Template desain
- **ideas**: Ide konten
- **content_schedules**: Jadwal posting konten
- **campaigns**: Kampanye marketing
- **experts**: Data expert untuk konsultasi
- **consultations**: Booking konsultasi
- **user_settings**: Pengaturan user

### Security
- Semua tabel menggunakan Row Level Security (RLS)
- User hanya bisa akses data mereka sendiri
- Table experts read-only untuk authenticated users

## Teknologi

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Routing**: React Router

## Fitur yang Belum Lengkap

### 1. Social Media Kit
- Upload brand assets ke Supabase Storage
- CRUD templates
- Preview template

### 2. Template Editor
- Save/load design dari database
- Export design

### 3. Performance Report
- CRUD campaigns
- Analytics chart dari data real
- Export PDF/CSV

## Next Steps

1. Lengkapi fitur Social Media Kit dengan file upload
2. Implementasi Template Editor yang terhubung ke database
3. Lengkapi Performance Report dengan CRUD campaigns
4. Tambah validasi form yang lebih baik
5. Implementasi error handling yang robust
6. Tambah loading states
7. Implementasi file upload untuk avatar dan brand assets
8. Tambah search dan pagination
9. Implementasi real-time updates dengan Supabase Realtime
10. Deploy ke production (Vercel/Netlify)

## Troubleshooting

### Error: Missing Supabase environment variables
- Pastikan file `.env` sudah dibuat dengan benar
- Restart development server setelah membuat `.env`

### Error: relation does not exist
- Pastikan migrasi database sudah dijalankan
- Cek di Supabase Dashboard > Database > Tables

### Error: Row Level Security
- Pastikan user sudah login
- Cek policies di Supabase Dashboard > Authentication > Policies

### Data tidak muncul
- Buka Browser Console (F12) untuk lihat error
- Pastikan user sudah login
- Cek apakah ada error dari Supabase

## Support

Untuk pertanyaan dan bantuan, silakan buka issue di repository atau hubungi tim developer.

## License

MIT
