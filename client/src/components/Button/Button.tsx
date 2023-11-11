import { HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';

type ButtonPropsMin = {};

type ButtonProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  keyof ButtonPropsMin
> &
  ButtonPropsMin;

export const Button = observer<ButtonProps>((props) => {
  const { children, ...otherProps } = props;
  return <button {...otherProps}>{children}</button>;
});
