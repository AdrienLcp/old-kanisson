import type { NextPage } from 'next';
import { useContext } from 'react';
import { LangContext } from '../contexts/LangContext';
import { titleTexts } from '../langs/pages/contact';
import { contactHeadTexts } from '../langs/layouts/head';
import NextHead from '../layouts/Head/Head';
import ContactForm from '../components/forms/ContactForm/ContactForm';
import styles from '../styles/Contact.module.scss';

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

      <section className={styles.container}>
        <header>
          <h1 className={styles.title}>
            {pageTitle}
          </h1>
        </header>

        <ContactForm />
      </section>
    </>
  );
};

export default Contact;