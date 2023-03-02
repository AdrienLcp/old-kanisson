import type { FC } from 'react';
import type { User } from '@prisma/client';
import type { UsersListProps } from '../../../types/components/moderation';
import { useContext, useState, useMemo } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { noData } from '../../../translations/others/others';
import { usersFilter } from '../../../translations/components/filters';
import { v4 as uuidv4 } from 'uuid';
import styles from './BannedUsersList.module.scss';
import { InputField } from '../../inputs/InputField/InputField';
import BannedUserCard from '../../cards/BannedUserCard';

export const BannedUsersList: FC<UsersListProps> = ({
  users,
  setUsers,
  bannedUsers,
  setBannedUsers,
  setValidMessage,
  setWarningMessage
}) => {

  const { lang } = useContext(LangContext);
  const filterLabel = usersFilter.label[lang as keyof typeof usersFilter.label];
  const filterTitle = usersFilter.title[lang as keyof typeof usersFilter.title];
  const noDataText = noData[lang as keyof typeof noData];

  const [filter, setFilter] = useState<string>('');

  const filteredUsers = useMemo(() => {
    if(filter) {
      return bannedUsers.filter((user: User) => {
        // Filter playlists with title or creator username
        return user.pseudo.toLowerCase().includes(filter.toLowerCase());
      });
    };
    return bannedUsers;
  }, [filter, bannedUsers]);

  return (
    <section className={styles.container}>
      <>
        {bannedUsers.length > 0 ?
          <>
            {bannedUsers.length > 10 &&
              <InputField
                value={filter}
                setValue={setFilter}
                id='moderation-banned-users-filter'
                type='search'
                label={filterLabel}
                title={filterTitle}
              />
            }

            <ul className={styles.list}>
              {filteredUsers.map((user: User) =>
                <li key={uuidv4()}>
                  <BannedUserCard
                    user={user}
                    users={users}
                    setUsers={setUsers}
                    bannedUsers={bannedUsers}
                    setBannedUsers={setBannedUsers}
                    setValidMessage={setValidMessage}
                    setWarningMessage={setWarningMessage}
                  />
                </li>
              )}
            </ul>
          </>
        :
          <p className={styles.nothing}>
            {noDataText}
          </p>
        }
      </>
    </section>
  );
};