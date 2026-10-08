# Memo Board

Aplikasi task management berbasis kategori dengan papan kanban **New**, **On Progress**, dan **Complete**.

## Fitur

- Halaman kategori: buat kategori dan pilih kategori untuk membuka board
- Tambah dan edit task melalui modal
- Priority task: Low, Medium, High
- Deadline dengan penanda terlambat, hari ini, dan mendekati deadline
- Checklist to do (opsional) yang bisa di-check dan uncheck langsung dari kartu
- Tag pada task dan filter berdasarkan tag
- Drag and drop antar kolom (kiri-kanan) dan antar urutan (atas-bawah) dengan animasi, mendukung mouse, layar sentuh, dan keyboard
- Hapus task
- Progress bar task selesai per kategori

## Tech Stack

- React 18
- React Router 7
- dnd-kit
- Vite
- Tailwind CSS v4

## Menjalankan Project

```bash
npm install
npm run dev
```

## Struktur Folder

```
src/
├── components/
│   ├── board/
│   ├── category/
│   ├── filter/
│   ├── layout/
│   ├── modal/
│   └── ui/
├── constants/
├── context/
├── data/
├── hooks/
├── pages/
├── utils/
├── App.jsx
├── index.css
└── main.jsx
```

## Deploy

Project ini menggunakan `BrowserRouter`. Konfigurasi rewrite untuk Netlify (`public/_redirects`) dan Vercel (`vercel.json`) sudah disertakan.
