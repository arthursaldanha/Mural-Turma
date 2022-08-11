import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { getCookies, setCookie } from '../utils/cookie';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { key: cookieValue } = getCookies();

    if (cookieValue) {
      setState(JSON.parse(decodeURI(cookieValue)));
    }
  }, [key]);

  useEffect(() => {
    setCookie(key, encodeURI(JSON.stringify(state)));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
