import { observer } from 'mobx-react-lite';
import s from './notFound.module.scss';

export const NotFound = observer(() => {
  return (
    <section>
      <img className={s.img} src={'assets/404/404.jpg'}></img>
    </section>
  );
});
