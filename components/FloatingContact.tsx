'use client';
import Link from 'next/link';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Nút Gọi ngay */}
      <a
        href="tel:0838999333"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span className="absolute right-14 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-md opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">Gọi ngay</span>
      </a>

      {/* Nút Zalo */}
      <a
        href="https://zalo.me/0838999333"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <span className="absolute right-14 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-md opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">Chat Zalo</span>
      </a>

      {/* Nút Đăng ký tư vấn */}
      <button
        onClick={() => {
          window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
        }}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-vnpt-accent text-white shadow-lg shadow-vnpt-accent/30 transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span className="absolute right-14 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-md opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">Đăng ký tư vấn</span>
      </button>
    </div>
  );
}
