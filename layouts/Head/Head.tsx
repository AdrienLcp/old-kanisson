import { FC, useContext } from "react";
import type { HeadProps } from "../../types/layouts";
import Head from "next/head";
import { LangContext } from "../../contexts/LangContext";
import { headTexts } from "../../translations/layouts/head";

const NextHead: FC<HeadProps> = ({
  title = "",
  description = ""
}) => {

  const { lang } = useContext(LangContext);

  const defaultTitle = headTexts.title[lang as keyof typeof headTexts.title];
  const defaultDescription = headTexts.description[lang as keyof typeof headTexts.description];

  return (
    <Head>
      <meta httpEquiv="x-UA-Compatible" content="IE-edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Rubik+Moonrocks&display=swap" rel="stylesheet"/>

      <meta
        name="description"
        content={description ? description : defaultDescription}
      />

      <title>{title ? title : defaultTitle}</title>
    </Head>
  );
};

export default NextHead;