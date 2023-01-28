import type { FC } from 'react';
import type { TrackEditViewProps } from '../../types/components/tracks';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { buttonsTexts, inputsTexts, warningTexts } from '../../translations/components/trackEdit';
import SaveIcon from '../../icons/SaveIcon';
import PlayIcon from '../../icons/PlayIcon';
import TrashIcon from '../../icons/TrashIcon';
import IconButton from '../buttons/IconButton/IconButton';
import InputField from '../inputs/InputField/InputField';
import styles from './TrackEdit.module.scss';
import StopIcon from '../../icons/StopIcon';

const TrackEditView: FC<TrackEditViewProps> = ({
  previousTitle,
  title,
  setTitle,
  artist,
  setArtist,
  updateTrack,
  isPlaying,
  setIsPlaying,
  deleteTrack
}) => {

  const { lang } = useContext(LangContext);

  const requiredMessage = warningTexts.message[lang as keyof typeof warningTexts.message];
  const requiredText = warningTexts.text[lang as keyof typeof warningTexts.text];
  const titleLabel = inputsTexts.title.label[lang as keyof typeof inputsTexts.title.label];
  const titleTitle = inputsTexts.title.title[lang as keyof typeof inputsTexts.title.title];
  const artistLabel = inputsTexts.artist.label[lang as keyof typeof inputsTexts.artist.label];
  const artistTitle = inputsTexts.artist.title[lang as keyof typeof inputsTexts.artist.title];
  const saveLabel = buttonsTexts.save.label[lang as keyof typeof buttonsTexts.save.label];
  const saveTitle = buttonsTexts.save.title[lang as keyof typeof buttonsTexts.save.title];
  const playLabel = buttonsTexts.play.label[lang as keyof typeof buttonsTexts.play.label];
  const playTitle = buttonsTexts.play.title[lang as keyof typeof buttonsTexts.play.title];
  const stopLabel = buttonsTexts.stop.label[lang as keyof typeof buttonsTexts.stop.label];
  const stopTitle = buttonsTexts.stop.title[lang as keyof typeof buttonsTexts.stop.title];
  const deleteLabel = buttonsTexts.delete.label[lang as keyof typeof buttonsTexts.delete.label];
  const deleteTitle = buttonsTexts.delete.title[lang as keyof typeof buttonsTexts.delete.title];

  return (
    <article
      className={styles.container}
      onKeyDown={(event) => {
        if(event.code === 'Enter' || event.code === 'NumpadEnter') updateTrack();
        if(event.code === 'Space') setIsPlaying(prev => !prev);
      }}
    >
      <header>
        <h4 className={styles.title}>
          {previousTitle}
        </h4>
      </header>

      <section className={styles.inputs}>
        <InputField
          value={title}
          setValue={setTitle}
          id="track-edit-title-input"
          label={titleLabel}
          title={titleTitle}
          limit={50}
          autoFocus={true}
        />

        <InputField
          value={artist}
          setValue={setArtist}
          id="track-edit-artist-input"
          label={artistLabel}
          title={artistTitle}
          limit={50}
        />

        {!title && !artist &&
          <div className={styles.warnings}>
            <p className={styles.warning}>
              {requiredMessage}
            </p>

            <span className={styles.span}>
              {requiredText}
            </span>
          </div>
        }
      </section>

      <footer className={styles.footer}>
        <IconButton
          handleFunction={updateTrack}
          title={saveTitle}
          label={saveLabel}
        >
          <SaveIcon />
        </IconButton>

        <IconButton
          handleFunction={() => setIsPlaying(prev => !prev)}
          title={isPlaying ? stopTitle : playTitle}
          label={isPlaying ? stopLabel : playLabel}
        >
          {isPlaying ? <StopIcon /> : <PlayIcon />}
        </IconButton>

        <IconButton
          handleFunction={deleteTrack}
          title={deleteTitle}
          label={deleteLabel}
        >
          <TrashIcon />
        </IconButton>
      </footer>
    </article>
  );
};

export default TrackEditView;