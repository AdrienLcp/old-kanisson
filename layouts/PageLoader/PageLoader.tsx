import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from './PageLoader.module.scss';

export const PageLoader: FC = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError',  handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <>
      {loading &&
        <div className={styles.container}>
          {/*  <span className={styles.loader} /> */}

          <div className={styles.loader}>
            <span/>
            <span/>
            <span/>
            <span/>
          </div>
        </div>
      }
    </>
  );
};