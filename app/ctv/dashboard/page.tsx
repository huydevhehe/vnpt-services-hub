'use client';
import Link from "next/link";
import { useState } from "react";

export default function DashboardCTV() {
  const [copied, setCopied] = useState(false);
  const myLink = "https://vnptnamsaigon.vn/ref?id=CTV_NGUYENVANA_99";

  const handleCopy = () => {
    navigator.clipboard.writeText(myLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="font-bold text-xl text-white">VNPT <span className="text-vnpt-accent">Đối tác</span></Link>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <button className="bg-vnpt text-white text-left px-4 py-2.5 rounded-lg font-medium">📊 Tổng quan</button>
          <button className="text-slate-400 hover:text-white hover:bg-white/5 text-left px-4 py-2.5 rounded-lg font-medium transition-colors">📦 Đơn hàng của tôi</button>
          <button className="text-slate-400 hover:text-white hover:bg-white/5 text-left px-4 py-2.5 rounded-lg font-medium transition-colors">💰 Lịch sử hoa hồng</button>
          <button className="text-slate-400 hover:text-white hover:bg-white/5 text-left px-4 py-2.5 rounded-lg font-medium transition-colors">👤 Thông tin cá nhân</button>
        </div>
        <div className="mt-auto p-4 border-t border-white/10">
          <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm">
            <span>&larr;</span> Quay về trang chủ
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-4 sm:px-8">
          <h1 className="text-lg font-bold text-slate-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-slate-800">Nguyễn Văn A</div>
              <div className="text-xs text-slate-500">Đại lý cấp 1</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-vnpt text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>

        <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
          {/* Box Lấy Link */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Link Giới Thiệu Của Bạn</h2>
              <p className="text-sm text-slate-500">Copy link này và gửi cho khách hàng để được ghi nhận hoa hồng.</p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input type="text" readOnly value={myLink} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm text-slate-600 font-medium w-full sm:w-80 outline-none" />
              <button onClick={handleCopy} className="bg-vnpt text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-vnpt-dark transition-colors whitespace-nowrap">
                {copied ? "Đã Copy!" : "Copy Link"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-2">Tổng số lượt click</div>
              <div className="text-3xl font-black text-slate-800">1,248</div>
              <div className="text-xs text-green-500 mt-2 font-medium">↑ +12% so với tháng trước</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-2">Đơn hàng thành công</div>
              <div className="text-3xl font-black text-vnpt">42</div>
              <div className="text-xs text-green-500 mt-2 font-medium">↑ +5% so với tháng trước</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="text-slate-500 text-sm font-medium mb-2">Hoa hồng tạm tính</div>
              <div className="text-3xl font-black text-vnpt-accent">12.500.000 ₫</div>
              <div className="text-xs text-slate-400 mt-2 font-medium">Chưa đối soát</div>
            </div>
          </div>

          {/* Bảng đơn hàng gần đây */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h2 className="font-bold text-slate-900">Đơn Hàng Mới Nhất</h2>
              <button className="text-sm font-medium text-vnpt hover:underline">Xem tất cả</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Mã Đơn</th>
                    <th className="px-6 py-3 font-medium">Dịch vụ</th>
                    <th className="px-6 py-3 font-medium">Khách hàng</th>
                    <th className="px-6 py-3 font-medium">Ngày Tạo</th>
                    <th className="px-6 py-3 font-medium">Trạng thái</th>
                    <th className="px-6 py-3 font-medium text-right">Hoa hồng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">#ORD-9921</td>
                    <td className="px-6 py-4 text-slate-600">Internet FiberVNN 150Mbps</td>
                    <td className="px-6 py-4 text-slate-600">0912***333</td>
                    <td className="px-6 py-4 text-slate-500">14/07/2026</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Hoàn thành</span></td>
                    <td className="px-6 py-4 text-right font-bold text-vnpt">300.000 ₫</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">#ORD-9920</td>
                    <td className="px-6 py-4 text-slate-600">Chữ ký số SmartCA 3 năm</td>
                    <td className="px-6 py-4 text-slate-600">CTY TNHH XYZ</td>
                    <td className="px-6 py-4 text-slate-500">13/07/2026</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Đang xử lý</span></td>
                    <td className="px-6 py-4 text-right font-bold text-slate-400">---</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">#ORD-9919</td>
                    <td className="px-6 py-4 text-slate-600">Hóa đơn điện tử 5000 số</td>
                    <td className="px-6 py-4 text-slate-600">CTY ABC</td>
                    <td className="px-6 py-4 text-slate-500">10/07/2026</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Hoàn thành</span></td>
                    <td className="px-6 py-4 text-right font-bold text-vnpt">650.000 ₫</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Thông báo rút tiền */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-sm">
            <span className="text-xl">ℹ️</span>
            <div>
              <strong className="text-blue-900 block mb-1">Tính năng Rút tiền đang được nâng cấp</strong>
              <p className="text-blue-700">Để đảm bảo an toàn giao dịch, tính năng rút tiền tự động qua hệ thống đang tạm đóng để nâng cấp. Trong thời gian này, hoa hồng sẽ được kế toán đối soát thủ công vào ngày 15 hàng tháng. Xin cảm ơn sự đồng hành của bạn!</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
