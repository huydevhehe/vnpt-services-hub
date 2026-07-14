/**
 * Nút chuyển sang bản demo Nexvio (Giao diện 1 = bản này, Giao diện 2 = Nexvio).
 * - Trên server (deploy chung 1 cổng qua Nginx): "/" và "/nexvio/" cùng domain.
 * - Local dev (2 cổng riêng 3000/8080): trỏ thẳng sang cổng kia để bấm qua lại được luôn.
 */
export default function DemoSwitch() {
  const href = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/nexvio/";

  return (
    <a
      href={href}
      className="fixed right-4 top-28 z-50 flex items-center gap-2 rounded-full border border-vnpt/20 bg-vnpt-darker px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-vnpt-accent">
        <path d="M17 3 21 7 17 11" /><path d="M21 7H9a4 4 0 0 0-4 4v1" /><path d="M7 21 3 17l4-4" /><path d="M3 17h12a4 4 0 0 0 4-4v-1" />
      </svg>
      Xem Giao diện 2
    </a>
  );
}
