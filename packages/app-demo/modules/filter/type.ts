export type Status = {
  id: string;
  value: string;
};

export type FilterContextState = {
  status: Status;
  dateRange: {
    from: Date | null;
    to?: Date | null;
  } | null;
  searchText: string;
  pager: {
    index: number;
  };
};

export type FilterQueryParams = {
  // must be string
  dateRange: string;
  index: string;
  searchText: string;
  status: string;
};

export type FilterContextAction = {
  onChangeStatus: (status: Status) => void;
  onChangeDateRange: (value: FilterContextState['dateRange']) => void;
  onChangeSearchText: (searchText: string) => void;
  onChangePagerIndex: (index: number) => void;
  onResetFilter: () => void;
};
