Dokumentasi Integrasi Sistem Tag Article (Frontend)

Sistem ini terdiri dari dua bagian utama: **Manajemen Master Tag** (`/tag-articles`) dan **Integrasi Tag pada Artikel** (`/article`).

## 1. Manajemen Master Tag (`/tag-articles`)
Digunakan untuk mengelola daftar tag yang tersedia (CRUD). Semua endpoint ini memerlukan **JWT Token**.

### A. List Semua Tag
**Endpoint:** `GET /tag-articles`
**Query Parameters:**
- `page` (int): Nomor halaman (default: 1)
- `limit` (int): Data per halaman (default: 10)
- `search` (string): Pencarian berdasarkan nama tag
- `sort_by` (string): Field pengurutan (default: `created_at`)

**Response:**
```json
{
  "message": "Tag found",
  "data": [
    {
      "id": "645...",
      "name": "Teknologi",
      "slug": "teknologi",
      "created_at": "2024-05-12T..."
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 10,
    "page": 1,
    "total_page": 10
  }
}
```

### B. Membuat Tag Baru
**Endpoint:** `POST /tag-articles`
**Body (JSON):**
```json
{
  "name": "Kecerdasan Buatan",
  "slug": "ai" // Opsional, jika kosong akan di-generate otomatis dari name
}
```

### C. Update & Delete Tag
- `PUT /tag-articles/:id`: Update data tag.
- `DELETE /tag-articles/:id`: Menghapus tag.

---

## 2. Integrasi Tag pada Artikel (`/article`)

### A. Membuat / Update Artikel dengan Tag
Saat membuat atau memperbarui artikel, tag dikirimkan dalam bentuk **Array of Strings** (nama tag). Backend akan secara otomatis mengkonversi string tersebut menjadi objek tag di dalam database.

**Endpoint:** `POST /article` atau `PUT /article/:id`
**Content-Type:** `multipart/form-data` (karena ada upload gambar)

**Payload (Form Data):**
- `title`: "Judul Artikel"
- `tags`: "Golang" (Kirimkan beberapa kali jika lebih dari satu tag)
- `tags`: "Tutorial"
- ... (field artikel lainnya)

**Catatan:** Meskipun field artikel lainnya menggunakan JSON di dokumentasi DTO, karena adanya `featured_image` (file), pastikan pengiriman menggunakan format `multipart/form-data`.

### B. Mencari Artikel Berdasarkan Tag (Public)
Digunakan untuk halaman kategori/tag di sisi pengunjung.

**Endpoint:** `GET /article/tags`
**Query Parameters:**
- `tags[]`: Nama atau Slug tag (bisa multiple). Contoh: `?tags=golang&tags=web-dev`
- `field`: `slug` (default) atau `name`. Menentukan apakah pencarian berdasarkan slug atau nama.
- `page`, `limit`: Standar paginasi.

**Contoh Request:** `/article/tags?tags=teknologi&field=slug`

### C. Search Suggestion / Pencarian Tag (Public)
Digunakan untuk fitur pencarian artikel berdasarkan keyword tag (autocomplete).

**Endpoint:** `GET /article/tags/search`
**Query Parameters:**
- `q` (string): Keyword nama tag.

---

## 3. Struktur Data (Data Models)

### Article Response Object
Setiap objek artikel sekarang menyertakan field `tags` dalam bentuk array objek (**TagSnapshot**):

```json
{
  "id": "...",
  "title": "Tutorial Go",
  "tags": [
    {
      "id": "645...", // ID unik tag
      "name": "Golang",
      "slug": "golang"
    },
    {
      "id": "646...",
      "name": "Tutorial",
      "slug": "tutorial"
    }
  ],
  "status": "published",
  "..." : "..."
}
```

---

## 4. Panduan Implementasi Frontend

1.  **Input Tag di CMS:**
    - Gunakan komponen *Multi-select* atau *Tag Input*.
    - Ambil saran tag dari `GET /tag-articles?search=...`.
    - Saat submit, kirimkan array string nama tag tersebut ke field `tags`.

2.  **Menampilkan Tag di Card/Detail Artikel:**
    - Loop pada array `tags` di dalam objek artikel.
    - Gunakan `tag.slug` untuk navigasi ke halaman list per-tag (contoh: `/blog/tag/${tag.slug}`).

3.  **Halaman List per Tag:**
    - Panggil `GET /article/tags?tags=${slug}&field=slug`.

---

## 5. Daftar Error Umum
| Kode | Pesan (ID) | Keterangan |
| :--- | :--- | :--- |
| 400 | `Validation failed` | Field wajib (nama tag) tidak diisi. |
| 400 | `Already exist` | Slug tag sudah digunakan oleh tag lain. |
| 404 | `Tag not found` | ID tag tidak ditemukan saat Update/Delete. |
| 401 | `Unauthorized` | Token JWT tidak valid atau kadaluarsa. |

---
*Dokumentasi ini dibuat berdasarkan versi API Mei 2026.