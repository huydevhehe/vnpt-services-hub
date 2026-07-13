import { scrapeSite } from "../lib/site.js";
import type { ScrapeResult } from "../types.js";

export function scrape(): Promise<ScrapeResult> {
  return scrapeSite({
    source: {
      id: "vnpt-technology",
      name: "VNPT Technology",
      url: "https://www.vnpt-technology.vn",
      description:
        "Nhà sản xuất thiết bị & công nghệ VNPT — ONT, Mesh WiFi, Camera, SmartBox, 5G...",
    },
    seeds: [
      { url: "https://www.vnpt-technology.vn/vi", type: "listing" },
      { url: "https://www.vnpt-technology.vn/vi/news", type: "listing" },
    ],
    productFilter: {
      include: /^\/vi\/product_category_v2\/[a-z0-9-]+/i,
    },
    articleFilter: {
      include: /^\/vi\/news_detail\/[a-z0-9-]+/i,
    },
    productCategory: "Thiết bị & Công nghệ",
    articleCategory: "Tin tức",
    articleTitleFromUrl: true,
    maxProducts: 20,
    maxArticles: 12,
  });
}
