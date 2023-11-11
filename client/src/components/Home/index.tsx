import {observer} from 'mobx-react-lite';
import {Game} from '#components/Game';
import style from './home.module.scss';

export const Home = observer(() => {
  return (
    <div>
      <Game className={style.game}/>
    </div>
  );
});