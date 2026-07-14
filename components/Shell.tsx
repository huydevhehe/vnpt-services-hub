'use client';
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import DemoSwitch from "@/components/DemoSwitch";

/** Bọc nội dung site. Ẩn header/footer/nút nổi ở khu vực dashboard CTV (đứng riêng như một app). */
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname?.startsWith("/ctv/dashboard");

  if (bare) return <>{children}</>;

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">{children}</main>
      <Footer />
      <FloatingContact />
      <DemoSwitch />
    </>
  );
}
