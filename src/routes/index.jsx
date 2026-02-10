import { createHashRouter } from "react-router";
import FrontendLayout from "../layout/FrontendLayout.jsx";
import Home from "../pages/frontend/Home.jsx";
import Product from "../pages/frontend/Products.jsx";
import SingleProduct from "../pages/frontend/SingleProduct.jsx";
import Cart from "../pages/frontend/Cart.jsx";
import Utils from "../pages/frontend/Utils.jsx";
import NotFound from "../pages/frontend/NotFound.jsx";
import AdminProducts from "../pages/backend/AdminProducts.jsx";
import BackendLayout from "../layout/BackendLayout.jsx";
import AdminOrders from "../pages/backend/AdminOrders.jsx";

export const routes = createHashRouter([
    {
        path: "/",
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "product",
                element: <Product />
            },
            {
                path: "product/:id",
                element: <SingleProduct />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "utils",
                element: <Utils />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    },
    {
        path: "/admin",
        element: <BackendLayout />,
        children: [
            {
                path: "product",
                element: <AdminProducts />
            },
            {
                path: "order",
                element: <AdminOrders />
            }
        ]
    }
]);