import { useEffect, useState } from 'react';

const INTERSECTION_OBSERVER_THRESHOLD = 0.25;

export const useIsVisible = <T extends Element>(
  ref: React.RefObject<T>, // Update the type of the ref
  rootMargin: string = '0px'
): boolean => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: INTERSECTION_OBSERVER_THRESHOLD,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer?.unobserve?.(ref.current);
      }
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
};
