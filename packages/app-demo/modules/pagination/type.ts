export type Pagination = {
  totalPages: number;
  pages: number;
  currentPage: number;
  firstPage: number;
  lastPage: number;
  previousPage: number;
  nextPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalResults: number;
  results: number;
  firstResult: number;
  lastResult: number;
};

export type PagingInfo = {
  limit: number;
  pageCount: number;
  total: number;
  page: number;
};
