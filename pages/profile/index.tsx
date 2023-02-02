import type { NextPage } from 'next';
import { useContext, useState } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { toggleButton } from '../../translations/components/updateUser';
import { profileHeadTexts } from '../../translations/layouts/head';
import { linkTexts, pageTitleTexts } from '../../translations/pages/profile';
import { UserContext } from '../../contexts/UserContext';
import NextHead from '../../layouts/Head/Head';
import PageWrapper from '../../layouts/wrappers/PageWrapper/PageWrapper';
import UpdateUserForm from '../../components/forms/UpdateUserForm';
import styles from '../../styles/Profile.module.scss';
import MyPlaylists from '../../components/MyPlaylists/MyPlaylists';
import Link from 'next/link';

const MyProfile: NextPage = () => {

  const { lang } = useContext(LangContext);
  const { user } = useContext(UserContext);

  const headTitle = profileHeadTexts.title[lang as keyof typeof profileHeadTexts.title];
  const headDescription = profileHeadTexts.description[lang as keyof typeof profileHeadTexts.description];
  const pageTitle = pageTitleTexts[lang as keyof typeof pageTitleTexts];
  const toggleButtonOpenedText = toggleButton.opened[lang as keyof typeof toggleButton.opened];
  const toggleButtonClosedText = toggleButton.closed[lang as keyof typeof toggleButton.closed];
  const linkLabel = linkTexts.label[lang as keyof typeof linkTexts.label];
  const linkTitle = linkTexts.title[lang as keyof typeof linkTexts.title];

  const [toggleForm, setToggleForm] = useState<boolean>(false);

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper title={pageTitle}>

        <Link
          className={styles.link}
          href={`/profile/${user.pseudo}`}
          title={linkTitle}
        >
          {linkLabel}
        </Link>

        <section className={
          toggleForm ?
            `${styles.container} ${styles.opened}`
          :
            `${styles.container}`
        }>
          <UpdateUserForm />
        </section>

        <button
          className={styles.toggle_button}
          type="button"
          onClick={() => setToggleForm(prev => !prev)}
        >
          {toggleForm ? toggleButtonOpenedText : toggleButtonClosedText}
        </button>

        <MyPlaylists />

      </PageWrapper>
    </>
  );
};

export default MyProfile;