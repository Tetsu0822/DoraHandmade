import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "@contexts/UserContext";
import { useNavigate } from "react-router";
const API_LOGOUT_URL = import.meta.env.VITE_API_LOGOUT_URL;
function Account() {
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const { user } = useContext(UserContext);

    const LogOut = async () => {
        // 清除 token 並導向登入頁面
        const token = document.cookie.split("; ").find(row => row.startsWith("doraToken="))?.split("=")[1];
        if (token) {
            const tokenData = {
                token: token,
            }
            try {
                const response = await axios.post(API_LOGOUT_URL, tokenData);
                // 清除 cookie 並導向登入頁面
                document.cookie = "doraToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setIsLoggedIn(false);
                navigate("/login");
            } catch (error) {
                console.error("登出失敗:", error);
            }
        }
    }

    function maskString(str) {
        if (!str) return "";
        if (str.length <= 2) return str;
        const first = str[0];
        const last = str[str.length - 1];
        return first + "*".repeat(str.length - 2) + last;
    }

    // email 專用遮罩
    function maskEmail(email) {
        if (!email) return "";
        const [name, domain] = email.split("@");
        return maskString(name) + "@" + domain;
    }

    useEffect(() => {
        // 取得 token
        const token = document.cookie.split("; ").find(row => row.startsWith("doraToken="))?.split("=")[1];
        if (!token) {
            navigate("/login");
        } else {
            const tokenData = {
                token: token,
            }
            const checkUser = async () => {
                try {
                    const response = await axios.post(import.meta.env.VITE_API_USER_CHECK_URL, tokenData);
                    if (response.data.success) {
                        setIsLoggedIn(true);
                    } else {
                        // token 無效，清除 cookie
                        document.cookie = "doraToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        navigate("/login");
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    // 403 或其他錯誤，清除 cookie
                    console.error("user_check 失敗:", error);
                    document.cookie = "doraToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    navigate("/login");
                    setIsLoggedIn(false);
                }
            };
            checkUser();
        }
    }, [navigate]);


    return (
        <>
        <div className="container py-15">
            {isLoggedIn ? (
                <>
                <h1>帳戶資訊</h1>
            <p>這裡是帳戶資訊頁面，請在此顯示使用者的相關資訊。</p>
            {user && (
                <div className="card mb-3" style={{ maxWidth: "540px" }}>
                    <div className="row g-0">
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">使用者資訊</h5>
                                <p className="card-text">姓名: {maskString(user.name)}</p>
                                <p className="card-text">Email: {maskEmail(user.email)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 顯示登出按鈕 */}
            <button className="btn btn-secondary" onClick={() => LogOut()}>登出</button>
            </>
            ) : (
                <>
                <div className="alert alert-primary" role="alert">
                    您尚未登入，請先登入以查看帳戶資訊。
                </div>
                </>
            )}

        </div>
        </>
    );
}

export default Account;