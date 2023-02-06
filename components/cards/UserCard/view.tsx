import type { FC } from 'react';
import type { UserCardViewProps } from '../../../types/components/moderation';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import styles from './UserCard.module.scss';

const UserCardView: FC<UserCardViewProps> = () => {

  const { lang } = useContext(LangContext);

  return (
    <>
      
    </>
  );
};

export default UserCardView;