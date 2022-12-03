import ReactDOM from 'react-dom/client';
import './style.scss';
import { App } from './APP/App';
import {
  HashRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './components/HomePage';
import { Products } from './pages/Products/Products';
import { ItemCard } from './components/ItemCard';
import { Cart } from './pages/Cart';
import { Favourites } from './components/Favourites';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route
            index
            element={<HomePage />}
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="phones">
            <Route index element={
              <Products />
            } />
            <Route path=":openedPhoneId" element={<ItemCard />} />
          </Route>
          <Route path="favourites">
            <Route index element={
              <Favourites />
            } />
            <Route path=":openedPhoneId" element={<ItemCard />} />
          </Route>
        </Route>

        <Route
            path="*"
            element={<PageNotFound />}
          />
    </Routes>
  </Router>
);

