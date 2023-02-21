import type { FC } from 'react';
import type { CoverImageProps } from '../../types/components/others';
import { useContext } from 'react';
import { LangContext } from '../../contexts/LangContext';
import { trackCardTexts } from '../../translations/components/cards';
import Image from 'next/image';
import ImageIcon from '../../icons/ImageIcon';
import styles from './CoverImage.module.scss';

const CoverImage: FC<CoverImageProps> = ({
  url,
  alt,
  height
}) => {

  const { lang } = useContext(LangContext);
  const defaultAltText = trackCardTexts.coverAlt[lang as keyof typeof trackCardTexts.coverAlt];

  return (
    <>
      {url ?
        <Image
          className={styles.image}
          width={height ?? 30}
          height={height ?? 30}
          alt={alt ?? defaultAltText}
          src={url}
        />
      :
        <ImageIcon height={height ? `${height}` : '30'} />
      }
    </>
  );
};

export default CoverImage;