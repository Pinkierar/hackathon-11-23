import { observer } from 'mobx-react-lite';
import { Header } from '#components/Header';
import { Footer } from '#components/Footer';
import { NotFound } from '#components/NotFound';
import { Notifications } from '#components/Notifications';
import { Route, Routes } from 'react-router-dom';
import { HTMLAttributes } from 'react';

type PagePropsMin = {
  children?: never;
};

type PageProps = Omit<HTMLAttributes<HTMLElement>, keyof PagePropsMin> &
  PagePropsMin;

export const Page = observer<PageProps>(() => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={'/'} element={<></>} />
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
      <Notifications />
      <Footer />
    </div>
  );
});
