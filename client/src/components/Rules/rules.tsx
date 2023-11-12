import { BsJoystick } from 'react-icons/bs';
import { BiTimer } from 'react-icons/bi';
import { AiOutlineStop } from 'react-icons/ai';
import { VscDebugRestart } from 'react-icons/vsc';

import { IconType } from 'react-icons';
import { JSX } from 'react';

export const listRules: {
  icon: IconType;
  desc: JSX.Element;
}[] = [
  {
    icon: BsJoystick,
    desc: (
      <>Двигайся к цели, используя клавиши &#8593; &#8594; &#8595; &#8592;</>
    ),
  },
  {
    icon: BiTimer,
    desc: <>Помни о времени, оно ограничено!</>,
  },
  {
    icon: AiOutlineStop,
    desc: <>Лабиринт имеет прочные стены, обойти их не получится!</>,
  },
  {
    icon: VscDebugRestart,
    desc: <>В любой момент ты можешь начать путь сначала!</>,
  },
];
