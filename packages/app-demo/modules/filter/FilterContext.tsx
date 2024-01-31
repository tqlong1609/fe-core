import { createCtx } from '../context';
import { status } from './options';
import { FilterContextState } from './type';

export const defaultFilterState: FilterContextState = {
  status: status[0],
  dateRange: null,
  searchText: '',
  pager: {
    index: 0,
  },
};

const [ctx, Provider] = createCtx<FilterContextState>(defaultFilterState);
export const FilterContext = ctx;
export const FilterProvider = Provider;
