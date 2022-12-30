import { useState, useEffect } from 'react';

type StateTypes = {
  items: any[],
  loading: boolean
};

const useFetch = (
  url: string,
  token?: string
) => {

  const [state, setState] = useState<StateTypes>({
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
        }
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