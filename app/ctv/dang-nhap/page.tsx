'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginCTVPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Giả lập login/register thành công sau 1 giây
    setTimeout(() => {
      setLoading(false);
      router.push("/ctv/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-vnpt text-white flex items-center justify-center rounded-xl font-bold text-2xl tracking-tighter shadow-lg">
            VNPT
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Cổng Đối Tác VNPT
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Bạn chưa có tài khoản? " : "Đã có tài khoản? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-vnpt hover:text-vnpt-dark">
            {isLogin ? "Đăng ký ngay" : "Đăng nhập tại đây"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                <div className="mt-1">
                  <input type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-vnpt focus:border-vnpt sm:text-sm" placeholder="Nguyễn Văn A" />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Số điện thoại / Tên đăng nhập</label>
              <div className="mt-1">
                <input type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-vnpt focus:border-vnpt sm:text-sm" placeholder="09xxxx" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <div className="mt-1">
                <input type="password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-vnpt focus:border-vnpt sm:text-sm" placeholder="••••••••" />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-vnpt focus:ring-vnpt border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-vnpt hover:text-vnpt-dark">
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-vnpt hover:bg-vnpt-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vnpt disabled:opacity-70 transition-colors"
              >
                {loading ? "Đang xử lý..." : (isLogin ? "Đăng nhập" : "Đăng ký")}
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">Tài khoản chỉ sử dụng để Demo. Bạn có thể nhập bất kỳ thông tin nào để trải nghiệm.</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
