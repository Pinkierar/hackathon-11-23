import { observer } from 'mobx-react-lite';
import { Game } from '#components/Game';
import { Timer } from '#components/Timer';
import style from './home.module.scss';

const timeOfPassage = 120;

const time = new Date();
time.setSeconds(time.getSeconds() + timeOfPassage);

export const Home = observer(() => {
  return (
    <section className={style.home}>
      <Timer expiryTimestamp={time} />
      <Game className={style.game} />
    </section>
  );
});
