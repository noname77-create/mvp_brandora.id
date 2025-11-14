# 📹 Video Walkthrough Script: Supabase Setup & RLS Integration

## Video 1: Membuat Project Supabase (Duration: 3 menit)

### Scene 1: Buka Website Supabase
```
NARASI:
"Halo! Di video ini saya akan menunjukkan cara setup Supabase
dan mengintegrasikan RLS untuk keamanan aplikasi."

VISUAL:
- Buka browser ke https://supabase.com
- Zoom in pada tombol "Start your project"
- Klik tombol tersebut
```

### Scene 2: Sign Up
```
NARASI:
"Pertama, kita perlu membuat akun. Saya akan menggunakan GitHub
untuk memudahkan. Anda bisa gunakan Google atau Email."

VISUAL:
- Click "Continue with GitHub"
- Authorize Supabase
- Tampilkan form organisasi (skip atau buat baru)
```

### Scene 3: Buat Project Baru
```
NARASI:
"Sekarang kita akan membuat project baru untuk aplikasi Brandora.
Saya akan mengisi beberapa field penting."

VISUAL:
- Klik "New Project" atau "Create new project"
- Isi form:
  * Organization: (pilih yang ada)
  * Project name: "Brandora" (type slowly)
  * Database password: "SuPeRsSeCuReP@ssw0rd" (show password)
  * Region: Singapore (click dropdown, pilih Singapore)
- Klik "Create new project"
- Show loading screen
```

### Scene 4: Tunggu Project Siap
```
NARASI:
"Supabase akan membuat project dalam 1-2 menit.
Mari kita tunggu sebentar..."

VISUAL:
- Show loading spinner
- Time lapse (atau pause 30 detik)
- Dashboard Supabase muncul
```

### Scene 5: Dashboard Overview
```
NARASI:
"Bagus! Project sudah ready. Ini adalah dashboard Supabase.
Kita bisa lihat berbagai fitur di sidebar."

VISUAL:
- Zoom out untuk lihat full dashboard
- Highlight sidebar:
  * Table Editor
  * SQL Editor
  * Authentication
  * Storage
  * Edge Functions
- Click "Settings" untuk show API keys
```

---

## Video 2: Copy API Keys & Setup .env (Duration: 2 menit)

### Scene 1: Buka Settings > API
```
NARASI:
"Sekarang kita perlu copy API keys untuk menghubungkan
aplikasi React dengan Supabase."

VISUAL:
- Click "Settings" di sidebar
- Klik "API" dari menu (atau scroll)
- Show API credentials
```

### Scene 2: Copy Project URL
```
NARASI:
"Pertama, kita copy Project URL. Ini adalah alamat server
database kita."

VISUAL:
- Highlight "Project URL" (atau "API URL")
- Show value: https://xxxxx.supabase.co
- Click copy icon atau manual select-copy (Ctrl+C)
- Show "Copied!" notification atau manual confirm
```

### Scene 3: Copy Anon Key
```
NARASI:
"Berikutnya, kita copy anon (anonymous) key. Ini adalah API key
yang aman untuk di-share. JANGAN share service_role key!"

VISUAL:
- Scroll down ke "Anon public"
- Show full key (blur atau partial ok)
- Click copy icon
- Highlight warning: "Anon key is safe to share" dan
  "KEEP service_role SECRET!"
```

### Scene 4: Buka Project Local
```
NARASI:
"Sekarang, mari kita buka project React Brandora di VS Code."

VISUAL:
- Open VS Code
- Atau show terminal: code .
- Show project structure:
  * src/
  * package.json
  * .env (highlight ini)
```

### Scene 5: Edit File .env
```
NARASI:
"Kita akan membuat atau edit file .env di root project.
File ini tidak akan di-commit ke git karena sudah ada di .gitignore."

VISUAL:
- Buka/Create file: .env
- Paste template:
  VITE_SUPABASE_URL=https://xxxxx.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

- Highlight bahwa nilai harus PERSIS dari Supabase
- Save file (Ctrl+S)
```

### Scene 6: Verifikasi .env
```
NARASI:
"Penting: pastikan file .env sudah di-list di .gitignore
sehingga tidak akan ter-commit ke repository."

VISUAL:
- Buka .gitignore
- Show: .env
- Close editor
```

---

## Video 3: Jalankan Migrasi Database (Duration: 5 menit)

### Scene 1: Buka SQL Editor
```
NARASI:
"Sekarang kita akan membuat database schema dan RLS policies.
Kita bisa menggunakan SQL Editor yang ada di Supabase."

VISUAL:
- Kembali ke Supabase dashboard
- Click "SQL Editor" di sidebar
- Show "New Query" button
```

### Scene 2: Buat Query Baru
```
NARASI:
"Kita akan membuat query baru untuk menjalankan migration SQL.
Ini akan membuat semua tabel dan policies sekaligus."

VISUAL:
- Click "+ New Query"
- Show editor kosong
- Atau bisa langsung dari template
```

### Scene 3: Copy Migration SQL
```
NARASI:
"Saya akan copy SQL migration dari file project kita.
File ini sudah berisi semua SQL untuk setup database."

VISUAL:
- Show file: supabase/migrations/20251112034918_create_brandora_schema.sql
- Buka file di text editor
- Show part awal SQL (CREATE TABLE profiles, dll)
- Select All (Ctrl+A)
- Copy (Ctrl+C)
```

### Scene 4: Paste SQL ke Editor
```
NARASI:
"Sekarang kita akan paste SQL ke SQL Editor di Supabase.
Pastikan paste dengan benar tanpa ada yang terputus."

VISUAL:
- Kembali ke Supabase SQL Editor
- Click di text area
- Paste (Ctrl+V)
- Show SQL yang sudah di-paste
- Scroll down untuk show bahwa SQL sangat panjang
```

### Scene 5: Run Migration
```
NARASI:
"Sekarang kita akan menjalankan SQL migration. Klik tombol Run
atau tekan Ctrl+Enter. Ini akan membuat 9 tabel dan setup RLS."

VISUAL:
- Click "Run" button (atau show Ctrl+Enter)
- Show loading spinner
- SQL sedang di-execute
```

### Scene 6: Sukses!
```
NARASI:
"Sempurna! Migration berhasil. Anda bisa lihat pesan 'Success'
dan tidak ada error. Database kita sudah ready dengan RLS!"

VISUAL:
- Show "Success" message atau result notification
- Show execution time (e.g., "Executed in 245ms")
- No error message
```

---

## Video 4: Verifikasi Database & Tabel (Duration: 3 menit)

### Scene 1: Buka Table Editor
```
NARASI:
"Mari kita verifikasi bahwa semua tabel sudah dibuat dengan benar.
Kita akan membuka Table Editor."

VISUAL:
- Click "Table Editor" di sidebar
- Show list of tables
```

### Scene 2: Lihat Daftar Tabel
```
NARASI:
"Ini adalah 9 tabel yang sudah kita buat:
1. profiles - data pengguna
2. ideas - ide konten
3. content_schedules - jadwal posting
4. campaigns - data kampanye
5. consultations - booking konsultasi
6. experts - daftar expert
7. brand_assets - asset brand
8. templates - template desain
9. user_settings - pengaturan user"

VISUAL:
- Show full list di sidebar:
  * profiles
  * brand_assets
  * templates
  * ideas
  * content_schedules
  * campaigns
  * experts
  * consultations
  * user_settings
- Click masing-masing untuk verifikasi struktur
```

### Scene 3: Periksa Kolom Tabel
```
NARASI:
"Setiap tabel memiliki kolom-kolom sesuai dengan kebutuhan aplikasi.
Mari kita lihat contoh dari tabel 'ideas'."

VISUAL:
- Click pada "ideas" table
- Show kolom:
  * id (uuid)
  * user_id (uuid, foreign key)
  * title (text)
  * description (text)
  * category (text)
  * platform (text)
  * tags (text array)
  * saved (boolean)
  * created_at (timestamp)
```

### Scene 4: Lihat RLS Status
```
NARASI:
"Sekarang mari kita lihat bahwa RLS sudah di-enable pada setiap tabel.
Kita bisa lihat di tab 'RLS' untuk setiap tabel."

VISUAL:
- Click pada sebuah tabel
- Lihat tabs: Rows, Schema, RLS
- Click "RLS" tab
- Show toggle: "RLS is on"
- Atau show indicator: "🔒 RLS enabled"
```

### Scene 5: Lihat Policies
```
NARASI:
"Terakhir, mari kita lihat policies yang sudah di-setup.
Policies ini memastikan setiap user hanya bisa akses data mereka sendiri."

VISUAL:
- Masih di tab RLS atau click "Policies"
- Show list of policies untuk tabel "ideas":
  * "Users can read own ideas" - SELECT
  * "Users can insert own ideas" - INSERT
  * "Users can update own ideas" - UPDATE
  * "Users can delete own ideas" - DELETE
- Click satu policy untuk show SQL:
  USING (auth.uid() = user_id)
```

---

## Video 5: Test Aplikasi Lokal (Duration: 4 menit)

### Scene 1: Jalankan Development Server
```
NARASI:
"Sekarang saatnya menjalankan aplikasi. Kita akan start dev server
dan test koneksi ke database."

VISUAL:
- Open terminal
- Show command: npm run dev
- Type: npm run dev (atau show sudah running)
- Show output:
  ✓ ready in 234 ms
  ➜ Local:   http://localhost:5173
```

### Scene 2: Buka Browser
```
NARASI:
"Mari kita buka browser dan akses aplikasi."

VISUAL:
- Open browser
- Navigate to http://localhost:5173
- Show Brandora login page
```

### Scene 3: Sign Up
```
NARASI:
"Pertama kali kita perlu membuat akun. Saya akan click 'Belum punya akun?'."

VISUAL:
- Show login form
- Click "Belum punya akun? Daftar di sini"
- Form berubah ke signup
- Isi form:
  * Nama: "Andi Pratama"
  * Email: "andi@example.com"
  * Password: "password123"
- Klik "Daftar Akun"
```

### Scene 4: Loading & Auto-redirect
```
NARASI:
"Saat kita signup, beberapa hal terjadi di background:
1. User dibuat di Supabase Auth
2. Profile auto-dibuat di table 'profiles'
3. Settings auto-dibuat di table 'user_settings'
4. Aplikasi auto-redirect ke dashboard"

VISUAL:
- Show loading spinner saat signup
- Redirect ke dashboard
- Show dashboard dengan nama user
```

### Scene 5: Akses Dashboard
```
NARASI:
"Bagus! Kita sudah login dan bisa melihat dashboard.
Data ini di-fetch dari database Supabase secara real-time."

VISUAL:
- Show dashboard
- Highlight: "Selamat datang Andi Pratama"
- Show statistik (konten terjadwal, engagement, dll)
- Open browser console (F12) - show tidak ada error
```

### Scene 6: Test Bank Ideation
```
NARASI:
"Sekarang mari kita test fitur CRUD. Kita akan buat ide baru
di Bank Ideation."

VISUAL:
- Click "Bank Ideation" di sidebar
- Click "Tambah Ide"
- Form modal muncul
- Isi form:
  * Judul: "Konten Video Tips Marketing"
  * Deskripsi: "Buat video tips marketing yang menarik"
  * Kategori: "Ide Content"
  * Platform: "Instagram"
  * Tags: "video, tips, marketing"
- Klik "Simpan"
```

### Scene 7: Ide Berhasil Disimpan
```
NARASI:
"Sempurna! Ide berhasil disimpan ke database.
Sekarang mari kita verifikasi di Supabase bahwa data benar-benar masuk."

VISUAL:
- Modal close
- Ide baru muncul di list
- Show alert atau notification: "Berhasil!"
```

---

## Video 6: Verifikasi Data di Supabase (Duration: 3 menit)

### Scene 1: Buka Supabase Table Editor
```
NARASI:
"Sekarang kita akan verifikasi bahwa data benar-benar tersimpan
di database Supabase. Kita buka Table Editor."

VISUAL:
- Buka tab Supabase (atau buka baru)
- Click "Table Editor"
- Click "ideas" table
```

### Scene 2: Lihat Row Baru
```
NARASI:
"Ini dia! Kita bisa melihat ide yang baru saja kita buat.
Data sudah masuk ke database dengan user_id yang sesuai."

VISUAL:
- Show tabel "ideas" dengan data baru
- Highlight:
  * id: [generated UUID]
  * user_id: [user yang login]
  * title: "Konten Video Tips Marketing"
  * platform: "Instagram"
  * created_at: [timestamp terkini]
```

### Scene 3: Cek Profiles Table
```
NARASI:
"Mari kita juga lihat bahwa profile user sudah dibuat saat signup."

VISUAL:
- Click pada "profiles" table
- Show data:
  * id: [sama dengan user auth]
  * name: "Andi Pratama"
  * email: "andi@example.com"
  * created_at: [recent timestamp]
```

### Scene 4: Test RLS Security
```
NARASI:
"Sekarang mari kita test RLS. Kita akan membuat user kedua
dan memastikan user kedua tidak bisa melihat data user pertama."

VISUAL:
- Close browser tab atau tab baru
- Logout dari aplikasi (atau mode incognito)
- Sign up dengan user baru:
  * Nama: "Budi Santoso"
  * Email: "budi@example.com"
  * Password: "password456"
```

### Scene 5: User 2 Tidak Melihat Data User 1
```
NARASI:
"Lihat! User Budi tidak bisa melihat ide yang dibuat Andi.
Ini adalah RLS bekerja - setiap user hanya bisa melihat data mereka sendiri."

VISUAL:
- Login dengan user "budi@example.com"
- Buka Bank Ideation
- List kosong (tidak ada ide dari user Andi)
- Show browser console - no permission error
```

### Scene 6: Buat Ide User 2
```
NARASI:
"Sekarang user Budi membuat ide sendiri."

VISUAL:
- Click "Tambah Ide"
- Isi form dengan ide baru:
  * Judul: "Konten Carousel Tips Makeup"
- Save
```

### Scene 7: Verifikasi Separation
```
NARASI:
"Di Supabase table, kita sekarang punya 2 baris ide
dengan 2 user_id yang berbeda. RLS memastikan setiap user
hanya lihat yang punya."

VISUAL:
- Buka Supabase > ideas table
- Show 2 baris:
  1. user_id: [andi-id], title: "Konten Video Tips Marketing"
  2. user_id: [budi-id], title: "Konten Carousel Tips Makeup"
```

---

## Video 7: Test CRUD Lengkap (Duration: 4 menit)

### Scene 1: CREATE sudah ditest
```
NARASI:
"CREATE ✓ - Kita sudah buat ide. Sekarang mari kita test
READ, UPDATE, dan DELETE."
```

### Scene 2: READ - Filter & Search
```
NARASI:
"READ - Kita bisa membaca semua ide yang kita buat.
Kita juga bisa filter dan search."

VISUAL:
- Di Bank Ideation
- Show search box: type "Video"
- Hasil filter hanya ide yang matches
- Show filter dropdown: select kategori "Ide Content"
- Hasil update sesuai filter
```

### Scene 3: UPDATE - Edit Profile
```
NARASI:
"UPDATE - Mari kita test update dengan mengedit profile."

VISUAL:
- Click "Profil Akun" di sidebar
- Click "Edit Profil"
- Change nama: "Andi Pratama P."
- Change nomor: "+62812345678"
- Change bisnis: "PT Maju Jaya Marketing"
- Click "Simpan Perubahan"
```

### Scene 4: Verifikasi UPDATE
```
NARASI:
"Update berhasil. Mari kita verifikasi di Supabase."

VISUAL:
- Buka Supabase > profiles table
- Show user Andi dengan data updated:
  * name: "Andi Pratama P."
  * phone: "+62812345678"
  * business_name: "PT Maju Jaya Marketing"
  * updated_at: [timestamp terkini]
```

### Scene 5: DELETE - Hapus Idea
```
NARASI:
"DELETE - Terakhir mari kita test delete.
Kita akan menghapus satu ide."

VISUAL:
- Login dengan user Budi
- Bank Ideation
- Click delete icon pada ide "Konten Carousel Tips Makeup"
- Show confirm dialog: "Hapus ide ini?"
- Click "Hapus"
```

### Scene 6: Verifikasi DELETE
```
NARASI:
"Ide berhasil dihapus. Kita bisa verifikasi di Supabase."

VISUAL:
- Buka Supabase > ideas table
- Show hanya ide dari Andi yang ada
- Ide dari Budi sudah hilang
- Tabel sekarang hanya 1 baris
```

---

## Video 8: Kesimpulan & Next Steps (Duration: 2 menit)

### Scene 1: Recap
```
NARASI:
"Kita sudah berhasil:
1. ✓ Setup Supabase project
2. ✓ Copy API keys ke .env
3. ✓ Jalankan migrasi database
4. ✓ Setup 9 tabel dengan RLS
5. ✓ Test aplikasi dengan CRUD
6. ✓ Verifikasi data di Supabase
7. ✓ Test RLS security"

VISUAL:
- Montage of all scenes
- Show screenshots dari setiap tahap
```

### Scene 2: Best Practices
```
NARASI:
"Beberapa best practices untuk menggunakan Supabase:

1. Jangan share service_role key
2. Selalu enable RLS untuk table yang berisi user data
3. Test dengan multiple user untuk verifikasi RLS
4. Backup data secara regular
5. Monitor penggunaan di Settings > Usage"

VISUAL:
- Show each point dengan screenshot
```

### Scene 3: Next Steps
```
NARASI:
"Sekarang aplikasi sudah ready untuk development lebih lanjut.
Next steps yang bisa dilakukan:

1. Lengkapi fitur Social Media Kit dengan file upload
2. Implementasi Template Editor
3. Lengkapi Performance Report
4. Setup monitoring dan logging
5. Deploy ke production"

VISUAL:
- Show file upload example
- Show template editor mockup
- Show deployment options (Vercel, Netlify)
```

### Scene 4: Resources
```
NARASI:
"Dokumentasi lengkap sudah tersedia di project.
Anda bisa refer ke:
- README.md - overview
- SUPABASE_SETUP_GUIDE.md - detail guide
- SUPABASE_QUICK_START.md - quick reference
- IMPLEMENTATION_GUIDE.md - lengkapi fitur"

VISUAL:
- Show file structure
- Highlight documentation files
- Show open documentation in editor
```

### Scene 5: Terima Kasih
```
NARASI:
"Terima kasih sudah menonton! Semoga tutorial ini membantu.
Jika ada pertanyaan, silakan hubungi team development.
Selamat menggunakan Brandora!"

VISUAL:
- Show Brandora logo
- Show all team credits
- End screen dengan social media / contact info
```

---

## 📝 Production Checklist untuk Video

### Before Recording:
- [ ] Bersihkan desktop dari file tidak penting
- [ ] Close semua aplikasi tidak penting
- [ ] Set font size besar (zoom 150-200% agar terlihat)
- [ ] Disable notifications
- [ ] Siapkan test account (jangan gunakan real data)
- [ ] Test all links dan credentials
- [ ] Prepare script tertulis

### During Recording:
- [ ] Bicara lambat dan jelas
- [ ] Zoom in pada area penting
- [ ] Pause untuk highlight key points
- [ ] Show cursor/keyboard shortcuts
- [ ] Double-check console untuk errors
- [ ] Tampilkan success messages

### After Recording:
- [ ] Add captions/subtitles (Indonesia)
- [ ] Add background music (low volume)
- [ ] Add text overlays untuk key steps
- [ ] Cut unwanted pauses/waits
- [ ] Add chapter markers
- [ ] Generate thumbnail
- [ ] Write description dengan links

---

## 🎬 Recording Settings

```
Resolution: 1920x1080 (1080p)
Frame Rate: 30fps
Codec: H.264
Audio: 48kHz, 16-bit stereo
Total Duration: ~22 menit
```

---

**Selamat! Script video walkthrough siap digunakan! 🎥**
