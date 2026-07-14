import Link from "next/link";
import type { Article } from "@/lib/types";
import SourceBadge from "./SourceBadge";
import ArticleThumb from "./ArticleThumb";

export default function ArticleCard({ article }: { article: Article }) {
  const img = article.images[0];
  const excerpt = article.bodyText.replace(/\n?## /g, " • ").slice(0, 160);
  return (
    <Link
      href={`/tin-tuc/${article.slug}`}
      className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-3 transition-all hover:shadow-md hover:border-vnpt/40"
    >
      <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg">
        <ArticleThumb src={img} alt={article.title} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <SourceBadge sourceId={article.sourceId} />
          {article.category && (
            <span className="text-[11px] text-slate-400">{article.category}</span>
          )}
        </div>
        <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900 group-hover:text-vnpt">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{excerpt}…</p>
      </div>
    </Link>
  );
}
