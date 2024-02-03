import React from 'react';
import { PaginationData } from './PaginationData';

const PAGE_COUNT = 3;

type PaginationProps = {
  onChangePage?: (page: number) => void;
  currentPage: number;
  itemPerPage: number;
  totalPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
  itemPerPage,
  totalPage,
}) => {
  const handlePageChange = (page: number) => {
    onChangePage && onChangePage(page);
  };

  return (
    <PaginationData
      total={totalPage}
      limit={itemPerPage}
      pageCount={PAGE_COUNT}
      currentPage={currentPage}
    >
      {({
        pages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        previousPage,
        nextPage,
        totalPages,
        getPageItemProps,
      }) => (
        <div>
          <button
            aria-label="first"
            {...getPageItemProps({
              pageValue: 1,
              onPageChange: handlePageChange,
            })}
            disabled={currentPage === 1}
          >
            FIRST
          </button>

          <button
            aria-label="previous"
            {...getPageItemProps({
              pageValue: previousPage,
              onPageChange: handlePageChange,
            })}
            disabled={!hasPreviousPage}
          >
            PREVIOUS
          </button>

          {pages.map((page, index) => {
            let activePage: Object | null = null;
            if (currentPage === page) {
              activePage = {
                boxShadow: '4px 6px 17px rgba(60, 74, 207, 0.5)',
                color: '#FFFFFF',
              };
            }
            return (
              <button
                key={index.toString()}
                {...getPageItemProps({
                  pageValue: page,
                  key: page,
                  style: activePage,
                  onPageChange: handlePageChange,
                })}
              >
                {page}
              </button>
            );
          })}

          <button
            aria-label="next-page"
            {...getPageItemProps({
              pageValue: nextPage,
              onPageChange: handlePageChange,
            })}
            disabled={!hasNextPage}
          >
            NEXT
          </button>

          <button
            aria-label="last"
            {...getPageItemProps({
              pageValue: totalPages,
              onPageChange: handlePageChange,
            })}
            disabled={currentPage >= totalPages}
          >
            LAST
          </button>
        </div>
      )}
    </PaginationData>
  );
};

export default Pagination;
