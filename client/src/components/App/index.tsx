import { observer } from 'mobx-react-lite';
import { Page } from '#components/Page';
import { useEffect } from 'react';
import { Keyboard } from '#includes/Keyboard.ts';

export const App = observer(() => {
  useEffect(() => {
    Keyboard.startLinting();

    return () => {
      Keyboard.stopLinting();
    };
  }, []);

  return <Page />;
});
