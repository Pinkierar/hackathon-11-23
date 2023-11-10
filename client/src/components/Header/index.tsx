import {HTMLAttributes} from 'react';
import {observer} from 'mobx-react-lite';

type HeaderPropsMin = {
  children?: never,
};

type HeaderProps =
  Omit<HTMLAttributes<HTMLElement>, keyof HeaderPropsMin>
  & HeaderPropsMin;

export const Header = observer<HeaderProps>(props => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <header {...otherProps}>
      Шапка
    </header>
  );
});