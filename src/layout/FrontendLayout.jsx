import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { CartToastProvider } from '@contexts/CartToast';
import { FavoriteProductsProvider } from '@contexts/FavoriteProducts';

const FrontendLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <CartToastProvider>
        <FavoriteProductsProvider>
          <main className="flex-grow-1">
            <Outlet />
          </main>
        </FavoriteProductsProvider>
      </CartToastProvider>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
