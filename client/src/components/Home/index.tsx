import { observer } from 'mobx-react-lite';
import { Game } from '#components/Game';
// import { Timer } from '#components/Timer';
import style from './home.module.scss';

const timeOfPassage = 60;

export const Home = observer(() => {
  return (
    <section className={style.home}>
      {/* <Timer expiryTimestamp={timeOfPassage} /> */}
      <Game className={style.game} />
    </section>
  );
});
