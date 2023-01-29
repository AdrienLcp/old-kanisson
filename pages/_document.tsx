import { Html, Head, Main, NextScript } from 'next/document';
import { useContext } from 'react';
import { LangContext } from '../contexts/LangContext';

export default function Document() {

  const { lang } = useContext(LangContext);

  return (
    <Html lang={lang}>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};