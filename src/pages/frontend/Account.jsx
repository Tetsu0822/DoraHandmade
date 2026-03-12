import axios from "axios";
axios.defaults.withCredentials = true;
import { useNavigate } from "react-router";
const API_LOGOUT_URL = import.meta.env.VITE_API_LOGOUT_URL;
function Account() {
    const navigate = useNavigate();

    const LogOut = async () => {
        // 清除 token 並導向登入頁面
        const token = document.cookie.split("; ").find(row => row.startsWith("doraToken="))?.split("=")[1];
        if (token) {
            try {
                await axios.post(API_LOGOUT_URL, {}, {
                    headers: {
                        Authorization: token,
                    },
                });
            } catch (error) {
                console.error("登出失敗:", error);
            }
        }
        // 清除 cookie 並導向登入頁面
        document.cookie = "doraToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setTimeout(() => {
            alert("您已成功登出，將自動導向登入頁面");
            navigate("/login");
        }, 500);

    }
    return (
        <>
        <div className="container py-15">
            <h1>帳戶資訊</h1>
            <p>這裡是帳戶資訊頁面，請在此顯示使用者的相關資訊。</p>
            {/* 顯示登出按鈕 */}
            <button className="btn btn-secondary" onClick={() => LogOut()}>登出</button>
        </div>
        </>
    );
}

export default Account;