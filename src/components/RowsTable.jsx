export default function RowsTable({ page, prepareRow, getColumnClassName }) {
  return (
    <>
      {page.map((row) => {
        prepareRow(row);
        return (
          <div className="flex items-center justify-between w-full h-14 py-2 text-graphite font-nunito text-sm border-t border-line-table" key={row.id}>
            {row.cells.map((cell) => (
              <span
                className={`flex items-center justify-start h-full ${getColumnClassName(cell.column.id)}`}
                key={`${row.id}-${cell.column.id}`}
              >
                {cell.render("Cell")}
              </span>
            ))}
          </div>
        );
      })}
    </>
  );
}

