# Panduan Deploy ke Vercel melalui GitHub

## Langkah-langkah Deployment

### 1. Upload File ke GitHub (Tanpa Git Command)

**Buat Repository Baru di GitHub:**

1. Login ke [github.com](https://github.com)
2. Klik tombol **"New"** atau **"+"** → **"New repository"**
3. Nama repository: `video-player-generator`
4. Centang **"Add a README file"** 
5. Klik **"Create repository"**

**Upload File Project:**

1. Di repository yang baru dibuat, klik **"uploading an existing file"**
2. **Drag & drop** semua file project atau klik **"choose your files"**
3. File yang harus di-upload:
   ```
   📁 client/           (folder lengkap)
   📁 server/           (folder lengkap) 
   📁 shared/           (folder lengkap)
   📄 components.json
   📄 drizzle.config.ts
   📄 package.json
   📄 postcss.config.js
   📄 tailwind.config.ts
   📄 tsconfig.json
   📄 vite.config.ts
   📄 vercel.json
   📄 README.md
   📄 DEPLOYMENT.md
   📄 .gitignore
   ```
4. Commit message: `"Video Player Generator - Template Blogger to Vercel"`
5. Klik **"Commit changes"**

### 2. Deploy ke Vercel

1. **Login ke Vercel**:
   - Kunjungi [vercel.com](https://vercel.com)
   - Login dengan akun GitHub Anda

2. **Import Project**:
   - Klik "New Project"
   - Pilih repository "video-player-generator"
   - Klik "Import"

3. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. **Deploy**:
   - Klik "Deploy"
   - Tunggu proses build selesai
   - Aplikasi akan live di URL `.vercel.app`

### 3. File Konfigurasi

File-file yang sudah disiapkan untuk deployment:

- ✅ `vercel.json` - Konfigurasi routing dan build
- ✅ `README.md` - Dokumentasi project
- ✅ `.gitignore` - File yang tidak di-track git
- ✅ Build scripts sudah tersedia di `package.json`

### 4. Custom Domain (Optional)

Setelah deploy berhasil, Anda bisa:

1. Beli domain di provider domain
2. Di dashboard Vercel, masuk ke project settings
3. Tambahkan custom domain
4. Configure DNS sesuai instruksi Vercel

### 5. Environment Variables (Optional)

Jika ingin custom konfigurasi:

1. Di dashboard Vercel → Settings → Environment Variables
2. Tambahkan:
   - `NODE_ENV` = `production`
   - `GDRIVE_API_KEY` = API key Google Drive Anda (optional)

## Features yang Sudah Siap

- ✅ Template design sesuai dengan Blogger template asli
- ✅ Multiple video players (Fluid Player, JW Player, Plyr.io, HTML5)
- ✅ Multiple providers (Google Drive, YouTube, Random)
- ✅ Generate iframe code dan direct link
- ✅ Responsive design
- ✅ Copy to clipboard functionality
- ✅ Ready untuk production

## URL Structure Setelah Deploy

- **Home**: `https://your-app.vercel.app/`
- **API Endpoint**: `https://your-app.vercel.app/api/player-config`
- **Direct Player**: `https://your-app.vercel.app/player/{id}`

## Troubleshooting

Jika ada masalah saat deploy:

1. **Build Error**: Check build logs di Vercel dashboard
2. **API Error**: Pastikan server routes terkonfigure dengan benar
3. **Static Files**: Pastikan path assets benar di production

## Template Credits

Original template dari Dayat.ID telah berhasil dikonversi untuk modern web deployment.