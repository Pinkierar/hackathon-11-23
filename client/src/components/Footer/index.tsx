import s from './footer.module.scss';

export const Footer = () => {
  return (
    <footer>
      <p className={s.text}>
        Норбаев & Рубцов | <span className={s.team}>Команда №17</span>
      </p>
    </footer>
  );
};
