import { Link } from "react-router";
import { ShoppingCart, User, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-light" style={{ backgroundColor: "#FFE5F0" }}>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #E3879F",
        }}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="me-2" style={{ fontSize: "1.5rem" }}>
              🎀
            </span>
            <span
              className="fw-bold"
              style={{
                fontFamily: "Texturina",
              }}
            >
              <span style={{ color: "#493B3F" }}>愛哆啦也愛</span>
              <span style={{ color: "#D75E7E" }}>手作</span>
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              {/* 手作小教室 */}
              <li className="nav-item me-lg-3">
                <Link className="nav-link fw-bold" to="/workshop">
                  手作小教室
                </Link>
              </li>

              {/* 客製化專區 */}
              <li className="nav-item me-lg-3">
                <Link className="nav-link fw-bold" to="/custom">
                  客製化專區
                </Link>
              </li>

              {/* 商品分類 Dropdown */}
              <li className="nav-item dropdown me-lg-4">
                <a
                  className="nav-link d-flex align-items-center fw-bold"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  商品分類
                  <ChevronDown size={16} className="ms-1" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/category/handmade">
                      手作商品
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/category/material">
                      材料包
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/category/tool">
                      工具
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/product">
                      全部商品
                    </Link>
                  </li>
                </ul>
              </li>

              {/* 購物車 */}
              <li className="nav-item me-lg-2">
                <Link
                  className="nav-link fw-bold"
                  to="/cart"
                  style={{ color: "var(--color-secondary-700)" }}
                >
                  <ShoppingCart size={20} />
                </Link>
              </li>

              {/* 會員 */}
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold"
                  to="/account"
                  style={{ color: "var(--color-secondary-700)" }}
                >
                  <User size={20} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
