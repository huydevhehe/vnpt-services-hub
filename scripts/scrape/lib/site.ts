// Runner tổng quát cho các nguồn HTML tĩnh: đi từ seeds, thu link, phân loại,
// tải & trích xuất từng trang thành Product/Article.

import type { ScrapeResult, Source, Product, Article } from "../types.js";
import { getHtml } from "./http.js";
import { load } from "./html.js";
import { collectLinks, type LinkFilter } from "./crawl.js";
import { extractPage, titleFromUrl, type ExtractedPage } from "./extract.js";
import { makeProduct, makeArticle } from "./build.js";

export type Seed = { url: string; type: "product" | "article" | "listing" };

export type SiteConfig = {
  source: Source;
  seeds: Seed[];
  productFilter?: LinkFilter; // nhận diện link sản phẩm khi crawl listing
  articleFilter?: LinkFilter; // nhận diện link tin tức
  productCategory: string;
  articleCategory: string;
  maxProducts?: number;
  maxArticles?: number;
  /** Trang tin không có tiêu đề thật -> lấy tiêu đề từ slug URL. */
  articleTitleFromUrl?: boolean;
};

function hasContent(p: ExtractedPage): boolean {
  return (
    (p.bodyText && p.bodyText.length > 80) ||
    p.pricing.length > 0 ||
    p.features.length >= 3
  );
}

export async function scrapeSite(cfg: SiteConfig): Promise<ScrapeResult> {
  const products: Product[] = [];
  const articles: Article[] = [];
  const visited = new Set<string>();
  const maxProducts = cfg.maxProducts ?? 30;
  const maxArticles = cfg.maxArticles ?? 15;

  const productUrls: string[] = [];
  const articleUrls: string[] = [];

  // 1) Duyệt seeds: seed product/article tự nó là bản ghi; mọi seed đều thu link.
  for (const seed of cfg.seeds) {
    let html: string;
    try {
      html = await getHtml(seed.url);
    } catch (e) {
      console.warn(`  [!] seed lỗi: ${seed.url} -> ${String(e)}`);
      continue;
    }
    const $ = load(html);
    if (seed.type === "product") productUrls.push(seed.url);
    else if (seed.type === "article") articleUrls.push(seed.url);
    if (cfg.productFilter)
      productUrls.push(...collectLinks($, seed.url, cfg.productFilter));
    if (cfg.articleFilter)
      articleUrls.push(...collectLinks($, seed.url, cfg.articleFilter));
  }

  const uniqProducts = [...new Set(productUrls)].slice(0, maxProducts);
  const uniqArticles = [...new Set(articleUrls)]
    .filter((u) => !uniqProducts.includes(u))
    .slice(0, maxArticles);

  // 2) Trang sản phẩm
  for (const url of uniqProducts) {
    if (visited.has(url)) continue;
    visited.add(url);
    try {
      const $ = load(await getHtml(url));
      const page = extractPage($, url);
      if (!hasContent(page)) {
        console.warn(`  [skip mỏng] ${url}`);
        continue;
      }
      products.push(
        await makeProduct(cfg.source, url, cfg.productCategory, page)
      );
      console.log(`  [SP] ${page.title}`);
    } catch (e) {
      console.warn(`  [!] ${url} -> ${String(e)}`);
    }
  }

  // 3) Trang tin tức
  for (const url of uniqArticles) {
    if (visited.has(url)) continue;
    visited.add(url);
    try {
      const $ = load(await getHtml(url));
      const page = extractPage($, url);
      if (!hasContent(page)) continue;
      if (cfg.articleTitleFromUrl) {
        page.title = titleFromUrl(url) || page.title;
      }
      articles.push(
        await makeArticle(cfg.source, url, cfg.articleCategory, page)
      );
      console.log(`  [Tin] ${page.title}`);
    } catch (e) {
      console.warn(`  [!] ${url} -> ${String(e)}`);
    }
  }

  return { source: cfg.source, products, articles };
}
