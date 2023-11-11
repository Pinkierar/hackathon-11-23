import { observer } from 'mobx-react-lite';
import { Header } from '#components/Header';
import { Footer } from '#components/Footer';
import { Rules } from '#components/Rules';
import { NotFound } from '#components/NotFound';
import { Notifications } from '#components/Notifications';
import { Route, Routes } from 'react-router-dom';
import { HTMLAttributes } from 'react';

import s from './page.module.scss';

type PagePropsMin = {
  children?: never;
};

type PageProps = Omit<HTMLAttributes<HTMLElement>, keyof PagePropsMin> &
  PagePropsMin;

export const Page = observer<PageProps>(() => {
  return (
    <div className={s.content}>
      <Header />
      <Routes>
        <Route path={'/'} element={<></>} />
        <Route path={'/rules'} element={<Rules />} />
        <Route path={'/about'} element={<NotFound />} />
      </Routes>
      <Notifications />
      <Footer />
    </div>
  );
});
