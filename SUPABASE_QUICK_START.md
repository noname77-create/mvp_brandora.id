# Quick Start: Setup Supabase dalam 5 Menit

## 🚀 Langkah Cepat Setup

### 1️⃣ Buat Project Supabase (1 menit)

```
1. Buka https://supabase.com
2. Klik "Start your project"
3. Sign up dengan GitHub/Google/Email
4. Klik "New Project"
5. Isi form:
   - Project Name: Brandora
   - Database Password: (buat password kuat)
   - Region: Singapore (atau dekat dengan Anda)
6. Tunggu 1-2 menit hingga selesai
```

**Hasil**: Project URL dan API keys siap!

---

### 2️⃣ Copy API Keys (1 menit)

```
1. Buka Settings > API (di sidebar Supabase)
2. Copy 2 hal ini:

   URL: https://xxxxx.supabase.co
   ANON KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

3. Pergi ke project Anda (folder local)
4. Buat/Edit file: .env
5. Paste ini:

   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Hasil**: Aplikasi React bisa terhubung ke Supabase!

---

### 3️⃣ Setup Database & RLS (2 menit)

#### Option A: Automatic (Recommended)

Jika Anda punya Supabase CLI:
```bash
supabase migration up
```

#### Option B: Manual (Paling Aman)

1. **Buka SQL Editor**
   - Di Supabase dashboard, klik "SQL Editor"
   - Klik "+ New Query"

2. **Copy Migrasi SQL**
   - Buka file: `supabase/migrations/20251112034918_create_brandora_schema.sql`
   - Copy SELURUH isi file

3. **Paste & Run**
   - Paste ke SQL Editor
   - Tekan Ctrl+Enter atau klik "Run"
   - Tunggu "Success" muncul

4. **Verifikasi**
   - Klik "Table Editor" di sidebar
   - Lihat 9 tabel: profiles, ideas, content_schedules, dll

**Hasil**: Database sudah ready dengan RLS!

---

### 4️⃣ Jalankan Aplikasi (0.5 menit)

```bash
# Di terminal project Anda:
npm install
npm run dev

# Buka browser:
http://localhost:5173
```

**Hasil**: Aplikasi siap digunakan!

---

### 5️⃣ Test Semuanya (0.5 menit)

```
1. Sign up akun baru
2. Login
3. Buka "Bank Ideation"
4. Klik "Tambah Ide"
5. Isi form & simpan
6. Buka Supabase > Table Editor > ideas
7. Lihat data Anda ada di database!
```

**Hasil**: Sistem CRUD berjalan!

---

## ✅ Checklist

- [ ] Supabase project dibuat
- [ ] API keys di-copy ke .env
- [ ] SQL migrasi sudah dijalankan
- [ ] Tabel muncul di Table Editor
- [ ] npm run dev berhasil
- [ ] Sign up & login berhasil
- [ ] Data tersimpan di database
- [ ] Siap pakai!

---

## 🐛 Jika Ada Error

### Error: "relations does not exist"
```
→ SQL migrasi belum dijalankan
→ Buka SQL Editor, jalankan migrasi lagi
```

### Error: "VITE_SUPABASE_URL is undefined"
```
→ File .env belum dibuat atau isinya salah
→ Buat file .env di root project (bukan di src/)
→ Copy benar API keys dari Settings > API
→ Restart npm run dev
```

### Error: "permission denied"
```
→ User belum login
→ Data milik user lain (RLS bekerja)
→ Buat akun baru dan test
```

### Data tidak muncul di aplikasi
```
→ Buka browser console (F12)
→ Lihat error message
→ Copy error ke ChatGPT atau tanyakan
```

---

## 🎯 Struktur Database (9 Tabel)

```
profiles              ← User account data
  ↓
├─ ideas              ← Ide konten
├─ content_schedules  ← Jadwal posting
├─ campaigns          ← Campaign data
├─ consultations      ← Booking expert (relates to experts)
├─ brand_assets       ← Upload file
├─ templates          ← Design template
├─ user_settings      ← Pengaturan user
└─ experts            ← List expert (public)
```

---

## 🔒 RLS Explained

**RLS (Row Level Security)** = Keamanan otomatis

```
Tanpa RLS:
- User A bisa baca data User B  ❌ BAHAYA!
- User A bisa hapus data User B ❌ BAHAYA!

Dengan RLS:
- User A hanya baca data A     ✅ AMAN!
- User A tidak bisa lihat B    ✅ AMAN!
```

RLS sudah auto-setup di migrasi. Anda tinggal test!

---

## 📱 Testing dengan Beberapa User

### Test Scenario 1: Data Terpisah
```
1. Login dengan user@gmail.com
2. Buat ide "Ide User 1"
3. Logout
4. Sign up dengan user2@gmail.com
5. Lihat bahwa "Ide User 1" TIDAK ada
6. Buat ide "Ide User 2"
7. Login kembali dengan user@gmail.com
8. Lihat bahwa "Ide User 2" TIDAK ada
✅ RLS bekerja!
```

### Test Scenario 2: CRUD Semua Fitur
```
1. Login
2. CREATE: Tambah ide di Bank Ideation
3. READ: Lihat ide di tabel
4. UPDATE: Edit profil di Profile page
5. DELETE: Hapus ide
6. Cek di Supabase Table Editor setiap perubahan
✅ CRUD bekerja!
```

---

## 📚 File Dokumentasi Lengkap

| File | Gunakan Untuk |
|------|---------------|
| `README.md` | Overview aplikasi |
| `SUPABASE_SETUP_GUIDE.md` | Panduan detail setup |
| `SUPABASE_QUICK_START.md` | Ini! Quick reference |
| `IMPLEMENTATION_GUIDE.md` | Lengkapi fitur |
| `.env.example` | Template .env |

---

## 🚀 Next Steps

Setelah berhasil:

1. **Add File Upload** (Optional)
   - Upload avatar di Profile
   - Upload brand assets
   - Upload template preview

2. **Add More Features** (Optional)
   - Social Media Kit dengan CRUD
   - Template Editor
   - Performance Report

3. **Deploy ke Production**
   - Vercel: https://vercel.com
   - Netlify: https://netlify.com
   - Railway: https://railway.app

4. **Monitor & Scale**
   - Supabase > Settings > Usage
   - Add database backups
   - Optimize queries

---

## 💬 Butuh Bantuan?

1. Baca `SUPABASE_SETUP_GUIDE.md` untuk detail
2. Buka browser console (F12) lihat error
3. Cek Supabase dashboard error log
4. Hubungi tim development

---

**Selamat! Anda siap setup Supabase! 🎉**
