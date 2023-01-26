import type { GetServerSideProps, NextPage } from 'next';
import type { UpdateProps } from '../../types/pages';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { updateHeadTexts } from '../../translations/layouts/head';
import { pageTitleTexts } from '../../translations/pages/update';
import NextHead from '../../layouts/Head/Head';
import PlaylistForm from '../../components/forms/PlaylistForm';
import PageWrapper from '../../layouts/wrappers/PageWrapper/PageWrapper';
import Loader from '../../layouts/Loader/Loader';
import { Playlist } from '@prisma/client';

const Update: NextPage<UpdateProps> = ({
  playlist
}) => {

  const { lang } = useContext(LangContext);
  const { user } = useContext(UserContext);

  const router = useRouter();

  if(!playlist) return <Loader />

  if(playlist.user_id !== user.id) router.push('/404');


  const headTitle = updateHeadTexts.title[lang as keyof typeof updateHeadTexts.title];
  const pageTitle = pageTitleTexts[lang as keyof typeof pageTitleTexts];

  return (
    <>
      <NextHead title={headTitle} />

      <PageWrapper title={pageTitle}>

        <PlaylistForm playlist={playlist} />

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

  // fetch songs from api with playlist.id

  return {
    props: {
      playlist
    }
  };
};