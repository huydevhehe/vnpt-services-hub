'use client';
import Link from "next/link";
import { useState } from "react";

export default function AdminDummyPage() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel (Demo)</h1>
            <p className="text-sm text-slate-500">Quản lý nội dung, sản phẩm, bảng giá hiển thị trên web.</p>
          </div>
          <Link href="/" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
            Xem Website
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button className="px-6 py-4 font-bold text-vnpt border-b-2 border-vnpt">Quản lý Sản phẩm</button>
            <button className="px-6 py-4 font-medium text-slate-500 hover:text-slate-800">Quản lý Bảng giá</button>
            <button className="px-6 py-4 font-medium text-slate-500 hover:text-slate-800">Cấu hình Giao diện</button>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSave} className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl mb-6">
                <p className="text-sm font-medium text-orange-800">
                  Đây là giao diện mô phỏng Admin để sếp có thể hình dung luồng nhập liệu. Dữ liệu thực tế hiện tại đang đọc từ file `data/*.json`. Chỉnh sửa ở đây sẽ không thay đổi JSON thực.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tên sản phẩm</label>
                <input type="text" defaultValue="Internet Cáp quang FiberVNN" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:border-vnpt" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả ngắn</label>
                <textarea rows={3} defaultValue="Internet cáp quang siêu tốc độ dành cho Hộ gia đình và Doanh nghiệp." className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:border-vnpt"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Giá hiển thị (từ)</label>
                  <input type="text" defaultValue="165.000 ₫/tháng" className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:border-vnpt" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Danh mục</label>
                  <select className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:border-vnpt">
                    <option>Băng rộng cố định</option>
                    <option>Chữ ký số</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" className="px-6 py-2.5 border border-slate-300 rounded-lg font-medium hover:bg-slate-50">Hủy</button>
                <button type="submit" className="px-6 py-2.5 bg-vnpt text-white font-bold rounded-lg hover:bg-vnpt-dark">Lưu Thay Đổi</button>
              </div>
            </form>
          </div>
        </div>

        {showToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-2xl font-medium animate-bounce">
            ✅ Đã lưu dữ liệu thành công!
          </div>
        )}
      </div>
    </div>
  );
}
