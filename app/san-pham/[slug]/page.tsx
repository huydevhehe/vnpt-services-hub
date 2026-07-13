import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getProductsBySource,
  getSourceById,
} from "@/lib/data";
import ProductSidebar from "@/components/ProductSidebar";
import StickyContactForm from "@/components/StickyContactForm";
import ProductTabs from "@/components/ProductTabs";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return { title: p ? `${p.title} • VNPT Nam Sài Gòn` : "Không tìm thấy" };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const source = getSourceById(product.sourceId);
  const related = getProductsBySource(product.sourceId)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Top Background Banner */}
      <div className="bg-vnpt-darker h-48 w-full absolute top-0 left-0 z-0 opacity-10"></div>
      
      <div className="mx-auto max-w-7xl px-4 pt-10 relative z-10 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Cột 1: Sidebar Trái (25%) */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-24 hidden lg:block">
          <ProductSidebar activeCategory={product.category} />
        </div>

        {/* Cột 2: Nội dung chính (50%) */}
        <div className="w-full lg:w-2/4 flex flex-col">
          {/* Breadcrumb */}
          <nav className="text-sm font-medium text-slate-500 mb-6 flex items-center flex-wrap gap-2">
            <Link href="/" className="hover:text-vnpt transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/san-pham" className="hover:text-vnpt transition-colors">
              Sản phẩm
            </Link>
            <span>/</span>
            <span className="text-vnpt">{product.title}</span>
          </nav>

          {/* Hero Sản phẩm */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-vnpt/10 text-vnpt text-xs font-bold uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-xs text-slate-400">• Nguồn: {source?.name}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              {product.title}
            </h1>
            
            {product.shortDesc && (
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {product.shortDesc}
              </p>
            )}

            {/* Các nút Call to Action */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-100">
              <a href="#sticky-form" className="bg-vnpt-accent text-white px-6 py-2.5 rounded-lg font-bold shadow-md shadow-vnpt-accent/20 hover:bg-orange-600 transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Đăng ký ngay
              </a>
              <button className="bg-vnpt-light text-vnpt px-6 py-2.5 rounded-lg font-bold border border-vnpt/20 hover:bg-vnpt hover:text-white transition-colors flex items-center gap-2">
                Báo giá
              </button>
              <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-slate-600 px-6 py-2.5 rounded-lg font-semibold border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2">
                Brochure
              </a>
            </div>
          </div>

          {/* Component Tabs nội dung */}
          <ProductTabs product={product} />

        </div>

        {/* Cột 3: Sticky Form (25%) */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-24 flex flex-col gap-6" id="sticky-form">
          <StickyContactForm productName={product.title} />
          
          {/* Box Hỗ trợ */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-vnpt-accent rounded-full"></span>
              Cần hỗ trợ?
            </h3>
            <p className="text-sm text-slate-600 mb-4">Gọi ngay hotline để được tư vấn miễn phí.</p>
            <a href="tel:0838999333" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-vnpt-light text-vnpt font-bold border border-vnpt/20 hover:bg-vnpt hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              0838.999.333
            </a>
          </div>
        </div>
      </div>

      {/* Sản phẩm liên quan - Full width ở dưới */}
      {related.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 mt-16 pt-16 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Sản phẩm cùng danh mục
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
