import { Link } from 'react-router-dom';
import { HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';
import { AiOutlineInfoCircle, AiOutlineRead } from 'react-icons/ai';

import s from './header.module.scss';

type HeaderPropsMin = {
  children?: never;
};

type HeaderProps = Omit<HTMLAttributes<HTMLElement>, keyof HeaderPropsMin> &
  HeaderPropsMin;

export const Header = observer<HeaderProps>(() => {
  return (
    <header>
      <article className={s.title}>
        <Link to="/">
          Путь <br /> <hr />
          <span className={s.join}>счастья</span>
        </Link>
      </article>

      <article className={s.right}>
        <div className={s.rules}>
          <AiOutlineRead />
          <Link to="/rules">Правила</Link>
        </div>
        <div className={s.about}>
          <AiOutlineInfoCircle />
          <Link to="/about">Подробнее</Link>
        </div>
      </article>
    </header>
  );
});
