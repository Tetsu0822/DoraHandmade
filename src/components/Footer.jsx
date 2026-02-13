import { Link } from "react-router";
import { Copyright } from "lucide-react";
import { Facebook, Instagram, Line } from "../components/icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* 桌面版佈局 */}
        <div className="row align-items-center d-none d-lg-flex">
          {/* Logo & 版權 */}
          <div className="col-lg-4">
            <div className="footer-logo-container">
              <img
                src="/Handmade_Bow.png"
                alt="愛哆啦也愛手作"
                className="me-2"
              />
              <span className="footer-logo-text">
                <span className="footer-logo-dark">愛哆啦也愛</span>
                <span className="footer-logo-brand">手作</span>
              </span>
            </div>
            <p className="footer-copyright">
              <span className="me-1">
                <Copyright className="text-secondary-400 mb-1" size={20} />
              </span>
              Copyright 2025 愛哆啦也愛手作
            </p>
          </div>

          {/* 聯絡我們 */}
          <div className="col-lg-4">
            <h6 className="footer-section-title">聯絡我們</h6>
            <div className="footer-social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="line"
                aria-label="LINE"
              >
                <Line size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* 快速連結 */}
          <div className="col-lg-4">
            <h6 className="footer-section-title">快速連結</h6>
            <ul className="footer-quick-links ">
              <li>
                <Link to="/faq">常見問題</Link>
              </li>
              <li>
                <Link to="/articles">文章專區</Link>
              </li>
              <li>
                <Link to="/site-info">網站連結</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 手機版佈局 */}
        <div className="d-lg-none text-center">
          {/* Logo */}
          <div className="footer-section">
            <div className="footer-logo-container">
              <img
                src="/Handmade_Bow.png"
                alt="愛哆啦也愛手作"
                className="me-2"
              />
              <span className="footer-logo-text">
                <span className="footer-logo-dark">愛哆啦也愛</span>
                <span className="footer-logo-brand">手作</span>
              </span>
            </div>
          </div>

          {/* 聯絡我們 */}
          <div className="footer-section ">
            <h2 className="footer-section-title text-p-24-b">聯絡我們</h2>
            <div className="footer-social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="line"
                aria-label="LINE"
              >
                <Line size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* 快速連結 */}
          <div className="footer-section">
            <h6 className="footer-section-title text-p-24-b">快速連結</h6>
            <ul className="footer-quick-links">
              <li>
                <Link to="/faq">常見問題</Link>
              </li>
              <li>
                <Link to="/articles">文章專區</Link>
              </li>
              <li>
                <Link to="/site-info">網站連結</Link>
              </li>
            </ul>
          </div>

          {/* 版權 */}
          <div className="footer-section">
            <p className="footer-copyright">
              <span className="me-1">©</span>
              Copyright 2025 愛哆啦也愛手作
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
