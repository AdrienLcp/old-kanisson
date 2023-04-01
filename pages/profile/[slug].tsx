import type { GetServerSideProps, NextPage } from 'next';
import type { UserProfileProps } from '../../types/pages';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { userProfileHeadTexts } from '../../translations/layouts/head';
import { dateTexts, pageTitle } from '../../translations/pages/userProfile';
import { api } from '../../api/api';
import { NextHead } from '../../layouts/Head/Head';
import { PageWrapper } from '../../layouts/wrappers/PageWrapper/PageWrapper';
import { UserGames } from '../../components/UserGames/UserGames';
import { UserPlaylists } from '../../components/UserPlaylists/UserPlaylists';
import styles from '../../styles/UserPage.module.scss';

const UserPage: NextPage<UserProfileProps> = ({
  userPlaylists,
  userGames,
  user
}) => {

  const { lang } = useContext(LangContext);
  const headTitleBefore = userProfileHeadTexts.title.before[lang as keyof typeof userProfileHeadTexts.title.before];
  const headTitleAfter = userProfileHeadTexts.title.after[lang as keyof typeof userProfileHeadTexts.title.after];
  const headDescriptionBefore = userProfileHeadTexts.description.before[lang as keyof typeof userProfileHeadTexts.description.before];
  const headDescriptionAfter = userProfileHeadTexts.description.after[lang as keyof typeof userProfileHeadTexts.description.after];
  const pageTitleBefore = pageTitle.before[lang as keyof typeof pageTitle.before];
  const pageTitleAfter = pageTitle.after[lang as keyof typeof pageTitle.after];
  const dateText = dateTexts[lang as keyof typeof dateTexts];

  return (
    <>
      <NextHead
        title={`${headTitleBefore}${user.pseudo}${headTitleAfter}`}
        description={`${headDescriptionBefore}${user.pseudo}${headDescriptionAfter}`}
        username={user.pseudo}
      />

      <PageWrapper title={`${pageTitleBefore}${user.pseudo}${pageTitleAfter}`}>

        <p className={styles.date}>
          {dateText} {user.date}
        </p>

        <UserGames
          userGames={userGames}
          pseudo={user.pseudo}
        />

        <UserPlaylists userPlaylists={userPlaylists} />

      </PageWrapper>
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async(context) => {

  const url = context.query.slug as string;
  const pseudo = url.replace(/_/g, " ");

  const fetchedUserPlaylists = await fetch(`${api}/playlist/getUserPlaylists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo })
  });
  const userPlaylists = await fetchedUserPlaylists.json();

  const fetchedUserGames = await fetch(`${api}/game/getAllFromUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo })
  });
  const userGames = await fetchedUserGames.json();

  const fetchedUser = await fetch(`${api}/user/getSafeInfos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo })
  });
  const user = await fetchedUser.json();

  return {
    props: {
      userPlaylists,
      userGames,
      user
    }
  };
};