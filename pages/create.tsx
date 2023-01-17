import type { NextPage } from 'next';
import { useContext } from 'react';
import PlaylistForm from '../components/forms/PlaylistForm';
import { LangContext } from '../contexts/LangContext';
import { createHeadTexts } from '../langs/layouts/head';
import { createTexts } from '../langs/pages/create';
import NextHead from '../layouts/Head/Head';
import PageWrapper from '../layouts/PageWrapper/PageWrapper';
import styles from '../styles/Create.module.scss';

const Create: NextPage = () => {

  const { lang } = useContext(LangContext);

  const headTitle = createHeadTexts.title[lang as keyof typeof createHeadTexts.title];
  const headDescription = createHeadTexts.description[lang as keyof typeof createHeadTexts.description];
  const pageTitle = createTexts.pageTitle[lang as keyof typeof createTexts.pageTitle];

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper title={pageTitle}>

        <PlaylistForm />

      </PageWrapper>
    </>
  );
};

export default Create;