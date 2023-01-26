import type { NextPage } from 'next';
import { useContext, useState } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { toggleButton } from '../../translations/components/updateUser';
import { profileHeadTexts } from '../../translations/layouts/head';
import { pageTitleTexts } from '../../translations/pages/profile';
import NextHead from '../../layouts/Head/Head';
import PageWrapper from '../../layouts/wrappers/PageWrapper/PageWrapper';
import UpdateUserForm from '../../components/forms/UpdateUserForm';
import styles from '../../styles/Profile.module.scss';

const Profile: NextPage = () => {

  const { lang } = useContext(LangContext);

  const headTitle = profileHeadTexts.title[lang as keyof typeof profileHeadTexts.title];
  const headDescription = profileHeadTexts.description[lang as keyof typeof profileHeadTexts.description];
  const pageTitle = pageTitleTexts[lang as keyof typeof pageTitleTexts];
  const toggleButtonOpenedText = toggleButton.opened[lang as keyof typeof toggleButton.opened];
  const toggleButtonClosedText = toggleButton.closed[lang as keyof typeof toggleButton.closed];

  const [toggleForm, setToggleForm] = useState<boolean>(false);

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper title={pageTitle}>

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



        {/* user playlists */}



      </PageWrapper>
    </>
  );
};

export default Profile;