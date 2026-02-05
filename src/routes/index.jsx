import FrontendLayout from "../layout/FrontendLayout";
import Cart from "../pages/frontend/Cart";
import Home from "../pages/frontend/Home";
import NotFound from "../pages/frontend/NotFound";
import Products from "../pages/frontend/Products";
import SingleProduct from "../pages/frontend/SingleProduct";
import Utils from "../pages/frontend/Utils";

// 前後台 Routes 分離
const routes = [
    // 前台路由
    {
        path: '/',
        element: <FrontendLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'product',
                element: <Products />
            },
            {
                path: 'product/:id',
                element: <SingleProduct />
            },
            {
                path: 'product/category/:child',
                element: <Products />
            },
            {
                path: 'cart',
                element: <Cart />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: 'utilis',
                element: <Utils />
            }
        ]
    },
]

export default routes;