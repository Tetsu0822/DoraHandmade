import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../../src/contexts/UserContext.jsx";
import axios from 'axios';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

function Orders() {
    const [ orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
        category: ""
    });
    const handleViewMoreOrder = (orderId) => {
        navigate(`/order/${orderId}`);
    }
    const { user } = useContext(UserContext);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/orders?page=${currentPage}`);
                setOrders(response.data.orders);
                setPagination(response.data.pagination);
            } catch (error) {
                console.error("獲取訂單列表失敗:", error);
            }
        };
        fetchOrders();
    }, [currentPage]);

    // 根據 user.email 過濾訂單
    const filteredOrders = user ? orders.filter(order => order.user?.email === user.email) : [];
    return (
        <div className="container my-5">
            <h2 className="order-heading-title mb-4">訂單列表</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{background: "#EAE1E3"}} scope="col">訂單編號</th>
                            <th style={{background: "#EAE1E3"}} scope="col">訂單日期</th>
                            <th style={{background: "#EAE1E3"}} scope="col">購買人</th>
                            <th style={{background: "#EAE1E3"}} scope="col">訂單狀態</th>
                            <th style={{background: "#EAE1E3"}} scope="col">訂單金額</th>
                            <th style={{background: "#EAE1E3"}} scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 如果有使用者登入，則顯示訂單列表；如果沒有使用者登入，則顯示提示訊息 */}
                        {user ? (
                            filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.create_at ? new Date(order.create_at * 1000).toLocaleString("zh-TW", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: false,
                                            timeZone: "Asia/Taipei"
                                        }) : ""}</td>
                                        <td>{order.user?.name}</td>
                                        <td>{order.is_paid ? "已付款" : "未付款"}</td>
                                        <td>{order.total}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() =>handleViewMoreOrder(order.id)}
                                            >查看</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">沒有符合的訂單。</td>
                                </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">請先登入以查看訂單列表。</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* 分頁控制 */}
            {
                pagination.total_pages > 1 && (
                    <nav className="mt-5">
                        <ul className="pagination justify-content-center align-items-center">
                            {pagination.has_pre && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}><ChevronLeft size={20} className="text-secondary-700" strokeWidth={2} /></button>
                                </li>
                            )}
                            {
                                [...Array(pagination.total_pages)].map((_, idx) => (
                                    <li key={idx + 1} className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                                    </li>
                                ))
                            }
                            {pagination.has_next && (
                                <li className="page-item">
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}><ChevronRight size={20} className="text-secondary-700" strokeWidth={2} /></button>
                                </li>
                            )}
                        </ul>
                    </nav>
                )
            }
        </div>
    );
}

export default Orders;