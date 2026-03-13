import axios from "axios";
import { useState, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { useContext } from "react";
import UserContext from "@contexts/UserContext";
const API_USER_CHECK_URL = import.meta.env.VITE_API_USER_CHECK_URL;
const API_SIGNUP_URL = import.meta.env.VITE_API_SIGNUP_URL;
const API_PATH = import.meta.env.VITE_API_PATH;
const API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;

function Signup() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("login");
    const switchMode = () => {
        setMode(mode === "login" ? "register" : "login");
    };
    // useForm 表單驗證
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        mode: "onChange"
    });

    const { setUser } = useContext(UserContext);

    const onSubmit = async (formData) => {
        // 登入或註冊 API 呼叫
        try {
            if (mode === "register") {
                const regiData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    api_path: API_PATH,
                }
                const response = await axios.post(API_SIGNUP_URL, regiData);
                console.log(response.data.message);
                reset();
                // 註冊成功後自動切換到登入模式
                setMode("login");
            } else {
                const loginData = {
                    email: formData.email,
                    password: formData.password,
                    api_path: API_PATH,
                }
                const response = await axios.post(API_LOGIN_URL, loginData);
                if (response.data.success === true) {
                    const { token, expired } = response.data;
                    // 用函式包裝副作用，避免 ESLint 錯誤
                    const setCookie = () => {
                        document.cookie = `doraToken=${token};expires=${new Date(expired)};`;
                    };
                    setCookie();
                    reset();
                    setUser({
                        name: response.data.name,
                        email: response.data.email,
                    });
                    navigate("/");
                } else {
                    alert("登入失敗，請檢查帳號密碼");
                    navigate("/login");
                }

            }
        } catch (error) {
            console.error("API 呼叫失敗:", error);
            alert("登入或註冊失敗，請稍後再試");
        }
    };

    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const modeParam = params.get("mode");
        if (modeParam === "register" && mode !== "register") {
            // 使用 setTimeout 避免同步 setState 警告
            setTimeout(() => setMode("register"), 0);
        }
    }, [location, mode]);

    useEffect(() => {
        // 取得 token
        const token = document.cookie.split("; ").find(row => row.startsWith("doraToken="))?.split("=")[1];
        if (token) {
            const tokenData = {
                token: token,
            }
            const checkUser = async () => {
                try {
                    const response = await axios.post(API_USER_CHECK_URL, tokenData);
                    if (response.data.success) {
                        console.log("使用者已登入:", response.data);
                        navigate("/");
                    } else {
                        // token 無效，清除 cookie
                        document.cookie = "doraToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        navigate("/login");
                    }
                } catch (error) {
                    // 403 或其他錯誤，清除 cookie
                    console.error("user_check 失敗:", error);
                    document.cookie = "doraToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    navigate("/login");
                }
            };
            checkUser();
        }
    }, [navigate, setUser]);

    // 根據網址參數切換表單模式，避免 ESLint 警告
    // ...existing code...


    return (
        <>
        <div className="auth-wrapper d-flex align-items-center justify-content-center">
            <div className="auth-card card shadow-sm border-0">
                <div className="card-body p-4">

                <h2 className="text-center mb-4 auth-title">
                    {mode === "login" ? "會員登入" : "會員註冊"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    {mode === "register" && (
                    <div className="mb-3">
                        <label className="form-label">姓名</label>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="請輸入姓名"
                        {...register("name", {
                            required: "請輸入姓名",
                        })}
                        />
                        {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
                    </div>
                    )}

                    <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="請輸入 Email"
                        {...register("email", {
                            required: "請輸入電子郵件",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "請輸入有效的電子郵件地址",
                            },
                        })}
                    />
                    {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4">
                    <label className="form-label">密碼</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="請輸入密碼"
                        {...register("password", {
                            required: "請輸入密碼",
                            minLength: {
                                value: 6,
                                message: "密碼長度至少需 6 碼",
                            },
                        })}
                    />
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
                    </div>

                    <button className="btn btn-primary w-100 auth-btn" type="submit" disabled={!isValid}>
                    {mode === "login" ? "登入" : "註冊"}
                    </button>

                </form>

                <div className="text-center mt-3">

                    <button
                    type="button"
                    className="btn btn-link auth-switch"
                    onClick={switchMode}
                    >
                    {mode === "login"
                        ? "還沒有帳號？立即註冊"
                        : "已有帳號？返回登入"}
                    </button>

                </div>

                </div>
            </div>
        </div>
        </>
    );
}

export default Signup;