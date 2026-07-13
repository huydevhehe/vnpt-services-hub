import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesBySource,
  getSourceById,
} from "@/lib/data";
import SourceBadge from "@/components/SourceBadge";
import ScrapedBody from "@/components/ScrapedBody";
import ArticleCard from "@/components/ArticleCard";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  return { title: a ? `${a.title} • VNPT Data Explorer` : "Không tìm thấy" };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const source = getSourceById(article.sourceId);
  const related = getArticlesBySource(article.sourceId)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-vnpt">
          Trang chủ
        </Link>{" "}
        /{" "}
        <Link href="/tin-tuc" className="hover:text-vnpt">
          Tin tức
        </Link>{" "}
        / <span className="text-slate-700 line-clamp-1 inline">{article.title}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <SourceBadge sourceId={article.sourceId} />
        {article.category && (
          <span className="text-xs text-slate-400">{article.category}</span>
        )}
        {article.date && (
          <span className="text-xs text-slate-400">{article.date}</span>
        )}
      </div>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">{article.title}</h1>

      <a
        href={article.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-vnpt/30 px-4 py-2 text-sm font-semibold text-vnpt hover:bg-vnpt-light"
      >
        Đọc bài gốc {source ? `tại ${source.name}` : ""} ↗
      </a>

      {article.images.length > 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.images[0]}
          alt={article.title}
          className="mt-6 w-full rounded-xl border border-slate-200 object-cover"
        />
      )}

      <div className="mt-6 rounded-xl bg-white p-6 ring-1 ring-slate-100">
        <ScrapedBody text={article.bodyText} />
      </div>

      {article.images.length > 1 && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {article.images.slice(1).map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={img}
              alt={`${article.title} ${i + 2}`}
              loading="lazy"
              className="h-32 w-full rounded-lg border border-slate-200 object-cover"
            />
          ))}
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Bài viết liên quan</h2>
          <div className="grid gap-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
