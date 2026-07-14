'use client';
import { useState } from "react";

/** Ảnh thumbnail bài viết: lỗi/thiếu ảnh -> placeholder gradient xanh có icon (không vỡ ảnh xám). */
export default function ArticleThumb({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const show = src && !failed;

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br from-vnpt to-vnpt-darker ${className}`}>
      {show ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full w-full place-items-center">
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)",
              backgroundSize: "22px 22px",
            }}
            aria-hidden
          />
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white/85">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8M15 18h-5M10 6h8v4h-8V6Z" />
          </svg>
        </div>
      )}
    </div>
  );
}
