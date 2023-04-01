import type { FC } from 'react';
import type { ParamsNavProps } from '../../../types/components/others';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { LangContext } from '../../../contexts/LangContext';
import { moderationTexts, contactTexts, logOutTexts } from '../../../translations/layouts/navbar';
import { v4 as uuidv4 } from 'uuid';
import { CloseButton } from '../../buttons/CloseButton/CloseButton';
import { Button } from '../../buttons/Button/Button';
import Link from 'next/link';
import AdminIcon from '../../../icons/AdminIcon';
import LogoutIcon from '../../../icons/LogoutIcon';
import MailIcon from '../../../icons/MailIcon';
import styles from './ParamsNav.module.scss';

export const ParamsNav: FC<ParamsNavProps> = ({
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
          <li key={uuidv4()}>
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

          {logged && user.moderator && !user.banned &&
            <li key={uuidv4()}>
              <Link
                href="/moderation/playlists"
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
            <li key={uuidv4()}>
              <Button
                styles={styles.link}
                title={logOutTitle}
                onClick={() => {
                  logOut();
                  setToggleMenu(false);
                }}
              >
                <LogoutIcon color="var(--white)" />

                <label className={styles.label}>
                  {logOutLabel}
                </label>
              </Button>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};