import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head />

      <body>
        <Main />
        <NextScript />
        <script src="https://sdk.scdn.co/spotify-player.js"></script>
      </body>
    </Html>
  );
};