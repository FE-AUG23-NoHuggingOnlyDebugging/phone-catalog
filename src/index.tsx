import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ContactsPage } from './pages/ContactsPage/ContactsPage';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="catalog/phones" element={<ProductPage />} />
            <Route path="catalog/tablets" element={<ProductPage />} />
            <Route path="catalog/accessories" element={<ProductPage />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />

            <Route path="product/:productId" element={<ProductDetailsPage />} />

            <Route path="/contacts" element={<ContactsPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  </Router>,
);
