import { useEffect, useState } from 'react';

const isClient = () => {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

const getWidth = () =>
  isClient() &&
  (window?.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth);

const getHeight = () =>
  isClient() &&
  (window?.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight);

export function useWindowSize() {
  let [size, setSize] = useState({
    width: getWidth() || 0,
    height: getHeight() || 0,
  });

  useEffect(() => {
    let timeoutId: any = null;

    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () =>
          setSize({
            width: getWidth() || 0,
            height: getHeight() || 0,
          }),
        150
      );
    };

    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return size;
}
