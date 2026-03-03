import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { CartActionProvider } from '@contexts/CartAction';
import { FavoriteProductsProvider } from '@contexts/FavoriteProducts';

const FrontendLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <CartActionProvider>
        <FavoriteProductsProvider>
          <main className="flex-grow-1">
            <Outlet />
          </main>
        </FavoriteProductsProvider>
      </CartActionProvider>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
