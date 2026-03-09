import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;
function SingleOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/order/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };
        fetchOrder();
    }, [id]);
    return (<>
    <div className="container py-15">
        <h2 className="order-heading-title">{id}訂單明細</h2>
        {order ? (
            <div className="order-details">
                <p>訂單編號: {order.id}</p>
                <p>訂單日期: {order.create_at ? new Date(order.create_at * 1000).toLocaleString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Taipei"
                }) : ""}</p>
                <p>是否付款: {order.is_paid ? "已付款" : "未付款"}</p>
                <p>訂單總額: {order.total}</p>
            </div>
        ) : (
            <p className="text-danger">無此訂單，請重新選擇訂單</p>
        )}
    </div>
    </>)
}

export default SingleOrder;