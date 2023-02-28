import type { FC } from 'react';
import type { NotificationCardProps } from '../../../types/components/cards';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { LangContext } from '../../../contexts/LangContext';
import { notificationCard } from '../../../translations/components/cards';
import { api } from '../../../api/api';
import styles from './NotificationCard.module.scss';

export const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  index,
  notifications,
  setNotifications
}) => {

  const { user } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const seeNotificationTitle = notificationCard.see[lang as keyof typeof notificationCard.see];

  const notificationSeen = async() => {
    const token = localStorage.getItem('token');

    const body = {
      user_id: user.id,
      id: notification.id
    };

    await fetch(`${api}/notification/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status === 200) {
        // Update state
        const previousNotifications = [...notifications];
        previousNotifications[index].seen = true;
        setNotifications(previousNotifications);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <article
      className={notification.seen ?
        `${styles.card} ${styles.seen}`
      :
        `${styles.card}`
      }
      title={seeNotificationTitle}
      onClick={notificationSeen}
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
  );
};