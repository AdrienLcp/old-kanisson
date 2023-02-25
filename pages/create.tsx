import type { GetServerSideProps, NextPage } from 'next';
import type { CreateProps } from '../types/pages';
import { useContext } from 'react';
import { LangContext } from '../contexts/LangContext';
import { createHeadTexts } from '../translations/layouts/head';
import { createTexts } from '../translations/pages/create';
import { NextHead } from '../layouts/Head/Head';
import { PageWrapper } from '../layouts/wrappers/PageWrapper/PageWrapper';
import PlaylistForm from '../components/forms/PlaylistForm';

const Create: NextPage<CreateProps> = ({
  apiKey
}) => {

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

        <PlaylistForm apiKey={apiKey} />

      </PageWrapper>
    </>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async() => {

  const apiKey = process.env.API_KEY;

  return {
    props: {
      apiKey
    }
  };
};