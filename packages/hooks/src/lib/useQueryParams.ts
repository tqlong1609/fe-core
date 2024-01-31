import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useQueryParams<T>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { query } = router;

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

  const setQueryParam = (queryName: keyof T, value: string) => {
    const queryNameString = queryName as string;
    if (!value) {
      router.replace(pathname, '', {
        scroll: false,
      });
      return;
    }
    router.replace(
      `${pathname}?${createQueryString(queryNameString, value)}`,
      '',
      {
        scroll: false,
      }
    );
  };

  const getQueryParam = (queryName: keyof T) => {
    return searchParams.get(queryName as string);
  };

  const clearQueryParam = () => {
    router.replace(window.location.pathname, '', { scroll: false });
  };

  return [query, { getQueryParam, setQueryParam, clearQueryParam }] as const;
}

// for next below 12 version
export function useQueryParamsUpdate<T>() {
  const router = useRouter();
  const { pathname, query } = router;

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      if (!query) return;
      const params = new URLSearchParams(query as any);
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [query]
  );

  const setQueryParam = (queryName: keyof T, value: string) => {
    const queryNameString = queryName as string;
    if (!value) {
      router.replace(pathname, '', {
        scroll: false,
      });
      return;
    }
    router.replace(
      `${pathname}?${createQueryString(queryNameString, value)}`,
      '',
      {
        scroll: false,
      }
    );
  };

  const getQueryParam = (queryName: keyof T) => {
    return query[queryName as string];
  };

  const clearQueryParam = () => {
    router.replace(window.location.pathname, '', { scroll: false });
  };

  return [query, { getQueryParam, setQueryParam, clearQueryParam }] as const;
}
