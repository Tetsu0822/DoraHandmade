import { useParams, Link } from "react-router";
import { useState, useEffect, useContext, useCallback } from "react";
import useMessage from "@hooks/useMessage.jsx";
import axios from 'axios';
import UserContext from "@contexts/UserContext";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

function SingleOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const { user } = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(false);
    const { showError, showSuccess } = useMessage();

    const fetchOrder = useCallback(async () => {
        try {
            const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/order/${id}`);
            const fetchedOrder = response.data.order;
            console.log("Fetched order:", fetchedOrder);
            console.log("Current user:", user);
            setOrder(fetchedOrder);

            // 取得 order 資料後才判斷是否為本人
            if (fetchedOrder && user) {
                setIsOwner(
                    fetchedOrder.user?.email === user.email
                );
            }
        } catch (error) {
            console.error("Error fetching order:", error);
            showError("訂單資料讀取失敗，請稍後再試。");
        }
    }, [id, user, showError]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOrder();
    }, [fetchOrder]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        return new Date(timestamp * 1000).toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Taipei",
        });
    };

    const handlePayment = async (orderId) => {
        try {
            const response = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/pay/${orderId}`);
            if (response.data.success) {
                showSuccess("付款成功！");
                fetchOrder();
            } else {
                showError("付款失敗，請稍後再試。");
            }
        } catch (e) {
            console.error("付款失敗:", e);
            showError("付款失敗，請稍後再試。");
        }
    };

    const parseMessage = (message) => {
        if (!message) return {};
        const result = {};
        message.split("，").forEach((pair) => {
            const [key, value] = pair.split(":");
            if (key && value) result[key.trim()] = value.trim();
        });
        return result;
    };

    return (
        <div className="single-order-page py-5">
            <div className="container">

                {/* 麵包屑 */}
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">首頁</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/order">訂單列表</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            訂單明細
                        </li>
                    </ol>
                </nav>

                {/* 標題 */}
                <div className="mb-4">
                    <h2 className="order-heading-title mb-1">訂單明細</h2>
                    <p className="info-label mb-0">
                        訂單編號：<span className="text-break">{id}</span>
                    </p>
                </div>

                {/* 訂單內容：只有本人才能查看 */}
                {order && !isOwner ? (
                    <div className="order-card p-5 text-center">
                        <p className="info-value mb-0" style={{ color: "#CC355D" }}>
                            您無權限查看此訂單
                        </p>
                    </div>
                ) : isOwner ? (
                    <div className="row g-4">

                        {/* 左欄：訂單狀態 + 商品明細 */}
                        <div className="col-12 col-lg-8">

                            {/* 訂單狀態卡 */}
                            <div className="order-card mb-4">
                                <div className="order-card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
                                    <h5>🎀 訂單資訊</h5>
                                    <span className={order.is_paid ? "badge-paid" : "badge-unpaid"}>
                                        {order.is_paid ? "✓ 已付款" : "✗ 未付款"}
                                    </span>
                                </div>
                                <div className="p-3 p-md-4">
                                    <div className="row g-3">
                                        <div className="col-6 col-md-4">
                                            <p className="info-label">建立日期</p>
                                            <p className="info-value">{formatDate(order.create_at)}</p>
                                        </div>
                                        {order.is_paid && order.paid_date && (
                                            <div className="col-6 col-md-4">
                                                <p className="info-label">付款日期</p>
                                                <p className="info-value">{formatDate(order.paid_date)}</p>
                                            </div>
                                        )}
                                        <div className="col-6 col-md-4">
                                            <p className="info-label">訂單總額</p>
                                            <p className="info-value total-amount" style={{ fontSize: "1rem" }}>
                                                NT$ {order.total?.toLocaleString()}
                                            </p>
                                        </div>
                                        {/* 若未付款，顯示付款按鈕 */}
                                        {!order.is_paid && (
                                            <div className="col-6 col-md-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-success btn-sm mt-2"
                                                    onClick={() => handlePayment(order.id)}
                                                >立即付款</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 商品明細卡 */}
                            <div className="order-card mb-4">
                                <div className="order-card-header">
                                    <h5>🛍️ 商品明細</h5>
                                </div>
                                <div className="px-3 px-md-4">
                                    {Object.values(order.products || {}).map((item) => (
                                        <div key={item.id} className="product-row d-flex gap-3 align-items-start">
                                            {item.product?.imageUrl && (
                                                <img
                                                    src={item.product.imageUrl}
                                                    alt={item.product.title}
                                                    className="product-img"
                                                />
                                            )}
                                            <div className="flex-grow-1 min-w-0">
                                                <p className="product-title mb-1">{item.product?.title}</p>
                                                <p className="product-meta mb-1">
                                                    {item.product?.parentCategory} · {item.product?.category}
                                                </p>
                                                <p className="product-meta mb-2">
                                                    單價 NT$ {item.product?.price} × {item.qty} {item.product?.unit}
                                                </p>
                                                {item.coupon && (
                                                    <span className="coupon-badge">
                                                        🏷 {item.coupon.title}（{item.coupon.percent}折）
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-end flex-shrink-0">
                                                {item.coupon && (
                                                    <p className="info-label text-decoration-line-through">
                                                        NT$ {item.total}
                                                    </p>
                                                )}
                                                <p className="total-amount" style={{ fontSize: "1rem" }}>
                                                    NT$ {item.final_total?.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {/* 合計 */}
                                    <div className="total-row d-flex justify-content-between align-items-center pb-3">
                                        <span className="info-label" style={{ fontSize: "0.9rem" }}>訂單合計</span>
                                        <span className="total-amount">NT$ {order.total?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 右欄：收件人 + 付款資訊 */}
                        <div className="col-12 col-lg-4">
                            <div className="order-card mb-4">
                                <div className="order-card-header">
                                    <h5>👤 購買人資訊</h5>
                                </div>
                                <div className="p-3 p-md-4">
                                    {[
                                        { label: "姓名", value: order.user?.name },
                                        { label: "電話", value: order.user?.tel },
                                        { label: "Email", value: order.user?.email },
                                        { label: "地址", value: order.user?.address },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="mb-3">
                                            <p className="info-label">{label}</p>
                                            <p className="info-value text-break mb-0">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 付款方式 */}
                            {order.message && (() => {
                                const parsed = parseMessage(order.message);
                                return parsed["付款方式"] ? (
                                    <div className="order-card">
                                        <div className="order-card-header">
                                            <h5>💳 付款資訊</h5>
                                        </div>
                                        <div className="p-3 p-md-4">
                                            <p className="info-label">付款方式</p>
                                            <p className="info-value mb-0">{parsed["付款方式"]}</p>
                                        </div>
                                    </div>
                                ) : null;
                            })()}
                        </div>

                    </div>
                ) : (
                    <div className="order-card p-5 text-center">
                        <p className="info-value mb-0" style={{ color: "#CC355D" }}>
                            無此訂單，請重新選擇訂單
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleOrder;