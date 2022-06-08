import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes';

import { Helmet } from 'react-helmet-async';

import ScrollToTop from './utils/ScrollToTop';
import './reset.css';

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>오픈 마켓</title>
        <link rel="icon" href="/images/favicon-16x16.ico" />
      </Helmet>
      <ScrollToTop />
      <Routes>
        {routes.map((page) => (
          <Route key={page.key} path={page.path} element={page.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
