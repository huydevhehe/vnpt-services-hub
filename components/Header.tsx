import Link from "next/link";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/giai-phap", label: "Giải pháp" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/ctv", label: "Cộng tác viên" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-col shadow-md">
      {/* Topbar */}
      <div className="bg-slate-100 text-slate-600 text-[13px] border-b border-slate-200 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-vnpt transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Hotline: <strong>0838.999.333</strong>
            </span>
            <span className="flex items-center gap-1.5 hover:text-vnpt transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email: info@vnptnamsaigon.vn
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/ctv/dang-nhap" className="hover:text-vnpt">Đăng nhập CTV</Link>
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-vnpt text-white flex items-center justify-center rounded-lg font-bold text-xl md:text-2xl tracking-tighter">
              VNPT
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg md:text-xl text-vnpt leading-tight">VNPT NAM SÀI GÒN</span>
              <span className="text-[10px] md:text-[11px] font-medium text-slate-500 uppercase tracking-widest leading-none">TTKD VNPT TP.Hồ Chí Minh</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-2 rounded-lg text-[15px] font-medium text-slate-700 hover:text-vnpt hover:bg-vnpt-light transition-all"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 bg-vnpt-accent text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-vnpt-accent/20 hover:shadow-vnpt-accent/40 hover:-translate-y-0.5">
              Đăng ký tư vấn
            </button>
            <button className="lg:hidden p-2 text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
