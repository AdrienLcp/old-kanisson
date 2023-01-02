import type { FunctionComponent } from 'react';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { buttonsTexts } from '../../langs/components/buttons';
import CrossIcon from '../../icons/CrossIcon';
import IconButton from '../IconButton/IconButton';
import styles from './CloseButton.module.scss';

type Props = {
  handleFunction: () => void
};

const CloseButton: FunctionComponent<Props> = ({
  handleFunction
}) => {

  const { lang } = useContext(LangContext);



  const title = buttonsTexts.closeButton.title[lang as keyof typeof buttonsTexts.closeButton.title];

  return (
    <div className={styles.close}>
      <IconButton
        handleFunction={handleFunction}
        title={title}
      >
        <CrossIcon height='18'/>
      </IconButton>
    </div>
  );
};

export default CloseButton;