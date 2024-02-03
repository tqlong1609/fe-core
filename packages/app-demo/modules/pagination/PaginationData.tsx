import { useEffect, useState } from 'react';
import { getPageInfo, getRange } from './pagingAlgorithm';

type PaginationDataProps = {
  total: number;
  limit?: number;
  pageCount?: number;
  currentPage?: number;
  pageValue?: number;
  children: (item: {
    pages: number[];
    previousPage: number;
    nextPage: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    getPageItemProps: any;
  }) => JSX.Element;
  onPageChange?: (page: number) => void;
};

export const PaginationData: React.FC<PaginationDataProps> = ({
  currentPage: currentPageProps = 0,
  total,
  children,
  limit = 0,
  pageCount = 0,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPageProps && currentPage !== currentPageProps) {
      setCurrentPage(parseInt(currentPageProps.toString(), 10));
    }
  }, [currentPageProps, currentPage]);

  const _getPageItemProps = (props: PaginationDataProps) => {
    const { pageValue, onPageChange: handlePageChange, ...rest } = props;

    const onPageChange = () => {
      if (pageValue) {
        handlePageChange && handlePageChange(pageValue);
        setCurrentPage(pageValue);
      }
    };

    return {
      onClick: onPageChange,
      ...rest,
    };
  };

  const pageInfo = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage,
  });

  const {
    firstPage,
    lastPage,
    hasNextPage,
    hasPreviousPage,
    previousPage,
    nextPage,
    totalPages,
  } = pageInfo;

  const pages = total > 0 ? getRange(firstPage, lastPage) : [];
  return (
    <div>
      {children({
        pages,
        previousPage,
        nextPage,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        getPageItemProps: _getPageItemProps,
      })}
    </div>
  );
};
