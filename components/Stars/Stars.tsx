import type { FC } from 'react';
import type { StarsProps } from '../../types/components/others';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { titleTexts } from '../../translations/components/stars';
import { v4 as uuidv4 } from 'uuid';
import styles from './Stars.module.scss';
import StarIcon from '../../icons/StarIcon';

export const Stars: FC<StarsProps> = ({
  average,
  ratings
}) => {

  const { lang } = useContext(LangContext);

  const ratedText = titleTexts.ratedText[lang as keyof typeof titleTexts.ratedText];
  const byText = titleTexts.byText[lang as keyof typeof titleTexts.byText];
  const userText = titleTexts.userText[lang as keyof typeof titleTexts.userText];
  const usersText = titleTexts.usersText[lang as keyof typeof titleTexts.usersText];

  // Get number of filled stars
  const filledStars = [] as string[];
  for(let j = 0; j < average; j++) filledStars.push('+1');

  // Get number of empty stars
  const emptyStars = [] as string[];
  for(let k = 0; k < 5 - average; k++) emptyStars.push('+1');

  return (
    <div
      className={styles.stars}
      // Text = "This quiz has been rated {average rate}/5 by {number of rates} user / users"
      title={`${ratedText} ${average}${byText} ${ratings.length} ${ratings.length < 2 ? userText : usersText}`}
      aria-label={`${ratedText} ${average}${byText} ${ratings.length} ${ratings.length < 2 ? userText : usersText}`}
    >
      {filledStars?.map(star =>
        <span key={uuidv4()}>
          <StarIcon
            color={"var(--gold)"}
            height={'18'}
          />
        </span>
      )}

      {emptyStars?.map(star =>
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