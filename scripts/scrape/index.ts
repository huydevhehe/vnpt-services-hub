// Điều phối cào tất cả nguồn (hoặc 1 nguồn nếu truyền id qua argv).
// Dùng: npm run scrape            -> cào tất cả
//        npm run scrape:one cloud -> chỉ cào nguồn "cloud"

import { saveResult, updateIndex } from "./lib/save.js";
import type { ScrapeResult } from "./types.js";

const modules: Record<string, () => Promise<ScrapeResult>> = {
  metronet: () => import("./sources/metronet.js").then((m) => m.scrape()),
  digishop: () => import("./sources/digishop.js").then((m) => m.scrape()),
  "vnpt-technology": () =>
    import("./sources/vnptTechnology.js").then((m) => m.scrape()),
  vnptit: () => import("./sources/vnptit.js").then((m) => m.scrape()),
  cloud: () => import("./sources/cloud.js").then((m) => m.scrape()),
  onesme: () => import("./sources/onesme.js").then((m) => m.scrape()),
};

async function main() {
  const only = process.argv[2];
  const ids = only ? [only] : Object.keys(modules);

  for (const id of ids) {
    const fn = modules[id];
    if (!fn) {
      console.error(`Không có nguồn "${id}". Các nguồn: ${Object.keys(modules).join(", ")}`);
      continue;
    }
    console.log(`\n=== Cào nguồn: ${id} ===`);
    const t0 = Date.now();
    try {
      const res = await fn();
      await saveResult(res);
      console.log(
        `>> ${id}: ${res.products.length} sản phẩm, ${res.articles.length} bài viết (${((Date.now() - t0) / 1000).toFixed(1)}s)`
      );
    } catch (e) {
      console.error(`Lỗi nguồn ${id}:`, e);
    }
  }

  await updateIndex();
  console.log("\n✔ Hoàn tất. Đã ghi data/*.json và data/index.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
