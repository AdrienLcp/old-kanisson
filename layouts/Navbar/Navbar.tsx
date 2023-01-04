import type { FC } from 'react';
import type { NavbarProps } from '../../types/layoutsProps';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import {
  home as homeTexts,
  search as searchTexts,
  profile as profileTexts,
  login as loginTexts,
  logout as logoutTexts,
  create as createTexts,
  moderation as moderationTexts,
  contact as contactTexts
} from '../../langs/layouts/navbar';
import { burgerButton } from '../../langs/components/buttons';
import Link from 'next/link';
import styles from './Navbar.module.scss';

import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import CreateIcon from '../../icons/CreateIcon';
import AvatarIcon from '../../icons/AvatarIcon';
import AdminIcon from '../../icons/AdminIcon';
import MailIcon from '../../icons/MailIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import BurgerIcon from '../../components/BurgerIcon/BurgerIcon';

const Navbar: FC<NavbarProps> = ({
  toggleMenu,
  setToggleMenu
}) => {

  const router = useRouter();
  const { user, logged, logOut } = useContext(UserContext);
  const { lang } = useContext(LangContext);

  const homeLabel = homeTexts.label[lang as keyof typeof homeTexts.label];
  const homeTitle = homeTexts.title[lang as keyof typeof homeTexts.title];

  const searchLabel = searchTexts.label[lang as keyof typeof searchTexts.label];
  const searchTitle = searchTexts.title[lang as keyof typeof searchTexts.title];

  const createLabel = createTexts.label[lang as keyof typeof createTexts.label];
  const createTitle = createTexts.title[lang as keyof typeof createTexts.title];

  const profileLabel = profileTexts.label[lang as keyof typeof profileTexts.label];
  const profileTitle = profileTexts.title[lang as keyof typeof profileTexts.title];

  const loginLabel = loginTexts.label[lang as keyof typeof loginTexts.label];
  const loginTitle = loginTexts.title[lang as keyof typeof loginTexts.title];

  const moderationLabel = moderationTexts.label[lang as keyof typeof moderationTexts.label];
  const moderationTitle = moderationTexts.title[lang as keyof typeof moderationTexts.title];

  const contactTitle = contactTexts.title[lang as keyof typeof contactTexts.title];

  const logoutLabel = logoutTexts.label[lang as keyof typeof logoutTexts.label];
  const logoutTitle = logoutTexts.title[lang as keyof typeof logoutTexts.label];

  const burgerTitle = burgerButton.title[lang as keyof typeof burgerButton.title];

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
                onClick={() => setToggleMenu(false)}
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
                onClick={() => setToggleMenu(false)}
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
                onClick={() => setToggleMenu(false)}
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
                onClick={() => setToggleMenu(false)}
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
              onClick={() => setToggleMenu(false)}
              className={
                router.pathname === "/login" ?
                  `${styles.link} ${styles.active}`
                :
                  `${styles.link}`
              }
            >
              <AvatarIcon color="var(--white)" />

              <label className={styles.label}>
                {loginLabel}
              </label>
            </Link>
          </li>
        }

        {logged && user.admin && !user.banned &&
          <li key={5} className={styles.mobile_hidden}>
            <Link
              href="/moderation"
              title={moderationTitle}
              aria-label={moderationTitle}
              onClick={() => setToggleMenu(false)}
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

        <li key={6} className={styles.mobile_hidden}>
          <Link
            href="/contact"
            title={contactTitle}
            aria-label={contactTitle}
            onClick={() => setToggleMenu(false)}
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
          <li key={7} className={styles.mobile_hidden}>
            <button
              type="button"
              className={styles.link}
              title={logoutTitle}
              aria-label={logoutTitle}
              onClick={() => {
                logOut();
                setToggleMenu(false);
              }}
            >
              <LogoutIcon color="var(--white)" />

              <label className={styles.label}>
                {logoutLabel}
              </label>
            </button>
          </li>
        }

        <li key={8} className={styles.desktop_hidden}>
          <button
            type="button"
            className={styles.link}
            title={burgerTitle}
            aria-label={burgerTitle}
            onClick={() => setToggleMenu(prev => !prev)}
          >
            <BurgerIcon state={toggleMenu} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;