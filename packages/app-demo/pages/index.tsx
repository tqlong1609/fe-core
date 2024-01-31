'use client';
import React from 'react';
import {
  useFilterQueryParams,
  withFilterContext,
  useFilterValues,
} from '../modules/filter';
import _ from 'lodash';
export function Home() {
  const { searchText } = useFilterValues();
  return (
    <div>
      {/* <div>status: {status.value}</div>
      <div>dateRange {`${dateRange?.from} ${dateRange?.to}`} </div>
      <div>pager {`${pager?.index}`} </div> */}
      <div>searchText {`${searchText}`} </div>
      <SearchText initValue={searchText} />
    </div>
  );
}

function SearchText({ initValue }: { initValue: string }) {
  const { onChangeSearchText } = useFilterQueryParams();
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    if (initValue === searchText) return;
    setSearchText(initValue);
  }, [initValue]);

  const onDebounceInput = React.useCallback(
    _.debounce((newValue) => {
      onChangeSearchText(newValue);
    }, 500),
    []
  );

  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        onDebounceInput(e.target.value);
      }}
    />
  );
}

export default withFilterContext(Home);
