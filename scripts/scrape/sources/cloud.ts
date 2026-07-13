import { scrapeSite } from "../lib/site.js";
import type { ScrapeResult } from "../types.js";

export function scrape(): Promise<ScrapeResult> {
  return scrapeSite({
    source: {
      id: "cloud",
      name: "VNPT Cloud",
      url: "https://cloud.vnpt.vn",
      description:
        "Nền tảng điện toán đám mây VNPT — Compute, Database, Storage, AI, Security...",
    },
    seeds: [{ url: "https://cloud.vnpt.vn/", type: "listing" }],
    productFilter: {
      include: /^\/dich-vu\/[a-z0-9-]+/i,
    },
    productCategory: "Dịch vụ Cloud",
    articleCategory: "Blog",
    maxProducts: 30,
  });
}
