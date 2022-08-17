import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { parseCookies, setCookie } from 'nookies';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const { key: cookieValue } = parseCookies();

    if (cookieValue) {
      setState(JSON.parse(decodeURI(cookieValue)));
    }
  }, [key]);

  useEffect(() => {
    setCookie(null, key, encodeURI(JSON.stringify(state)));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
