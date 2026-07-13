// Tải ảnh về public/scraped-images/<sourceId>/ và trả về đường dẫn local để web dùng offline.

import { createHash } from "node:crypto";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { getBinary } from "./http.js";

const OUT_ROOT = path.join(process.cwd(), "public", "scraped-images");

// Cache trong 1 lần chạy: URL gốc -> đường dẫn local (tránh tải trùng).
const cache = new Map<string, string>();

function extFromContentType(ct: string, url: string): string {
  const c = ct.toLowerCase();
  if (c.includes("jpeg") || c.includes("jpg")) return ".jpg";
  if (c.includes("png")) return ".png";
  if (c.includes("webp")) return ".webp";
  if (c.includes("gif")) return ".gif";
  if (c.includes("svg")) return ".svg";
  const m = url.split("?")[0].match(/\.(jpg|jpeg|png|webp|gif)$/i);
  return m ? `.${m[1].toLowerCase().replace("jpeg", "jpg")}` : ".jpg";
}

async function exists(p: string): Promise<boolean> {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

/**
 * Tải một ảnh về đĩa. Trả về đường dẫn web (bắt đầu bằng /scraped-images/...) hoặc "" nếu lỗi.
 */
export async function downloadImage(url: string, sourceId: string): Promise<string> {
  if (!url) return "";
  if (cache.has(url)) return cache.get(url)!;

  const hash = createHash("sha1").update(url).digest("hex").slice(0, 16);
  const dir = path.join(OUT_ROOT, sourceId);
  await mkdir(dir, { recursive: true });

  // Nếu đã có file với hash này (bất kỳ ext), tái sử dụng.
  for (const ext of [".jpg", ".png", ".webp", ".gif", ".svg"]) {
    const p = path.join(dir, hash + ext);
    if (await exists(p)) {
      const rel = `/scraped-images/${sourceId}/${hash}${ext}`;
      cache.set(url, rel);
      return rel;
    }
  }

  const bin = await getBinary(url);
  if (!bin || bin.buffer.length < 200) {
    cache.set(url, "");
    return "";
  }
  const ext = extFromContentType(bin.contentType, url);
  const filename = hash + ext;
  await writeFile(path.join(dir, filename), bin.buffer);
  const rel = `/scraped-images/${sourceId}/${filename}`;
  cache.set(url, rel);
  return rel;
}

/** Tải nhiều ảnh, giới hạn số lượng, bỏ ảnh lỗi. */
export async function downloadImages(
  urls: string[],
  sourceId: string,
  limit = 8
): Promise<string[]> {
  const out: string[] = [];
  for (const url of urls.slice(0, limit)) {
    const local = await downloadImage(url, sourceId);
    if (local) out.push(local);
  }
  return out;
}
