// HTTP client cào lịch sự: throttle giữa các request, retry nhẹ, User-Agent rõ ràng.

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/124.0 Safari/537.36 VNPT-DataExplorer/1.0 (+research; contact: local)";

const MIN_DELAY_MS = 1000; // >= 1s giữa 2 request (lịch sự)
const TIMEOUT_MS = 25000;

let lastRequestAt = 0;

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function throttle() {
  const wait = MIN_DELAY_MS - (Date.now() - lastRequestAt);
  if (wait > 0) await sleep(wait);
  lastRequestAt = Date.now();
}

/** Tải HTML của một URL (dạng text). Ném lỗi nếu thất bại sau khi retry. */
export async function getHtml(
  url: string,
  opts: { retries?: number } = {}
): Promise<string> {
  const retries = opts.retries ?? 2;
  let lastErr: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    await throttle();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "vi,en;q=0.8",
        },
        signal: ctrl.signal,
        redirect: "follow",
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
      return await res.text();
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
      if (attempt < retries) {
        await sleep(1500 * (attempt + 1));
      }
    }
  }
  throw new Error(`getHtml thất bại: ${url} -> ${String(lastErr)}`);
}

/** Tải một file nhị phân (ảnh). Trả về Buffer + content-type, hoặc null nếu lỗi. */
export async function getBinary(
  url: string
): Promise<{ buffer: Buffer; contentType: string } | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    await throttle();
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, "Accept-Language": "vi,en;q=0.8" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "";
    const arr = await res.arrayBuffer();
    return { buffer: Buffer.from(arr), contentType };
  } catch {
    clearTimeout(timer);
    return null;
  }
}

export { USER_AGENT };
