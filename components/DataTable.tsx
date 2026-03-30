type DataTableProps = {
  columns: string[];
  rows: string[][];
};

export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto rounded-[1.7rem] border border-[rgba(16,36,61,0.1)] bg-[rgba(255,255,255,0.85)] shadow-[0_18px_42px_rgba(16,36,61,0.08)]">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-[linear-gradient(90deg,_rgba(16,36,61,0.06),_rgba(191,138,74,0.12))]">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-[rgba(16,36,61,0.08)] px-5 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-slate-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="align-top odd:bg-white even:bg-[rgba(247,241,234,0.52)]">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className="border-b border-[rgba(16,36,61,0.08)] px-5 py-4 leading-7 text-slate-700"
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
