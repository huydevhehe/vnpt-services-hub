import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-[5px] border-vnpt">
      <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-12">
        {/* Cột 1: Thông tin */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3 bg-white/10 w-max p-2 rounded-xl">
            <div className="w-10 h-10 bg-white text-vnpt flex items-center justify-center rounded-lg font-bold text-xl tracking-tighter">
              VNPT
            </div>
            <div className="flex flex-col pr-2">
              <span className="font-bold text-lg text-white leading-tight">VNPT NAM SÀI GÒN</span>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Trung tâm Kinh doanh VNPT Thành phố Hồ Chí Minh - Trực thuộc chi nhánh Tổng Công ty Dịch vụ Viễn thông. Cung cấp các giải pháp số, viễn thông hàng đầu Việt Nam.
          </p>
          <div className="space-y-2 text-sm">
            <p className="flex items-start gap-2">
              <span className="text-vnpt-accent font-bold mt-0.5">📍</span>
              Số 123 Nguyễn Văn Linh, P. Tân Thuận Tây, Quận 7, TP.HCM
            </p>
            <p className="flex items-start gap-2">
              <span className="text-vnpt-accent font-bold">📞</span>
              0838.999.333
            </p>
            <p className="flex items-start gap-2">
              <span className="text-vnpt-accent font-bold">✉️</span>
              info@vnptnamsaigon.vn
            </p>
          </div>
        </div>

        {/* Cột 2: Dịch vụ tiêu biểu */}
        <div>
          <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-vnpt-accent rounded-full"></span>
            DỊCH VỤ TIÊU BIỂU
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/san-pham/internet-cap-quang-fiber-vnn" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Internet Cáp quang (FiberVNN)</Link></li>
            <li><Link href="/san-pham/truyen-hinh-mytv" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Truyền hình MyTV</Link></li>
            <li><Link href="/san-pham/chu-ky-so-vnpt-ca" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Chữ ký số VNPT CA / SmartCA</Link></li>
            <li><Link href="/san-pham/hoa-don-dien-tu-vnpt-invoice" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Hóa đơn điện tử VNPT Invoice</Link></li>
            <li><Link href="/san-pham/may-chu-ao-vnpt-cloud" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Máy chủ ảo VNPT Cloud</Link></li>
            <li><Link href="/san-pham/hop-dong-dien-tu-vnpt-econtract" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Hợp đồng điện tử eContract</Link></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ */}
        <div>
          <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-vnpt-accent rounded-full"></span>
            HỖ TRỢ KHÁCH HÀNG
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/huong-dan" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Hướng dẫn sử dụng dịch vụ</Link></li>
            <li><Link href="/bao-hong" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Báo hỏng / Sự cố mạng</Link></li>
            <li><Link href="/thanh-toan" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Hướng dẫn thanh toán</Link></li>
            <li><Link href="/chinh-sach-bao-mat" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Chính sách bảo mật</Link></li>
            <li><Link href="/dieu-khoan" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all">Điều khoản sử dụng</Link></li>
            <li><Link href="/ctv" className="hover:text-white hover:underline decoration-vnpt-accent underline-offset-4 transition-all text-vnpt-accent font-medium">Đăng ký Đại lý / CTV</Link></li>
          </ul>
        </div>

        {/* Cột 4: Kết nối */}
        <div>
          <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-vnpt-accent rounded-full"></span>
            KẾT NỐI VỚI CHÚNG TÔI
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Quét mã Zalo OA để nhận hỗ trợ nhanh nhất và các ưu đãi độc quyền.
          </p>
          <div className="bg-white p-2 rounded-xl inline-block mb-4">
            <div className="w-28 h-28 bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
              <span className="text-slate-500 font-medium text-sm text-center">QR Code<br/>Zalo OA</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-vnpt transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 mt-4 mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} VNPT Nam Sài Gòn. Đã đăng ký bản quyền.</p>
        <div className="flex gap-4">
          <Link href="/dieu-khoan" className="hover:text-slate-300">Điều khoản</Link>
          <Link href="/bao-mat" className="hover:text-slate-300">Bảo mật</Link>
          <Link href="/sitemap" className="hover:text-slate-300">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
