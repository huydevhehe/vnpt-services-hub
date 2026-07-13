import Link from "next/link";
import type { Product } from "@/lib/types";
import SourceBadge from "./SourceBadge";

export default function ProductCard({ product }: { product: Product }) {
  const img = product.images[0];
  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-vnpt/40"
    >
      <div className="relative h-40 overflow-hidden bg-vnpt-light">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-vnpt/40 text-4xl font-black">
            VNPT
          </div>
        )}
        <div className="absolute left-2 top-2">
          <SourceBadge sourceId={product.sourceId} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="text-[11px] font-medium uppercase tracking-wide text-vnpt">
          {product.category}
        </div>
        <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900 group-hover:text-vnpt">
          {product.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm text-slate-500">
          {product.shortDesc || "—"}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
          {product.pricing.length > 0 && (
            <span className="rounded bg-vnpt-accent/10 px-1.5 py-0.5 font-medium text-vnpt-accent">
              {product.pricing.length} bảng giá
            </span>
          )}
          {product.features.length > 0 && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5">
              {product.features.length} tính năng
            </span>
          )}
          {product.images.length > 0 && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5">
              {product.images.length} ảnh
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
