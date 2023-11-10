import { observer } from 'mobx-react-lite';
import { Main } from '#components/Main';

export const NotFound = observer(() => {
  return (
    <Main>
      <h2>Страница не найдена</h2>
    </Main>
  );
});
