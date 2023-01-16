import type { NextPage } from 'next';
import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '../contexts/LangContext';
import HomeIcon from '../icons/HomeIcon';
import { notFoundHeadTexts } from '../langs/layouts/head';
import { linkTexts, pageTexts } from '../langs/pages/notFound';
import NextHead from '../layouts/Head/Head';
import PageWrapper from '../layouts/PageWrapper/PageWrapper';
import styles from '../styles/NotFound.module.scss';

const NotFound: NextPage = () => {

  const { lang } = useContext(LangContext);

  const headTitle = notFoundHeadTexts.title[lang as keyof typeof notFoundHeadTexts.title];
  const headDescription = notFoundHeadTexts.description[lang as keyof typeof notFoundHeadTexts.description];
  const pageTitle = pageTexts.title[lang as keyof typeof pageTexts.title];
  const pageSubtitle = pageTexts.subtitle[lang as keyof typeof pageTexts.subtitle];
  const linkLabel = linkTexts.label[lang as keyof typeof linkTexts.label];
  const linkTitle = linkTexts.title[lang as keyof typeof linkTexts.title];

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper
        title={pageTitle}
        subtitle={pageSubtitle}
      >
        <Link
          href='/'
          className={styles.link}
          title={linkTitle}
          aria-label={linkTitle}
        >
          <HomeIcon
            color="var(--white)"
            height='18'
          />
          {linkLabel}
        </Link>
      </PageWrapper>
    </>
  );
};

export default NotFound;