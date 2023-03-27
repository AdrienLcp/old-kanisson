import type { NextPage } from 'next';
import type { User } from '@prisma/client';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { LangContext } from '../../contexts/LangContext';
import { moderationHeadTexts } from '../../translations/layouts/head';
import { usersTexts } from '../../translations/pages/moderation';
import { api } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';
import { NextHead } from '../../layouts/Head/Head';
import { ModerationNav } from '../../components/moderation/Navigation/ModerationNav';
import { PageWrapper } from '../../layouts/wrappers/PageWrapper/PageWrapper';
import { Message } from '../../components/Message/Message';
import { Tabs } from '../../components/Tabs/Tabs';
import { UsersList } from '../../components/moderation/UsersList/UsersList';
import { BannedUsersList } from '../../components/moderation/BannedUsersList/BannedUsersList';
import { Loader } from '../../components/Loader/Loader';
import { MessageToUsers } from '../../components/moderation/MessageToUsers/MessageToUsers';

const UsersModeration: NextPage = () => {

  const { user, logged } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const headTitle = moderationHeadTexts.users[lang as keyof typeof moderationHeadTexts.users];
  const pageTitle = usersTexts.title[lang as keyof typeof usersTexts.title];
  const usersTab = usersTexts.users[lang as keyof typeof usersTexts.users];
  const bannedUsersTab = usersTexts.bannedUsers[lang as keyof typeof usersTexts.bannedUsers];

  const [users, setUsers] = useState<User[]>([]);
  const [bannedUsers, setBannedUsers] = useState<User[]>([]);
  const [validMessage, setValidMessage] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async() => {
    const token = localStorage.getItem('token');

    await fetch(`${api}/user/getAll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {
        sortUsers(data);
      } else {
        console.log(data);
      };
    })
    .catch((error) => console.log(error));

    setLoading(false);
  };

  const sortUsers = (usersData: User[]) => {
    const filteredValidUsers = usersData.filter(user => !user.banned);
    setUsers(filteredValidUsers);

    const filteredBannedUsers = usersData.filter(user => user.banned);
    setBannedUsers(filteredBannedUsers);
  };

  return (
    <>
      <NextHead title={headTitle} />

      <ModerationNav />

      <PageWrapper title={pageTitle}>

        {loading || !logged || logged && !user.moderator ?
          <Loader />
        :
          <>
            <MessageToUsers />

            <Message
              validMessage={validMessage}
              setValidMessage={setValidMessage}
              warningMessage={warningMessage}
              setWarningMessage={setWarningMessage}
            />

            <Tabs
              tabs={[
                <h2 key={uuidv4()}>{usersTab}</h2>,
                <h2 key={uuidv4()}>{bannedUsersTab}</h2>
              ]}
              contents={[
                <UsersList
                  key={uuidv4()}
                  users={users}
                  setUsers={setUsers}
                  bannedUsers={bannedUsers}
                  setBannedUsers={setBannedUsers}
                  setValidMessage={setValidMessage}
                  setWarningMessage={setWarningMessage}
                />,
                <BannedUsersList
                  key={uuidv4()}
                  users={users}
                  setUsers={setUsers}
                  bannedUsers={bannedUsers}
                  setBannedUsers={setBannedUsers}
                  setValidMessage={setValidMessage}
                  setWarningMessage={setWarningMessage}
                />
              ]}
            />
          </>
        }
      </PageWrapper>
    </>
  );
};

export default UsersModeration;