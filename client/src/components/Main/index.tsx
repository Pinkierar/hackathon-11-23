import {HTMLAttributes} from 'react';
import {observer} from 'mobx-react-lite';

type MainPropsMin = {
};

export type MainProps =
  Omit<HTMLAttributes<HTMLElement>, keyof MainPropsMin>
  & MainPropsMin;

export const Main = observer<MainProps>(props => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <main {...otherProps}>
      {children}
    </main>
  );
});