import type { FC, FormEvent } from 'react';
import { useState, useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { moderationNotification } from '../../../translations/components/notifications';
import { api } from '../../../api/api';
import { Button } from '../../buttons/Button/Button';
import { IconButton } from '../../buttons/IconButton/IconButton';
import { Modal } from '../../../layouts/Modal/Modal';
import { Loader } from '../../Loader/Loader';
import { InputField } from '../../inputs/InputField/InputField';
import { InputArea } from '../../inputs/InputArea/InputArea';
import { Message } from '../../Message/Message';
import MailIcon from '../../../icons/MailIcon';
import styles from './MessageToUsers.module.scss';

export const MessageToUsers: FC = () => {

  const { lang } = useContext(LangContext);
  const modalTitle = moderationNotification.title[lang as keyof typeof moderationNotification.title];
  const notifSend = moderationNotification.ok[lang as keyof typeof moderationNotification.ok];
  const sendLabel = moderationNotification.send.label[lang as keyof typeof moderationNotification.send.label];
  const sendTitle = moderationNotification.send.title[lang as keyof typeof moderationNotification.send.title];
  const toggleTitle = moderationNotification.toggle[lang as keyof typeof moderationNotification.toggle];
  const inputLabel = moderationNotification.input[lang as keyof typeof moderationNotification.input];
  const areaLabel = moderationNotification.area[lang as keyof typeof moderationNotification.area];
  const defaultTitle = moderationNotification.defaultTitle[lang as keyof typeof moderationNotification.defaultTitle];

  const [title, setTitle] = useState<string>(defaultTitle);
  const [message, setMessage] = useState<string>('');
  const [validMessage, setValidMessage] = useState<string>('');
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/notification/createMany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ title, message })
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 201) {
        setTitle('');
        setMessage('');

        setValidMessage(notifSend);
      } else {
        console.log(data);
      };
    })
    .catch((error) => console.log(error));

    setLoading(false);
  };

  return (
    <>
      <section className={styles.container}>
        <IconButton
          handleFunction={() => setToggleModal(prev => !prev)}
          title={toggleTitle}
        >
          <MailIcon />
        </IconButton>

        {validMessage &&
          <Message
            validMessage={validMessage}
            setValidMessage={setValidMessage}
          />
        }
      </section>

      {toggleModal &&
        <Modal setToggleModal={setToggleModal}>
          <form
            className={styles.form}
            onSubmit={sendMessage}
          >
            <h3 className={styles.title}>
              {modalTitle}
            </h3>

            <InputField
              value={title}
              setValue={setTitle}
              label={inputLabel}
              id='input-title-notification'
              disabled={loading}
            />

            <InputArea
              value={message}
              setValue={setMessage}
              label={areaLabel}
              id='area-message-notification'
              disabled={loading}
              autoFocus={true}
            />

            {loading ?
              <Loader />
            :
              <Button
                styles={styles.button}
                type='submit'
                title={sendTitle}
              >
                {sendLabel}
              </Button>
            }
          </form>
        </Modal>
      }
    </>
  );
};