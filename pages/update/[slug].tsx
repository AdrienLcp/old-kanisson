import type { GetServerSideProps, NextPage } from 'next';
import type { UpdateProps } from '../../types/pages';
import type { Playlist, Track } from '@prisma/client';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { updateHeadTexts } from '../../translations/layouts/head';
import { pageTitleTexts } from '../../translations/pages/update';
import { NextHead } from '../../layouts/Head/Head';
import PlaylistForm from '../../components/forms/PlaylistForm';
import { PageWrapper } from '../../layouts/wrappers/PageWrapper/PageWrapper';
import { Loader } from '../../components/Loader/Loader';

const Update: NextPage<UpdateProps> = ({
  playlist,
  tracks,
  apiKey
}) => {

  const { lang } = useContext(LangContext);
  const { user, logged } = useContext(UserContext);

  const router = useRouter();

  if(!playlist) router.push('/404');
  if(!logged || logged && playlist.user_id !== user.id) return <Loader />;

  const headTitle = updateHeadTexts.title[lang as keyof typeof updateHeadTexts.title];
  const pageTitle = pageTitleTexts[lang as keyof typeof pageTitleTexts];

  return (
    <>
      <NextHead title={headTitle} />

      <PageWrapper title={pageTitle}>

        <PlaylistForm
          playlist={playlist}
          tracksData={tracks}
          apiKey={apiKey}
        />

      </PageWrapper>
    </>
  );
};

export default Update;

export const getServerSideProps: GetServerSideProps = async(context) => {

  const title = context.query.slug;

  const fetchedPlaylist = await fetch(`${api}/playlist/getOne`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  const playlist: Playlist = await fetchedPlaylist.json();

  const fetchedTracks = await fetch(`${api}/track/getAllFromPlaylist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playlist_id: playlist.id })
  });
  const tracks: Track[] = await fetchedTracks.json();

  const apiKey = process.env.API_KEY;

  return {
    props: {
      playlist,
      tracks,
      apiKey
    }
  };
};