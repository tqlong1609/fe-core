import { useEffect } from 'react';

export const useVisiblePage = (
  visibleFn?: () => void,
  notVisibleFn?: () => void,
  deps: any = []
) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        visibleFn && visibleFn();
      } else if (document.visibilityState === 'hidden') {
        notVisibleFn && notVisibleFn();
      }
    };

    document?.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document?.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, deps);
};
