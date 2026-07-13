// Dựng bản ghi Product/Article từ trang đã trích xuất, tải ảnh về local.

import type { Article, Product, Source } from "../types.js";
import type { ExtractedPage } from "./extract.js";
import { slugify } from "./html.js";
import { downloadImages } from "./images.js";

const usedSlugs = new Set<string>();

function uniqueSlug(sourceId: string, title: string): string {
  const base = `${sourceId}-${slugify(title)}`;
  let slug = base;
  let i = 2;
  while (usedSlugs.has(slug)) slug = `${base}-${i++}`;
  usedSlugs.add(slug);
  return slug;
}

export async function makeProduct(
  source: Source,
  url: string,
  category: string,
  page: ExtractedPage
): Promise<Product> {
  const slug = uniqueSlug(source.id, page.title);
  const images = await downloadImages(page.imageUrls, source.id, 6);
  return {
    id: slug,
    slug,
    sourceId: source.id,
    category,
    title: page.title,
    shortDesc: page.shortDesc,
    features: page.features,
    pricing: page.pricing,
    images,
    bodyText: page.bodyText,
    sourceUrl: url,
  };
}

export async function makeArticle(
  source: Source,
  url: string,
  category: string,
  page: ExtractedPage,
  date?: string
): Promise<Article> {
  const slug = uniqueSlug(source.id, page.title);
  const images = await downloadImages(page.imageUrls, source.id, 4);
  return {
    id: slug,
    slug,
    sourceId: source.id,
    category,
    title: page.title,
    date,
    bodyText: page.bodyText,
    images,
    sourceUrl: url,
  };
}
