import type { Playlist } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import type { PlaylistsModerationProps } from '../../types/pages';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LangContext } from '../../contexts/LangContext';
import { moderationHeadTexts } from '../../translations/layouts/head';
import { moderationTexts } from '../../translations/pages/moderation';
import { api } from '../../api/api';
import NextHead from '../../layouts/Head/Head';
import PageWrapper from '../../layouts/wrappers/PageWrapper/PageWrapper';
import Loader from '../../layouts/Loader/Loader';
import Tabs from '../../components/Tabs/Tabs';
import VisiblePlaylistsList from '../../components/moderation/VisiblePlaylistsList/VisiblePlaylistsList';
import HiddenPlaylistsList from '../../components/moderation/HiddenPlaylistsList/HiddenPlaylistsList';
import Message from '../../components/Message/Message';

const PlaylistsModeration: NextPage<PlaylistsModerationProps> = ({
  visiblePlaylistsData
}) => {

  const { user, logged } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const headTitle = moderationHeadTexts.playlists[lang as keyof typeof moderationHeadTexts.playlists];
  const pageTitle = moderationTexts.title[lang as keyof typeof moderationTexts.title];
  const visiblePlaylistsTitle = moderationTexts.visiblePlaylists[lang as keyof typeof moderationTexts.visiblePlaylists];
  const hiddenTitle = moderationTexts.hiddenPlaylists[lang as keyof typeof moderationTexts.hiddenPlaylists];

  const [visiblePlaylists, setVisiblePlaylists] = useState<Playlist[]>(visiblePlaylistsData ? visiblePlaylistsData : []);
  const [hiddenPlaylists, setHiddenPlaylists] = useState<Playlist[]>([]);
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDeletedPlaylists();
  }, []);

  const getDeletedPlaylists = async() => {
    setLoading(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/playlist/getAllDeleted`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        setHiddenPlaylists(data);
      } else {
        console.log(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setLoading(false);
  };

  if(loading || logged && !user.moderator || logged && !user.admin) return <Loader />

  return (
    <>
      <NextHead title={headTitle} />

      <PageWrapper title={pageTitle}>

        <Message
          validMessage={validMessage}
          setValidMessage={setValidMessage}
          warningMessage={warningMessage}
          setWarningMessage={setWarningMessage}
        />

        <Tabs
          tabs={[`${visiblePlaylistsTitle}`, `${hiddenTitle}`]}
          contents={[
            <VisiblePlaylistsList
              visiblePlaylists={visiblePlaylists}
              setVisiblePlaylists={setVisiblePlaylists}
              hiddenPlaylists={hiddenPlaylists}
              setHiddenPlaylists={setHiddenPlaylists}
              setValidMessage={setValidMessage}
              setWarningMessage={setWarningMessage}
            />,
            <HiddenPlaylistsList
              visiblePlaylists={visiblePlaylists}
              setVisiblePlaylists={setVisiblePlaylists}
              hiddenPlaylists={hiddenPlaylists}
              setHiddenPlaylists={setHiddenPlaylists}
              setValidMessage={setValidMessage}
              setWarningMessage={setWarningMessage}
            />
          ]}
        />
      </PageWrapper>
    </>
  );
};

export default PlaylistsModeration;

export const getServerSideProps: GetServerSideProps = async() => {

  const fetchedVisiblePlaylists = await fetch(`${api}/playlist/getAllVisible`);
  const visiblePlaylistsData = await fetchedVisiblePlaylists.json();

  return {
    props: {
      visiblePlaylistsData
    }
  };
};