import type { FC } from 'react';
import type { NavbarProps } from '../../types/layouts';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { LangContext } from '../../contexts/LangContext';
import { UserContext } from '../../contexts/UserContext';
import { homeTexts, searchTexts, profileTexts, logInTexts, logOutTexts, createTexts, moderationTexts, contactTexts } from '../../translations/layouts/navbar';
import { burgerButton } from '../../translations/components/buttons';
import Link from 'next/link';
import styles from './Navbar.module.scss';

import HomeIcon from '../../icons/HomeIcon';
import SearchIcon from '../../icons/SearchIcon';
import CreateIcon from '../../icons/CreateIcon';
import AvatarIcon from '../../icons/AvatarIcon';
import AdminIcon from '../../icons/AdminIcon';
import MailIcon from '../../icons/MailIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import BurgerIcon from '../../components/buttons/BurgerIcon/BurgerIcon';

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

  const logInLabel = logInTexts.label[lang as keyof typeof logInTexts.label];
  const logInTitle = logInTexts.title[lang as keyof typeof logInTexts.title];

  const moderationLabel = moderationTexts.label[lang as keyof typeof moderationTexts.label];
  const moderationTitle = moderationTexts.title[lang as keyof typeof moderationTexts.title];

  const contactTitle = contactTexts.title[lang as keyof typeof contactTexts.title];

  const logOutLabel = logOutTexts.label[lang as keyof typeof logOutTexts.label];
  const logOutTitle = logOutTexts.title[lang as keyof typeof logOutTexts.label];

  const openTitle = burgerButton.open[lang as keyof typeof burgerButton.open];
  const closeTitle = burgerButton.close[lang as keyof typeof burgerButton.close];

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
              title={logInTitle}
              aria-label={logInTitle}
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
                {logInLabel}
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
              title={logOutTitle}
              aria-label={logOutTitle}
              onClick={() => {
                logOut();
                setToggleMenu(false);
              }}
            >
              <LogoutIcon color="var(--white)" />

              <label className={styles.label}>
                {logOutLabel}
              </label>
            </button>
          </li>
        }

        <li key={8} className={styles.desktop_hidden}>
          <button
            className={styles.link}
            type="button"
            title={toggleMenu ? closeTitle : openTitle}
            aria-label={toggleMenu ? closeTitle : openTitle}
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