import type { FC } from 'react';
import type { BannedUsersCardViewProps } from '../../../types/components/moderation';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { usersTexts } from '../../../translations/components/moderation';
import styles from './BannedUserCard.module.scss';
import { IconButton } from '../../buttons/IconButton/IconButton';
import UnbanIcon from '../../../icons/UnbanIcon';
import BinIcon from '../../../icons/BinIcon';

export const BannedUserCardView: FC<BannedUsersCardViewProps> = ({
  user,
  unbanUser,
  deleteUser
}) => {

  const { lang } = useContext(LangContext);
  const unbanText = usersTexts.unban[lang as keyof typeof usersTexts.unban];
  const deleteText = usersTexts.delete[lang as keyof typeof usersTexts.delete];

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.pseudo}>
          {user.pseudo}
        </h3>
      </header>

      <footer className={styles.buttons}>
        <IconButton
          handleFunction={unbanUser}
          title={unbanText}
        >
          <UnbanIcon />
        </IconButton>

        <IconButton
          handleFunction={deleteUser}
          title={deleteText}
        >
          <BinIcon />
        </IconButton>
      </footer>
    </article>
  );
};