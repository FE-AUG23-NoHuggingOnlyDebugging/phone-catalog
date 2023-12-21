import './App.scss';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import { Outlet } from 'react-router-dom';

import Auth from './pages/AuthPage/Auth';
import Breadcrumbs from './components/BreadCrumbs/BreadCrumbs';

function App() {
  return (
    <div id="theme">
      {/* <!-- <<<<<<< light-dark-theme -->
<!--       <div id="theme">
        <Header />
        <main>
          <Breadcrumbs />
          <Outlet />
        </main>
        <Footer />
      </div> -->
<!-- ======= --> */}
      <Header />
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
      <Footer />
      <Auth />
      {/* <!-- >>>>>>> main --> */}
    </div>
  );
}

export default App;
