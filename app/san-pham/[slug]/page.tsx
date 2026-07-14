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

  const heroHighlights = product.features.slice(0, 5);
  const heroImage = product.images[0];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* ===== HERO XANH ĐẬM FULL-WIDTH ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-vnpt-darker via-vnpt-dark to-vnpt text-white">
        {/* Lưới công nghệ mờ */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        {/* Glow */}
        <div className="absolute -top-24 right-10 h-80 w-80 rounded-full bg-vnpt/40 blur-3xl" aria-hidden />
        <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 pt-8 pb-14 md:pt-10 md:pb-20">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/san-pham" className="hover:text-white transition-colors">
              Sản phẩm
            </Link>
            <span>/</span>
            <span className="text-white">{product.title}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            {/* Cột trái: nội dung */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {product.category}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-[42px]">
                {product.title}
              </h1>

              {product.shortDesc && (
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                  {product.shortDesc}
                </p>
              )}

              {heroHighlights.length > 0 && (
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {heroHighlights.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vnpt-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#sticky-form"
                  className="inline-flex items-center gap-2 rounded-lg bg-vnpt-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-vnpt-accent/30 transition-colors hover:bg-orange-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  Đăng ký tư vấn
                </a>
                <a
                  href="#sticky-form"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-vnpt"
                >
                  Nhận báo giá
                </a>
                <a
                  href={product.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Tải brochure
                </a>
              </div>
            </div>

            {/* Cột phải: ảnh sản phẩm nổi */}
            <div className="relative">
              {heroImage ? (
                <div className="relative rounded-2xl border border-white/15 bg-white/95 p-3 shadow-2xl shadow-black/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImage}
                    alt={product.title}
                    className="h-64 w-full rounded-xl object-cover md:h-80"
                  />
                  <span className="absolute -bottom-4 -left-4 hidden rounded-xl bg-vnpt-accent px-4 py-3 text-sm font-bold text-white shadow-lg md:block">
                    Nguồn: {source?.name}
                  </span>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm md:h-80">
                  <span className="text-6xl font-black text-white/20">VNPT</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BODY: 3 CỘT ===== */}
      <div className="mx-auto max-w-7xl px-4 pt-10 flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar trái */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-24 hidden lg:block">
          <ProductSidebar activeCategory={product.category} />
        </div>

        {/* Nội dung chính */}
        <div className="w-full lg:w-2/4 flex flex-col">
          <ProductTabs product={product} />
        </div>

        {/* Sticky Form */}
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

      {/* Sản phẩm liên quan */}
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

      {/* ===== THANH TRUST XANH ĐẬM ===== */}
      <div className="mt-16 bg-gradient-to-r from-vnpt-darker to-vnpt-dark">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { t: "Đơn vị viễn thông quốc gia", d: "Thương hiệu uy tín 25+ năm" },
            { t: "Hạ tầng mạnh mẽ", d: "Kết nối 63 tỉnh thành" },
            { t: "An toàn bảo mật", d: "Đạt chuẩn ISO/IEC 27001" },
            { t: "Hỗ trợ 24/7", d: "Đội ngũ chuyên nghiệp" },
          ].map((item) => (
            <div key={item.t} className="text-center md:text-left">
              <p className="text-sm font-bold text-white md:text-base">{item.t}</p>
              <p className="mt-1 text-xs text-white/60 md:text-sm">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
