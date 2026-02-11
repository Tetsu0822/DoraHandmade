import { Link } from "react-router";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="py-4"
      style={{ backgroundColor: "#FFF0F5", borderTop: "1px solid #FFE5F0" }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Logo & Copyright */}
          <div className="col-lg-4 mb-3 mb-lg-0 text-center">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <span className="me-2" style={{ fontSize: "1.25rem" }}>
                🎀
              </span>
              <span className="fw-bold" style={{ fontFamily: "Texturina" }}>
                <span style={{ color: "#493B3F" }}>愛哆啦也愛</span>
                <span style={{ color: "#D75E7E" }}>手作</span>
              </span>
            </div>
            <p className="small mb-0" style={{ color: "#333" }}>
              <span className="me-1">©</span>
              Copyright 2025 愛哆啦也愛手作
            </p>
          </div>

          {/* 聯絡我們 */}
          <div className="col-lg-4 mb-3 mb-lg-0 text-center">
            <h6 className="fw-bold mb-3">聯絡我們</h6>
            <div className="d-flex gap-3 justify-content-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "#1877F2" }}
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "#06C755" }}
                aria-label="LINE"
              >
                <MessageCircle size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "#E4405F" }}
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* 快速連結 */}
          <div className="col-lg-4 text-center">
            <h6 className="fw-bold mb-3">快速連結</h6>
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="mx-2">
                <Link
                  to="/faq"
                  className="text-decoration-none"
                  style={{ fontSize: "0.9rem", color: "#333" }}
                >
                  常見問題
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  to="/articles"
                  className="text-decoration-none"
                  style={{ fontSize: "0.9rem", color: "#333" }}
                >
                  文章專區
                </Link>
              </li>
              <li className="mx-2">
                <Link
                  to="/site-info"
                  className="text-decoration-none"
                  style={{ fontSize: "0.9rem", color: "#333" }}
                >
                  網站連結
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
