import { Button } from '#components/Button/Button';
import s from './timer.module.scss';
import { useEffect, useState } from 'react';

export const Timer = ({ expiryTimestamp }) => {
  const [seconds, setSeconds] = useState(expiryTimestamp);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className={s.timer}>
      <div className={s.timer__value}>
        <span>{seconds > 10 ? seconds : '0' + seconds}</span>
      </div>
      <div className={s.timer__buttons}>
        <Button>Start</Button>
      </div>
    </article>
  );
};
