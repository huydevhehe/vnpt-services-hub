'use client';
import { useState } from "react";

export default function StickyContactForm({ productName }: { productName: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Giả lập call API 1 giây
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000); // Tắt toast sau 5s
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-24">
      <div className="bg-vnpt p-5 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
        <h3 className="font-bold text-lg relative z-10">Đăng Ký Tư Vấn</h3>
        <p className="text-xs text-white/80 mt-1 relative z-10">Miễn phí 100% - Phản hồi trong 15 phút</p>
      </div>
      
      <div className="p-5">
        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h4 className="font-bold text-green-800 mb-1">Gửi thành công!</h4>
            <p className="text-xs text-green-600">Chuyên viên VNPT sẽ liên hệ với bạn trong giây lát.</p>
            <button onClick={() => setSuccess(false)} className="mt-4 text-xs font-semibold text-green-700 underline">Gửi yêu cầu khác</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Dịch vụ quan tâm</label>
              <input 
                type="text" 
                value={productName} 
                readOnly 
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                required 
                placeholder="Nhập họ tên của bạn"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
              <input 
                type="tel" 
                required 
                placeholder="Nhập số điện thoại"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ghi chú thêm</label>
              <textarea 
                rows={2}
                placeholder="Nhu cầu cụ thể của bạn..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm outline-none focus:border-vnpt focus:ring-2 focus:ring-vnpt/20 transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-vnpt-accent text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                "Gửi Yêu Cầu"
              )}
            </button>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Thông tin của bạn được bảo mật tuyệt đối.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
