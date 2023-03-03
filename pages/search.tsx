import type { GetServerSideProps, NextPage } from 'next';
import type { SearchProps } from '../types/pages';
import { useContext } from 'react';
import { LangContext } from '../contexts/LangContext';
import { searchHeadTexts } from '../translations/layouts/head';
import { pageTitleTexts } from '../translations/pages/search';
import { noData } from '../translations/others/others';
import { api } from '../api/api';
import { NextHead } from '../layouts/Head/Head';
import { PageWrapper } from '../layouts/wrappers/PageWrapper/PageWrapper';
import { PlaylistFilter } from '../components/PlaylistsFilter/PlaylistsFilter';
import styles from '../styles/Search.module.scss';

const Search: NextPage<SearchProps> = ({
  playlists
}) => {

  const { lang } = useContext(LangContext);

  const headTitle = searchHeadTexts.title[lang as keyof typeof searchHeadTexts.title];
  const headDescription = searchHeadTexts.description[lang as keyof typeof searchHeadTexts.description];
  const pageTitle = pageTitleTexts[lang as keyof typeof pageTitleTexts];
  const noDataText = noData[lang as keyof typeof noData];

  return (
    <>
      <NextHead
        title={headTitle}
        description={headDescription}
      />

      <PageWrapper title={pageTitle}>

        {playlists.length > 0 ?
          <PlaylistFilter
            playlists={playlists}
          />
        :
          <p className={styles.nothing}>{noDataText}</p>
        }
      </PageWrapper>
    </>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async() => {

  const fetchedPlaylists = await fetch(`${api}/playlist/getAllPlayable`);
  const playlists = await fetchedPlaylists.json();

  return {
    props: {
      playlists
    }
  };
};