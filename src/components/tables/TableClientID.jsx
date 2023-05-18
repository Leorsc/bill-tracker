import useUser from '@/hooks/useUser';
import { useMemo } from 'react';
import { usePagination, useSortBy, useTable } from "react-table";
import IconDeleteChange from '../icons/IconDeleteCharge';
import IconEditChange from '../icons/IconEditCharge';
import HeaderTable from '../HeaderTable';
import RowsTable from '../RowsTable';
import CustomPagination from '../customs/CustomPagination';
import handleValueFormat from '@/functions/formatValue';
import handleDateFormat from '@/functions/formatDate';
import handleTextLimiter from '@/functions/textLimiter';
import NotificationWindow from '../NotificationWindow';


export default function TableClientID({ chargesClient, clientName }) {

  const {
    setOpenModalDetailsCharge,
    setChargeDetails,
    openNotificationWindowError,
    openNotificationWindow,
    textNotification,
    typeNotification } = useUser()

  function handleOpenModalDetailsCharge(detailsCharge) {
    const updatedCharger = {
      ...detailsCharge,
      client_name: clientName
    };
    setOpenModalDetailsCharge(true)
    setChargeDetails(updatedCharger)
  }


  function getColumnClassName(column) {
    const name = column;

    if (name === 'id') {
      return 'w-40 gap-3';
    } else if (name === 'due_date') {
      return 'w-44 gap-3';
    } else if (name === 'value') {
      return 'w-32';

    } else if (name === 'status') {
      return 'w-32';

    } else if (name === 'description') {
      return 'w-80';

    } else if (name === 'icons') {
      return 'w-[127px] gap-4';

    }
  }

  const colunas = useMemo(
    () => [
      {
        Header: 'ID Cob.',
        accessor: "id",
        Cell: ({ value, row }) => (
          <span className='cursor-pointer' onClick={() => handleOpenModalDetailsCharge(row.original)}>{value}</span>
        )
      },
      {
        Header: 'Data de venc.',
        accessor: "due_date",
        Cell: ({ value }) => {
          const formattedDate = handleDateFormat(value)
          return formattedDate;
        }
      },
      {
        Header: "Valor",
        accessor: "value",
        Cell: ({ value }) => {
          const formatValue = handleValueFormat(value)
          return formatValue;
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
          handleTextLimiter(value)
        ),
        disableSortBy: true
      },
      {
        Header: "", accessor: "icons",
        Cell: ({ row }) => (
          <>
            <IconEditChange charge={row.original} clientName={clientName} />
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
    page,
    pageCount,
    gotoPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    state
  } = useTable(
    {
      columns: colunas,
      data: chargesClient,
      initialState: { pageIndex: 0, pageSize: 3 }
    },
    useSortBy,
    usePagination,
  );

  return (
    <>
      {
        chargesClient &&
        <>
          <div className='w-full h-auto rounded-4xl bg-white py-3 px-6'>
            <HeaderTable
              headerGroups={headerGroups}
              getColumnClassName={getColumnClassName}
              table={'ClientID'}
            />
            <RowsTable
              page={page}
              prepareRow={prepareRow}
              getColumnClassName={getColumnClassName}
            />
            <CustomPagination
              values={chargesClient}
              state={state}
              gotoPage={gotoPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              setPageSize={setPageSize}
              pageCount={pageCount}
              alternative={false}
            />
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


