import { Link, Outlet } from "react-router";

const BackendLayout = () => {
    return (
        <>
            <header>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">回前台</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/product">商品管理</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin/order">訂單管理</Link>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer></footer>
        </>
    )
}

export default BackendLayout;