import type { FC } from "react";
import type { HeadProps } from "../../types/layouts";
import { useContext } from 'react';
import { LangContext } from "../../contexts/LangContext";
import { headTexts } from "../../translations/layouts/head";
import Head from "next/head";

export const NextHead: FC<HeadProps> = ({
  title = "",
  description = "",
  username
}) => {

  const { lang } = useContext(LangContext);

  const defaultTitle = headTexts.title[lang as keyof typeof headTexts.title];
  const defaultDescription = headTexts.description[lang as keyof typeof headTexts.description];

  return (
    <Head>
      <meta httpEquiv="x-UA-Compatible" content="IE-edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:locale" content="fr-FR" />
      <meta property="og:locale:alternate" content="en-GB" />
      <meta property="og:locale:alternate" content="en-US" />

      <meta property="og:image" content="https://www.kanisson.com/img/banner-1600x900.png" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="900" />
      <meta property="og:image:alt" content="Vinyl" />
      <meta property="og:url" content="https://www.kanisson.com/" />
      <meta property="og:site_name" content="Kanisson" />
      <meta property="og:type" content={username ? "profile" : "website"} />
      {username && <meta name="og:type:profile:username" content={username} /> }
      <meta property="og:author" content="Adrien Lacourpaille" />
      <meta property="og:description" content={description ? description : defaultDescription} />
      <meta property="og:title" content={title ? title : defaultTitle} />
      <meta property="fb:app_id" content="887231372581458" />
      <meta name="author" content="Adrien Lacourpaille" />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://www.kanisson.com/img/logo-575x575.png" />
      <meta name="twitter:url" content="https://www.kanisson.com/" />
      <meta name="twitter:site" content="@kanisson" />
      <meta name="twitter:creator" content="@Adrien_Lcp" />
      <meta name="twitter:description" content={description ? description : defaultDescription} />
      <meta name="twitter:title" content={title ? title : defaultTitle} />

      <meta name="description" content={description ? description : defaultDescription} />
      <title>{title ? title : defaultTitle}</title>
    </Head>
  );
};