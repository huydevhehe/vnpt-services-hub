import { scrapeSite } from "../lib/site.js";
import type { ScrapeResult } from "../types.js";

export function scrape(): Promise<ScrapeResult> {
  return scrapeSite({
    source: {
      id: "metronet",
      name: "VNPT MetroNet",
      url: "https://vnpt.vn",
      description:
        "Dịch vụ truyền số liệu / kênh thuê riêng đô thị băng rộng MetroNet (vnpt.vn).",
    },
    seeds: [
      {
        url: "https://vnpt.vn/tu-van/bang-gia-dich-vu-dich-vu-truyen-so-lieu-trong-nuoc-metronet.html",
        type: "product",
      },
    ],
    productCategory: "Truyền số liệu (MetroNet)",
    articleCategory: "Tin tức",
    maxProducts: 1,
  });
}
