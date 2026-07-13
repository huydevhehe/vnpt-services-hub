// Kiểu dữ liệu dùng cho phần web (đồng bộ với scripts/scrape/types.ts).

export type Source = {
  id: string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
};

export type Pricing = {
  name?: string;
  columns: string[];
  rows: string[][];
  note?: string;
};

export type Product = {
  id: string;
  slug: string;
  sourceId: string;
  category: string;
  title: string;
  shortDesc: string;
  features: string[];
  pricing: Pricing[];
  images: string[];
  bodyText: string;
  sourceUrl: string;
};

export type Article = {
  id: string;
  slug: string;
  sourceId: string;
  title: string;
  date?: string;
  category?: string;
  bodyText: string;
  images: string[];
  sourceUrl: string;
};

export type ScrapeResult = {
  source: Source;
  products: Product[];
  articles: Article[];
};
