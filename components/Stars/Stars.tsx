import type { FC } from 'react';
import type { StarsProps } from '../../types/components/others';
import { useMemo, useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { titleTexts } from '../../translations/components/stars';
import { v4 as uuidv4 } from 'uuid';
import styles from './Stars.module.scss';
import StarIcon from '../../icons/StarIcon';

const Stars: FC<StarsProps> = ({ ratings }) => {

  const { lang } = useContext(LangContext);

  const ratedText = titleTexts.ratedText[lang as keyof typeof titleTexts.ratedText];
  const byText = titleTexts.byText[lang as keyof typeof titleTexts.byText];
  const userText = titleTexts.userText[lang as keyof typeof titleTexts.userText];
  const usersText = titleTexts.usersText[lang as keyof typeof titleTexts.usersText];

  let sum = 0;

  // Add every rates to have the total
  for(let i = 0; i < ratings.length; i++) {
    sum += ratings[i];
  };

  // Then get the average from it
  const average = useMemo(() => {
    return Math.floor((sum / ratings.length) * 10) / 10;
  }, [ratings]);

  const rating = Math.floor(sum / ratings.length);

  // Get number of filled stars
  const filled = useMemo(() => {
    let filledStars = [] as string[];

    for(let j = 0; j < rating; j++) {
      filledStars.push('+1');
    };

    return filledStars;
  }, [ratings]);

  // Get number of empty stars
  const empty = useMemo(() => {
    const emptyStars = [] as string[];

    for(let k = 0; k < 5 - rating; k++) {
      emptyStars.push('+1');
    };

    return emptyStars;
  }, [ratings]);

  return (
    <div
      className={styles.stars}
      // Text = "This quiz has been rated {average rate}/5 by {number of rates} user / users"
      title={`${ratedText} ${average}${byText} ${ratings.length} ${ratings.length < 2 ? userText : usersText}`}
      aria-label={`${ratedText} ${average}${byText} ${ratings.length} ${ratings.length < 2 ? userText : usersText}`}
    >
      {filled?.map(star =>
        <span key={uuidv4()}>
          <StarIcon
            color={"var(--gold)"}
            height={'18'}
          />
        </span>
      )}

      {empty?.map(star =>
        <span key={uuidv4()}>
          <StarIcon
            color={"var(--light-grey)"}
            height={'18'}
          />
        </span>
      )}
    </div>
  );
};

export default Stars;