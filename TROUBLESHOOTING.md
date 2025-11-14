# Troubleshooting Guide - Database & RLS Issues

## 🔴 Error: "relations does not exist"

### Gejala
```
Error: relation "ideas" does not exist
Error: relation "profiles" does not exist
Error: relation "content_schedules" does not exist
```

### Penyebab
- Migrasi SQL belum dijalankan
- Migrasi SQL gagal dijalankan
- Database sudah dihapus
- Nama tabel typo

### Solusi

**Step 1: Cek Status Tabel**
1. Buka Supabase dashboard
2. Click "Table Editor" di sidebar
3. Cek apakah tabel ada di list

**Step 2: Jika Tabel Tidak Ada**
1. Buka "SQL Editor"
2. Click "+ New Query"
3. Copy file: `supabase/migrations/20251112034918_create_brandora_schema.sql`
4. Paste ke SQL Editor
5. Click "Run" atau tekan Ctrl+Enter
6. Tunggu hingga sukses

**Step 3: Jika Masih Error**
```sql
-- Run ini untuk lihat error detail
SELECT * FROM information_schema.tables
WHERE table_schema = 'public';

-- Jika table tidak ada, CREATE secara manual
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);
```

**Step 4: Verify**
1. Refresh browser
2. Restart `npm run dev`
3. Coba sign up ulang

---

## 🔴 Error: "permission denied for schema public"

### Gejala
```
Error: permission denied for schema public
Error: new row violates row-level security policy
Error: permission denied for table ideas
```

### Penyebab
- User belum authenticated/login
- RLS policy tidak benar
- Role user tidak sesuai
- Token expired

### Solusi

**Step 1: Verifikasi User Login**
1. Buka browser console (F12)
2. Lihat Local Storage > supabase.auth.token
3. Pastikan token ada
4. Pastikan token tidak expired

```javascript
// Di console, cek auth state
const { data } = await supabase.auth.getSession();
console.log(data.session); // Harus ada user data
```

**Step 2: Cek RLS Policy**
1. Buka Supabase > Authentication > Policies
2. Select table (misal "ideas")
3. Lihat apakah ada SELECT/INSERT/UPDATE/DELETE policies
4. Pastikan USING clause ada: `auth.uid() = user_id`

**Step 3: Jika Policy Hilang, Create Ulang**
```sql
-- Pastikan RLS enabled
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

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

**Step 4: Test Ulang**
1. Logout dari aplikasi
2. Close browser completely
3. Open browser lagi
4. Login kembali
5. Coba CRUD operation

---

## 🔴 Error: "VITE_SUPABASE_URL is undefined"

### Gejala
```
Error: Missing Supabase environment variables
TypeError: Cannot read property 'split' of undefined
Supabase URL cannot be undefined
```

### Penyebab
- File `.env` belum dibuat
- File `.env` isinya salah
- npm dev belum di-restart setelah membuat .env

### Solusi

**Step 1: Cek File .env Exists**
```bash
# Di terminal, jalankan:
ls -la .env

# Jika tidak ada output, file belum ada
touch .env
```

**Step 2: Edit File .env dengan Benar**
```env
# ✓ BENAR - tanpa spasi
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ✗ SALAH - spasi sebelum value
VITE_SUPABASE_URL = https://xxxxx.supabase.co

# ✗ SALAH - value tidak di-wrap dengan quotes
VITE_SUPABASE_ANON_KEY=eyJhbGci....(incomplete)

# ✗ SALAH - hanya partial key
VITE_SUPABASE_ANON_KEY=eyJhbGci
```

**Step 3: Copy API Keys dari Supabase dengan Benar**
1. Buka Supabase dashboard
2. Click "Settings" > "API"
3. Copy PENUH dari "Project URL"
   - Harus include: https://
   - Harus include: domain lengkap
   - Contoh: https://xyzabc123.supabase.co
4. Copy PENUH dari "Anon public"
   - Harus panjang (~200+ karakter)
   - Jangan copy "service_role secret"

**Step 4: Restart npm dev**
```bash
# Stop server (Ctrl+C)
# Lalu restart:
npm run dev

# Pastikan output menunjukkan:
# ✓ ready in XXX ms
# ➜ Local:   http://localhost:5173
```

**Step 5: Verifikasi di Aplikasi**
```javascript
// Di console aplikasi, jalankan:
console.log(import.meta.env.VITE_SUPABASE_URL)
// Harus return URL, bukan "undefined"
```

---

## 🔴 Error: "Unexpected token" di .env

### Gejala
```
JSON.parse error: Unexpected token
Syntax error in .env file
```

### Penyebab
- Ada special characters yang tidak ter-escape
- Format JSON yang salah
- Ada komentar dengan format yang salah

### Solusi

**Pastikan format .env BENAR:**
```env
# ✓ BENAR - simple key=value
VITE_SUPABASE_URL=https://xyzabc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ✓ BENAR - jika ada spasi di value, bisa di-quote
VITE_SUPABASE_URL="https://xyzabc.supabase.co"

# ✗ SALAH - special characters tidak ter-escape
VITE_KEY=abc@def#ghi$jkl

# ✗ SALAH - komentar dengan tanda #
VITE_KEY=value # ini adalah comment  <- JANGAN!

# ✓ BENAR - komentar di awal baris
# Ini adalah komentar
VITE_KEY=value
```

---

## 🔴 Error: User 1 bisa melihat data User 2

### Gejala
```
User A login, tapi bisa lihat data User B
User A bisa delete idea dari User B
Tidak ada security - siapa pun bisa akses semua data
```

### Penyebab
- RLS belum di-enable pada table
- RLS policy salah / tidak ada
- Policy menggunakan USING (true) - MEMBUKA SEMUA!
- Policy tidak check auth.uid()

### Solusi

**Step 1: Verifikasi RLS Status**
1. Buka Supabase > Table Editor
2. Select tabel (misal "ideas")
3. Click tab "RLS"
4. Pastikan toggle RLS dalam status ON (tidak disabled)

```sql
-- Di SQL Editor, cek RLS status:
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('ideas', 'profiles', 'content_schedules', 'consultations', 'campaigns', 'user_settings', 'brand_assets', 'templates');

-- Semua harus return TRUE di kolom rowsecurity
```

**Step 2: Audit Policies**
```sql
-- Lihat semua policies
SELECT * FROM pg_policies
WHERE tablename = 'ideas';

-- Cari yang buggy:
-- - Jika USING (true) - DANGER!
-- - Jika tidak ada auth.uid() check - DANGER!
-- - Jika WHERE user_id = 'hardcoded-value' - DANGER!
```

**Step 3: Hapus Policies yang Salah**
```sql
-- Drop policies yang salah
DROP POLICY IF EXISTS "bad_policy_name" ON ideas;

-- Verify sudah hilang
SELECT * FROM pg_policies WHERE tablename = 'ideas';
```

**Step 4: Create Policies yang Benar**
```sql
-- Contoh policy yang BENAR:

-- SELECT - only own data
CREATE POLICY "Users can read own ideas"
  ON ideas FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);  -- ✓ Check user ownership

-- INSERT - can only insert for self
CREATE POLICY "Users can insert own ideas"
  ON ideas FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);  -- ✓ User_id harus auth.uid()

-- UPDATE - can only update own
CREATE POLICY "Users can update own ideas"
  ON ideas FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)  -- ✓ Only own data
  WITH CHECK (auth.uid() = user_id);  -- ✓ Cannot change ownership

-- DELETE - can only delete own
CREATE POLICY "Users can delete own ideas"
  ON ideas FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);  -- ✓ Only own data
```

**Step 5: Test dengan Multi-User**
1. Login sebagai User A
2. Buat idea "Idea dari User A"
3. Logout
4. Sign up User B
5. Buka Bank Ideation
6. Pastikan "Idea dari User A" TIDAK terlihat
7. ✓ RLS bekerja!

---

## 🔴 Error: Aplikasi Hang / Loading Terus

### Gejala
```
Aplikasi stuck di loading screen
Button tidak respond
API calls tidak complete
Aplikasi freeze
```

### Penyebab
- Query database timeout
- Infinite loop di effect hook
- N+1 query problem
- Network/API error

### Solusi

**Step 1: Buka Browser Console**
1. Tekan F12
2. Buka tab "Console"
3. Lihat error messages

**Step 2: Cek Network Activity**
1. Tekan F12
2. Buka tab "Network"
3. Refresh halaman
4. Lihat apakah ada request yang pending/failed
5. Check response status (200, 400, 403, 500, dll)

**Step 3: Cek Aplikasi Error**
```javascript
// Di console, cek last error
console.log(document.querySelector('[data-error]')?.textContent)

// Atau check React error boundary
// Jika ada error component, akan terlihat di page
```

**Step 4: Jalankan Query di SQL Editor**
```sql
-- Cek apakah query ke-support
SELECT COUNT(*) FROM ideas
WHERE user_id = 'user-id-here';

-- Cek jika ada index
SELECT indexname FROM pg_indexes
WHERE tablename = 'ideas';

-- Add index jika tidak ada untuk performance
CREATE INDEX idx_ideas_user_id ON ideas(user_id);
```

**Step 5: Restart Development Server**
```bash
# Stop dengan Ctrl+C
# Restart:
npm run dev
```

**Step 6: Clear Browser Cache**
```
- Tekan Ctrl+Shift+Delete
- Clear cookies dan cache
- Close dan buka browser baru
- Coba lagi
```

---

## 🔴 Error: "User already exists"

### Gejala
```
Error: User already exists
Error: Database error updating user
Error: Unique constraint violation
```

### Penyebab
- Email sudah pernah sign up
- Coba sign up dengan email yang sama 2x
- Email di-normalize berbeda (contoh: test@gmail.com vs Test@Gmail.com)

### Solusi

**Gunakan Email Berbeda:**
```
Sign up pertama: user@gmail.com
Sign up kedua: user2@gmail.com  (bukan user@gmail.com lagi)

atau tambah counter:
user@gmail.com
user+1@gmail.com
user+2@gmail.com
```

**Atau Gunakan Temporary Email:**
```
Gunakan service seperti:
- 10minutemail.com
- tempmail.com
- mailinator.com
```

---

## 🔴 Error: "TypeError: Cannot read property X of undefined"

### Gejala
```
TypeError: Cannot read property 'name' of undefined
TypeError: Cannot read property 'id' of undefined
Cannot destructure property 'user' of 'undefined'
```

### Penyebab
- Data belum di-load (null/undefined)
- Profile belum di-fetch
- useAuth() context belum siap

### Solusi

**Tambah Loading Check:**
```typescript
// ✗ SALAH - tidak check undefined
const name = profile.name;  // Error jika profile null!

// ✓ BENAR - check dulu
const name = profile?.name || 'Unknown';

// ✓ BENAR - gunakan optional chaining
const { profile } = useAuth();
if (!profile) return <div>Loading...</div>;
return <div>{profile.name}</div>;
```

**Tambah Default Value:**
```typescript
// Saat set state
const [profile, setProfile] = useState({
  name: '',
  email: '',
  phone: '',
  // ... set default values
});
```

---

## 🔴 Error: Webhook / Realtime tidak jalan

### Gejala
```
Data tidak auto-update
Realtime tidak bekerja
Webhook tidak trigger
```

### Penyebab
- Realtime tidak di-enable
- Webhook tidak di-configure
- Database logs tidak show subscribe event

### Solusi

**Enable Realtime (Optional):**
1. Buka Supabase > Database > Replication
2. Enable table untuk realtime
3. Atau setup manually di aplikasi:

```typescript
// Subscribe to real-time changes
supabase
  .from('ideas')
  .on('*', (payload) => {
    console.log('Change received!', payload)
  })
  .subscribe()
```

---

## 🟡 Warning: Browserslist Database Outdated

### Gejala
```
npm warn: Browserslist: caniuse-lite is outdated
Please run: npx update-browserslist-db@latest
```

### Solusi
```bash
# Run command yang disarankan
npx update-browserslist-db@latest

# Ini tidak critical, hanya warning
# Aplikasi tetap berjalan normal
```

---

## 🟡 Warning: Deprecated Package

### Gejala
```
npm warn: Package X is deprecated
Please use Package Y instead
```

### Solusi
- Ini hanya warning
- Aplikasi tetap berjalan
- Bisa di-ignore atau upgrade package nanti

---

## 📋 Diagnostic Checklist

Jika ada error, follow checklist ini:

**Environment Setup:**
- [ ] .env file ada di root project
- [ ] VITE_SUPABASE_URL benar
- [ ] VITE_SUPABASE_ANON_KEY benar
- [ ] npm run dev berhasil

**Database:**
- [ ] Tabel ada di Table Editor
- [ ] RLS di-enable (lihat RLS tab)
- [ ] Policies ada dan benar
- [ ] No syntax error di SQL

**Authentication:**
- [ ] Sign up berhasil membuat user
- [ ] Login works
- [ ] Token ada di Local Storage
- [ ] Auth context available

**CRUD Operations:**
- [ ] CREATE - bisa insert data
- [ ] READ - bisa fetch data
- [ ] UPDATE - bisa modify data
- [ ] DELETE - bisa remove data

**Security (RLS):**
- [ ] User A tidak bisa lihat data User B
- [ ] No permission error saat CRUD
- [ ] Console tidak show auth errors

---

## 💬 Buat Bug Report

Jika masalah tidak teratasi, siapkan informasi ini:

```
1. Error message lengkap (dari console)
2. Steps untuk reproduce
3. Environment:
   - Node version: node -v
   - npm version: npm -v
   - OS: Windows/Mac/Linux
4. Screenshot / Video
5. Project files yang relevant
```

---

## 📞 Get Help

1. **Documentation:**
   - Supabase Docs: https://supabase.com/docs
   - React Docs: https://react.dev

2. **Community:**
   - Supabase Discord: https://discord.supabase.com
   - Stack Overflow: Tag dengan "supabase"

3. **Support:**
   - GitHub Issues
   - Email team development

---

**Semoga guide ini membantu! Happy debugging! 🐛✓**
