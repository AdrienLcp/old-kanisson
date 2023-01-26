import type { NextPage } from 'next';
import { useContext } from 'react';
import { LangContext } from '../contexts/LangContext';
import { titleTexts } from '../translations/pages/contact';
import { contactHeadTexts } from '../translations/layouts/head';
import NextHead from '../layouts/Head/Head';
import ContactForm from '../components/forms/ContactForm/ContactForm';
import PageWrapper from '../layouts/wrappers/PageWrapper/PageWrapper';

const Contact: NextPage = () => {

  const { lang } = useContext(LangContext);

  const headTitle = contactHeadTexts.title[lang as keyof typeof contactHeadTexts.title];
  const headDescription = contactHeadTexts.description[lang as keyof typeof contactHeadTexts.description];
  const pageTitle = titleTexts[lang as keyof typeof titleTexts];

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper title={pageTitle}>

        <ContactForm />

      </PageWrapper>
    </>
  );
};

export default Contact;