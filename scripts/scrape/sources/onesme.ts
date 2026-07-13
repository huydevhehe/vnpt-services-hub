// oneSME là SPA (render bằng JS) nên phải dùng Playwright để lấy HTML sau khi render.

import { chromium, type Browser } from "playwright";
import type { ScrapeResult, Product, Source } from "../types.js";
import { load } from "../lib/html.js";
import { extractPage } from "../lib/extract.js";
import { collectLinks } from "../lib/crawl.js";
import { makeProduct } from "../lib/build.js";
import { USER_AGENT, sleep } from "../lib/http.js";

const source: Source = {
  id: "onesme",
  name: "oneSME",
  url: "https://onesme.vn",
  description:
    "Nền tảng chuyển đổi số toàn diện cho doanh nghiệp SME (oneSME - VNPT).",
};

async function renderHtml(browser: Browser, url: string): Promise<string | null> {
  const page = await browser.newPage({ userAgent: USER_AGENT });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await sleep(1200); // chờ nội dung động ổn định
    return await page.content();
  } catch (e) {
    console.warn(`  [onesme] lỗi tải ${url}: ${String(e)}`);
    return null;
  } finally {
    await page.close();
  }
}

export async function scrape(): Promise<ScrapeResult> {
  const products: Product[] = [];
  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.warn(
      `  [onesme] Không khởi động được Chromium. Chạy: npx playwright install chromium. Bỏ qua nguồn này.\n  ${String(e)}`
    );
    return { source, products: [], articles: [] };
  }

  const seenTitles = new Set<string>();
  const isGeneric = (t: string) =>
    /^(tin tức|trang chủ|home|onesme|giới thiệu)$/i.test(t.trim());

  try {
    const homeUrl = "https://onesme.vn/home";
    const homeHtml = await renderHtml(browser, homeUrl);
    if (homeHtml) {
      const $ = load(homeHtml);
      const home = extractPage($, homeUrl);
      if (
        (home.bodyText.length > 60 || home.features.length >= 3) &&
        !isGeneric(home.title)
      ) {
        products.push(
          await makeProduct(source, homeUrl, "Tổng quan nền tảng", home)
        );
        seenTitles.add(home.title.trim().toLowerCase());
        console.log(`  [SP] ${home.title}`);
      }

      // Thu vài link nội bộ có vẻ là trang giải pháp/sản phẩm.
      const links = collectLinks($, homeUrl, {
        exclude: /(login|dang-nhap|dang-ky|register|\.(css|js|png|jpg|jpeg|webp|ico))/i,
      })
        .filter((u) => u !== homeUrl)
        .slice(0, 10);

      for (const url of links) {
        const html = await renderHtml(browser, url);
        if (!html) continue;
        const $$ = load(html);
        const page = extractPage($$, url);
        if (page.bodyText.length < 100 && page.features.length < 3) continue;
        const key = page.title.trim().toLowerCase();
        if (isGeneric(page.title) || seenTitles.has(key)) continue;
        seenTitles.add(key);
        products.push(
          await makeProduct(source, url, "Giải pháp chuyển đổi số", page)
        );
        console.log(`  [SP] ${page.title}`);
      }
    }
  } finally {
    await browser.close();
  }

  return { source, products, articles: [] };
}
