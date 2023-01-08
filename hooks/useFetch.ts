import type { UseFetchStateTypes } from '../types/hooks';
import { useState, useEffect } from 'react';

const useFetch = (
  url: string,
  body?: {},
  token?: string
) => {

  const [state, setState] = useState<UseFetchStateTypes>({
    items: [],
    loading: true
  });

  useEffect(() => {

    const getData = (async () => {

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(body)
      })
      .then(async(res) => {

        const data = await res.json();

        if(res.ok) {
          setState({
            items: data,
            loading: false
          });
        } else {
          console.log(data);
          setState(state => ({...state, loading: false}));
        };
      })
      .catch((error) => {
        console.log(error);
        setState(state => ({...state, loading: false}));
      });
    });

    getData();
  }, []);

  return [
    state.items,
    state.loading
  ] as const;
};

export default useFetch;