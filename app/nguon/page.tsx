import Link from "next/link";
import {
  getSources,
  getProductsBySource,
  getArticlesBySource,
} from "@/lib/data";

export const metadata = { title: "Nguồn dữ liệu • VNPT Data Explorer" };

export default function NguonPage() {
  const sources = getSources();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Nguồn dữ liệu</h1>
      <p className="mt-2 max-w-2xl text-slate-500">
        Toàn bộ nội dung được cào từ {sources.length} website VNPT dưới đây. Mỗi
        sản phẩm/bài viết đều giữ liên kết về trang gốc.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {sources.map((s) => {
          const products = getProductsBySource(s.id);
          const articles = getArticlesBySource(s.id);
          return (
            <div
              key={s.id}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-vnpt">{s.name}</h2>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg border border-vnpt/30 px-3 py-1 text-xs font-medium text-vnpt hover:bg-vnpt-light"
                >
                  Mở trang gốc ↗
                </a>
              </div>
              <p className="mt-2 flex-1 text-sm text-slate-500">{s.description}</p>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div>
                  <span className="text-2xl font-black text-slate-900">
                    {products.length}
                  </span>{" "}
                  <span className="text-slate-500">sản phẩm</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-slate-900">
                    {articles.length}
                  </span>{" "}
                  <span className="text-slate-500">bài viết</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {products.length > 0 && (
                  <Link
                    href={`/san-pham?source=${s.id}`}
                    className="rounded-lg bg-vnpt px-3 py-1.5 text-sm font-medium text-white hover:bg-vnpt-dark"
                  >
                    Xem sản phẩm
                  </Link>
                )}
                {articles.length > 0 && (
                  <Link
                    href={`/tin-tuc?source=${s.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Xem tin tức
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
