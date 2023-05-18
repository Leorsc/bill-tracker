import useUser from '@/hooks/useUser';
import { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import IconDeleteChange from '../icons/IconDeleteCharge';
import IconEditChange from '../icons/IconEditCharge';
import HeaderTable from '../HeaderTable';
import RowsTable from '../RowsTable';
import CustomPagination from '../customs/CustomPagination';
import handleValueFormat from '@/functions/formatValue';
import handleDateFormat from '@/functions/formatDate';
import handleTextLimiter from '@/functions/textLimiter';
import handleNameFormat from '@/functions/formatName';
import InputSearch from '../inputs/InputSearch';
import NotFoundSearch from '../NotFoundSearch';
import Link from 'next/link';
import NotificationWindow from '../NotificationWindow';


export default function TableCharges({ charges }) {

  const {
    setOpenModalDetailsCharge,
    setChargeDetails,
    openNotificationWindowError,
    openNotificationWindow,
    textNotification,
    typeNotification } = useUser()

  function handleOpenModalDetailsCharge(detailsCharge) {
    setOpenModalDetailsCharge(true)
    setChargeDetails(detailsCharge)
  }


  function getColumnClassName(column) {
    const name = column;

    if (name === 'client_name') {
      return 'w-40 gap-3';
    } else if (name === 'id') {
      return 'w-44 gap-3';
    } else if (name === 'value') {
      return 'w-32';

    } else if (name === 'due_date') {
      return 'w-32';

    } else if (name === 'status') {
      return 'w-[120px]';

    } else if (name === 'description') {
      return 'w-[300px]';

    } else if (name === 'icons') {
      return 'w-[127px] gap-4';

    }
  }

  const colunas = useMemo(
    () => [
      {
        Header: 'Client',
        accessor: "client_name",
        Cell: ({ value, row }) => (
          <Link href={`/client/${row.original.client_id}`}>{handleNameFormat(value)}</Link>
        )
      },
      {
        Header: 'ID Cob.',
        accessor: "id",
        Cell: ({ value, row }) => (
          <span className='cursor-pointer ' onClick={() => handleOpenModalDetailsCharge(row.original)}>{value}</span>
        )
      },
      {
        Header: "Valor",
        accessor: "value",
        Cell: ({ value }) => {
          const formatValue = handleValueFormat(value)
          return formatValue;
        },
        disableGlobalFilter: true,
        disableSortBy: true
      },
      {
        Header: "Data de venc.",
        accessor: "due_date",
        Cell: ({ value }) => {
          const formattedDate = handleDateFormat(value)
          return formattedDate;
        },
        disableSortBy: true

      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value, row }) => {
          const { due_date } = row.original;
          const today = new Date();

          if (value === 'paid') {
            return <span className='px-2 rounded-lg font-nunito font-semibold text-sm bg-paid text-paid-text'>Pago</span>
          } else if (value === 'pending' && new Date(due_date) < today) {
            return <span className='px-2 rounded-lg font-nunito font-semibold text-sm bg-overdue text-overdue-text'>Vencida</span>
          } else if (value === 'pending') {
            return <span className='px-2 rounded-lg font-nunito font-semibold text-sm bg-pending text-pending-text'>Pendente</span>
          } else if (value === 'overdue') {
            return <span className='px-2 rounded-lg font-nunito font-semibold text-sm bg-overdue text-overdue-text'>Vencida</span>
          }
        },
        disableSortBy: true
      },
      {
        Header: "Descrição",
        accessor: "description",
        Cell: ({ value }) => (
          handleTextLimiter(value, 32)

        ),
        disableGlobalFilter: true,
        disableSortBy: true
      },
      {
        Header: "",
        accessor: "icons",
        Cell: ({ row }) => (
          <>
            <IconEditChange clientName={row.original.client_name} charge={row.original} />
            <IconDeleteChange charge={row.original} />
          </>
        ),
        disableSortBy: true
      },
    ],
    []
  );

  const {
    headerGroups,
    prepareRow,
    rows,
    page,
    pageCount,
    gotoPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    state
  } = useTable(
    {
      columns: colunas,
      data: charges,
      initialState: { pageIndex: 0 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <>
      {
        charges &&
        <>
          <div className='w-full h-auto rounded-4xl bg-white py-3 px-6 relative'>
            <HeaderTable
              headerGroups={headerGroups}
              getColumnClassName={getColumnClassName}
              table={'charges'}
            />
            {rows.length > 0 ? (
              <>
                <RowsTable
                  page={page}
                  prepareRow={prepareRow}
                  table={'charges'}
                  getColumnClassName={getColumnClassName}
                />
                <CustomPagination
                  values={rows}
                  state={state}
                  gotoPage={gotoPage}
                  canPreviousPage={canPreviousPage}
                  canNextPage={canNextPage}
                  setPageSize={setPageSize}
                  pageCount={pageCount}
                  alternative={true}
                />
              </>
            ) : (
              <NotFoundSearch />
            )}
            <div className='absolute -top-[70px] right-0'>
              <InputSearch
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </div>
            {openNotificationWindowError || openNotificationWindow ?
              <NotificationWindow type={typeNotification} style={{ gap: 11 }} >
                {textNotification}
              </NotificationWindow>
              :
              ''
            }
          </div>
        </>
      }
    </>

  );
}


