// Render thân bài đã cào cho gọn đẹp:
// - Dòng "## ..." -> tiêu đề phụ.
// - Đoạn văn xuôi thật -> giữ nguyên.
// - Chuỗi dài các "mảnh vụn" (ô bảng, số rời rạc do cào flatten) -> gom thành 1 dòng ghi chú,
//   tránh đổ ra hàng trăm dòng số làm trang dài vô tận. (VD bảng giá MetroNet)

function isFragment(line: string): boolean {
  const t = line.trim();
  if (!t) return true;
  // chỉ gồm số / ký hiệu (ô bảng giá)
  if (/^[\d.,%\s/x×+\-–—()đ]+$/i.test(t)) return true;
  // cụm rất ngắn, ít từ (tiêu đề cột / ô bảng: "TT", "Loại cổng", "Nội hạt", "FE"...)
  const words = t.split(/\s+/).length;
  if (t.length <= 26 && words <= 3) return true;
  return false;
}

export default function ScrapedBody({ text }: { text: string }) {
  const raw = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

  type Block = { type: "heading" | "para"; text: string } | { type: "note"; count: number };
  const blocks: Block[] = [];
  let run = 0;

  const flushRun = () => {
    if (run === 0) return;
    // Chuỗi mảnh vụn đủ dài -> nén thành ghi chú; ngắn thì bỏ luôn cho sạch.
    if (run >= 5) blocks.push({ type: "note", count: run });
    run = 0;
  };

  for (const line of raw) {
    if (line.startsWith("## ")) {
      flushRun();
      blocks.push({ type: "heading", text: line.slice(3) });
    } else if (isFragment(line)) {
      run++;
    } else {
      flushRun();
      blocks.push({ type: "para", text: line });
    }
  }
  flushRun();

  return (
    <div className="space-y-3 leading-relaxed text-slate-700">
      {blocks.map((b, i) => {
        if (b.type === "heading")
          return (
            <h3 key={i} className="pt-2 text-lg font-bold text-slate-900">
              {b.text}
            </h3>
          );
        if (b.type === "note")
          return (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-vnpt">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              Bảng số liệu chi tiết — xem đầy đủ ở tab <b className="mx-1 text-vnpt">Bảng giá</b>.
            </div>
          );
        return <p key={i}>{b.text}</p>;
      })}
    </div>
  );
}
