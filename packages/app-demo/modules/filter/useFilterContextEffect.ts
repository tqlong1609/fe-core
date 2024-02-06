import React, { useEffect } from 'react';
import { FilterContext } from './FilterContext';
import { useQueryParams } from '@tqlong1609/hooks';
import { FilterContextState, FilterQueryParams, Status } from './type';
import { status } from './options';
import { getDateRangeFromQueryParams } from './utils';

export const useFilterContextEffect = () => {
  const { update } = React.useContext(FilterContext);

  const [query, { getQueryParam }] = useQueryParams<FilterQueryParams>();

  useEffect(() => {
    const setFilterStateOptionType = (
      paramName: keyof FilterContextState,
      stateArray: Status[]
    ) => {
      const paramValue = getQueryParam(paramName);
      if (paramValue) {
        const option = stateArray.find((item) => item.value === paramValue);
        if (option) {
          update((pre) => ({ ...pre, [paramName]: option }));
        }
      } else {
        update((pre) => ({ ...pre, [paramName]: stateArray[0] }));
      }
    };

    const setFilterStateStringType = (paramName: keyof FilterContextState) => {
      const paramValue = getQueryParam(paramName);
      if (paramValue && typeof paramValue === 'string') {
        update((pre) => ({ ...pre, [paramName]: paramValue }));
      } else {
        update((pre) => ({ ...pre, [paramName]: '' }));
      }
    };

    const setFilterStateDateRangeType = (
      paramName: keyof FilterContextState
    ) => {
      const paramValue = getQueryParam(paramName);
      if (paramValue && typeof paramValue === 'string') {
        const { from, to } = getDateRangeFromQueryParams(paramValue);
        update((pre) => ({ ...pre, [paramName]: { from, to } }));
      } else {
        update((pre) => ({ ...pre, [paramName]: null }));
      }
    };

    const setFilterStateIndexPagerType = (
      paramName: keyof FilterContextState
    ) => {
      const paramValue = getQueryParam(paramName);
      if (paramValue && typeof paramValue === 'string') {
        update((pre) => ({
          ...pre,
          [paramName]: { ...pre.pager, index: +paramValue },
        }));
      } else {
        update((pre) => ({ ...pre, [paramName]: { ...pre.pager, index: 0 } }));
      }
    };

    if (isEmpty(query)) return;
    setFilterStateOptionType('status', status);
    setFilterStateStringType('searchText');
    setFilterStateDateRangeType('dateRange');
    setFilterStateIndexPagerType('pager');
  }, [query]);
};

function isEmpty(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}
