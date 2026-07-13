import Link from "next/link";

export const metadata = { title: "Cộng tác viên (Affiliate) • VNPT Nam Sài Gòn" };

export default function CTVLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-vnpt-darker text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-vnpt-dark opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="mx-auto max-w-6xl px-4 relative z-10 text-center">
          <span className="inline-block px-3 py-1 bg-vnpt-accent rounded-full text-xs font-bold uppercase tracking-widest mb-6">Chương Trình Đối Tác</span>
          <h1 className="text-4xl md:text-5xl font-black mb-6">Trở Thành Đối Tác VNPT<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Nhận Hoa Hồng Lên Đến 30%</span></h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">Đăng ký làm Đại lý/Cộng tác viên phân phối dịch vụ viễn thông, chữ ký số, hóa đơn điện tử để gia tăng thu nhập không giới hạn.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ctv/dang-nhap" className="bg-vnpt-accent text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition-transform hover:scale-105 shadow-xl shadow-vnpt-accent/20">
              Đăng ký / Đăng nhập
            </Link>
            <a href="#quy-trinh" className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-colors">
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </section>

      {/* Quyền lợi */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Đặc Quyền Của Bạn</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💰</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Hoa hồng hấp dẫn</h3>
              <p className="text-slate-600">Nhận chiết khấu trực tiếp lên đến 30% cho mỗi dịch vụ đăng ký thành công qua link Affiliate của bạn.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Không cần bỏ vốn</h3>
              <p className="text-slate-600">Không áp doanh số, không rủi ro tài chính. Bạn chỉ việc giới thiệu, phần còn lại để VNPT lo.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📊</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Hệ thống minh bạch</h3>
              <p className="text-slate-600">Quản lý link giới thiệu, theo dõi đơn hàng và đối soát doanh thu real-time trên Dashboard riêng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quy trình */}
      <section id="quy-trinh" className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16">Quy Trình 4 Bước Đơn Giản</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="w-12 h-12 mx-auto bg-vnpt text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 relative z-10 shadow-lg shadow-vnpt/30">1</div>
              <h4 className="font-bold text-slate-900 mb-2">Đăng ký tài khoản</h4>
              <p className="text-sm text-slate-500">Hoàn thành form đăng ký thông tin đại lý/CTV.</p>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-slate-200"></div>
            </div>
            <div className="relative">
              <div className="w-12 h-12 mx-auto bg-vnpt text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 relative z-10 shadow-lg shadow-vnpt/30">2</div>
              <h4 className="font-bold text-slate-900 mb-2">Lấy Link Affiliate</h4>
              <p className="text-sm text-slate-500">Truy cập Dashboard để tạo link giới thiệu riêng.</p>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-slate-200"></div>
            </div>
            <div className="relative">
              <div className="w-12 h-12 mx-auto bg-vnpt text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 relative z-10 shadow-lg shadow-vnpt/30">3</div>
              <h4 className="font-bold text-slate-900 mb-2">Chia sẻ & Giới thiệu</h4>
              <p className="text-sm text-slate-500">Gửi link cho khách hàng có nhu cầu sử dụng dịch vụ.</p>
              <div className="hidden md:block absolute top-6 left-1/2 w-full h-[2px] bg-slate-200"></div>
            </div>
            <div className="relative">
              <div className="w-12 h-12 mx-auto bg-vnpt-accent text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 relative z-10 shadow-lg shadow-vnpt-accent/30">4</div>
              <h4 className="font-bold text-slate-900 mb-2">Nhận Hoa Hồng</h4>
              <p className="text-sm text-slate-500">Khách hàng lắp đặt thành công, hoa hồng sẽ được ghi nhận.</p>
            </div>
          </div>
          <div className="mt-16">
            <Link href="/ctv/dang-nhap" className="inline-block bg-vnpt px-8 py-3 rounded-full text-white font-bold hover:bg-vnpt-dark transition-colors shadow-md">
              Bắt Đầu Ngay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
