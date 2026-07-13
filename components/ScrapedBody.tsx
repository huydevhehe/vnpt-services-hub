// Render thân bài đã cào: dòng bắt đầu "## " -> tiêu đề phụ, còn lại -> đoạn văn.

export default function ScrapedBody({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  return (
    <div className="space-y-2 leading-relaxed text-slate-700">
      {lines.map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="pt-2 text-lg font-bold text-slate-900">
              {line.slice(3)}
            </h3>
          );
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
