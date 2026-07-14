import { getAllProducts } from "@/lib/data";
import CtvDashboard from "@/components/CtvDashboard";

export const metadata = { title: "Dashboard Cộng tác viên • VNPT Nam Sài Gòn" };

export default function DashboardPage() {
  // Lấy sản phẩm thật đã cào, trải đều theo nhóm để CTV tạo link
  const all = getAllProducts();
  const perCat = new Map<string, number>();
  const picked = all.filter((p) => {
    // bỏ mấy mục không phải sản phẩm bán được
    if (/về chúng tôi|affiliate|kiếm tiền/i.test(p.title)) return false;
    const n = perCat.get(p.category) ?? 0;
    if (n >= 3) return false;
    perCat.set(p.category, n + 1);
    return true;
  });

  const products = picked.map((p) => ({
    slug: p.slug,
    title: p.title.length > 60 ? p.title.slice(0, 58) + "…" : p.title,
    category: p.category,
  }));

  return <CtvDashboard products={products} />;
}
