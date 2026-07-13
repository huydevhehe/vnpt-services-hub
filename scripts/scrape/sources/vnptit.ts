import { scrapeSite } from "../lib/site.js";
import type { ScrapeResult } from "../types.js";

export function scrape(): Promise<ScrapeResult> {
  return scrapeSite({
    source: {
      id: "vnptit",
      name: "VNPT IT",
      url: "https://vnptit.vn",
      description:
        "Công ty CNTT VNPT — giải pháp Chính phủ số, Doanh nghiệp, Giáo dục, Y tế, Bảo mật.",
    },
    seeds: [{ url: "https://vnptit.vn/", type: "listing" }],
    productFilter: {
      include: /^\/(vnpt-[a-z0-9-]+|hoa-don-dien-tu)$/i,
      exclude: /^\/vnpt-it$/i,
    },
    productCategory: "Giải pháp CNTT",
    articleCategory: "Tin tức",
    maxProducts: 30,
  });
}
