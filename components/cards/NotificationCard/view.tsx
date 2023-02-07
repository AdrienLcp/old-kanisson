import type { FC } from 'react';
import type { NotificationCardViewProps } from '../../../types/components/cards';
import { useContext, useState } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { notificationCard } from '../../../translations/components/cards';
import styles from './NotificationCard.module.scss';
import NotificationModal from '../../NotificationModal/NotificationModal';

const NotificationCardView: FC<NotificationCardViewProps> = ({
  notification,
  notificationSeen
}) => {

  const { lang } = useContext(LangContext);
  const seeNotificationTitle = notificationCard.see[lang as keyof typeof notificationCard.see];

  const [seen, setSeen] = useState<boolean>(notification.seen);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  return (
    <>
      <article
        className={seen ?
          `${styles.card} ${styles.seen}`
        :
          `${styles.card}`
        }
        title={seeNotificationTitle}
        onClick={() => {
          setToggleModal(true);
          setSeen(true);
          notificationSeen();
        }}
      >
        <header>
          <h2 className={styles.title}>
            {notification.title}
          </h2>
        </header>

        <span className={styles.date}>
          {notification.date}
        </span>
      </article>

      {toggleModal &&
        <NotificationModal
          notification={notification}
          setToggleModal={setToggleModal}
        />
      }
    </>
  );
};

export default NotificationCardView;