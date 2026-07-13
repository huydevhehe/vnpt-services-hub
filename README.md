# VNPT Data Explorer

Công cụ **cào dữ liệu từ các website VNPT** và **dựng website xem/phân tích** (Next.js).
Dữ liệu được chuẩn hoá về một nơi, mỗi mục **giữ nguyên nguồn gốc** (badge nguồn + link về trang gốc).

## Nguồn dữ liệu (6 website)

| Nguồn | URL | Nội dung |
|-------|-----|----------|
| VNPT MetroNet | vnpt.vn | Bảng giá truyền số liệu / kênh thuê riêng |
| VNPT DigiShop | digishop.vnpt.vn | Bài tư vấn, khuyến mãi, gói cước (MyTV, Internet) |
| VNPT Cloud | cloud.vnpt.vn | ~30 dịch vụ cloud (Compute, DB, Storage, AI, Security) |
| oneSME | onesme.vn | Nền tảng chuyển đổi số SME (SPA – cào bằng Playwright) |
| VNPT IT | vnptit.vn | Giải pháp Chính phủ số, DN, Giáo dục, Y tế, Bảo mật |
| VNPT Technology | vnpt-technology.vn | Thiết bị: ONT, Mesh WiFi, Camera, SmartBox, 5G + tin tức |

## Kiến trúc

```
scripts/scrape/     # Scraper (Node/TypeScript)
  lib/              # http, html, extract, crawl, site, build, images, save
  sources/          # 1 module / nguồn
  index.ts          # điều phối
data/               # đầu ra: <nguồn>.json + index.json
public/scraped-images/   # ảnh tải về (dùng offline)
lib/data.ts         # web đọc & truy vấn JSON
app/                # trang Next.js (App Router)
components/         # Header, Footer, ProductCard, ArticleCard, PricingTable, SourceBadge, ScrapedBody
```

## Chạy

```bash
npm install
npx playwright install chromium   # 1 lần, cho nguồn oneSME (SPA)

# 1) Cào dữ liệu (đã có sẵn trong data/, chạy lại khi cần cập nhật)
npm run scrape                    # cào tất cả 6 nguồn
npm run scrape:one cloud          # chỉ cào 1 nguồn

# 2) Chạy web để xem
npm run dev                       # mở http://localhost:3000
```

## Trang

- `/` — Trang chủ: thống kê + 6 nguồn + sản phẩm nổi bật + tin mới.
- `/nguon` — Danh sách nguồn dữ liệu (link trang gốc, số liệu).
- `/san-pham` — Catalog gộp, lọc theo **nguồn** & **danh mục**.
- `/san-pham/[slug]` — Chi tiết: mô tả, tính năng, **bảng giá**, ảnh, link nguồn gốc.
- `/tin-tuc`, `/tin-tuc/[slug]` — Tin tức & bài viết.

## Ghi chú

- Cào **lịch sự**: mỗi request cách nhau ≥ 1s, User-Agent rõ ràng, giới hạn số trang/nguồn.
- Dữ liệu thuộc về các đơn vị VNPT tương ứng; trang này chỉ để **xem & phân tích nội bộ**.
- Muốn cào sâu/thêm trang: chỉnh `maxProducts`/`maxArticles` và bộ lọc link trong `scripts/scrape/sources/*`.
