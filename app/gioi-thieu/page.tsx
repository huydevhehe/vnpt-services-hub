import Link from "next/link";

export const metadata = { title: "Giới thiệu • VNPT Nam Sài Gòn" };

export default function GioiThieuPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-vnpt-darker text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Về VNPT Nam Sài Gòn</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Trung tâm kinh doanh VNPT Thành phố Hồ Chí Minh - Trực thuộc chi nhánh Tổng công ty dịch vụ viễn thông (VNPT VinaPhone).
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-vnpt mb-6">Tầm Nhìn & Sứ Mệnh</h2>
          <div className="prose prose-slate max-w-none text-lg">
            <p>
              VNPT Nam Sài Gòn tự hào là đơn vị tiên phong trong việc cung cấp các giải pháp viễn thông, công nghệ thông tin và dịch vụ số tại khu vực phía Nam. 
            </p>
            <p>
              Với sứ mệnh "Trở thành nhà cung cấp dịch vụ số hàng đầu, đồng hành cùng doanh nghiệp và người dân trên hành trình chuyển đổi số", chúng tôi cam kết mang đến những sản phẩm công nghệ hiện đại, chất lượng cao và dịch vụ chăm sóc khách hàng tận tâm nhất.
            </p>
            <h3>Giá trị cốt lõi</h3>
            <ul>
              <li><strong>Khách hàng là trung tâm:</strong> Mọi hoạt động đều hướng tới sự hài lòng của khách hàng.</li>
              <li><strong>Sáng tạo & Tiên phong:</strong> Không ngừng đổi mới công nghệ để bắt kịp xu hướng toàn cầu.</li>
              <li><strong>Tin cậy & Trách nhiệm:</strong> Xây dựng niềm tin bền vững, phát triển cùng cộng đồng.</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-vnpt-accent mb-2">20+</div>
              <p className="text-slate-600 font-medium">Năm phát triển</p>
            </div>
            <div>
              <div className="text-4xl font-black text-vnpt-accent mb-2">1M+</div>
              <p className="text-slate-600 font-medium">Khách hàng tin dùng</p>
            </div>
            <div>
              <div className="text-4xl font-black text-vnpt-accent mb-2">99%</div>
              <p className="text-slate-600 font-medium">Độ phủ sóng mạng lưới</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
