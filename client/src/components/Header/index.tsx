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

const Header = observer<HeaderProps>(() => {
  return (
    <header>
      <h2 className={s.title}>
        <AiOutlineHeart />
        <a href="#">Лабиринт</a>
      </h2>

      <div className={s.right}>
        <div className={s.rules}>
          <AiOutlineRead />
          <a href="#">Правила</a>
        </div>
        <div className={s.about}>
          <AiOutlineInfoCircle />
          <a href="#">Подробнее</a>
        </div>
      </div>
    </header>
  );
});

export default Header;
