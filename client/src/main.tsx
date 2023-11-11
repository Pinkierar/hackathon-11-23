import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '#components/App';
import { BrowserRouter } from 'react-router-dom';
import './style/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
