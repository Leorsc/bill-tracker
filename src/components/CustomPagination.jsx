import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function CustomPagination({
  values,
  state,
  gotoPage,
  canPreviousPage,
  canNextPage,
  setPageSize,
  pageCount,
  alternative
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevValues, setPrevValues] = useState([]);
  const [pages, setPages] = useState([])
  const visiblePages = pageCount < 5 ? pageCount : 5;

  useEffect(() => {
    setPages(getPageNumbers())
  }, [state.pageIndex, values])

  useEffect(() => {
    setCurrentPage(1)
  }, [values])


  function getPageNumbers() {
    const pageNumbers = [];

    if (values !== prevValues) {
      setPrevValues(values);
      return Array.from({ length: visiblePages }, (_, i) => i + 1);
    }

    if (pageCount < visiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }

    } else if (currentPage <= Math.floor(visiblePages / 2)) {
      for (let i = 1; i <= visiblePages && i <= pageCount; i++) {
        pageNumbers.push(i);
      }

    } else if (currentPage >= pageCount - Math.floor(visiblePages / 2)) {
      for (let i = pageCount - visiblePages + 1; i <= pageCount; i++) {
        pageNumbers.push(i);
      }

    } else {
      for (let i = currentPage - Math.floor(visiblePages / 2); i <= currentPage + Math.floor(visiblePages / 2) && i <= pageCount; i++) {
        pageNumbers.push(i);
      }

    }
    return pageNumbers;
  };


  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex + 1);
    gotoPage(pageIndex);
  };

  return (
    <div className='flex items-center justify-center gap-3 text-dark-slate-grey font-nunito font-bold mt-6 absolute left-1/2 translate-x-1/2'>
      <div className='flex items-center gap-2.5'>
        <div className='flex justify-around w-32'>
          <button
            className='flex items-center justify-center h-6 w-12 cursor-pointer rounded-lg bg-pink active:scale-110'
            onClick={() => handlePageChange(0)}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft stroke='white' />
          </button>
          <button
            className='flex items-center justify-center h-6 w-12 cursor-pointer rounded-lg bg-pink active:scale-110'
            onClick={() => handlePageChange(state.pageIndex - 1)}
            disabled={!canPreviousPage}
          >
            <ChevronLeft stroke='white' />
          </button>
        </div>
        <div className='flex items-center gap-2'>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page - 1)}
              className={`text-center cursor-pointer rounded-full h-8 w-8  ${currentPage === page ? 'bg-pink text-white animate-fade-in' : 'bg-white text-pink'}`}>
              {page}
            </button>
          ))}
        </div>
      </div>
      <div className='flex justify-around w-32'>
        <button
          className='flex items-center justify-center h-6 w-12 cursor-pointer rounded-lg bg-pink active:scale-110'
          onClick={() => handlePageChange(state.pageIndex + 1)}
          disabled={!canNextPage}
        >
          <ChevronRight stroke='white' />
        </button>
        <button
          className='flex items-center justify-center h-6 w-12 cursor-pointer rounded-lg bg-pink active:scale-110'
          onClick={() => handlePageChange(pageCount - 1)}
          disabled={!canNextPage}
        >
          <ChevronsRight stroke='white' />
        </button>
      </div>
    </div>

  );
}

