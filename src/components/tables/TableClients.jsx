import handleNameFormat from '@/functions/formatName';
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { useMemo } from 'react';
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import CustomPagination from '../CustomPagination';
import HeaderTable from '../HeaderTable';
import NotFoundSearch from '../NotFoundSearch';
import RowsTable from '../RowsTable';
import IconCreateCharge from '../icons/IconCreateCharge';
import InputSearch from '../inputs/InputSearch';

export default function TableClients({ clients }) {
  const { textNotification, openNotificationWindow, setOpenModalRegisterCharge, setClientCreateChange } = useUser()

  function handleCreateChangeClick(client) {
    if (openNotificationWindow) {
      return
    }
    setOpenModalRegisterCharge(true)
    setClientCreateChange(client)
  }

  function getColumnClassName(column) {
    const name = column;

    if (name === 'name') {
      return 'w-[186px] capitalize gap-3';
    } else if (name === 'cpf') {
      return 'w-[181px]';
    } else if (name === 'email') {
      return 'w-[250px]';

    } else if (name === 'phone') {
      return 'w-[163px]';

    } else if (name === 'defaulter') {
      return 'w-[161px]';

    } else if (name === 'create_change') {
      return 'w-[127px] gap-1';

    }
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Cliente',
        accessor: "name",
        Cell: ({ value, row }) => (
          <Link href={`/client/${row.original.id}`}>{handleNameFormat(value)}</Link>
        )
      },
      {
        Header: "CPF",
        accessor: "cpf",
        Cell: ({ value }) => {
          return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1 $2 $3 $4")
        },
        disableSortBy: true
      },
      {
        Header: "E-mail",
        accessor: "email",
        disableSortBy: true
      },
      {
        Header: "Telefone",
        accessor: "phone",
        Cell: ({ value }) => {
          return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "$1 $2 $3 $4")
        },
        disableGlobalFilter: true,
        disableSortBy: true
      },
      {
        Header: "Status",
        accessor: "defaulter",
        Cell: ({ value, index }) => (
          <span key={index} className={`w-[110px] text-center font-semibold rounded-lg ${value ? 'text-overdue-text bg-overdue' : 'bg-paid text-paid-text'}`}>
            {`${value ? 'Inadimplente' : 'Em dia'}`}
          </span>
        ),
        disableSortBy: true
      },
      {
        Header: "Criar Cobrança", accessor: "create_change", Cell: ({ row }) => (
          <IconCreateCharge key={row.original} onClick={() => handleCreateChangeClick(row.original)} />
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
      columns: columns,
      data: clients,
      initialState: { pagename: 0 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  return (
    <>
      {
        clients &&
        <>
          <div className='w-full h-auto bg-white rounded-4xl pt-3 px-8 pb-2 relative'>
            <HeaderTable
              headerGroups={headerGroups}
              getColumnClassName={getColumnClassName}
            />
            {rows.length > 0 ? (
              <>
                <RowsTable
                  page={page}
                  prepareRow={prepareRow}
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

            {/* {
              openNotificationWindow ?
                <NotificationWindow style={{ gap: 11 }} >
                  {textNotification}
                </NotificationWindow>
                :
                ""
            } */}
          </div>

        </>
      }
    </>

  );
}

