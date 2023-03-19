import type { FC } from 'react';
import { useContext  } from 'react';
import LinkedinIcon from '../../icons/LinkedinIcon';
import GithubIcon from '../../icons/GithubIcon';
import styles from './Footer.module.scss';
import AvatarIcon from '../../icons/AvatarIcon';
import { LangContext } from '../../contexts/LangContext';
import { footerTexts } from '../../translations/layouts/footer';

export const Footer: FC = () => {

  const { lang } = useContext(LangContext);
  const text = footerTexts.text[lang as keyof typeof footerTexts.text];
  const linkedinText = footerTexts.linkedin[lang as keyof typeof footerTexts.linkedin];
  const githubText = footerTexts.github[lang as keyof typeof footerTexts.github];
  const portfolioText = footerTexts.portfolio[lang as keyof typeof footerTexts.portfolio];

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        {text}
      </p>

      <section className={styles.links}>
        <a
          href='https://www.linkedin.com/in/adrien-lacourpaille/'
          title={linkedinText}
          className={styles.link}
        >
          <LinkedinIcon height='18' />
          LinkedIn
        </a>

        <a
          href='https://www.adrienlacourpaille.com/'
          className={styles.link}
          title={portfolioText}
        >
          <AvatarIcon height='18' color='var(--main-color)' />
          Portfolio
        </a>

        <a
          href='https://github.com/AdrienLcp'
          className={styles.link}
          title={githubText}
        >
          <GithubIcon height='18' color='var(--white)' />
          Github
        </a>
      </section>
    </footer>
  );
};