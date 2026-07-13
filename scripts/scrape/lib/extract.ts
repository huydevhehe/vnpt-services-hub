// Bộ trích xuất nội dung tổng quát, dùng lại cho mọi nguồn HTML tĩnh.
// Trước tiên bóc bỏ header/menu/footer để tránh lẫn text điều hướng, rồi chọn
// vùng nội dung chính và lấy tiêu đề, mô tả, thân bài, tính năng, bảng giá, ảnh.

import type { Cheerio$ } from "./html.js";
import { cleanText, parseAllTables, collectImages, absoluteUrl } from "./html.js";
import type { Pricing } from "../types.js";
import type { Element, Cheerio } from "cheerio";

export type ExtractedPage = {
  title: string;
  shortDesc: string;
  bodyText: string;
  features: string[];
  pricing: Pricing[];
  imageUrls: string[];
};

const CHROME_SELECTORS = [
  "script", "style", "noscript", "template", "svg",
  "header", "footer", "nav",
  ".header", ".footer", ".nav", ".navbar", ".navigation", ".main-menu",
  ".menu", ".mega-menu", ".submenu", ".breadcrumb", ".breadcrumbs",
  "aside", ".sidebar", ".widget", ".search", ".search-form", ".cookie",
  ".popup", ".modal", ".social", ".back-to-top",
];

const CONTENT_SELECTORS = [
  "article", "main",
  ".entry-content", ".post-content", ".single-content", ".news-detail",
  ".detail-content", ".content-detail", ".product-detail", ".product-content",
  ".page-content", "#content", ".content", ".container", "body",
];

const TITLE_SELECTORS = [
  "h1",
  ".product-title", ".product-name", ".page-title", ".news-title",
  ".title-detail", ".detail-title", ".box-title", ".title", "h2",
];

/** Bỏ các khối giao diện (menu/header/footer...) khỏi tài liệu. */
function stripChrome($: Cheerio$): void {
  for (const sel of CHROME_SELECTORS) $(sel).remove();
}

function scoreParagraphText($: Cheerio$, el: Cheerio<Element>): number {
  let len = 0;
  el.find("p").each((_, p) => (len += cleanText($(p).text()).length));
  return len;
}

function pickMainContent($: Cheerio$): Cheerio<Element> {
  let best: Cheerio<Element> | null = null;
  let bestScore = -1;
  for (const sel of CONTENT_SELECTORS) {
    $(sel).each((_, node) => {
      const el = $(node) as Cheerio<Element>;
      const score = scoreParagraphText($, el);
      if (score > bestScore) {
        bestScore = score;
        best = el;
      }
    });
  }
  // Nếu không có <p> đáng kể, ưu tiên khối nội dung theo selector (div-based).
  if (bestScore < 120) {
    for (const sel of CONTENT_SELECTORS) {
      const node = $(sel).first();
      if (node.length) return node as Cheerio<Element>;
    }
  }
  return best ?? ($("body") as Cheerio<Element>);
}

function isGenericTitle(t: string): boolean {
  const s = t.toLowerCase();
  return (
    t.length < 6 ||
    /website|trang chủ|home\s*page|^vnpt technology/.test(s)
  );
}

export function titleFromUrl(url: string): string {
  try {
    const seg = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
    const words = decodeURIComponent(seg).replace(/[-_]+/g, " ").trim();
    return words
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ")
      .slice(0, 120);
  } catch {
    return "";
  }
}

function getTitle($: Cheerio$, content: Cheerio<Element>, url: string): string {
  for (const sel of TITLE_SELECTORS) {
    const t = cleanText(content.find(sel).first().text() || $(sel).first().text());
    if (t && !isGenericTitle(t)) return t;
  }
  const og = cleanText($('meta[property="og:title"]').attr("content") ?? "");
  if (og && !isGenericTitle(og)) return og;
  const fromUrl = titleFromUrl(url);
  if (fromUrl) return fromUrl;
  const tt = cleanText($("title").text()).replace(/\s*[-|].*$/, "");
  return tt || "Nội dung";
}

function getShortDesc($: Cheerio$, content: Cheerio<Element>): string {
  const meta =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";
  if (meta && meta.trim().length > 20) return cleanText(meta);
  const p = content
    .find("p")
    .toArray()
    .map((el) => cleanText($(el).text()))
    .find((t) => t.length > 40);
  return p ?? "";
}

function getBodyText($: Cheerio$, content: Cheerio<Element>): string {
  const parts: string[] = [];
  content.find("h2, h3, h4, p, li").each((_, el) => {
    const tag = (el as Element).tagName?.toLowerCase();
    const t = cleanText($(el).text());
    if (!t || t.length < 2) return;
    if (tag === "h2" || tag === "h3" || tag === "h4") parts.push(`\n## ${t}`);
    else parts.push(t);
  });
  const dedup: string[] = [];
  for (const line of parts) {
    if (dedup[dedup.length - 1] !== line) dedup.push(line);
  }
  let body = dedup.join("\n").trim();
  // Nếu vùng nội dung không dùng p/li (div-based), lấy text tổng của vùng.
  if (body.length < 120) {
    body = cleanText(content.text());
  }
  return body.slice(0, 8000);
}

function getFeatures($: Cheerio$, content: Cheerio<Element>): string[] {
  const set = new Set<string>();
  content.find("li").each((_, li) => {
    if ($(li).find("li").length > 0) return; // bỏ mục chứa danh sách con (menu)
    const t = cleanText($(li).text());
    if (t.length >= 8 && t.length <= 140 && !/^\d+$/.test(t)) set.add(t);
  });
  return [...set].slice(0, 20);
}

export function extractPage($: Cheerio$, pageUrl: string): ExtractedPage {
  // og:image lấy trước khi bóc chrome.
  const ogImage = absoluteUrl(pageUrl, $('meta[property="og:image"]').attr("content"));

  stripChrome($); // bỏ header/menu/footer để không lẫn text & ảnh điều hướng
  const content = pickMainContent($);

  const title = getTitle($, content, pageUrl);
  const shortDesc = getShortDesc($, content);
  const bodyText = getBodyText($, content);
  const features = getFeatures($, content);
  const pricing = parseAllTables($);

  // Ảnh: ưu tiên vùng content; nếu ít, bổ sung từ body (đã bỏ chrome) + og:image.
  const imgSet = new Set<string>(collectImages($, content, pageUrl));
  if (imgSet.size < 3) {
    for (const u of collectImages($, $("body") as Cheerio<Element>, pageUrl)) {
      if (imgSet.size >= 8) break;
      imgSet.add(u);
    }
  }
  if (ogImage) imgSet.add(ogImage);

  return { title, shortDesc, bodyText, features, pricing, imageUrls: [...imgSet] };
}
