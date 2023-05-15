import { ArrowDownUp, ArrowUpAZ, ArrowUpZA } from "lucide-react";

export default function HeaderTable({ headerGroups, getColumnClassName }) {
  return (
    <div className='flex items-center justify-between w-full text-base font-bold font-nunito text-dark-slate-grey h-[58px] mb-2'>
      {headerGroups.map((headerGroup, index) => (
        <div className='flex items-center justify-between w-full h-full' key={index}>
          {headerGroup.headers.map((column) => (
            <span
              className={`flex items-center justify-start h-full ${getColumnClassName(column.id)}`}
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={column.id}
            >
              <>
                {!column.disableSortBy ?
                  (column.isSorted ?
                    (column.isSortedDesc ?
                      <>
                        <ArrowUpZA />
                        {column.render("Header")}
                      </>
                      :
                      <>
                        <ArrowUpAZ />
                        {column.render("Header")}
                      </>
                    )
                    :
                    <>
                      <ArrowDownUp />
                      {column.render("Header")}
                    </>
                  )
                  :
                  (column.render("Header"))
                }
              </>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
