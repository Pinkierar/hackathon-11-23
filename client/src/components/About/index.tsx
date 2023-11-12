import { stackIcons } from './constants';

import s from './about.module.scss';
import { link } from 'fs';

export const About = () => {
  return (
    <section className={s.about}>
      <h2 className={s.title}>Цель и мотивация проекта</h2>
      <p className={s.description}>
        Игра написана в рамках{' '}
        <a
          className={s.link}
          href="https://jun-hackaton-landing.vercel.app/#about"
          target="_blank"
        >
          благотворительного хакатона для джунов
        </a>
        , организованный{' '}
        <a
          href="https://t.me/natti_davydova"
          className={s.link}
          target="_blank"
        >
          Наташей Давыдовой
        </a>{' '}
        и{' '}
        <a className={s.link} href="https://sirota.ru/" target="_blank">
          НКО "Найди семью"
        </a>
      </p>
      <div className={s.stack}>
        <ul className={s.stack__list}>
          {stackIcons.map((item, i) => (
            <li className={s.stack__item} key={i}>
              <img src={item.src} alt={item.alt}></img>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
