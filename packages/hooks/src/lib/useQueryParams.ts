import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParam = (queryName: string, value: string) => {
    router.replace(`${pathname}?${createQueryString(queryName, value)}`, '', {
      scroll: false,
    });
  };

  const getQueryParam = (queryName: string) => {
    return searchParams.get(queryName);
  };

  return [getQueryParam, setQueryParam] as const;
}
