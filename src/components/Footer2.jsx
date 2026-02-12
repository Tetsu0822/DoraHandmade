import { Link } from "react-router";
import { Copyright } from "lucide-react";
import logo from "../assets/images/logo.png";
import { Facebook, Instagram, Line } from "../components/icons";
const Footer2 = () => {
    return (<>
    <footer className="footer">
        {/* 品牌與版權區 */}
        <div className="footer__brand">
            <a className="footer__logo d-flex flex-column flex-sm-row gap-2 align-items-center mb-4" href="#">
            <img src={logo} alt="愛哆啦也愛手作 Logo" width="36" height="20" />
            <span className="logo-title mb-0">愛哆啦也愛<span className="text-primary-700">手作</span></span>
            </a>
            <div className="footer__copyright d-none d-sm-block">
            <Copyright className="text-secondary-400 me-1" size={20} />
            <span>Copyright 2025 愛哆啦也愛手作</span>
            </div>
        </div>

        {/* 社群聯絡區 */}
        <address className="footer__contact">
            <p className="footer__title text-p-24 mb-2">聯絡我們</p>
            <div className="footer__social-icons d-flex">
            <a href="#" aria-label="Facebook"><Facebook /></a>
            <a href="#" aria-label="Line"><Line /></a>
            <a href="#" aria-label="Instagram"><Instagram /></a>
            </div>
        </address>

        {/* 快速連結區 */}
        <nav className="footer__nav">
            <p className="footer__title text-p-24">快速連結</p>
            <ul className="footer__links list-unstyled d-flex">
            <li><Link to="/">常見問題</Link></li>
            <li><Link to="/">文章專區</Link></li>
            <li><Link to="/">網站地圖</Link></li>
            </ul>
            {/* 行動版版權 */}
            <div className="footer__copyright d-block d-sm-none">
            <Copyright className="text-secondary-400 me-1" size={20} />
            <span>Copyright 2025 愛哆啦也愛手作</span>
            </div>
        </nav>
    </footer>
    </>)
}

export default Footer2;