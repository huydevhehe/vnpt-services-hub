'use client';
import Link from "next/link";
import { useMemo, useState } from "react";

/* ---------- Kiểu dữ liệu ---------- */
type Prod = { slug: string; title: string; category: string };

/* ---------- Hoa hồng & giá tham khảo theo nhóm ---------- */
function commissionOf(category: string): number {
  if (/Cloud/i.test(category)) return 12;
  if (/CNTT|chuyển đổi/i.test(category)) return 18;
  if (/Thiết bị/i.test(category)) return 10;
  if (/MetroNet|Truyền số liệu/i.test(category)) return 12;
  return 15;
}
function priceHintOf(category: string): string {
  if (/Cloud/i.test(category)) return "từ 180.000đ/tháng";
  if (/Thiết bị/i.test(category)) return "từ 1.200.000đ";
  if (/MetroNet|Truyền số liệu/i.test(category)) return "từ 3.000.000đ/tháng";
  return "Liên hệ báo giá";
}

/* ---------- Icon nhỏ (SVG thuần) ---------- */
function NavIcon({ k }: { k: string }) {
  const p: Record<string, React.ReactNode> = {
    overview: <><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>,
    products: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22" x2="12" y2="12" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
    orders: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></>,
    commission: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    withdraw: <><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></>,
    profile: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {p[k]}
    </svg>
  );
}

/* ---------- Biểu đồ vùng (doanh thu) ---------- */
function AreaChart({ data, labels }: { data: number[]; labels: string[] }) {
  const W = 580, H = 210, P = 28;
  const max = Math.max(...data) * 1.15;
  const stepX = (W - P * 2) / (data.length - 1);
  const pts = data.map((v, i) => [P + i * stepX, H - P - (v / max) * (H - P * 2)] as const);
  const line = pts.map((pt, i) => `${i ? "L" : "M"}${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - P} L${pts[0][0].toFixed(1)},${H - P} Z`;
  const grid = [0, 0.25, 0.5, 0.75, 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#005baa" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#005baa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {grid.map((g) => {
        const y = P + g * (H - P * 2);
        return <line key={g} x1={P} y1={y} x2={W - P} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="#005baa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((pt, i) => (
        <circle key={i} cx={pt[0]} cy={pt[1]} r="3.5" fill="#fff" stroke="#005baa" strokeWidth="2" />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={P + i * stepX} y={H - 6} textAnchor="middle" fontSize="11" fill="#94a3b8">{l}</text>
      ))}
    </svg>
  );
}

/* ---------- Biểu đồ cột (số đơn) ---------- */
function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const W = 580, H = 210, P = 28;
  const max = Math.max(...data) * 1.2;
  const bw = (W - P * 2) / data.length * 0.55;
  const gap = (W - P * 2) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {[0, 0.25, 0.5, 0.75, 1].map((g) => {
        const y = P + g * (H - P * 2);
        return <line key={g} x1={P} y1={y} x2={W - P} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
      })}
      {data.map((v, i) => {
        const h = (v / max) * (H - P * 2);
        const x = P + i * gap + (gap - bw) / 2;
        const y = H - P - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx="4" fill="#005baa" opacity={i === data.length - 2 ? 1 : 0.82} />
            <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#00468c">{v}</text>
            <text x={x + bw / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="#94a3b8">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Dữ liệu mẫu ---------- */
const MONTHS = ["T2", "T3", "T4", "T5", "T6", "T7"];
const REVENUE = [128, 156, 142, 198, 231, 248]; // triệu đồng
const ORDERS = [22, 31, 27, 38, 44, 41];

type Order = { id: string; product: string; customer: string; value: string; commission: string; status: "done" | "approved" | "pending" | "processing" };
const ORDER_ROWS: Order[] = [
  { id: "#DH-2048", product: "VNPT Cloud Server", customer: "Cty CP Đại Nam", value: "21.600.000đ", commission: "2.592.000đ", status: "done" },
  { id: "#DH-2047", product: "VNPT SmartCA Doanh nghiệp", customer: "Cty TNHH Minh Phát", value: "3.960.000đ", commission: "990.000đ", status: "approved" },
  { id: "#DH-2046", product: "VNPT Invoice (Hoá đơn điện tử)", customer: "Nhà thuốc An Khang", value: "2.400.000đ", commission: "480.000đ", status: "pending" },
  { id: "#DH-2045", product: "MetroNet 100Mbps", customer: "Bệnh viện Quận 7", value: "24.455.000đ", commission: "2.934.600đ", status: "done" },
  { id: "#DH-2044", product: "VNPT eGov 2.0", customer: "UBND Phường 5", value: "Liên hệ", commission: "—", status: "processing" },
  { id: "#DH-2043", product: "Camera doanh nghiệp", customer: "Cty Logistics Sài Gòn", value: "8.900.000đ", commission: "1.068.000đ", status: "done" },
];
const STATUS_MAP = {
  done: { label: "Hoàn tất", cls: "bg-green-100 text-green-700" },
  approved: { label: "Đã duyệt", cls: "bg-blue-100 text-blue-700" },
  pending: { label: "Chờ duyệt", cls: "bg-amber-100 text-amber-700" },
  processing: { label: "Đang xử lý", cls: "bg-slate-100 text-slate-600" },
};

const NAV = [
  { k: "overview", label: "Tổng quan" },
  { k: "products", label: "Sản phẩm giới thiệu" },
  { k: "link", label: "Link & QR giới thiệu" },
  { k: "orders", label: "Đơn giới thiệu" },
  { k: "commission", label: "Hoa hồng" },
  { k: "withdraw", label: "Rút tiền" },
  { k: "profile", label: "Hồ sơ" },
];

/* ================= COMPONENT CHÍNH ================= */
export default function CtvDashboard({ products }: { products: Prod[] }) {
  const [section, setSection] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const REF = "CTV00123";
  const baseLink = `https://vnptnamsaigon.vn/?ref=${REF}`;

  const [copied, setCopied] = useState<string | null>(null);
  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const [linkProduct, setLinkProduct] = useState(products[0]?.slug ?? "");
  const genLink = useMemo(() => {
    const p = products.find((x) => x.slug === linkProduct);
    return p ? `https://vnptnamsaigon.vn/san-pham/${p.slug}?ref=${REF}` : baseLink;
  }, [linkProduct, products, baseLink]);
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&color=002f5e&data=${encodeURIComponent(genLink)}`;

  const current = NAV.find((n) => n.k === section)!;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* ===== SIDEBAR ===== */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-col bg-gradient-to-b from-vnpt-darker to-[#001c3a] text-white transition-transform md:static md:flex md:translate-x-0 ${mobileNav ? "flex translate-x-0" : "hidden -translate-x-full"}`}>
        <div className="flex h-16 items-center gap-2 px-6 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-vnpt font-black text-sm">VNPT</div>
          <div className="leading-tight">
            <div className="text-sm font-bold">Cổng Cộng Tác Viên</div>
            <div className="text-[10px] text-white/50">VNPT Nam Sài Gòn</div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {NAV.map((n) => (
            <button
              key={n.k}
              onClick={() => { setSection(n.k); setMobileNav(false); }}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                section === n.k ? "bg-vnpt text-white shadow-lg shadow-vnpt/30" : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <NavIcon k={n.k} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 p-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white">
            <span>←</span> Quay về trang chủ
          </Link>
        </div>
      </aside>

      {mobileNav && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setMobileNav(false)} />}

      {/* ===== MAIN ===== */}
      <div className="flex-1 md:ml-0">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-600" onClick={() => setMobileNav(true)} aria-label="menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900">{current.label}</h1>
              <p className="text-xs text-slate-500">Xin chào, Nguyễn Văn A 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 sm:inline-flex">Hạng Vàng</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-vnpt to-vnpt-dark font-bold text-white">A</div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-8">
          {/* ============ TỔNG QUAN ============ */}
          {section === "overview" && (
            <>
              {/* KPI */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Doanh thu giới thiệu", value: "247.850.000đ", delta: "+14,2%", up: true },
                  { label: "Hoa hồng khả dụng", value: "24.680.000đ", delta: "+9,3%", up: true, accent: true },
                  { label: "Đơn thành công", value: "138", delta: "+12 đơn", up: true },
                  { label: "Lượt click link", value: "4.512", delta: "−2,3%", up: false },
                ].map((k) => (
                  <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{k.label}</div>
                    <div className={`mt-2 text-2xl font-black ${k.accent ? "text-vnpt-accent" : "text-slate-900"}`}>{k.value}</div>
                    <div className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${k.up ? "text-green-600" : "text-red-500"}`}>
                      {k.up ? "▲" : "▼"} {k.delta}
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 font-bold text-slate-900">Doanh thu giới thiệu (triệu đ)</h3>
                  <AreaChart data={REVENUE} labels={MONTHS} />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-4 font-bold text-slate-900">Số đơn theo tháng</h3>
                  <BarChart data={ORDERS} labels={MONTHS} />
                </div>
              </div>

              {/* Recent orders */}
              <OrdersTable rows={ORDER_ROWS.slice(0, 4)} title="Đơn giới thiệu gần đây" onViewAll={() => setSection("orders")} />
            </>
          )}

          {/* ============ SẢN PHẨM GIỚI THIỆU ============ */}
          {section === "products" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(0,91,170,0.14)]">
                  <span className="w-fit rounded-full bg-vnpt-light px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-vnpt">{p.category}</span>
                  <h3 className="mt-3 font-bold text-slate-900 leading-snug">{p.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{priceHintOf(p.category)}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="rounded-lg bg-green-50 px-2.5 py-1 text-sm font-bold text-green-700">Hoa hồng {commissionOf(p.category)}%</span>
                  </div>
                  <button
                    onClick={() => { setLinkProduct(p.slug); setSection("link"); }}
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-vnpt py-2.5 text-sm font-bold text-white transition-colors hover:bg-vnpt-dark"
                  >
                    <NavIcon k="link" /> Tạo link giới thiệu
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ============ LINK & QR ============ */}
          {section === "link" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900">Link giới thiệu chung</h3>
                  <p className="mt-1 text-sm text-slate-500">Mọi khách truy cập qua link này đều được gắn mã CTV của bạn.</p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input readOnly value={baseLink} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none" />
                    <button onClick={() => copy(baseLink, "base")} className="whitespace-nowrap rounded-lg bg-vnpt px-5 py-2.5 text-sm font-bold text-white hover:bg-vnpt-dark">
                      {copied === "base" ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900">Tạo link theo sản phẩm</h3>
                  <p className="mt-1 text-sm text-slate-500">Chọn dịch vụ để tạo link + mã QR dẫn thẳng tới trang sản phẩm.</p>
                  <select
                    value={linkProduct}
                    onChange={(e) => setLinkProduct(e.target.value)}
                    className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20"
                  >
                    {products.map((p) => (
                      <option key={p.slug} value={p.slug}>{p.title} — HH {commissionOf(p.category)}%</option>
                    ))}
                  </select>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <input readOnly value={genLink} className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none" />
                    <button onClick={() => copy(genLink, "gen")} className="whitespace-nowrap rounded-lg bg-vnpt-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600">
                      {copied === "gen" ? "Đã sao chép!" : "Sao chép"}
                    </button>
                  </div>
                </div>
              </div>

              {/* QR */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <h3 className="font-bold text-slate-900">Mã QR</h3>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrSrc} alt="QR link giới thiệu" className="mx-auto mt-4 h-40 w-40 rounded-xl border border-slate-100" />
                <p className="mt-3 text-xs text-slate-500">Khách quét mã sẽ vào đúng trang sản phẩm kèm mã CTV.</p>
                <a href={qrSrc} download className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-vnpt-light py-2.5 text-sm font-bold text-vnpt hover:bg-vnpt hover:text-white">
                  Tải mã QR
                </a>
              </div>
            </div>
          )}

          {/* ============ ĐƠN GIỚI THIỆU ============ */}
          {section === "orders" && (
            <OrdersTable rows={ORDER_ROWS} title="Tất cả đơn giới thiệu" showFilter />
          )}

          {/* ============ HOA HỒNG ============ */}
          {section === "commission" && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { l: "Tổng hoa hồng", v: "86.420.000đ", c: "text-slate-900" },
                  { l: "Khả dụng", v: "24.680.000đ", c: "text-vnpt-accent" },
                  { l: "Đã đối soát", v: "61.740.000đ", c: "text-green-600" },
                ].map((x) => (
                  <div key={x.l} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="text-sm text-slate-500">{x.l}</div>
                    <div className={`mt-2 text-2xl font-black ${x.c}`}>{x.v}</div>
                  </div>
                ))}
              </div>
              <OrdersTable rows={ORDER_ROWS} title="Lịch sử hoa hồng theo đơn" />
            </>
          )}

          {/* ============ RÚT TIỀN ============ */}
          {section === "withdraw" && (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                <div className="flex items-center gap-2 text-amber-800">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  <span className="font-bold">Tính năng rút tiền — Sắp có</span>
                </div>
                <p className="mt-2 text-sm text-amber-800/90">
                  Ví điện tử & rút tiền tự động đang được phát triển. Hiện tại hoa hồng được kế toán đối soát và chi trả thủ công vào <b>ngày 15 hàng tháng</b>. Bạn vẫn có thể lưu sẵn thông tin ngân hàng bên cạnh.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">Thông tin nhận tiền</h3>
                <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="Chủ tài khoản" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20" />
                  <input placeholder="Số tài khoản" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20" />
                  <input placeholder="Ngân hàng" className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20" />
                  <button className="w-full rounded-lg bg-vnpt py-2.5 text-sm font-bold text-white hover:bg-vnpt-dark">Lưu thông tin</button>
                </form>
              </div>
            </div>
          )}

          {/* ============ HỒ SƠ ============ */}
          {section === "profile" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-vnpt to-vnpt-dark text-2xl font-black text-white">A</div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Nguyễn Văn A</h3>
                  <p className="text-sm text-slate-500">Mã CTV: {REF} · Hạng Vàng · Tham gia 03/2025</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Số điện thoại", "0912 *** 333"],
                  ["Email", "ctv.a@gmail.com"],
                  ["Khu vực", "TP. Hồ Chí Minh"],
                  ["CMND/CCCD", "0790******"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-400">{l}</div>
                    <div className="mt-1 font-semibold text-slate-800">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Bảng đơn tái sử dụng ---------- */
function OrdersTable({ rows, title, showFilter, onViewAll }: { rows: Order[]; title: string; showFilter?: boolean; onViewAll?: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
        <h3 className="font-bold text-slate-900">{title}</h3>
        {showFilter ? (
          <div className="flex gap-2">
            {["Tất cả", "Hoàn tất", "Chờ duyệt"].map((f, i) => (
              <button key={f} className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-vnpt text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{f}</button>
            ))}
          </div>
        ) : onViewAll ? (
          <button onClick={onViewAll} className="text-sm font-semibold text-vnpt hover:underline">Xem tất cả →</button>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Mã đơn</th>
              <th className="px-6 py-3 font-semibold">Sản phẩm</th>
              <th className="px-6 py-3 font-semibold">Khách hàng</th>
              <th className="px-6 py-3 font-semibold text-right">Giá trị</th>
              <th className="px-6 py-3 font-semibold text-right">Hoa hồng</th>
              <th className="px-6 py-3 font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">{o.id}</td>
                <td className="px-6 py-4 text-slate-700">{o.product}</td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">{o.customer}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-slate-700">{o.value}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right font-bold text-vnpt">{o.commission}</td>
                <td className="px-6 py-4">
                  <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_MAP[o.status].cls}`}>{STATUS_MAP[o.status].label}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
