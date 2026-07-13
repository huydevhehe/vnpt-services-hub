// Ghi kết quả cào ra data/<sourceId>.json và cập nhật data/index.json.

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import type { ScrapeResult, Source } from "../types.js";

const DATA_DIR = path.join(process.cwd(), "data");

export async function saveResult(result: ScrapeResult): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${result.source.id}.json`);
  await writeFile(file, JSON.stringify(result, null, 2), "utf8");
}

/** Cập nhật data/index.json: danh sách nguồn + số liệu tóm tắt. */
export async function updateIndex(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const { readdir } = await import("node:fs/promises");
  const files = (await readdir(DATA_DIR)).filter(
    (f) => f.endsWith(".json") && f !== "index.json"
  );
  const sources: Array<
    Source & { productCount: number; articleCount: number }
  > = [];
  for (const f of files) {
    try {
      const raw = await readFile(path.join(DATA_DIR, f), "utf8");
      const r = JSON.parse(raw) as ScrapeResult;
      sources.push({
        ...r.source,
        productCount: r.products.length,
        articleCount: r.articles.length,
      });
    } catch {
      // bỏ qua file lỗi
    }
  }
  const index = { generatedAt: new Date().toISOString(), sources };
  await writeFile(
    path.join(DATA_DIR, "index.json"),
    JSON.stringify(index, null, 2),
    "utf8"
  );
}
