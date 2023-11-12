import s from './gameOver.module.scss';
import { Button } from '#components/Button/Button';

export const GameOver = () => {
  return (
    <section className={s.over}>
      <article className={s.form}>
        <p>Время истекло, попробуй еще раз!</p>
        <Button>Ок!</Button>
      </article>
    </section>
  );
};
