import s from './gameOver.module.scss';

export const GameOver = () => {
  return (
    <section className={s.over}>
      <article className={s.form}>
        <p>Время истекло, попробуй еще раз!</p>
      </article>
    </section>
  );
};
