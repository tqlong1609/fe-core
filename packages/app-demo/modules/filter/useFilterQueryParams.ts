import { useQueryParams } from '@tqlong1609/hooks';
import {
  FilterContextAction,
  FilterContextState,
  FilterQueryParams,
  Status,
} from './type';
import { formatDateToQueryParams } from './utils';

export const useFilterQueryParams = (): FilterContextAction => {
  const [_, { setQueryParam, clearQueryParam }] =
    useQueryParams<FilterQueryParams>();

  const onChangeDateRange = (value: FilterContextState['dateRange']) => {
    if (value === null) {
      setQueryParam('dateRange', '');
      return;
    }
    const date = formatDateToQueryParams(value);
    setQueryParam('dateRange', date);
  };

  const onChangePagerIndex = (index: number) => {
    setQueryParam('index', index.toString());
  };

  const onChangeSearchText = (searchText: string) => {
    setQueryParam('searchText', searchText ?? null);
  };

  const onChangeStatus = (status: Status) => {
    setQueryParam('status', status.value ?? null);
  };

  const onResetFilter = () => {
    clearQueryParam();
  };

  return {
    onChangeDateRange,
    onChangePagerIndex,
    onChangeSearchText,
    onChangeStatus,
    onResetFilter,
  };
};
