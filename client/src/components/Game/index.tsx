import { HTMLAttributes, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { P5Canvas } from '#components/P5Canvas';
import { sketch } from './sketch';
import style from './game.module.scss';
import { Button } from '#components/Button/Button.tsx';

type GamePropsMin = {
  children?: never;
};

type GameProps = Omit<HTMLAttributes<HTMLElement>, keyof GamePropsMin> &
  GamePropsMin;

export const Game = observer<GameProps>((props) => {
  const { children, ...otherProps } = props;

  const restartButtonRef = useRef<HTMLButtonElement>(null);
  const newButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div {...otherProps}>
      <div>
        <Button className={style.restart} ref={restartButtonRef}>Заново</Button>
        <Button className={style.newGame} ref={newButtonRef}>Новая игра</Button>
      </div>
      {restartButtonRef.current && newButtonRef.current && (
        <P5Canvas
          className={style.canvas}
          sketch={sketch({
            restartButton: restartButtonRef.current,
            newButton: newButtonRef.current
          })}
        />
      )}
      {/*<GameOver />*/}
    </div>
  );
});
