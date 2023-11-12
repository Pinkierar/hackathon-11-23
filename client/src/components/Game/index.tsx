import { HTMLAttributes } from 'react';
import { observer } from 'mobx-react-lite';
import { P5Canvas } from '#components/P5Canvas';
import { sketch } from './sketch';
import style from './game.module.scss';

type GamePropsMin = {
  children?: never;
};

type GameProps = Omit<HTMLAttributes<HTMLElement>, keyof GamePropsMin> &
  GamePropsMin;

export const Game = observer<GameProps>((props) => {
  const { children, ...otherProps } = props;

  return (
    <div {...otherProps}>
      <P5Canvas className={style.canvas} sketch={sketch} />
    </div>
  );
});
