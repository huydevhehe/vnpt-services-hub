// Helper parse HTML bằng cheerio: text sạch, bảng, URL tuyệt đối, slug tiếng Việt.

import * as cheerio from "cheerio";
import type { Pricing } from "../types.js";

export type Cheerio$ = cheerio.CheerioAPI;

export function load(html: string): Cheerio$ {
  return cheerio.load(html);
}

/** Gộp khoảng trắng, bỏ xuống dòng thừa. */
export function cleanText(s: string | null | undefined): string {
  return (s ?? "").replace(/\s+/g, " ").trim();
}

/** Giữ xuống dòng theo đoạn nhưng bỏ khoảng trắng thừa từng dòng. */
export function cleanMultiline(s: string | null | undefined): string {
  return (s ?? "")
    .split("\n")
    .map((line) => line.replace(/[ \t ]+/g, " ").trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

/** Bỏ dấu tiếng Việt + tạo slug URL-friendly. */
export function slugify(input: string): string {
  const base = (input || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return base || "muc";
}

/** Chuyển src tương đối thành URL tuyệt đối; trả "" nếu không hợp lệ. */
export function absoluteUrl(base: string, src: string | undefined): string {
  if (!src) return "";
  const s = src.trim();
  if (!s || s.startsWith("data:") || s.startsWith("javascript:")) return "";
  try {
    return new URL(s, base).toString();
  } catch {
    return "";
  }
}

/** Parse một phần tử <table> thành {columns, rows}. Trả null nếu là bảng layout/rỗng. */
export function parseTable($: Cheerio$, table: cheerio.Element): Pricing | null {
  const $t = $(table);

  // Bỏ bảng layout: có bảng lồng bên trong (wrapper dàn trang).
  if ($t.find("table").length > 0) return null;

  const rows: string[][] = [];
  $t.find("tr").each((_, tr) => {
    const cells: string[] = [];
    $(tr)
      .find("th,td")
      .each((__, cell) => cells.push(cleanText($(cell).text())));
    if (cells.some((c) => c.length > 0)) rows.push(cells);
  });
  if (rows.length < 2) return null; // cần header + ít nhất 1 dòng

  const maxCols = Math.max(...rows.map((r) => r.length));
  if (maxCols < 2) return null; // 1 cột -> không phải bảng giá

  // Bỏ bảng có ô quá dài (thường là khối văn bản dàn trang, không phải dữ liệu).
  const hasHugeCell = rows.some((r) => r.some((c) => c.length > 220));
  if (hasHugeCell) return null;

  const firstIsHeader = $t.find("tr").first().find("th").length > 0;
  const columns = rows[0];
  const body = firstIsHeader ? rows.slice(1) : rows.slice(1);
  if (body.length === 0) return null;
  return { columns, rows: body };
}

/** Lấy tất cả bảng trong một vùng (đã lọc bảng layout). */
export function parseTablesIn($: Cheerio$, scope: cheerio.Cheerio<cheerio.Element>): Pricing[] {
  const out: Pricing[] = [];
  scope.find("table").each((_, t) => {
    const p = parseTable($, t);
    if (p) out.push(p);
  });
  return out;
}

/** Quét toàn trang lấy các bảng "thật" (bảng giá/thông số), loại bảng lồng & layout. */
export function parseAllTables($: Cheerio$): Pricing[] {
  const out: Pricing[] = [];
  $("table").each((_, t) => {
    // chỉ xét bảng ngoài cùng
    if ($(t).parents("table").length > 0) return;
    const p = parseTable($, t);
    if (p) out.push(p);
  });
  return out;
}

/** Thu thập src ảnh (kể cả data-src lazyload) trong một vùng, trả URL tuyệt đối, đã dedup. */
export function collectImages(
  $: Cheerio$,
  scope: cheerio.Cheerio<cheerio.Element>,
  baseUrl: string
): string[] {
  const set = new Set<string>();
  scope.find("img").each((_, img) => {
    const el = $(img);
    const raw =
      el.attr("src") ||
      el.attr("data-src") ||
      el.attr("data-lazy-src") ||
      el.attr("data-original") ||
      "";
    const abs = absoluteUrl(baseUrl, raw);
    if (abs && !/\.(svg)$/i.test(abs)) set.add(abs);
  });
  return [...set];
}
