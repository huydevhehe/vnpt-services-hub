import { getSourceById } from "@/lib/data";

const COLORS: Record<string, string> = {
  cloud: "bg-sky-100 text-sky-800",
  digishop: "bg-emerald-100 text-emerald-800",
  metronet: "bg-indigo-100 text-indigo-800",
  onesme: "bg-amber-100 text-amber-800",
  "vnpt-technology": "bg-rose-100 text-rose-800",
  vnptit: "bg-violet-100 text-violet-800",
};

export default function SourceBadge({
  sourceId,
  className = "",
}: {
  sourceId: string;
  className?: string;
}) {
  const source = getSourceById(sourceId);
  const name = source?.name ?? sourceId;
  const color = COLORS[sourceId] ?? "bg-vnpt-light text-vnpt-dark";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${color} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {name}
    </span>
  );
}
