'use client';
import { useState } from "react";

/**
 * Logo nhãn hàng — ưu tiên file ảnh thật offline tại `public/logos/<slug>.png`
 * (hoặc .svg). Nếu chưa có file / ảnh lỗi -> rớt về wordmark có màu thương hiệu
 * (luôn hiển thị, không phụ thuộc internet, không bao giờ vỡ ảnh).
 */
export default function BrandLogo({
  name,
  slug,
  color,
}: {
  name: string;
  slug: string;
  color: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="grid h-20 place-items-center rounded-xl border border-slate-100 bg-white px-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-vnpt/30 hover:shadow-md">
      {failed ? (
        <span className="text-lg font-black uppercase tracking-tight" style={{ color }}>
          {name}
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/logos/${slug}.png`}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-11 max-w-[140px] object-contain"
        />
      )}
    </div>
  );
}
