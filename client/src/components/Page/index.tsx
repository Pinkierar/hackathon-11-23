import { observer } from 'mobx-react-lite';
import { Header } from '#components/Header';
import { Footer } from '#components/Footer';
import { Rules } from '#components/Rules';
import { NotFound } from '#components/NotFound';
import { Home } from '#components/Home';
import { Notifications } from '#components/Notifications';
import { Route, Routes } from 'react-router-dom';

import s from './page.module.scss';

export const Page = observer(() => {
  return (
    <div className={s.content}>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/rules'} element={<Rules />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
      <Notifications />
      <Footer />
    </div>
  );
});
