import type { NextPage } from 'next';
import { useContext, useState } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { toggleButton } from '../../translations/components/updateUser';
import { profileHeadTexts } from '../../translations/layouts/head';
import { linkTexts, pageTitleTexts, pseudoTexts } from '../../translations/pages/profile';
import { UserContext } from '../../contexts/UserContext';
import { NextHead } from '../../layouts/Head/Head';
import { PageWrapper } from '../../layouts/wrappers/PageWrapper/PageWrapper';
import UpdateUserForm from '../../components/forms/UpdateUserForm';
import styles from '../../styles/Profile.module.scss';
import { MyPlaylists } from '../../components/MyPlaylists/MyPlaylists';
import Link from 'next/link';
import { Loader } from '../../components/Loader/Loader';
import { Notifications } from '../../components/Notifications/Notifications';
import { Button } from '../../components/buttons/Button/Button';
import { useRouter } from 'next/router';

const MyProfile: NextPage = () => {

  const { lang } = useContext(LangContext);
  const { user, logged } = useContext(UserContext);

  const router = useRouter();

  const headTitle = profileHeadTexts.title[lang as keyof typeof profileHeadTexts.title];
  const headDescription = profileHeadTexts.description[lang as keyof typeof profileHeadTexts.description];
  const pageTitle = pageTitleTexts[lang as keyof typeof pageTitleTexts];
  const pseudoText = pseudoTexts[lang as keyof typeof pseudoTexts];
  const toggleButtonOpenedText = toggleButton.opened[lang as keyof typeof toggleButton.opened];
  const toggleButtonClosedText = toggleButton.closed[lang as keyof typeof toggleButton.closed];
  const linkLabel = linkTexts.label[lang as keyof typeof linkTexts.label];
  const linkTitle = linkTexts.title[lang as keyof typeof linkTexts.title];

  const [toggleForm, setToggleForm] = useState<boolean>(false);

  if(!logged) return <Loader />
  if(logged && user.banned) router.push('/banned');

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper title={pageTitle}>

        <p className={styles.pseudo}>
          {pseudoText} {user.pseudo}
        </p>

        <Notifications />

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

        <Button
          styles={styles.toggle_button}
          onClick={() => setToggleForm(prev => !prev)}
        >
          {toggleForm ? toggleButtonOpenedText : toggleButtonClosedText}
        </Button>

        <MyPlaylists />

      </PageWrapper>
    </>
  );
};

export default MyProfile;