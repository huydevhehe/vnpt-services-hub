import Link from "next/link";
import { getCategories } from "@/lib/data";

export default function ProductSidebar({ activeCategory }: { activeCategory?: string }) {
  const categories = getCategories();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <h3 className="font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-vnpt"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        Danh Mục Sản Phẩm
      </h3>
      <ul className="space-y-1">
        {categories.map((c) => {
          const isActive = activeCategory === c.name;
          return (
            <li key={c.name}>
              <Link 
                href={`/san-pham?category=${c.name}`}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-vnpt-light text-vnpt font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-vnpt'}`}
              >
                <span>{c.name}</span>
                <span className={`text-xs ${isActive ? 'bg-vnpt text-white' : 'bg-slate-100 text-slate-400'} px-2 py-0.5 rounded-full`}>
                  {c.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      
      {/* Quảng cáo nội bộ (Banner nhỏ) */}
      <div className="mt-8 rounded-xl bg-gradient-to-br from-vnpt to-vnpt-dark text-white p-5 text-center relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-md"></div>
        <h4 className="font-bold mb-2">Đăng ký đại lý</h4>
        <p className="text-xs text-white/80 mb-4">Trở thành đối tác phân phối dịch vụ VNPT với chiết khấu hấp dẫn.</p>
        <Link href="/ctv" className="inline-block px-4 py-2 bg-white text-vnpt text-xs font-bold rounded-lg shadow-md hover:bg-slate-50 transition-colors">
          Xem chính sách
        </Link>
      </div>
    </div>
  );
}
