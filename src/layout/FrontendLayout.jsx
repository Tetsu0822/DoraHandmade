import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Footer2 from "../components/Footer2.jsx";

const FrontendLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>
      <Footer2 />
      {/* <Footer /> */}
    </div>
  );
};

export default FrontendLayout;
