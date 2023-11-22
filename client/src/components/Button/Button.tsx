import { forwardRef, HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';

import s from './button.module.scss';
import {cl} from '#includes/cl.ts';

type ButtonPropsMin = {};

type ButtonProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  keyof ButtonPropsMin
> &
  ButtonPropsMin;

export const Button = observer<ButtonProps, HTMLButtonElement>(
  forwardRef((props, ref) => {
    const { children, className, ...otherProps } = props;
    return (
      <button className={cl(s.button, className)} {...otherProps} ref={ref}>
        {children}
      </button>
    );
  }),
);
