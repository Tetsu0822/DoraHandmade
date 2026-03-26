import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ScrollToTop from '@components/ScrollToTop';
import { CartActionProvider } from '@contexts/CartAction';
import { FavoriteArticlesProvider } from '@contexts/FavoriteArticles';
import { FavoriteProductsProvider } from '@contexts/FavoriteProducts';
import { UserProvider } from '@contexts/UserContext';

const FrontendLayout = () => {
  return (
    <UserProvider>
    <div className="d-flex flex-column min-vh-100">
      <ScrollToTop />
      <Header />
      <CartActionProvider>
        <FavoriteProductsProvider>
          <FavoriteArticlesProvider>
            <main className="flex-grow-1">
              <Outlet />
            </main>
          </FavoriteArticlesProvider>
        </FavoriteProductsProvider>
      </CartActionProvider>
      <Footer />
    </div>
    </UserProvider>
  );
};

export default FrontendLayout;
