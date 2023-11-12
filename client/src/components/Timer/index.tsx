import { Button } from '#components/Button/Button';
import { useTimer } from 'react-timer-hook';
import s from './timer.module.scss';
import { useState } from 'react';

export const Timer = ({ expiryTimestamp }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    // onExpire: () => console.warn('onExpire called'),
    autoStart: false,
  });

  return (
    <article className={s.timer}>
      <div className={s.timer__value}>
        <span>{minutes > 10 ? minutes : '0' + minutes}</span>:
        <span>{seconds > 10 ? seconds : '0' + seconds}</span>
      </div>
      <div className={s.timer__buttons}>
        {isRunning ? (
          <Button
            onClick={() => {
              const time = new Date();
              time.setSeconds(time.getSeconds() + 120);
              restart(time);
              pause();
            }}
          >
            Рестарт
          </Button>
        ) : (
          <Button onClick={resume}>Старт</Button>
        )}
      </div>
    </article>
  );
};
