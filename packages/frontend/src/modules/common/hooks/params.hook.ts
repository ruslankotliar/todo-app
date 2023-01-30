import { useEffect, useMemo, useState } from 'react';
import { URLSearchParams } from 'url';
import { useSearchParams } from '../../deps';
import { debounce } from '../helpers';

export function useSetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<any>({
    access: 'public',
    status: 'all',
    query: '',
    page: 0,
    perPage: 10
  });
  const [trigger, setTrigger] = useState<number>(Date.now());

  const setParam = (key: string, value: number | string) => {
    searchParams.set(key.toString(), value.toString());
    params[key] = value;
    setParams({ ...params });
  };

  const resetParams = () => {
    setParam('access', 'public');
    setParam('status', 'all');
    setParam('query', '');
    setParams({ ...params });
  };

  const updateParams = useMemo(
    () =>
      debounce((p: URLSearchParams) => {
        setSearchParams(p);
        setTrigger(Date.now());
      }),
    []
  );

  useEffect(() => {
    updateParams(searchParams);
  }, [params]);

  return {
    params,
    trigger,
    setParam,
    resetParams
  };
}
