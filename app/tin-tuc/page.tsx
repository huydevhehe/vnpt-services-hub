import Link from "next/link";
import { getAllArticles, getSources, getSourceById } from "@/lib/data";
import ArticleCard from "@/components/ArticleCard";

export const metadata = { title: "Tin tức • VNPT Nam Sài Gòn" };

export default async function TinTucPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  const sp = await searchParams;
  const activeSource = sp.source ?? "";

  const sources = getSources().filter(
    (s) => getAllArticles().some((a) => a.sourceId === s.id)
  );
  let articles = getAllArticles();
  if (activeSource) articles = articles.filter((a) => a.sourceId === activeSource);

  // Giả sử bài viết đầu tiên là bài nổi bật
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const listArticles = articles.length > 1 ? articles.slice(1) : [];
  const latestArticles = getAllArticles().slice(0, 5); // Sidebar mới nhất

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner */}
      <section className="bg-vnpt-darker text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Tin Tức VNPT</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Cập nhật nhanh chóng những thông tin công nghệ, chính sách viễn thông và chương trình khuyến mãi mới nhất.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pt-10 flex flex-col lg:flex-row gap-8 items-start">
        {/* Cột trái (70%) */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          
          {/* Lọc theo Nguồn */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm font-bold text-slate-700">Chủ đề:</span>
            <Pill href="/tin-tuc" active={!activeSource}>
              Tất cả
            </Pill>
            {sources.map((s) => (
              <Pill
                key={s.id}
                href={`/tin-tuc?source=${s.id}`}
                active={activeSource === s.id}
              >
                {s.name}
              </Pill>
            ))}
          </div>

          {articles.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
              <p className="text-lg font-medium text-slate-900">Không có bài viết nào phù hợp.</p>
            </div>
          ) : (
            <>
              {/* Bài viết nổi bật */}
              {featuredArticle && !activeSource && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
                  <div className="aspect-[2/1] relative overflow-hidden">
                    {featuredArticle.images && featuredArticle.images.length > 0 ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={featuredArticle.images[0]} alt={featuredArticle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">Không có ảnh</div>
                    )}
                    <div className="absolute top-4 left-4 bg-vnpt-accent text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Mới nhất</div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                      <span>{new Date((featuredArticle as any).publishedAt || Date.now()).toLocaleDateString("vi-VN")}</span>
                      <span>•</span>
                      <span className="text-vnpt">{getSourceById(featuredArticle.sourceId)?.name}</span>
                    </div>
                    <Link href={`/tin-tuc/${featuredArticle.slug}`}>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 hover:text-vnpt transition-colors">{featuredArticle.title}</h2>
                    </Link>
                    <p className="text-slate-600 mb-6 line-clamp-3">{featuredArticle.bodyText ? featuredArticle.bodyText.slice(0, 150) : ""}</p>
                    <Link href={`/tin-tuc/${featuredArticle.slug}`} className="inline-block text-vnpt font-bold border-b-2 border-vnpt pb-1 hover:text-vnpt-dark hover:border-vnpt-dark transition-colors">
                      Đọc tiếp &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* Danh sách bài viết */}
              <div className="grid gap-6 sm:grid-cols-2">
                {(activeSource ? articles : listArticles).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Cột phải (Sidebar 30%) */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-24 flex flex-col gap-6">
          
          {/* Nhận bản tin */}
          <div className="bg-vnpt rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="font-bold text-xl mb-2 relative z-10">Đăng Ký Nhận Tin</h3>
            <p className="text-sm text-white/80 mb-5 relative z-10">Nhận thông tin khuyến mãi và chính sách viễn thông mới nhất từ VNPT.</p>
            <form className="relative z-10 flex flex-col gap-3">
              <input type="email" placeholder="Nhập địa chỉ email..." className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:bg-white/20 transition-all text-sm" />
              <button type="submit" className="w-full bg-vnpt-accent text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors">
                Gửi Đăng Ký
              </button>
            </form>
          </div>

          {/* Tin mới nhất */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-vnpt-accent rounded-full"></span>
              Đọc Nhiều Nhất
            </h3>
            <ul className="space-y-4">
              {latestArticles.map((a, i) => (
                <li key={a.id} className="group flex gap-3 items-start">
                  <div className="text-3xl font-black text-slate-200 group-hover:text-vnpt-accent transition-colors">0{i+1}</div>
                  <div>
                    <Link href={`/tin-tuc/${a.slug}`} className="text-sm font-bold text-slate-700 leading-tight group-hover:text-vnpt transition-colors line-clamp-2">
                      {a.title}
                    </Link>
                    <div className="text-xs text-slate-400 mt-1">{new Date((a as any).publishedAt || Date.now()).toLocaleDateString("vi-VN")}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={
        "rounded-full px-4 py-1.5 text-sm font-medium transition-all " +
        (active
          ? "bg-vnpt text-white shadow-md shadow-vnpt/20"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900")
      }
    >
      {children}
    </Link>
  );
}
