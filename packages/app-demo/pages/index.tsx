'use client';
import React from 'react';
import Pagination from '../modules/pagination/Pagination';

const PAGE_SIZE = 4;
const totalRecords = 100;

const index: React.FC = () => {
  const [pager, setPager] = React.useState({ index: 0 });

  const onChangePage = (page: number) => {
    setPager({ index: page - 1 });
  };

  return (
    <div>
      <Pagination
        itemPerPage={PAGE_SIZE}
        currentPage={pager.index + 1}
        totalPage={totalRecords}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default index;
