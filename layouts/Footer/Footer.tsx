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
  const linkedinLabel = footerTexts.linkedin.label[lang as keyof typeof footerTexts.linkedin.label];
  const linkedinTitle = footerTexts.linkedin.title[lang as keyof typeof footerTexts.linkedin.title];
  const githubLabel = footerTexts.github.label[lang as keyof typeof footerTexts.github.label];
  const githubTitle = footerTexts.github.title[lang as keyof typeof footerTexts.github.title];
  const portfolioLabel = footerTexts.portfolio.label[lang as keyof typeof footerTexts.portfolio.label];
  const portfolioTitle = footerTexts.portfolio.title[lang as keyof typeof footerTexts.portfolio.title];

  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        {text}
      </p>

      <section className={styles.links}>
        <a
          href='https://www.linkedin.com/in/adrien-lacourpaille/'
          className={styles.link}
          target='_blank'
          rel='noreferrer'
          title={linkedinTitle}
        >
          <LinkedinIcon height='18' />
          {linkedinLabel}
        </a>

        <a
          href='https://www.adrienlacourpaille.com/'
          className={styles.link}
          target='_blank'
          rel='noreferrer'
          title={portfolioTitle}
        >
          <AvatarIcon height='18' color='var(--main-color)' />
          {portfolioLabel}
        </a>

        <a
          href='https://github.com/AdrienLcp'
          className={styles.link}
          target='_blank'
          rel='noreferrer'
          title={githubTitle}
        >
          <GithubIcon height='18' color='var(--white)' />
          {githubLabel}
        </a>
      </section>
    </footer>
  );
};