# Video Player Generator

Template Blogger yang dikonversi menjadi aplikasi web modern untuk generate kode embed video player dengan berbagai pilihan player dan provider.

## Features

- **Multiple Video Players**: Support untuk Fluid Player, JW Player, Plyr.io, dan HTML5 Video
- **Multiple Providers**: Google Drive, YouTube, Random source
- **Ready Deploy**: Optimized untuk deployment di Vercel
- **Template Design**: Menggunakan design asli dari template Blogger Player Version 2
- **Responsive**: Tampilan yang responsive untuk semua device

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Node.js + Express
- **Styling**: Tailwind CSS + Custom CSS (mengikuti template asli)
- **Build**: Vite
- **Database**: In-memory storage (siap untuk PostgreSQL)

## Quick Deploy ke Vercel

### Melalui GitHub

1. **Push ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/video-player-generator.git
   git push -u origin main
   ```

2. **Deploy ke Vercel**:
   - Login ke [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import repository GitHub Anda
   - Vercel akan otomatis detect dan deploy

### Environment Variables (Optional)

Untuk konfigurasi advanced, Anda bisa set environment variables di Vercel:

```
NODE_ENV=production
GDRIVE_API_KEY=your_google_drive_api_key
```

## Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Template Credits

- **Original Template**: Player Version 2 by Dayat.ID
- **Designer**: Шош. Сом
- **Website**: www.dayat.id
- **Demo**: https://player-v2.blogspot.com/

## Configuration

Template ini sudah include konfigurasi dari template asli:

- Google Drive API Key untuk streaming
- Poster image default
- Ads configuration
- Styling sesuai template asli

## Supported Video Formats

- **Fluid Player**: MP4, WebM, HLS
- **JW Player**: MP4, HLS, DASH
- **Plyr.io**: MP4, WebM, YouTube, Vimeo
- **HTML5 Video**: MP4, WebM, OGV

## License

Template Premium yang sudah dikonversi untuk penggunaan modern.