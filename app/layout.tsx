import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["vietnamese", "latin"],
  variable: "--font-jakarta",
});

const beVN = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vn",
});

export const metadata: Metadata = {
  title: "VNPT Nam Sài Gòn - Đồng hành cùng bạn trên hành trình Chuyển đổi số",
  description: "Giải pháp số toàn diện cho Cá nhân, Hộ kinh doanh, Doanh nghiệp và Cơ quan Nhà nước.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${beVN.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-800">
        <Header />
        <main className="flex-1 bg-white">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
