// Thu thập link nội bộ từ một trang, có lọc theo pattern và giới hạn.

import type { Cheerio$ } from "./html.js";
import { absoluteUrl } from "./html.js";

export type LinkFilter = {
  /** Chỉ giữ link cùng host này (mặc định lấy từ baseUrl). */
  sameHostAs?: string;
  /** Regex/chuỗi bắt buộc xuất hiện trong path để giữ link. */
  include?: RegExp;
  /** Regex/chuỗi loại bỏ. */
  exclude?: RegExp;
};

/** Lấy hostname an toàn. */
function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Thu thập các link <a> hợp lệ, đã chuẩn hoá tuyệt đối + dedup. */
export function collectLinks(
  $: Cheerio$,
  baseUrl: string,
  filter: LinkFilter = {}
): string[] {
  const host = hostOf(filter.sameHostAs ?? baseUrl);
  const set = new Set<string>();
  $("a[href]").each((_, a) => {
    const raw = $(a).attr("href");
    const abs = absoluteUrl(baseUrl, raw);
    if (!abs) return;
    if (host && hostOf(abs) !== host) return;
    const clean = abs.split("#")[0];
    const path = (() => {
      try {
        return new URL(clean).pathname + new URL(clean).search;
      } catch {
        return "";
      }
    })();
    if (filter.include && !filter.include.test(path)) return;
    if (filter.exclude && filter.exclude.test(path)) return;
    set.add(clean);
  });
  return [...set];
}
