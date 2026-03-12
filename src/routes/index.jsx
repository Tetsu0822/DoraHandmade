import { createHashRouter } from "react-router";
import FrontendLayout from "../layout/FrontendLayout.jsx";
import Home from "../pages/frontend/Home.jsx";
import Product from "../pages/frontend/Products.jsx";
import SingleProduct from "../pages/frontend/SingleProduct.jsx";
import Cart from "../pages/frontend/Cart.jsx";
import CustomForm from "../pages/frontend/CustomForm.jsx";
import Orders from "../pages/frontend/Orders.jsx";
import Login from "../pages/frontend/Login.jsx";
import Account from "../pages/frontend/Account.jsx";
import SingleOrder from "../pages/frontend/SingleOrder.jsx";
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
                path: "category/:mainCat/:subCat",
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
                path: "custom-form",
                element: <CustomForm />
            },
            {
                path: "order",
                element: <Orders />
            },
            {
                path: "order/:id",
                element: <SingleOrder />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "account",
                element: <Account />
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