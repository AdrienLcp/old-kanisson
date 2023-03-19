import type { FC } from 'react';
import type { GoodAnswerProps } from '../../../types/components/game';
import { useContext } from 'react';
import { LangContext } from '../../../contexts/LangContext';
import { gameTexts } from '../../../translations/pages/play';
import styles from './GoodAnswer.module.scss';
import { CoverImage } from '../../CoverImage/CoverImage';

export const GoodAnswer: FC<GoodAnswerProps> = ({
  goodAnswer
}) => {

  const { lang } = useContext(LangContext);
  const text = gameTexts.goodAnswer[lang as keyof typeof gameTexts.goodAnswer];

  return (
    <section className={styles.container}>
      <span className={styles.text}>
        {text}
      </span>

      <article className={styles.track}>
        <div className={styles.img}>
          <CoverImage
            url={goodAnswer.img}
            height={50}
          />
        </div>

        <header className={styles.header}>
          {goodAnswer.title &&
            <h3 className={styles.title}>
              {goodAnswer.title}
            </h3>
          }

          {goodAnswer.artist &&
            <h2 className={styles.artist}>
              {goodAnswer.artist}
            </h2>
          }
        </header>
      </article>
    </section>
  );
};