import '../styles/reset.css';
import '../styles/globals.scss';;
import type { AppProps } from 'next/app';
import { Container } from '../layouts/Container/Container';
import { PageLoader } from '../layouts/PageLoader/PageLoader';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <Container>
      <Component {...pageProps} />
      <PageLoader />
    </Container>
  );
};