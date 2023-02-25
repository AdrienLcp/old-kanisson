import type { FC } from 'react';
import type { ColorPickerProps } from '../../types/components/others';
import { v4 as uuidv4 } from 'uuid';
import styles from './ColorPicker.module.scss';
import CheckIcon from '../../icons/CheckIcon';
import { Button } from '../buttons/Button/Button';

export const ColorPicker: FC<ColorPickerProps> = ({
  hue,
  itemHue,
  title,
  color,
  changeColor
}) => {

  return (
    <li key={uuidv4()}>
      <Button
        styles={hue === itemHue ?
          `${color} ${styles.button} ${styles.button_active}`
        :
          `${color} ${styles.button}`
        }
        title={title}
        onClick={() => changeColor(itemHue)}
      >
        {hue === itemHue &&
          <CheckIcon color="var(--white)" />
        }
      </Button>
    </li>
  );
};