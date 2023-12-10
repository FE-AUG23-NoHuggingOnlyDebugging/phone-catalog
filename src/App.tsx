import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { Header } from './pages/Header/Header';
import { Footer } from './pages/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<ProductPage />} />
          <Route path="/tablets" element={<ProductPage />} />
          <Route path="/accessories" element={<ProductPage />} />

          <Route path="/cart" element={<CartPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />

          <Route path="product/:productId" element={<ProductDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
