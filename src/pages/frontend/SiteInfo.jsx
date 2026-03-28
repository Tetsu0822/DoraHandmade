import { Link } from "react-router";
import '../../assets/scss/components/_siteInfo.scss';

const navLinks = [
  { to: "/", label: "首頁" },
  { to: "/product", label: "所有商品" },
  { to: "/cart", label: "購物車" },
  { to: "/custom-form", label: "客製化專區" },
  { to: "/order", label: "訂單查詢" },
  { to: "/article", label: "文章專區" },
  { to: "/workshop", label: "手作小教室" },
  { to: "/faq", label: "常見問題" },
  { to: "/login", label: "會員登入" },
  { to: "/account", label: "會員專區" },
  { to: "/favorites", label: "我的收藏" },
];

export default function SiteInfo() {
  return (
    <nav className="site-info-container">
      <div className="site-info-card">
        <h2 className="site-info-title">
          <span className="icon">🎀</span> 快速網站連結 <span className="icon">🎀</span>
        </h2>
        <ul className="site-info-list">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="nav-item">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}