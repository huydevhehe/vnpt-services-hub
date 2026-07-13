import Link from "next/link";
import {
  getAllProducts,
  getCategories,
  getSourceById,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const metadata = { title: "Sản phẩm & Dịch vụ • VNPT Nam Sài Gòn" };

type SP = { source?: string; category?: string };

const MAIN_CATEGORIES = [
  {
    title: "Băng rộng cố định",
    desc: "Internet cáp quang FiberVNN tốc độ siêu cao, ổn định.",
    features: ["Băng thông không giới hạn", "Trang bị Modem Wifi 5/6", "Miễn phí lắp đặt"],
    icon: "🌐",
    slug: "bang-rong",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Di động VinaPhone",
    desc: "Gói cước di động và combo tích hợp đa dạng, giá siêu tiết kiệm.",
    features: ["Data khủng 4G/5G", "Miễn phí gọi nội/ngoại mạng", "Combo tích hợp gia đình"],
    icon: "📱",
    slug: "di-dong",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Hóa đơn - Thuế",
    desc: "VNPT Invoice - Giải pháp hóa đơn điện tử, biên lai thông minh.",
    features: ["Đáp ứng Thông tư 78", "Lưu trữ an toàn 10 năm", "Tích hợp phần mềm kế toán"],
    icon: "🧾",
    slug: "hoa-don",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Chữ ký số",
    desc: "VNPT CA & SmartCA - Ký số an toàn mọi lúc mọi nơi.",
    features: ["Bảo mật cấp độ cao", "Không dùng USB Token", "Ký đa dạng tài liệu"],
    icon: "🖋️",
    slug: "chu-ky-so",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Cloud & IDC",
    desc: "Hạ tầng lưu trữ đám mây và máy chủ tiêu chuẩn quốc tế Uptime Tier III.",
    features: ["Độ khả dụng 99.99%", "Băng thông kết nối lớn", "Bảo mật đa lớp"],
    icon: "☁️",
    slug: "cloud",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Chuyển đổi số",
    desc: "Hệ sinh thái ứng dụng quản trị doanh nghiệp toàn diện.",
    features: ["Hợp đồng điện tử eContract", "Bảo hiểm xã hội IVAN", "Phần mềm quản lý đa ngành"],
    icon: "🔄",
    slug: "chuyen-doi-so",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  }
];

export default async function SanPhamPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const activeSource = sp.source ?? "";
  const activeCategory = sp.category ?? "";

  const categories = getCategories();

  let products = getAllProducts();
  if (activeSource) products = products.filter((p) => p.sourceId === activeSource);
  if (activeCategory)
    products = products.filter((p) => p.category === activeCategory);
  products = products
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title, "vi"));

  const buildHref = (patch: Partial<SP>) => {
    const params = new URLSearchParams();
    const source = patch.source ?? (patch.source === "" ? "" : activeSource);
    const category =
      patch.category ?? (patch.category === "" ? "" : activeCategory);
    if (source) params.set("source", source);
    if (category) params.set("category", category);
    const qs = params.toString();
    return qs ? `/san-pham?${qs}` : "/san-pham";
  };

  const activeSourceName = activeSource
    ? getSourceById(activeSource)?.name
    : null;

  return (
    <div className="flex flex-col bg-slate-50 min-h-screen">
      {/* Banner */}
      <section className="bg-vnpt-darker text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Sản Phẩm & Dịch Vụ VNPT</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Khám phá hệ sinh thái giải pháp viễn thông - công nghệ thông tin toàn diện dành cho mọi đối tượng khách hàng.
          </p>
        </div>
      </section>

      {/* 6 Nhóm Dịch Vụ Lớn (Hero Categories) */}
      {!activeCategory && !activeSource && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Các Lĩnh Vực Chuyên Môn</h2>
            <div className="w-16 h-1 bg-vnpt-accent mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAIN_CATEGORIES.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-vnpt/20"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {cat.icon}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cat.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{cat.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {cat.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-vnpt-accent mt-0.5">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/san-pham?category=${cat.title}`} className="w-full block text-center py-2.5 rounded-lg border border-vnpt text-vnpt font-semibold hover:bg-vnpt hover:text-white transition-colors">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tra cứu chi tiết & Filter */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tất Cả Sản Phẩm</h2>
          
          {/* Lọc theo danh mục */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Lọc theo danh mục</h3>
            <div className="flex flex-wrap gap-2">
              <Pill href={buildHref({ category: "" })} active={!activeCategory}>
                Tất cả
              </Pill>
              {categories.map((c) => (
                <Pill
                  key={c.name}
                  href={buildHref({ category: c.name })}
                  active={activeCategory === c.name}
                >
                  {c.name} ({c.count})
                </Pill>
              ))}
            </div>
          </div>
        </div>

        {/* Kết quả list */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">
            Hiển thị {products.length} sản phẩm
            {activeSourceName ? ` (Nguồn: ${activeSourceName})` : ""}
            {activeCategory ? ` (Thuộc: ${activeCategory})` : ""}
          </h3>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-lg font-medium text-slate-900">Không tìm thấy sản phẩm nào phù hợp.</p>
            <p className="text-slate-500 mt-2">Vui lòng thử chọn danh mục khác.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
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
