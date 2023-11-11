import {
  AiOutlineArrowUp,
  AiOutlineArrowRight,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
} from 'react-icons/ai';

import { BsJoystick } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { JSX } from 'react';

import s from './rules.module.scss';

const listRules: {
  icon: IconType;
  desc: JSX.Element;
}[] = [
  {
    icon: BsJoystick,
    desc: (
      <>
        Двигайся к цели, используя клавиши <AiOutlineArrowUp />
        <AiOutlineArrowRight />
        <AiOutlineArrowDown />
        <AiOutlineArrowLeft />
      </>
    ),
  },
];

export const Rules = () => {
  return (
    <section>
      <h2>Добро пожаловать в "Путь счастья"!</h2>
      <p>
        В данной игре ты сталкиваешься с увлекательной миссией преодолеть
        сложный путь, представленный в виде лабиринта, между ребенком,
        оставшимся без родителями и его будущими приемными родителями!
      </p>
      <ul className={s.list}>
        {listRules.map((item, i) => (
          <li className={s.list__item} key={i}>
            <span>{<item.icon />}</span>
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
