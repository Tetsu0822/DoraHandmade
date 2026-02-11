import { NavLink } from "react-router-dom";
import { ShoppingCart, User, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <>
      {/* Header Hover 樣式 */}
      <style>{`
        /* Icon 預設顏色 */
        .navbar-nav .nav-link svg {
          color: #6c757d;
          transition: color 0.3s ease;
        }

        /* 導航項目 hover */
        .navbar-nav .nav-link:hover {
          color: #D75E7E !important;
        }

        .navbar-nav .nav-link:hover svg {
          color: #D75E7E !important;
        }

        /* 導航項目 active */
        .navbar-nav .nav-link.active {
          color: #D75E7E !important;
        }

        .navbar-nav .nav-link.active svg {
          color: #D75E7E !important;
        }

        /* Dropdown 展開時的樣式（更高優先級） */
        .navbar-nav .nav-item.dropdown.show > .nav-link {
          color: #D75E7E !important;
        }
        
        .navbar-nav .nav-item.dropdown.show > .nav-link svg {
          color: #D75E7E !important;
        }

        /* 下拉選單項目 hover */
        .dropdown-menu .dropdown-item:hover {
          background-color: #FFEDF1 !important;
          color: #493B3F !important;
        }

        /* Logo hover */
        .navbar-brand:hover {
          opacity: 0.8;
        }

        /* 商品分類按鈕 hover（包含箭頭） */
        .navbar-nav .nav-item.dropdown > .nav-link:hover,
        .navbar-nav .nav-item.dropdown > .nav-link:hover svg {
          color: #D75E7E !important;
        }

        /* 子選單樣式 */
        .dropdown-submenu {
          position: relative;
        }

        .dropdown-submenu .dropdown-menu {
          top: 0;
          left: 100%;
          margin-top: -1px;
          display: none;
        }

        .dropdown-submenu:hover > .dropdown-menu {
          display: block;
        }
      `}</style>

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
            <NavLink className="navbar-brand d-flex align-items-center" to="/">
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
            </NavLink>

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
                  <NavLink className="nav-link fw-bold" to="/workshop">
                    手作小教室
                  </NavLink>
                </li>

                {/* 客製化專區 */}
                <li className="nav-item me-lg-3">
                  <NavLink className="nav-link fw-bold" to="/custom">
                    客製化專區
                  </NavLink>
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
                  <ul
                    className="dropdown-menu"
                    style={{ borderColor: "#F9D9E1" }}
                  >
                    <li>
                      <NavLink
                        className="dropdown-item fw-bold text-center"
                        to="/product"
                      >
                        全部商品
                      </NavLink>
                    </li>

                    {/* 成品（含子選單） */}
                    <li className="dropdown-submenu">
                      <a
                        className="dropdown-item fw-bold text-center d-flex justify-content-center align-items-center"
                        href="#"
                        style={{ cursor: "pointer" }}
                      >
                        成品
                        <ChevronRight size={16} className="ms-2" />
                      </a>
                      <ul
                        className="dropdown-menu"
                        style={{ borderColor: "#F9D9E1" }}
                      >
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/category/handmade/bow"
                          >
                            蝴蝶結
                          </NavLink>
                        </li>
                      </ul>
                    </li>

                    {/* 材料（含子選單） */}
                    <li className="dropdown-submenu">
                      <a
                        className="dropdown-item fw-bold text-center d-flex justify-content-center align-items-center"
                        href="#"
                        style={{ cursor: "pointer" }}
                      >
                        材料
                        <ChevronRight size={16} className="ms-2" />
                      </a>
                      <ul
                        className="dropdown-menu"
                        style={{ borderColor: "#F9D9E1" }}
                      >
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/category/material/ribbon"
                          >
                            帶子
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/category/material/clip"
                          >
                            夾子
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/category/material/patch"
                          >
                            貼片
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>

                {/* 購物車 */}
                <li className="nav-item me-lg-2">
                  <NavLink className="nav-link fw-bold" to="/cart">
                    <ShoppingCart size={20} />
                  </NavLink>
                </li>

                {/* 會員 */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link fw-bold"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <User size={20} />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    style={{ borderColor: "#F9D9E1" }}
                  >
                    {/* 未登入時顯示 */}
                    {!isLoggedIn ? (
                      <>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/register"
                          >
                            會員註冊
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/login"
                          >
                            會員登入
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      /* 已登入時顯示 */
                      <>
                        <li>
                          <span
                            className="dropdown-item-text fw-bold text-center"
                            style={{ color: "#D75E7E" }}
                          >
                            {userName}, 您好！
                          </span>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/account"
                          >
                            我的帳戶
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/orders"
                          >
                            訂單查詢
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/favorites"
                          >
                            我的收藏
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item fw-bold text-center"
                            to="/admin"
                          >
                            後台管理
                          </NavLink>
                        </li>
                        <li>
                          <a
                            className="dropdown-item fw-bold text-center"
                            href="#"
                            onClick={() => setIsLoggedIn(false)}
                          >
                            登出
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
