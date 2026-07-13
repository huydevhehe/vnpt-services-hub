import { scrapeSite } from "../lib/site.js";
import type { ScrapeResult } from "../types.js";

export function scrape(): Promise<ScrapeResult> {
  return scrapeSite({
    source: {
      id: "digishop",
      name: "VNPT DigiShop",
      url: "https://digishop.vnpt.vn",
      description:
        "Cửa hàng số VNPT — bài tư vấn, khuyến mãi & bảng giá gói cước (MyTV, Internet...).",
    },
    seeds: [
      {
        url: "https://digishop.vnpt.vn/tin-tuc-km/tu-van/goi-cuoc-mytv-vnpt",
        type: "article",
      },
      { url: "https://digishop.vnpt.vn/tin-tuc-km/tu-van", type: "listing" },
      { url: "https://digishop.vnpt.vn/tin-tuc-km", type: "listing" },
    ],
    articleFilter: {
      include: /^\/tin-tuc-km\/[a-z0-9-]+\/[a-z0-9-]+/i,
      exclude: /\.(css|js|png|jpg|jpeg|webp|ico)$/i,
    },
    productCategory: "Gói cước",
    articleCategory: "Tư vấn & Khuyến mãi",
    maxArticles: 14,
  });
}
