import type { FC } from 'react';
import type { PlaylistFormViewProps } from '../../../types/components/forms';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { titleTexts, descriptionTexts } from '../../../langs/components/inputs';
import styles from './PlaylistForm.module.scss';
import InputField from '../../inputs/InputField/InputField';
import InputArea from '../../inputs/InputArea/InputArea';
import FormWrapper from '../../../layouts/FormWrapper/FormWrapper';
import Message from '../../Message/Message';
import { buttonsTexts } from '../../../langs/components/playlistForm';
import { useRouter } from 'next/router';

const PlaylistFormView: FC<PlaylistFormViewProps> = ({
  handleSubmit,
  title, setTitle,
  description, setDescription,
  songs_ids, setSongs_ids,
  validMessage, setValidMessage,
  warningMessage, setWarningMessage
}) => {

  const { lang } = useContext(LangContext);
  const router = useRouter();

  const titleLabel = titleTexts.label[lang as keyof typeof titleTexts.label];
  const titleTitle = titleTexts.title[lang as keyof typeof titleTexts.title]
  const descriptionLabel = descriptionTexts.label[lang as keyof typeof descriptionTexts.label];
  const descriptionTitle = descriptionTexts.title[lang as keyof typeof descriptionTexts.title];
  const createLabel = buttonsTexts.create.label[lang as keyof typeof buttonsTexts.create.label];
  const createTitle = buttonsTexts.create.title[lang as keyof typeof buttonsTexts.create.title];
  const updateLabel = buttonsTexts.save.label[lang as keyof typeof buttonsTexts.save.label];
  const updateTitle = buttonsTexts.save.title[lang as keyof typeof buttonsTexts.save.title];

  return (
    <FormWrapper handleSubmit={handleSubmit}>
      <InputField
        value={title}
        setValue={setTitle}
        id="playlist-title-input"
        label={titleLabel}
        title={titleTitle}
        autoFocus={true}
        limit={50}
      />

      <InputArea
        value={description}
        setValue={setDescription}
        id="playlist-description-input"
        label={descriptionLabel}
        title={descriptionTitle}
        limit={200}
        required={false}
      />

      <Message
        validMessage={validMessage}
        setValidMessage={setValidMessage}
        warningMessage={warningMessage}
        setWarningMessage={setWarningMessage}
      />

      <button
        className={styles.button}
        type='submit'
        title={router.pathname.includes('/create') ? createTitle : updateTitle}
        aria-label={router.pathname.includes('/create') ? createTitle : updateTitle}
      >
        {router.pathname.includes('/create') ? createLabel : updateLabel}
      </button>
    </FormWrapper>
  );
};

export default PlaylistFormView;