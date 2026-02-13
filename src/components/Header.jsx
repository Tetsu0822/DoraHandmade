import { Link } from "react-router";
import { ShoppingCart, User, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("愛哆啦");

  // 自動判斷子選單展開方向
  const handleSubmenuEnter = (e) => {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const windowWidth = window.innerWidth;

    if (windowWidth - rect.right < 170) {
      item.classList.add("submenu-left");
    } else {
      item.classList.remove("submenu-left");
    }
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="logo-font">
              <img
                src="/Handmade_Bow.png"
                className="mb-2 me-1"
                alt="愛哆啦也愛手作"
              />
              <span className="logo-text-dark">愛哆啦也愛</span>
              <span className="logo-text-brand">手作</span>
            </span>
          </Link>

          {/* Mobile Icons */}
          <div className="d-lg-none navbar-icons ms-auto">
            <Link className="btn-icon" to="/cart">
              <ShoppingCart size={20} />
            </Link>

            <div className="dropdown">
              <button
                className="btn-icon"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <User size={20} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end dropdown-custom">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        會員註冊
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        會員登入
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <span className="dropdown-item-text fw-bold text-center user-greeting">
                        {userName}, 您好！
                      </span>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/account">
                        我的帳戶
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orders">
                        訂單查詢
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/favorites">
                        我的收藏
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin">
                        後台管理
                      </Link>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        登出
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button
              className="navbar-toggler navbar-toggler-custom"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item me-lg-3 text-p-16-b">
                <Link className="nav-link nav-link-custom " to="/workshop">
                  手作小教室
                </Link>
              </li>

              <li className="nav-item me-lg-3 text-p-16-b">
                <Link className="nav-link nav-link-custom" to="/custom">
                  客製化專區
                </Link>
              </li>

              <li className="nav-item dropdown dropdown-custom me-lg-4 text-p-16-b">
                <a
                  className="nav-link nav-link-custom d-flex align-items-center text-p-16-b"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  商品分類
                  <ChevronDown size={16} className="ms-1" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/product">
                      全部商品
                    </Link>
                  </li>
                  {/* 成品 Submenu */}
                  <li
                    className="dropdown-submenu"
                    onMouseEnter={handleSubmenuEnter}
                  >
                    <a
                      className="dropdown-item d-flex justify-content-center align-items-center"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      成品
                      <ChevronRight size={16} className="ms-2" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/category/handmade/bow"
                        >
                          蝴蝶結
                        </Link>
                      </li>
                    </ul>
                  </li>

                  {/* 材料 Submenu */}
                  <li
                    className="dropdown-submenu"
                    onMouseEnter={handleSubmenuEnter}
                  >
                    <a
                      className="dropdown-item d-flex justify-content-center align-items-center"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      材料
                      <ChevronRight size={16} className="ms-2" />
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/category/material/ribbon"
                        >
                          帶子
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/category/material/clip"
                        >
                          夾子
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/category/material/patch"
                        >
                          貼片
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="nav-item me-lg-2 d-none d-lg-block">
                <Link className="nav-link nav-link-custom" to="/cart">
                  <ShoppingCart size={20} />
                </Link>
              </li>

              <li className="nav-item dropdown dropdown-custom d-none d-lg-block">
                <a
                  className="nav-link nav-link-custom"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  <User size={20} />
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {!isLoggedIn ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          會員註冊
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          會員登入
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <span className="dropdown-item-text fw-bold text-center user-greeting">
                          {userName}, 您好！
                        </span>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/account">
                          我的帳戶
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          訂單查詢
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/favorites">
                          我的收藏
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          後台管理
                        </Link>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
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
  );
};

export default Header;
