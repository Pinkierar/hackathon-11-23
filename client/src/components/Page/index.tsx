import { observer } from 'mobx-react-lite';
import { Header } from '#components/Header';
import { About } from '#components/About';
import { Footer } from '#components/Footer';
import { Rules } from '#components/Rules';
import { NotFound } from '#components/NotFound';
import { Home } from '#components/Home';
import { GameOver } from '#components/GameOver';
import { Notifications } from '#components/Notifications';
import { Route, Routes } from 'react-router-dom';

import s from './page.module.scss';

export const Page = observer(() => {
  return (
    <div className={s.content}>
      <Header />
      {/* <GameOver /> */}
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/rules'} element={<Rules />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
      <Notifications />
      <Footer />
    </div>
  );
});
