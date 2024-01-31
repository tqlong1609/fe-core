import React from 'react';
import { FilterContext } from './FilterContext';

export const useFilterValues = () => {
  const { state } = React.useContext(FilterContext);
  return state;
};
