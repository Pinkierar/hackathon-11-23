import s from './footer.module.scss';

export const Footer = () => {
  return (
    <footer>
      <p className={s.text}>
        <a href="https://t.me/mgnsmlsvc" target="_blank">
          Норбаев
        </a>{' '}
        &{' '}
        <a href="https://t.me/Pinkieran" target="_blank">
          Рубцов
        </a>{' '}
        | <span className={s.team}>Команда №17</span>
      </p>
    </footer>
  );
};
