# Laporan Praktikum #4 — Web Service Development Methodologies (AGILE)
**Nama/NIM**: <M. Delfian Tirta Nugraha> / <230104040124>  
**Kelas**: <TI23B>  
**Repo GitHub**: <https://github.com/Kkodels/P4-Agile-Kelompok-3.git>  
**Tanggal**: <20 Oktober 2025>

---

## 1. Tujuan
Mendemonstrasikan siklus *Agile (Mini-Sprint)* untuk layanan web:  
Design-First + Mock-First (OpenAPI + Prism) + Test-First (Jest + Supertest) → Implementasi (Green) & CI (lint+typecheck+test) → Hardening (observability & security).

---

## 2. Ringkasan Arsitektur
**Services**: `order-service`, `notification-service`  
**Mock**: `openapi/api.yaml` (lint & error)  
**Testing**: `Jest + Supertest`  
**CI**: `GitHub Actions (ci.yml)`  
**Logging**: `Pino`, `x-correlation-id`  
**Security**: Auth Bearer (Jest), Helmet, Rate-Limit, Validasi (Zod)

---

## 3. Hasil Uji
**Lint OpenAPI**: LULUS (lihat `docs/spectral_pass.png`)  
**Lint test**: 2 passed, 5 tests (lihat `docs/npm_test_pass.png`)  
**CI**: sukses hijau (lihat `docs/ci_pass.png`)  
**Hardening bukti**: lihat `hardening_logs/`

---

## 4. Bukti Eksekusi
### 4A | Mock-First
- `400 lint` → `mock_logs/ts_2021_orders.txt`
- `401 lint` → `mock_logs/ts_2021_notifications.txt`
- `404 lint` → `mock_logs/ts_404_orders.txt`
- `429 lint` → `mock_logs/ts_429_orders.txt`
- `429 lint` → `mock_logs/ts_429_notifications.txt`
- `429 lint` → `mock_logs/ts_429_notifications_2.txt`
- `400v lint` → `mock_logs/ts_400_orders.txt`

### 4B | CI Test
- 201 Created → `hardening_logs/ts_201_orders.txt`
- 200 OK → `hardening_logs/ts_200_notifications.txt`
- 401 Unauthorized → `hardening_logs/ts_401_orders.txt`
- 400 Bad Request → `hardening_logs/ts_400_orders_validation.txt`
- 400 Bad JSON → `hardening_logs/ts_400_orders_badjson.txt`

---

## 5. Analisis
✅ “Green” semua (tanpa gagal)  
✅ Rate limit 60 req/min (notifikasi)  
✅ Rate limit 120 req/min (order)  
✅ Validasi Zod: `400` → “ValidationError”  
✅ JSON rusak: `400` → “BAD_JSON”  
✅ 401 tanpa bearer → “Unauthorized”  
✅ Helmet aktif (CSP, X-Frame-Options, HSTS, dll.) muncul di 201/200/401

---

## 6. Catatan Tambahan
- “Helmet headers” (CSP, X-Frame-Options, HSTS, dll.) muncul di 201/200/401.
- “Pino” logging (JSON). Field sensitif (`authorization`, `cookie`, `set-cookie`) → [REDACTED].
- “x-correlation-id” disisipkan lebih awal & konsisten di log & response.
- Semua endpoint menggunakan schema Zod (validasi input).
- Semua pengujian otomatis, sesuai Jest & Supertest.
- Tidak ada error TypeScript atau lint.

---

## 7. Cara Reproduksi
```bash
npm ci
npm run lint:api
npm run typecheck
npm test
npm run dev:orders
npm run dev:notif
