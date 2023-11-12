import { forwardRef, HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';

import s from './button.module.scss';

type ButtonPropsMin = {};

type ButtonProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  keyof ButtonPropsMin
> &
  ButtonPropsMin;

export const Button = observer<ButtonProps, HTMLButtonElement>(
  forwardRef((props, ref) => {
    const { children, ...otherProps } = props;
    return (
      <button className={s.button} {...otherProps} ref={ref}>
        {children}
      </button>
    );
  }),
);
