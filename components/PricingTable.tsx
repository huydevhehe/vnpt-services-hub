import type { Pricing } from "@/lib/types";

export default function PricingTable({ table }: { table: Pricing }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full border-collapse text-sm">
        {table.columns.length > 0 && (
          <thead>
            <tr className="bg-vnpt text-white">
              {table.columns.map((c, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-3 py-2 text-left font-semibold"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {table.rows.map((row, ri) => (
            <tr
              key={ri}
              className={ri % 2 === 0 ? "bg-white" : "bg-vnpt-light/40"}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="border-t border-slate-100 px-3 py-2 align-top text-slate-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
