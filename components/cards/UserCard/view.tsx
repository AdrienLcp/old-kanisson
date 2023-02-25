import type { FC } from 'react';
import type { UserCardViewProps } from '../../../types/components/moderation';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { LangContext } from '../../../contexts/LangContext';
import { usersTexts } from '../../../translations/components/moderation';
import styles from './UserCard.module.scss';
import { IconButton } from '../../buttons/IconButton/IconButton';
import BanIcon from '../../../icons/BanIcon';
import DowngradeIcon from '../../../icons/DowngradeIcon';
import PromoteIcon from '../../../icons/PromoteIcon';
import AdminIcon from '../../../icons/AdminIcon';

export const UserCardView: FC<UserCardViewProps> = ({
  currentUser,
  manageUser,
  banUser
}) => {

  const { user }= useContext(UserContext);
  const { lang } = useContext(LangContext);
  const promoteText = usersTexts.promote[lang as keyof typeof usersTexts.promote];
  const downgradeText = usersTexts.downgrade[lang as keyof typeof usersTexts.downgrade];
  const banText = usersTexts.ban[lang as keyof typeof usersTexts.ban];

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        {currentUser.moderator &&
          <AdminIcon color='var(--main-color)' />
        }

        <h3 className={styles.pseudo}>
          {currentUser.pseudo}
        </h3>
      </header>

      {user.id !== currentUser.id &&
        <footer className={styles.buttons}>
          <IconButton
            handleFunction={manageUser}
            title={currentUser.moderator ? downgradeText : promoteText}
          >
            {currentUser.moderator ? <DowngradeIcon /> : <PromoteIcon />}
          </IconButton>

          <IconButton
            handleFunction={banUser}
            title={banText}
          >
            <BanIcon />
          </IconButton>
        </footer>
      }
    </article>
  );
};