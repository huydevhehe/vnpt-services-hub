import Link from "next/link";
import { getAllArticles, getFeaturedProducts } from "@/lib/data";
import type { Product } from "@/lib/types";
import BrandLogo from "@/components/BrandLogo";
import ArticleThumb from "@/components/ArticleThumb";

/* ---------- Icon set (SVG line, không dùng emoji) ---------- */
function Ic({ n, className = "w-6 h-6" }: { n: string; className?: string }) {
  const p: Record<string, React.ReactNode> = {
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" /></>,
    tv: <><rect x="2" y="7" width="20" height="13" rx="2" /><path d="m8 3 4 4 4-4" /></>,
    phone: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
    receipt: <><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1Z" /><path d="M8 7h8M8 11h8M8 15h5" /></>,
    pen: <><path d="M12 19l7-7a2.8 2.8 0 0 0-4-4l-7 7-1 5 5-1Z" /><path d="M15 6l3 3" /></>,
    cloud: <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.8A3.5 3.5 0 0 0 6.5 19Z" />,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    award: <><circle cx="12" cy="8" r="5" /><path d="m9 12-2 9 5-3 5 3-2-9" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /></>,
    net: <><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v4M12 11 6 17M12 11l6 6" /></>,
    headset: <><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><path d="M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2ZM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" /><path d="M18 16v1a3 3 0 0 1-3 3h-3" /></>,
    check: <path d="m5 12 5 5L20 7" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 6 10 7 10-7" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    shield: <><path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5Z" /><path d="m9 12 2 2 4-4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {p[n] ?? p.globe}
    </svg>
  );
}

const QUICK_CATS = [
  { name: "Internet", desc: "Cáp quang tốc độ cao, ổn định", icon: "globe" },
  { name: "Truyền hình MyTV", desc: "Hơn 180 kênh đặc sắc", icon: "tv" },
  { name: "Vinaphone", desc: "Di động 4G/5G ưu đãi vượt trội", icon: "phone" },
  { name: "Hóa đơn điện tử", desc: "Tiết kiệm, an toàn, đúng luật", icon: "receipt" },
  { name: "Chữ ký số", desc: "SmartCA – ký mọi lúc, mọi nơi", icon: "pen" },
  { name: "Cloud & Data Center", desc: "Hạ tầng số hiện đại, bảo mật", icon: "cloud" },
  { name: "Giải pháp số", desc: "Chuyển đổi số toàn diện", icon: "layers" },
];

const AUDIENCES = [
  { title: "Cá nhân", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop" },
  { title: "Hộ kinh doanh", img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=600&auto=format&fit=crop" },
  { title: "Doanh nghiệp", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop" },
  { title: "Cơ quan nhà nước", img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=600&auto=format&fit=crop" },
  { title: "Trường học", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" },
  { title: "Bệnh viện", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" },
];

const PROMOS = [
  { tag: "INTERNET SIÊU TỐC ĐỘ", big: "20%", sub: "Ưu đãi cực sốc gói FiberVNN" },
  { tag: "COMBO INTERNET + MYTV", big: "205K", sub: "Chỉ từ 205.000đ/tháng" },
  { tag: "HÓA ĐƠN ĐIỆN TỬ", big: "50%", sub: "Tiết kiệm chi phí khi đăng ký mới" },
  { tag: "CHỮ KÝ SỐ SMARTCA", big: "30%", sub: "Ưu đãi khi đăng ký gói 2 năm" },
];

const STATS = [
  { icon: "award", num: "20+", label: "Năm kinh nghiệm" },
  { icon: "users", num: "100.000+", label: "Khách hàng tin tưởng" },
  { icon: "net", num: "500+", label: "Đối tác toàn quốc" },
  { icon: "headset", num: "24/7", label: "Hỗ trợ tận tâm" },
];

const WHY = [
  { icon: "shield", title: "Bảo mật chuẩn quốc tế", desc: "Hệ thống đạt chuẩn ISO/IEC 27001, an toàn dữ liệu tuyệt đối." },
  { icon: "net", title: "Hạ tầng mạnh mẽ", desc: "Kết nối 63 tỉnh thành, backbone quang tốc độ cao." },
  { icon: "clock", title: "Triển khai nhanh", desc: "Khảo sát và lắp đặt trong ngày, bàn giao đúng hẹn." },
  { icon: "headset", title: "Hỗ trợ 24/7", desc: "Đội ngũ kỹ thuật túc trực, xử lý sự cố tận nơi." },
  { icon: "award", title: "Thương hiệu 25+ năm", desc: "Đơn vị viễn thông quốc gia, hàng triệu khách hàng tin dùng." },
  { icon: "layers", title: "Giải pháp toàn diện", desc: "Từ viễn thông đến chuyển đổi số cho mọi ngành nghề." },
];

const STEPS = [
  { t: "Khảo sát nhu cầu", d: "Tiếp nhận & phân tích yêu cầu" },
  { t: "Tư vấn giải pháp", d: "Đề xuất gói dịch vụ phù hợp" },
  { t: "Triển khai", d: "Thi công, cài đặt nhanh chóng" },
  { t: "Nghiệm thu", d: "Kiểm tra & bàn giao" },
  { t: "Vận hành & hỗ trợ", d: "Đồng hành, hỗ trợ 24/7" },
];

const LOGOS = [
  { name: "BIDV", slug: "bidv", color: "#007A53" },
  { name: "Vietcombank", slug: "vietcombank", color: "#00984A" },
  { name: "Hòa Phát", slug: "hoaphat", color: "#0056A3" },
  { name: "Viettel Post", slug: "viettelpost", color: "#EE0033" },
  { name: "FPT", slug: "fpt", color: "#F37021" },
  { name: "VinFast", slug: "vinfast", color: "#001E50" },
];

const FAQS = [
  { q: "Lắp đặt Internet VNPT mất bao lâu?", a: "Thông thường trong 24h làm việc kể từ khi đăng ký, tùy khu vực và hạ tầng sẵn có." },
  { q: "Tôi có thể kiểm tra hạ tầng tại nhà không?", a: "Có. Bạn để lại địa chỉ, nhân viên sẽ khảo sát miễn phí và báo kết quả nhanh chóng." },
  { q: "Chữ ký số SmartCA có cần USB Token không?", a: "Không. SmartCA ký từ xa qua điện thoại/máy tính, chỉ cần Internet là ký được mọi lúc mọi nơi." },
  { q: "Hóa đơn điện tử VNPT có đúng quy định thuế không?", a: "Có. VNPT Invoice đáp ứng đầy đủ Nghị định 123/2020 và Thông tư 78/2021, kết nối trực tiếp Tổng cục Thuế." },
  { q: "Có sự cố thì liên hệ hỗ trợ thế nào?", a: "Gọi hotline 0838.999.333 hoặc Zalo OA — đội ngũ kỹ thuật hỗ trợ 24/7 và có mặt tận nơi khi cần." },
];

export default function HomePage() {
  const articles = getAllArticles().slice(0, 4);
  const featured = getFeaturedProducts(8);

  return (
    <div className="bg-slate-50">
      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-vnpt-darker via-vnpt to-vnpt-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:26px_26px]" />
        <div className="mx-auto max-w-7xl px-4 py-14 lg:py-20 relative grid lg:grid-cols-12 gap-10 items-center">
          {/* Left */}
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              VNPT Nam Sài Gòn
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-[1.12] uppercase">
              Chuyển đổi số toàn diện<br />
              <span className="text-vnpt-accent">cùng VNPT Nam Sài Gòn</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-blue-100">
              Giải pháp số tin cậy cho Cá nhân, Hộ kinh doanh, Doanh nghiệp và Cơ quan Nhà nước — triển khai nhanh, hỗ trợ tận nơi 24/7.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/lien-he" className="inline-flex items-center gap-2 rounded-lg bg-vnpt-accent px-7 py-3.5 font-bold shadow-lg shadow-vnpt-accent/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all">
                <Ic n="headset" className="w-5 h-5" /> Tư vấn ngay
              </Link>
              <Link href="/san-pham" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 font-bold hover:bg-white hover:text-vnpt transition-all">
                Xem sản phẩm <Ic n="arrow" className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-blue-100/90">
              {["Thương hiệu 25+ năm", "Kết nối 63 tỉnh thành", "Đạt chuẩn ISO/IEC 27001"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <Ic n="check" className="w-4 h-4 text-vnpt-accent" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white text-slate-800 p-6 shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold text-vnpt text-center">ĐĂNG KÝ TƯ VẤN</h3>
              <p className="text-center text-sm text-slate-500 mt-1">Chúng tôi sẽ liên hệ với bạn!</p>
              <form className="mt-5 space-y-3">
                <Field icon="user" placeholder="Họ và tên *" />
                <Field icon="phone" placeholder="Số điện thoại *" />
                <Field icon="mail" placeholder="Email" />
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-600 focus:outline-none focus:border-vnpt">
                    <option>Nhu cầu quan tâm</option>
                    <option>Internet / Truyền hình</option>
                    <option>Hóa đơn điện tử</option>
                    <option>Chữ ký số</option>
                    <option>Cloud &amp; Data Center</option>
                  </select>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-vnpt"><Ic n="layers" className="w-5 h-5" /></span>
                </div>
                <textarea rows={2} placeholder="Lời nhắn" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:border-vnpt resize-none" />
                <button type="button" className="w-full rounded-lg bg-vnpt py-3.5 font-bold text-white hover:bg-vnpt-dark transition-colors">
                  GỬI THÔNG TIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HÀNG DANH MỤC ===== */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-10">
        <div className="rounded-2xl bg-white shadow-xl shadow-slate-200/70 border border-slate-100 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {QUICK_CATS.map((c) => (
            <Link key={c.name} href="/san-pham" className="group flex flex-col items-center text-center rounded-xl p-4 hover:bg-vnpt-light transition-colors">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-vnpt-light text-vnpt group-hover:bg-vnpt group-hover:text-white transition-colors">
                <Ic n={c.icon} className="w-7 h-7" />
              </span>
              <span className="mt-3 text-sm font-bold text-slate-800 group-hover:text-vnpt leading-tight">{c.name}</span>
              <span className="mt-1 text-[11px] text-slate-500 leading-tight">{c.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SẢN PHẨM NỔI BẬT ===== */}
      <section className="mx-auto max-w-7xl px-4 pt-16">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <SectionTitle sub="Đa dạng lựa chọn cho bạn">Sản phẩm & dịch vụ nổi bật</SectionTitle>
          <Link href="/san-pham" className="text-sm font-semibold text-vnpt hover:underline whitespace-nowrap">Xem tất cả →</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductMini key={p.id} p={p} />)}
        </div>
      </section>

      {/* ===== GIẢI PHÁP THEO ĐỐI TƯỢNG ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle sub="Đồng hành cùng mọi khách hàng">Giải pháp theo đối tượng</SectionTitle>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {AUDIENCES.map((a) => (
            <Link key={a.title} href="/san-pham" className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.img} alt={a.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-vnpt-darker/90 via-vnpt-darker/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <h3 className="font-bold">{a.title}</h3>
                <span className="text-xs text-vnpt-accent font-semibold inline-flex items-center gap-1 mt-1">
                  Xem giải pháp <Ic n="arrow" className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TẠI SAO + QUY TRÌNH ===== */}
      <section className="bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-vnpt-accent mb-2">Cam kết chất lượng</div>
            <h2 className="text-3xl font-extrabold uppercase text-slate-900">Tại sao chọn VNPT Nam Sài Gòn?</h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-vnpt-accent mx-auto" />
          </div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="flex gap-4 rounded-2xl border border-slate-100 p-5 hover:border-vnpt/30 hover:shadow-md transition-all">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-vnpt-light text-vnpt shrink-0"><Ic n={w.icon} className="w-6 h-6" /></span>
                <div>
                  <h3 className="font-bold text-slate-800">{w.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-vnpt-accent mb-2">Đơn giản – Nhanh chóng</div>
            <h2 className="text-3xl font-extrabold uppercase text-slate-900">Quy trình triển khai</h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-vnpt-accent mx-auto" />
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.t} className="text-center">
                <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-vnpt text-white font-extrabold text-lg shadow-lg shadow-vnpt/30">{i + 1}</div>
                <h3 className="mt-4 font-bold text-slate-800">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-500">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KHUYẾN MÃI + TIN TỨC ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 grid lg:grid-cols-2 gap-10">
        {/* Khuyến mãi */}
        <div>
          <SectionTitle sub="Ưu đãi có thời hạn" small>Khuyến mãi nổi bật</SectionTitle>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {PROMOS.map((p) => (
              <div key={p.tag} className="rounded-2xl bg-gradient-to-br from-vnpt to-vnpt-darker text-white p-5 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/5" />
                <div className="text-[11px] font-bold uppercase tracking-wide text-blue-100">{p.tag}</div>
                <div className="mt-3 text-4xl font-extrabold text-vnpt-accent">{p.big}</div>
                <div className="mt-2 text-sm text-blue-100 leading-snug">{p.sub}</div>
                <Link href="/khuyen-mai" className="mt-4 inline-flex items-center gap-1 text-xs font-bold bg-white/15 hover:bg-vnpt-accent px-3 py-1.5 rounded-lg transition-colors">
                  Xem chi tiết <Ic n="arrow" className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Tin tức */}
        <div>
          <div className="flex items-end justify-between">
            <SectionTitle sub="Cập nhật mới nhất" small>Tin tức mới</SectionTitle>
            <Link href="/tin-tuc" className="text-sm font-semibold text-vnpt hover:underline whitespace-nowrap">Xem tất cả →</Link>
          </div>
          <div className="mt-6 space-y-4">
            {articles.map((a) => (
              <Link key={a.id} href={`/tin-tuc/${a.slug}`} className="group flex gap-4 rounded-xl bg-white border border-slate-100 p-3 hover:shadow-md hover:border-vnpt/30 transition-all">
                <div className="w-28 h-20 shrink-0 overflow-hidden rounded-lg">
                  <ArticleThumb src={a.images[0]} alt={a.title} />
                </div>
                <div className="min-w-0">
                  {a.category && <div className="text-[11px] font-bold uppercase text-vnpt">{a.category}</div>}
                  <h3 className="mt-1 font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-vnpt">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KHÁCH HÀNG TIÊU BIỂU ===== */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-vnpt-accent mb-2">Được tin dùng bởi</div>
          <h2 className="text-3xl font-extrabold uppercase text-slate-900">Khách hàng tiêu biểu</h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-vnpt-accent mx-auto" />
        </div>
        <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4">
          {LOGOS.map((l) => (
            <BrandLogo key={l.name} name={l.name} slug={l.slug} color={l.color} />
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-white border-y border-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-vnpt-accent mb-2">Giải đáp thắc mắc</div>
            <h2 className="text-3xl font-extrabold uppercase text-slate-900">Câu hỏi thường gặp</h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-vnpt-accent mx-auto" />
          </div>
          <div className="mt-8 space-y-3">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ===== CTA BAND ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-vnpt to-vnpt-darker text-white p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/5" />
          <div className="absolute -left-10 -bottom-10 w-52 h-52 rounded-full bg-vnpt-accent/10" />
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase relative">Sẵn sàng chuyển đổi số cùng bạn</h2>
          <p className="mt-3 text-blue-100 max-w-2xl mx-auto relative">Để lại thông tin, chuyên viên VNPT Nam Sài Gòn sẽ tư vấn giải pháp phù hợp nhất — hoàn toàn miễn phí.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4 relative">
            <Link href="/lien-he" className="rounded-lg bg-vnpt-accent px-8 py-3.5 font-bold hover:bg-orange-600 transition-colors">Đăng ký tư vấn ngay</Link>
            <a href="tel:0838999333" className="rounded-lg border border-white/40 px-8 py-3.5 font-bold hover:bg-white hover:text-vnpt transition-colors">Hotline: 0838.999.333</a>
          </div>
        </div>
      </section>

      {/* ===== THANH SỐ LIỆU ===== */}
      <section className="bg-vnpt-darker text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4 justify-center">
              <span className="grid place-items-center w-14 h-14 rounded-full bg-white/10 text-vnpt-accent shrink-0">
                <Ic n={s.icon} className="w-7 h-7" />
              </span>
              <div>
                <div className="text-3xl font-extrabold leading-none">{s.num}</div>
                <div className="text-sm text-blue-100 mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */
function Field({ icon, placeholder }: { icon: string; placeholder: string }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-vnpt"><Ic n={icon} className="w-5 h-5" /></span>
      <input placeholder={placeholder} className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-vnpt" />
    </div>
  );
}

function SectionTitle({ children, sub, small }: { children: React.ReactNode; sub?: string; small?: boolean }) {
  return (
    <div>
      {sub && <div className="text-xs font-bold uppercase tracking-widest text-vnpt-accent mb-2">{sub}</div>}
      <h2 className={`font-extrabold text-slate-900 ${small ? "text-2xl" : "text-3xl"} uppercase`}>
        {children}
      </h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-vnpt-accent" />
    </div>
  );
}

function ProductMini({ p }: { p: Product }) {
  return (
    <Link href={`/san-pham/${p.slug}`} className="group flex flex-col rounded-2xl bg-white border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="h-40 bg-vnpt-light overflow-hidden">
        {p.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.images[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="grid place-items-center h-full text-vnpt/30 text-3xl font-black">VNPT</div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] font-bold uppercase text-vnpt">{p.category}</div>
        <h3 className="mt-1 font-bold text-slate-800 line-clamp-2 group-hover:text-vnpt">{p.title}</h3>
        <p className="mt-1 text-sm text-slate-500 line-clamp-2 flex-1">{p.shortDesc || "Giải pháp số của VNPT."}</p>
        <span className="mt-3 text-sm font-semibold text-vnpt-accent inline-flex items-center gap-1">
          Xem chi tiết <Ic n="arrow" className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white overflow-hidden">
      <summary className="flex items-center justify-between gap-3 cursor-pointer px-5 py-4 font-semibold text-slate-800 hover:text-vnpt list-none [&::-webkit-details-marker]:hidden">
        {q}
        <span className="text-vnpt-accent text-2xl leading-none transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{a}</div>
    </details>
  );
}
