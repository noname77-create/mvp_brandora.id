# 🎯 START HERE - Panduan Pertama Kali

Selamat datang! Aplikasi Brandora sudah siap diintegrasikan dengan database Supabase.

Dokumen ini akan memandu Anda dalam **3 langkah sederhana**.

---

## 🚀 3 Langkah Setup Database

### Langkah 1: Buat Supabase Project (3 menit)

1. **Buka Website**: https://supabase.com
2. **Sign Up** dengan GitHub/Google/Email
3. **Klik "New Project"**
4. **Isi Form**:
   - Project Name: `Brandora`
   - Database Password: `SuP3r$3cur3P@ss!`
   - Region: `Singapore` (atau terdekat ke Anda)
5. **Klik "Create new project"**
6. **Tunggu 1-2 menit** hingga project ready

✅ **Project Supabase sudah siap!**

---

### Langkah 2: Copy API Keys ke .env (2 menit)

1. **Di Supabase Dashboard**, klik **Settings** (⚙️)
2. **Klik API** dari sidebar
3. **Copy 2 hal ini**:
   - **Project URL** → di atas, format: `https://xxxxx.supabase.co`
   - **Anon public** → API key (panjang)

4. **Di Project Anda**, buka/buat file `.env` di root:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

5. **Save file** (Ctrl+S)

✅ **Credentials sudah di-set!**

---

### Langkah 3: Setup Database dengan Migrasi (2 menit)

1. **Di Supabase Dashboard**, klik **SQL Editor**
2. **Klik "+ New Query"**
3. **Buka file** di project: `supabase/migrations/20251112034918_create_brandora_schema.sql`
4. **Copy SEMUA isi file** (Ctrl+A, Ctrl+C)
5. **Paste ke SQL Editor** (Ctrl+V)
6. **Klik "Run"** atau tekan Ctrl+Enter
7. **Tunggu sampai "Success"** ✓

✅ **Database sudah dibuat! 9 tabel + RLS setup!**

---

## ⚡ Jalankan Aplikasi

```bash
# Di terminal project:
npm install
npm run dev

# Buka browser ke:
# http://localhost:5173
```

✅ **Aplikasi berjalan!**

---

## 🧪 Test Aplikasi

### Test 1: Sign Up
```
1. Klik "Belum punya akun? Daftar di sini"
2. Isi form:
   - Nama: "Andi Pratama"
   - Email: "andi@example.com"
   - Password: "password123"
3. Klik "Daftar Akun"
```

**Hasil**: User sudah di database! ✓

### Test 2: Login
```
1. Masukkan email & password
2. Klik "Masuk ke Dashboard"
```

**Hasil**: Login berhasil, welcome message muncul! ✓

### Test 3: CRUD - Buat Ide
```
1. Klik "Bank Ideation" di sidebar
2. Klik "Tambah Ide"
3. Isi form:
   - Judul: "Video Tips Marketing"
   - Platform: "Instagram"
4. Klik "Simpan"
```

**Hasil**: Ide muncul di list! ✓

### Test 4: Verifikasi di Supabase
```
1. Buka Supabase > Table Editor
2. Klik "ideas" table
3. Lihat data yang baru Anda buat!
```

**Hasil**: Data benar-benar tersimpan di database! ✓

### Test 5: Security (RLS)
```
1. Buka aplikasi di tab browser baru (atau incognito)
2. Sign up dengan user berbeda:
   - Nama: "Budi Santoso"
   - Email: "budi@example.com"
3. Login dengan akun Budi
4. Buka "Bank Ideation"
5. Pastikan ide Andi TIDAK terlihat
```

**Hasil**: RLS bekerja! Data terpisah per user! ✓

---

## 📚 Dokumentasi

Baca dokumentasi sesuai kebutuhan:

| File | Untuk | Durasi |
|------|-------|--------|
| **SUPABASE_QUICK_START.md** | Quick reference | 5 min |
| **SUPABASE_SETUP_GUIDE.md** | Detail teknis | 30 min |
| **TROUBLESHOOTING.md** | Saat ada error | Searching |
| **VIDEO_WALKTHROUGH.md** | Visual learner | 22 min script |
| **IMPLEMENTATION_GUIDE.md** | Lengkapi fitur | Project time |
| **DOCS_INDEX.md** | Index lengkap | Navigation |

---

## ✅ Checklist Sukses

- [ ] Supabase project dibuat
- [ ] API keys di .env
- [ ] Migrasi SQL dijalankan
- [ ] npm run dev berjalan
- [ ] Sign up berhasil
- [ ] Ide bisa disimpan
- [ ] Data ada di Supabase
- [ ] RLS security berfungsi
- [ ] Tidak ada error di console

**Semua ✅ ? Selamat! Setup berhasil!** 🎉

---

## ⚠️ Jika Ada Error

### Error 1: "VITE_SUPABASE_URL is undefined"
```
→ Buat file .env dengan credentials yang benar
→ Restart: npm run dev
```

### Error 2: "relations does not exist"
```
→ Migrasi SQL belum dijalankan
→ Buka SQL Editor > Run migration
```

### Error 3: "permission denied"
```
→ User belum login / RLS policy
→ Login dengan benar dan coba lagi
```

### Error lainnya?
→ Baca `TROUBLESHOOTING.md`

---

## 🎯 Fitur Apa Saja?

Aplikasi sudah punya sistem CRUD lengkap untuk:

- ✅ **Dashboard** - Real-time statistics
- ✅ **Bank Ideation** - Create, Read, Update, Delete ideas
- ✅ **Content Planning** - Manage posting schedule + kalender
- ✅ **Consultation Expert** - Book expert sessions
- ✅ **Profile** - Edit user profile
- ✅ **Settings** - Manage preferences & integrations
- ✅ **Authentication** - Sign up, login, logout

Semua data tersimpan di Supabase dengan **RLS security**!

---

## 🔐 Keamanan (RLS)

**Apa itu RLS?**
Row Level Security = User A hanya bisa lihat data A, bukan data B.

**Sudah di-setup?**
✅ YA! Migrasi SQL sudah setup semua policies.

**Gimana cara kerjanya?**
```
Database check: "Siapa yang akses?"
Jika: User A akses data A → ✓ Allowed
Jika: User A akses data B → ✗ Blocked!
```

---

## 🚀 Next Steps

Setelah setup sukses:

1. **Explore Aplikasi** - Test semua fitur
2. **Baca Dokumentasi** - IMPLEMENTATION_GUIDE.md
3. **Lengkapi Fitur** - Social Media Kit, Template Editor, dll
4. **Deploy** - Vercel / Netlify
5. **Monitor** - Supabase dashboard

---

## 📞 Butuh Bantuan?

1. **Check Documentation** - Lihat file .md
2. **Check Troubleshooting** - TROUBLESHOOTING.md
3. **Check Console** - F12 untuk lihat error
4. **Google** - Cari error message
5. **Contact Team** - Hubungi developer

---

## 💡 Pro Tips

### Development
- Selalu check browser console (F12)
- Verifikasi data di Supabase Table Editor
- Test dengan 2 akun berbeda

### Security
- Jangan share service_role key
- RLS melindungi data user
- Passwords sudah hashed

### Performance
- Data cache di browser
- Real-time update ready
- Build size: 400KB

---

## 🎉 Selamat!

Anda sekarang punya:

✅ Full-stack aplikasi React + Supabase
✅ CRUD operations lengkap
✅ Row Level Security
✅ Authentication system
✅ 9 tabel database
✅ Responsive design
✅ Production ready

---

## 📋 Quick Reference

```bash
# Setup
npm install              # Install dependencies
npm run dev              # Start development

# Production
npm run build            # Build untuk production
npm run preview          # Preview production build

# Database
# Buka Supabase > SQL Editor > Run migration
```

---

## 🎬 Visual Walkthrough

Mau belajar dari video?
→ Baca `VIDEO_WALKTHROUGH.md`
→ Script lengkap untuk 22 menit video

---

**🚀 Mulai sekarang!**

1. Lakukan 3 langkah di atas
2. Jalankan npm run dev
3. Test aplikasi
4. Nikmati! 🎉

---

*Butuh bantuan? Baca dokumentasi atau cek TROUBLESHOOTING.md*

**Semoga sukses! 💪**
