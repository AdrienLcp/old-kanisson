import type { FunctionComponent } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { navbarTexts } from '../../langs/layouts/navbar';
import Link from 'next/link';
import styles from './Navbar.module.scss';

import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import CreateIcon from '../../icons/CreateIcon';
import AvatarIcon from '../../icons/AvatarIcon';
import LoginIcon from '../../icons/LoginIcon';
import AdminIcon from '../../icons/AdminIcon';
import MailIcon from '../../icons/MailIcon';
import LogoutIcon from '../../icons/LogoutIcon';

const Navbar: FunctionComponent = () => {

  const router = useRouter();
  const { user, logged, logOut } = useContext(UserContext);
  const { lang } = useContext(LangContext);

  const homeLabel = navbarTexts.home.label[lang as keyof typeof navbarTexts.home.label];
  const homeTitle = navbarTexts.home.title[lang as keyof typeof navbarTexts.home.title];

  const searchLabel = navbarTexts.search.label[lang as keyof typeof navbarTexts.search.label];
  const searchTitle = navbarTexts.search.title[lang as keyof typeof navbarTexts.search.title];

  const createLabel = navbarTexts.create.label[lang as keyof typeof navbarTexts.create.label];
  const createTitle = navbarTexts.create.title[lang as keyof typeof navbarTexts.create.title];

  const profileLabel = navbarTexts.profile.label[lang as keyof typeof navbarTexts.profile.label];
  const profileTitle = navbarTexts.profile.title[lang as keyof typeof navbarTexts.profile.title];

  const loginLabel = navbarTexts.login.label[lang as keyof typeof navbarTexts.login.label];
  const loginTitle = navbarTexts.login.title[lang as keyof typeof navbarTexts.login.title];

  const moderationLabel = navbarTexts.moderation.label[lang as keyof typeof navbarTexts.moderation.label];
  const moderationTitle = navbarTexts.moderation.title[lang as keyof typeof navbarTexts.moderation.title];

  const contactTitle = navbarTexts.contact.title[lang as keyof typeof navbarTexts.contact.title];

  const logoutLabel = navbarTexts.logOut.label[lang as keyof typeof navbarTexts.logOut.label];
  const logoutTitle = navbarTexts.logOut.title[lang as keyof typeof navbarTexts.logOut.label];

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        {!user.banned &&
          <>
            <li key={0}>
              <Link
                href="/"
                title={homeTitle}
                aria-label={homeTitle}
                className={
                  router.pathname === "/" ?
                    `${styles.link} ${styles.active}`
                  :
                    `${styles.link}`
                }
              >
                <HomeIcon color="var(--white)" />
                <label className={styles.label}>
                  {homeLabel}
                </label>
              </Link>
            </li>

            <li key={1}>
              <Link
                href="/search"
                title={searchTitle}
                aria-label={searchTitle}
                className={
                  router.pathname === "/search" ?
                    `${styles.link} ${styles.active}`
                  :
                    `${styles.link}`
                }
              >
                <SearchIcon color="var(--white)" />
                <label className={styles.label}>
                  {searchLabel}
                </label>
              </Link>
            </li>
          </>
        }

        {logged && !user.banned &&
          <>
            <li key={2}>
              <Link
                href="/create"
                title={createTitle}
                aria-label={createTitle}
                className={
                  router.pathname === "/create" ?
                    `${styles.link} ${styles.active}`
                  :
                    `${styles.link}`
                }
              >
                <CreateIcon color="var(--white)" />
                <label className={styles.label}>
                  {createLabel}
                </label>
              </Link>
            </li>

            <li key={3}>
              <Link
                href="/profile"
                title={profileTitle}
                aria-label={profileTitle}
                className={
                  router.pathname === "/profile" ?
                    `${styles.link} ${styles.active}`
                  :
                    `${styles.link}`
                }
              >
                <AvatarIcon color="var(--white)" />
                <label className={styles.label}>
                  {profileLabel}
                </label>
              </Link>
            </li>
          </>
        }

        {!logged && !user.banned &&
          <li key={4}>
            <Link
              href="/login"
              title={loginTitle}
              aria-label={loginTitle}
              className={
                router.pathname === "/login" ?
                  `${styles.link} ${styles.active}`
                :
                  `${styles.link}`
              }
            >
              <LoginIcon color="var(--white)" />

              <label className={styles.label}>
                {loginLabel}
              </label>
            </Link>
          </li>
        }

        {logged && user.admin && !user.banned &&
          <li key={5}>
            <Link
              href="/moderation"
              title={moderationTitle}
              aria-label={moderationTitle}
              className={
                router.pathname === "/moderation" ?
                  `${styles.link} ${styles.active}`
                :
                  `${styles.link}`
              }
            >
              <AdminIcon color="var(--white)" />

              <label className={styles.label}>
                {moderationLabel}
              </label>
            </Link>
          </li>
        }

        <li key={6}>
          <Link
            href="/contact"
            title={contactTitle}
            aria-label={contactTitle}
            className={
              router.pathname === "/contact" ?
                `${styles.link} ${styles.active}`
              :
                `${styles.link}`
            }
          >
            <MailIcon color="var(--white)" />

            <label className={styles.label}>
              Contact
            </label>
          </Link>
        </li>

        {logged &&
          <li key={7}>
            <button
              type="button"
              className={styles.link}
              title={logoutTitle}
              aria-label={logoutTitle}
              onClick={logOut}
            >
              <LogoutIcon color="var(--white)" />

              <label className={styles.label}>
                {logoutLabel}
              </label>
            </button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Navbar;