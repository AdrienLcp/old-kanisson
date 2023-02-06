import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { headerTexts } from '../../../translations/components/moderation';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import styles from './ModerationNav.module.scss';

const ModerationNav: FC = () => {

  const router = useRouter();

  const { lang } = useContext(LangContext);
  const playlistsLabel = headerTexts.playlists.label[lang as keyof typeof headerTexts.playlists.label];
  const playlistsTitle = headerTexts.playlists.title[lang as keyof typeof headerTexts.playlists.title];
  const usersLabel = headerTexts.users.label[lang as keyof typeof headerTexts.users.label];
  const usersTitle = headerTexts.users.title[lang as keyof typeof headerTexts.users.title];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>

        <li key={uuidv4()}>
          <Link
            className={router.pathname === "/moderation/playlists" ?
              `${styles.link} ${styles.active}`
            :
              `${styles.link}`
            }
            title={playlistsTitle}
            href="/moderation/playlists"
          >
            {playlistsLabel}
          </Link>
        </li>

        <li key={uuidv4()}>
          <Link
            className={router.pathname === "/moderation/users" ?
              `${styles.link} ${styles.active}`
            :
              `${styles.link}`
            }
            title={usersTitle}
            href="/moderation/users"
          >
            {usersLabel}
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default ModerationNav;