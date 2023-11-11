import { BsJoystick } from 'react-icons/bs';
import { BiTimer } from 'react-icons/bi';

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
];
