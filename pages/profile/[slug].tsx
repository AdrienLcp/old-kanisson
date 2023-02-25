import type { GetServerSideProps, NextPage } from 'next';
import type { UserProfileProps } from '../../types/pages';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { userProfileHeadTexts } from '../../translations/layouts/head';
import { pageTitle } from '../../translations/pages/userProfile';
import { api } from '../../api/api';
import { NextHead } from '../../layouts/Head/Head';
import { PageWrapper } from '../../layouts/wrappers/PageWrapper/PageWrapper';
import { UserGames } from '../../components/UserGames/UserGames';
import { UserPlaylists } from '../../components/UserPlaylists/UserPlaylists';

const UserPage: NextPage<UserProfileProps> = ({
  userPlaylists,
  userGames,
  pseudo
}) => {

  const { lang } = useContext(LangContext);
  const headTitleBefore = userProfileHeadTexts.title.before[lang as keyof typeof userProfileHeadTexts.title.before];
  const headTitleAfter = userProfileHeadTexts.title.after[lang as keyof typeof userProfileHeadTexts.title.after];
  const headDescriptionBefore = userProfileHeadTexts.description.before[lang as keyof typeof userProfileHeadTexts.description.before];
  const headDescriptionAfter = userProfileHeadTexts.description.after[lang as keyof typeof userProfileHeadTexts.description.after];
  const pageTitleBefore = pageTitle.before[lang as keyof typeof pageTitle.before];
  const pageTitleAfter = pageTitle.after[lang as keyof typeof pageTitle.after];

  return (
    <>
      <NextHead
        title={`${headTitleBefore}${pseudo}${headTitleAfter}`}
        description={`${headDescriptionBefore}${pseudo}${headDescriptionAfter}`}
      />

      <PageWrapper title={`${pageTitleBefore}${pseudo}${pageTitleAfter}`}>

        <UserGames
          userGames={userGames}
          pseudo={pseudo}
        />

        <UserPlaylists userPlaylists={userPlaylists} />

      </PageWrapper>
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async(context) => {

  const pseudo = context.query.slug;

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

  return {
    props: {
      userPlaylists,
      userGames,
      pseudo
    }
  };
};