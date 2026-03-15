import axios from 'axios'
import useMessage from "@hooks/useMessage.jsx";
import { useState, useCallback, useEffect } from 'react';
import Pagination from '@components/backend/Pagination';
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

function AdminCoupons() {
    const [ coupons, setCoupons ] = useState([]);
    const { showError } = useMessage();
    const [ pagination, setPagination ] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [ templateCoupon, setTemplateCoupon ] = useState({});
    const [ modalType, setModalType ] = useState("");

    const fetchCoupons = useCallback(async (page = 1) => {
        try {
            const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
            );
            axios.defaults.headers.common.Authorization = token;
            const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/admin/coupons`, {
                params: { page }
            });
            setCoupons(response.data.coupons);
            setPagination(response.data.pagination);
            setCurrentPage(page);
        } catch (error) {
            console.error("取得優惠券列表失敗:", error);
            showError("取得優惠券列表失敗");
        }
    }, [showError]);

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


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCoupons(currentPage);
    }, [fetchCoupons, currentPage]);


    return (
        <>
        <div className="container mt-4 py-5 px-3">
            <h1>優惠券管理</h1>
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary" onClick={() => {
                        setTemplateCoupon({});
                        setModalType("create");
                    }}>新增優惠券</button>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>優惠券名稱</th>
                            <th>優惠期限</th>
                            <th>折扣數值</th>
                            <th>優惠代碼</th>
                            <th>啟用狀態</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map((coupon) => (
                            <tr key={coupon.id}>
                                <td>{coupon.title}</td>
                                <td>{formatDate(coupon.due_date)}</td>
                                <td>{coupon.percent}</td>
                                <td>{coupon.code}</td>
                                <td>{coupon.is_enabled ? "啟用" : "停用"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination pagination={pagination} onPageChange={fetchCoupons} />

        </div>
        </>
    );
}

export default AdminCoupons;