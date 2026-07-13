'use client';
import { useState } from "react";
import ScrapedBody from "./ScrapedBody";
import PricingTable from "./PricingTable";
import { Product } from "@/lib/types";

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
          <div className="prose prose-slate max-w-none prose-headings:text-vnpt-darker prose-a:text-vnpt">
            {product.bodyText ? (
              <ScrapedBody text={product.bodyText} />
            ) : (
              <p className="text-slate-500 italic">Nội dung chi tiết đang được cập nhật...</p>
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
                    <h4 className="font-bold text-slate-800">{t.tableName || `Bảng giá ${i + 1}`}</h4>
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
