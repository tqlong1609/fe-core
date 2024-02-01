import * as React from 'react';

import { useIsMobile, useIsVisible } from '@tqlong1609/hooks';

interface ComponentProps {}

const Component: React.FC<
  { children: React.ReactNode; isRender: boolean } & ComponentProps
> = ({ children, isRender }) => {
  return isRender ? <>{children}</> : <></>;
};
const ComponentMemo = React.memo(Component, (preProps, newProps) => {
  return preProps.isRender === newProps.isRender;
});

export const LazyLoadComponent: React.FC<
  {
    children: React.ReactNode;
    isMemo?: boolean;
  } & ComponentProps
> = ({ children, isMemo = false }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isRender, setIsRender] = React.useState(false);
  const isMobile = useIsMobile();
  const rootMargin = isMobile ? '0px' : '100px';
  const isVisible = useIsVisible(ref, rootMargin);

  React.useEffect(() => {
    if (isVisible && !isRender) {
      setIsRender(true);
    }
  }, [isVisible, isRender]);

  return (
    <div ref={ref}>
      {isMemo ? (
        <ComponentMemo isRender={isRender}>{children}</ComponentMemo>
      ) : (
        <Component isRender={isRender}>{children}</Component>
      )}
    </div>
  );
};
