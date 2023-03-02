import type { FC } from 'react';
import type { Playlist } from '@prisma/client';
import type { PlaylistsSliderProps } from '../../types/components/others';
import { useRef, useContext, useState, useEffect } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { arrowButton } from '../../translations/components/buttons';
import { v4 as uuidv4 } from 'uuid';
import { ArrowButton } from '../buttons/ArrowButton/ArrowButton';
import PlaylistCard from '../cards/PlaylistCard/PlaylistCard';
import styles from './PlaylistsSlider.module.scss';

export const PlaylistsSlider: FC<PlaylistsSliderProps> = ({
  playlists,
  title
}) => {

  const sliderRef = useRef<HTMLUListElement>(null);
  const cardRef = useRef<HTMLLIElement>(null);
  const { lang } = useContext(LangContext);
  const rightTitle = arrowButton.right[lang as keyof typeof arrowButton.right];
  const leftTitle = arrowButton.left[lang as keyof typeof arrowButton.left];

  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [toggleLeftArrow, setToggleLeftArrow] = useState<boolean>(false);
  const [toggleRightArrow, setToggleRightArrow] = useState<boolean>(true);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

  // Every time current list's position change
  useEffect(() => {

    if(currentPosition >= 0) setToggleLeftArrow(false);

    // Get new list width & visible playlists width in case of user change his navigator width
    const listWidth = getListWidth();
    const visiblePlaylistsWidth = getVisiblePlaylistsWidth();

    // Toggle arrows in case of slider go too far
    if(listWidth > visiblePlaylistsWidth &&
    (currentPosition - visiblePlaylistsWidth) > -listWidth) {
      setToggleRightArrow(true);
    } else {
      setToggleRightArrow(false);
    };
  }, [currentPosition]);

  const getListWidth = () => {
    const cardWidth = cardRef.current?.offsetWidth;
    // @ts-ignore
    return (cardWidth + gapBetweenCards) * playlists.length;
  };

  // Gap between cards is 2rem = 20px
  const gapBetweenCards = 20;

  const getVisiblePlaylistsWidth = () => {
    const clientWidth = document.body.clientWidth;

    // Margin change with client device width
    let margin = 40;
    // Filter width does not exist on mobile device
    let filterWidth = 0;

    // 40px for device under 850px client width
    if(clientWidth > 850 && clientWidth <= 1500) {
      // 300px for device between 850px & 1500px
      margin = 350;
      // Filter width is 80px on desktop devices
      filterWidth = 80;
    } else if(clientWidth > 1500) {
      // 450px for device above 1500px
      margin = 450;
      // Filter width is 80px on desktop devices
      filterWidth = 80;
    };

    // Visible playlists are between device width & left margin
    const visiblePlaylistsWidth = clientWidth - margin - filterWidth;
    return Math.floor(visiblePlaylistsWidth);
  };

  const disableButtons = () => {
    // Disable buttons to avoid double clicks
    setDisabledButtons(true);

    // Reactivate buttons after slide animation (500ms)
    setTimeout(() => {
      setDisabledButtons(false);
    }, 500);
  };

  // Click on right arrow => slide to right
  const slideToLeft = () => {
    setToggleLeftArrow(true);
    disableButtons();

    const visiblePlaylistsWidth = getVisiblePlaylistsWidth();
    const newScroll = visiblePlaylistsWidth - gapBetweenCards;
    const listWidth = getListWidth();

    // If there is enough space to slide, set new position
    if((currentPosition - newScroll) > (-listWidth + newScroll)) {
      sliderRef.current?.setAttribute('style', `transform: translateX(${currentPosition - newScroll}px)`);
      setCurrentPosition(current => current - newScroll);
    } else {
      // If slide goes to end of the list, set position to maximum
      const newPosition = (-listWidth + visiblePlaylistsWidth);
      sliderRef.current?.setAttribute('style', `transform: translateX(${newPosition}px)`);
      setCurrentPosition(newPosition);
    };
  };

  const slideToRight = () => {
    disableButtons();

    const visiblePlaylistsWidth = getVisiblePlaylistsWidth();
    const newScroll = visiblePlaylistsWidth - gapBetweenCards;

    // If new scroll lead to 0 or above, update position to 0
    if((currentPosition + newScroll) >= 0) {
      sliderRef.current?.setAttribute('style', `transform: translateX(0px)`);
      setCurrentPosition(0);
    } else {
      // Save new position in state & transform style to slider ref
      sliderRef.current?.setAttribute('style', `transform: translateX(${currentPosition + newScroll}px)`);
      setCurrentPosition(current => current + newScroll);
    };
  };

  return (
    <section className={styles.container}>
      <header>
        <h2 className={styles.title}>
          {title}
        </h2>
      </header>

      {toggleLeftArrow &&
        <ArrowButton
          handleFunction={slideToRight}
          title={leftTitle}
          disabled={disabledButtons}
          side='left'
        />
      }

      <ul
        className={styles.list}
        ref={sliderRef}
      >
        {playlists?.map((playlist: Playlist) =>
          <li key={uuidv4()} ref={cardRef}>
            <PlaylistCard playlist={playlist}/>
          </li>
        )}
      </ul>

      {toggleRightArrow &&
        <ArrowButton
          handleFunction={slideToLeft}
          title={rightTitle}
          disabled={disabledButtons}
          side='right'
        />
      }
    </section>
  );
};