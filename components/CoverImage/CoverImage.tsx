import type { FC } from 'react';
import type { CoverImageProps } from '../../types/components/others';
import Image from 'next/image';
import ImageIcon from '../../icons/ImageIcon';
import styles from './CoverImage.module.scss';

const CoverImage: FC<CoverImageProps> = ({
  url,
  alt,
  height
}) => {

  return (
    <>
      {url ?
        <Image
          className={styles.image}
          width={height}
          height={height}
          alt={alt}
          src={url}
        />
      :
        <ImageIcon height={`${height}`} />
      }
    </>

  );
};

export default CoverImage;