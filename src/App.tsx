import './App.scss';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from './components/BreadCrumbs/BreadCrumbs';

function App() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
