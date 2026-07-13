'use client';
import { useState } from "react";

export default function LienHePage() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <section className="bg-vnpt-darker text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-vnpt opacity-50 mix-blend-multiply"></div>
        <div className="mx-auto max-w-7xl px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn 24/7.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Thông tin liên hệ</h2>
            <p className="text-slate-600 mb-8">Nếu bạn cần hỗ trợ khẩn cấp, vui lòng gọi điện thoại trực tiếp qua đường dây nóng. Đội ngũ CSKH của VNPT sẽ hỗ trợ bạn lập tức.</p>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-vnpt-light text-vnpt rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">📍</div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Địa chỉ giao dịch</h3>
              <p className="text-slate-600 mt-1">Số 123 Nguyễn Văn Linh, P. Tân Thuận Tây, Quận 7, TP.HCM</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-vnpt-light text-vnpt rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">📞</div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Hotline tư vấn (24/7)</h3>
              <p className="text-vnpt-accent font-bold text-xl mt-1">0838.999.333</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-vnpt-light text-vnpt rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">✉️</div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Email hỗ trợ</h3>
              <p className="text-slate-600 mt-1">info@vnptnamsaigon.vn</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Gửi yêu cầu hỗ trợ</h3>
          {success ? (
             <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
             <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
             <h4 className="font-bold text-green-800 text-xl mb-2">Đã gửi tin nhắn!</h4>
             <p className="text-green-600">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi qua email trong thời gian sớm nhất.</p>
             <button onClick={() => setSuccess(false)} className="mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Gửi tin khác</button>
           </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên *</label>
                  <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20" placeholder="Tên của bạn" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại *</label>
                  <input type="tel" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20" placeholder="09..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nội dung cần hỗ trợ *</label>
                <textarea required rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20 resize-none" placeholder="Vui lòng mô tả chi tiết..."></textarea>
              </div>
              <button type="submit" className="w-full bg-vnpt text-white font-bold py-4 rounded-xl hover:bg-vnpt-dark transition-colors shadow-md shadow-vnpt/30 text-lg">
                Gửi Tin Nhắn
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
