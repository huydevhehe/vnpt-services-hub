import Link from "next/link";
import {
  getStats,
  getFeaturedProducts,
  getAllArticles,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import ArticleCard from "@/components/ArticleCard";

export default function HomePage() {
  const stats = getStats();
  // Giả lập lấy danh sách sản phẩm nổi bật làm "Khuyến mãi"
  const featured = getFeaturedProducts(4);
  const articles = getAllArticles().slice(0, 4);

  const QUICK_CATS = [
    { label: "Băng rộng cố định", icon: "🌐", href: "/san-pham?cat=bang-rong" },
    { label: "Di động VinaPhone", icon: "📱", href: "/san-pham?cat=di-dong" },
    { label: "Hóa đơn - Thuế", icon: "🧾", href: "/san-pham?cat=hoa-don" },
    { label: "Chữ ký số", icon: "🖋️", href: "/san-pham?cat=chu-ky-so" },
    { label: "Cloud & IDC", icon: "☁️", href: "/san-pham?cat=cloud" },
    { label: "Chuyển đổi số", icon: "🔄", href: "/san-pham?cat=chuyen-doi-so" },
    { label: "Dịch vụ khác", icon: "✨", href: "/san-pham" },
  ];

  const SOLUTIONS = [
    { title: "Khách hàng Cá nhân", desc: "Internet, truyền hình, di động tốc độ cao", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop" },
    { title: "Hộ kinh doanh", desc: "Giải pháp quản lý bán hàng, chữ ký số, hóa đơn", img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=600&auto=format&fit=crop" },
    { title: "Doanh nghiệp SME", desc: "Hạ tầng mạng, Cloud, dịch vụ số toàn diện", img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop" },
    { title: "Doanh nghiệp Lớn", desc: "Data Center, kênh truyền riêng, bảo mật", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" },
    { title: "Cơ quan Nhà nước", desc: "Chính quyền điện tử, đô thị thông minh", img: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=600&auto=format&fit=crop" },
    { title: "Y tế & Giáo dục", desc: "Hồ sơ bệnh án điện tử, quản lý trường học", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00325c] via-[#005baa] to-[#00468c] text-white">
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-white/10 to-transparent blur-3xl transform rotate-12"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[80%] rounded-full bg-gradient-to-tr from-vnpt-accent/20 to-transparent blur-3xl"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 relative z-10 flex flex-col items-center text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-sm font-semibold text-white mb-6 uppercase tracking-wider">
            VNPT Nam Sài Gòn
          </span>
          <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
            Chuyển Đổi Số Toàn Diện Cùng <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-vnpt-accent">Doanh Nghiệp</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-blue-100 font-medium">
            Cung cấp các giải pháp viễn thông, công nghệ thông tin và dịch vụ số hàng đầu, giúp doanh nghiệp bứt phá trong kỷ nguyên số.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="/lien-he"
              className="inline-block text-center rounded-full bg-vnpt-accent px-8 py-4 font-bold text-white shadow-xl shadow-vnpt-accent/30 hover:bg-orange-600 transition-all hover:scale-105"
            >
              Đăng ký tư vấn ngay
            </a>
            <Link
              href="/san-pham"
              className="rounded-full bg-white/10 backdrop-blur border border-white/30 px-8 py-4 font-bold text-white hover:bg-white hover:text-vnpt transition-all"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* 7 Quick Categories */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {QUICK_CATS.map((cat, i) => (
            <Link key={i} href={cat.href} className="group flex flex-col items-center justify-center p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="w-14 h-14 rounded-full bg-vnpt-light text-vnpt flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:bg-vnpt group-hover:text-white transition-all shadow-sm">
                {cat.icon}
              </div>
              <span className="text-xs font-semibold text-center text-slate-700 group-hover:text-vnpt leading-tight">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Giải pháp theo đối tượng */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Giải Pháp Theo Đối Tượng</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">VNPT Nam Sài Gòn thiết kế các gói giải pháp chuyên biệt, đáp ứng mọi nhu cầu đặc thù của từng nhóm khách hàng.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS.map((sol, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sol.img} alt={sol.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{sol.title}</h3>
                  <p className="text-slate-200 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm / Khuyến mãi nổi bật */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Khuyến Mãi Nổi Bật</h2>
              <p className="text-slate-600">Đăng ký ngay hôm nay để nhận được ưu đãi hấp dẫn từ VNPT.</p>
            </div>
            <Link href="/san-pham" className="text-vnpt font-semibold hover:underline flex items-center gap-1">
              Xem tất cả <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <div key={p.id} className="relative group rounded-2xl border border-vnpt-light overflow-hidden hover:shadow-2xl hover:shadow-vnpt/10 transition-all bg-white flex flex-col h-full">
                {/* Sale Badge */}
                <div className="absolute top-3 right-3 z-10 bg-vnpt-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  HOT
                </div>
                <div className="aspect-[16/10] bg-slate-50 relative p-4 flex items-center justify-center overflow-hidden border-b border-slate-100">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.imageUrl} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-vnpt/10 flex items-center justify-center text-vnpt">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs font-semibold text-vnpt mb-2 uppercase tracking-wide">{p.sourceId}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2 leading-tight group-hover:text-vnpt transition-colors">
                    <Link href={`/san-pham/${p.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {p.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1">{p.description}</p>
                  <div className="text-vnpt-accent font-bold text-lg">Liên hệ tư vấn</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tin tức */}
      {articles.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Tin Tức Mới Nhất</h2>
                <p className="text-slate-600">Cập nhật thông tin công nghệ, chính sách và sự kiện từ VNPT.</p>
              </div>
              <Link href="/tin-tuc" className="text-vnpt font-semibold hover:underline flex items-center gap-1">
                Xem tất cả <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Thống kê - Trust Indicators */}
      <section className="py-16 bg-vnpt-dark text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-vnpt-accent mb-2">20+</div>
              <div className="text-sm text-white/80 font-medium">Năm kinh nghiệm</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-vnpt-accent mb-2">99%</div>
              <div className="text-sm text-white/80 font-medium">Sự hài lòng</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-vnpt-accent mb-2">10k+</div>
              <div className="text-sm text-white/80 font-medium">Khách hàng doanh nghiệp</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-black text-vnpt-accent mb-2">24/7</div>
              <div className="text-sm text-white/80 font-medium">Hỗ trợ kỹ thuật</div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
