import { Link } from 'react-router-dom';
import { HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';
import {
  AiOutlineHeart,
  AiOutlineInfoCircle,
  AiOutlineRead,
} from 'react-icons/ai';

import s from './header.module.scss';

type HeaderPropsMin = {
  children?: never;
};

type HeaderProps = Omit<HTMLAttributes<HTMLElement>, keyof HeaderPropsMin> &
  HeaderPropsMin;

export const Header = observer<HeaderProps>(() => {
  return (
    <header>
      <h2 className={s.title}>
        <AiOutlineHeart />
        <Link to="/">Лабиринт</Link>
      </h2>

      <article className={s.right}>
        <div className={s.rules}>
          <AiOutlineRead />
          <Link to="/rules">Правила</Link>
        </div>
        <div className={s.about}>
          <AiOutlineInfoCircle />
          <a href="#">Подробнее</a>
        </div>
      </article>
    </header>
  );
});
