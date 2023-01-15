import type { FC } from 'react';
import type { ColorPickerProps } from '../../types/components/others';
import { v4 as uuidv4 } from 'uuid';
import styles from './ColorPicker.module.scss';
import CheckIcon from '../../icons/CheckIcon';

const ColorPicker: FC<ColorPickerProps> = ({
  hue,
  itemHue,
  title,
  color,
  changeColor
}) => {

  return (
    <li key={uuidv4()}>
      <button
        className={hue === itemHue ?
          `${color} ${styles.button} ${styles.button_active}`
        :
          `${color} ${styles.button}`
        }
        type="button"
        aria-label={title}
        title={title}
        onClick={() => changeColor(itemHue)}
      >
        {hue === itemHue &&
          <CheckIcon color="var(--white)" />
        }
      </button>
    </li>
  );
};

export default ColorPicker;