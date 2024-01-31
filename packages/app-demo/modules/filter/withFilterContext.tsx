import React, { ComponentType, FC } from 'react';
import { FilterProvider } from './FilterContext';
import { useFilterContextEffect } from './useFilterContextEffect';

const ComponentWrapper: React.FC<{
  children: React.ReactNode;
}> = (props) => {
  useFilterContextEffect();
  const { children } = props;
  return <>{children}</>;
};

export const withFilterContext = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithFilterContext: FC<P> = (props) => {
    return (
      <FilterProvider>
        <ComponentWrapper>
          <WrappedComponent {...props} />
        </ComponentWrapper>
      </FilterProvider>
    );
  };

  return WithFilterContext;
};
