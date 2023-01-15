import type { FC } from 'react';
import type { ParamsNavProps } from '../../../types/components/others';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { UserContext } from '../../../contexts/UserContext';
import Link from 'next/link';
import AdminIcon from '../../../icons/AdminIcon';
import LogoutIcon from '../../../icons/LogoutIcon';
import MailIcon from '../../../icons/MailIcon';
import { moderationTexts, contactTexts, logOutTexts } from '../../../langs/layouts/navbar';
import CloseButton from '../../buttons/CloseButton/CloseButton';
import styles from './ParamsNav.module.scss';

const ParamsNav: FC<ParamsNavProps> = ({
  setToggleMenu
}) => {

  const { user, logged, logOut } = useContext(UserContext);
  const { lang } = useContext(LangContext);

  const moderationLabel = moderationTexts.label[lang as keyof typeof moderationTexts.label];
  const moderationTitle = moderationTexts.title[lang as keyof typeof moderationTexts.title];

  const contactTitle = contactTexts.title[lang as keyof typeof contactTexts.title];

  const logOutLabel = logOutTexts.label[lang as keyof typeof logOutTexts.label];
  const logOutTitle = logOutTexts.title[lang as keyof typeof logOutTexts.label];

  return (
    <div className={styles.desktop_hidden}>
      <CloseButton
        handleFunction={() => setToggleMenu(false)}
        color="var(--white)"
      />

      <nav className={styles.nav}>

        <ul className={styles.list}>
          <li key={0}>
            <Link
              href="/contact"
              title={contactTitle}
              aria-label={contactTitle}
              className={styles.link}
              onClick={() => setToggleMenu(false)}
            >
              <MailIcon color="var(--white)" />

              <label className={styles.label}>
                Contact
              </label>
            </Link>
          </li>

          {logged && user.admin && !user.banned &&
            <li key={1}>
              <Link
                href="/moderation"
                title={moderationTitle}
                aria-label={moderationTitle}
                className={styles.link}
                onClick={() => setToggleMenu(false)}
              >
                <AdminIcon color="var(--white)" />

                <label className={styles.label}>
                  {moderationLabel}
                </label>
              </Link>
            </li>
          }

          {logged &&
            <li key={2}>
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
        </ul>
      </nav>
    </div>
  );
};

export default ParamsNav;