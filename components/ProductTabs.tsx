'use client';
import { useState, useRef, useEffect } from "react";
import ScrapedBody from "./ScrapedBody";
import PricingTable from "./PricingTable";
import { Product } from "@/lib/types";

/** Khối nội dung dài: thu gọn ~520px + nút "Xem thêm" (chỉ hiện khi thực sự tràn). */
function Collapsible({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const MAX = 520;

  useEffect(() => {
    if (ref.current) setOverflow(ref.current.scrollHeight > MAX + 40);
  }, [children]);

  return (
    <div>
      <div
        ref={ref}
        className="relative overflow-hidden transition-all duration-300"
        style={{ maxHeight: open || !overflow ? "none" : MAX }}
      >
        {children}
        {overflow && !open && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {overflow && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-vnpt/20 bg-vnpt-light px-4 py-2 text-sm font-bold text-vnpt transition-colors hover:bg-vnpt hover:text-white"
        >
          {open ? "Thu gọn" : "Xem thêm nội dung"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Tổng quan" },
    ...(product.features.length > 0 ? [{ id: "features", label: "Tính năng nổi bật" }] : []),
    ...(product.pricing.length > 0 ? [{ id: "pricing", label: "Bảng giá" }] : []),
    ...(product.images.length > 0 ? [{ id: "gallery", label: "Thư viện ảnh" }] : []),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar bg-slate-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-vnpt text-vnpt bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="p-6 md:p-8">
        {activeTab === "overview" && (
          <div>
            {product.shortDesc && (
              <div className="mb-6 rounded-xl border-l-4 border-vnpt bg-vnpt-light/60 p-4 text-[15px] font-medium leading-relaxed text-slate-700">
                {product.shortDesc}
              </div>
            )}
            {product.bodyText ? (
              <Collapsible>
                <ScrapedBody text={product.bodyText} />
              </Collapsible>
            ) : (
              <p className="italic text-slate-500">Nội dung chi tiết đang được cập nhật...</p>
            )}
            {product.pricing.length > 0 && (
              <button
                onClick={() => setActiveTab("pricing")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-vnpt hover:underline"
              >
                Xem bảng giá chi tiết
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </button>
            )}
          </div>
        )}

        {activeTab === "features" && product.features.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-vnpt-light text-vnpt flex items-center justify-center">✨</span>
              Các tính năng và lợi ích nổi bật
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {product.features.map((f, i) => (
                <li key={i} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="text-vnpt-accent mt-0.5 font-bold">✓</div>
                  <span className="text-slate-700 leading-relaxed text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "pricing" && product.pricing.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-vnpt-light text-vnpt flex items-center justify-center">💰</span>
              Bảng giá dịch vụ
            </h3>
            <div className="space-y-8">
              {product.pricing.map((t, i) => (
                <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 px-5 py-3">
                    <h4 className="font-bold text-slate-800">{(t as any).tableName || `Bảng giá ${i + 1}`}</h4>
                  </div>
                  <PricingTable table={t} />
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl">
              <p className="text-xs text-orange-800 font-medium italic">
                * Lưu ý: Bảng giá trên chỉ mang tính chất tham khảo. Giá thực tế có thể thay đổi tùy theo chương trình khuyến mãi hiện hành. Vui lòng liên hệ hotline để có báo giá chính xác nhất.
              </p>
            </div>
          </div>
        )}

        {activeTab === "gallery" && product.images.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-vnpt-light text-vnpt flex items-center justify-center">🖼️</span>
              Thư viện hình ảnh
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center p-2 hover:shadow-md transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Gallery ${i}`} className="max-w-full max-h-full object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
