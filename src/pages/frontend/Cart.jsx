import axios from "axios";
import OrderToast from "@components/OrderToast";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Minus, Plus, Trash2 } from "lucide-react";
import { currency } from "../../utils/filter";
import * as bootstrap from "bootstrap";
import { emailValidation, twPhoneValidation } from "../../utils/validation";
const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;

function Cart() {
    const [ cartData, setCartData ] = useState([]);
    const [ updatingId, setUpdatingId ] = useState(null);
    // 優惠券、運費等狀態可在此新增
    const [ couponCode, setCouponCode ] = useState("");
    const [ couponStatus, setCouponStatus ] = useState("");
    // 折扣後的金額
    const [finalTotal, setFinalTotal] = useState(null);
    // useForm 表單驗證
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch,
    } = useForm({
        mode: "onChange"
    });

    // 收件人選擇
    const [isSameAsBuyer, setIsSameAsBuyer] = useState(true);
    // 購買人資訊用 state 儲存
    const [buyerInfo, setBuyerInfo] = useState({
        name: "林小明",
        tel: "0910552225",
        email: "ming.lin@gmail.com",
        address: "",
    });

    // 其他收件人資訊
    const [recipientInfo, setRecipientInfo] = useState({
        name: "",
        tel: "",
        email: "",
        address: ""
    });

    // 設定常用收件人資訊，這裡先寫死三筆資料
    const [commonRecipients, setCommonRecipients] = useState([
        {
            id: 1,
            name: "林小魚",
            tel: "0910552225",
            email: "fish.lin@gmail.com",
            address: "台北市信義區信義路五段7號"
        },
        {
            id: 2,
            name: "林鮭魚",
            tel: "0921628826",
            email: "xiaohua.li@gmail.com",
            address: "台北市大安區和平東路三段12號"
        },
        {
            id: 3,
            name: "林葦辰",
            tel: "0919104401",
            email: "weicheng.lin@gmail.com",
            address: "台北市中正區忠孝東路一段1號"
        }
    ]);
    // 更新指定收件人資訊
    const updateRecipientData = (e) => {
        const { name, value } = e.target;
        setRecipientInfo(prev => ({ ...prev, [name]: value }));
        console.log("recipientInfo:", recipientInfo);
    };

    const buyerName = watch("name");
    const buyerTel = watch("tel");
    const buyerEmail = watch("email");
    const buyerAddress = watch("address");

    useEffect(() => {
    setBuyerInfo({
        name: buyerName || "",
        tel: buyerTel || "",
        email: buyerEmail || "",
        address: buyerAddress || "",
    });
    }, [buyerName, buyerTel, buyerEmail, buyerAddress]);
    // Modal/Offcanvas ref
    const recipientModalRef = useRef(null);
    const recipientOffcanvasRef = useRef(null);
    const toastRef = useRef(null);
    const [ orderId, setOrderId ] = useState(null);
    // 開啟收件人選單
    const openRecipientSelector = () => {
    if (window.innerWidth < 768) {
        if (!recipientOffcanvasRef.current) {
        recipientOffcanvasRef.current = new bootstrap.Offcanvas('#recipientOffcanvas');
        }
        recipientOffcanvasRef.current.show();
    } else {
        if (!recipientModalRef.current) {
        recipientModalRef.current = new bootstrap.Modal('#recipientModal', { keyboard: false });
        }
        recipientModalRef.current.show();
    }
    };

    const showToast = () => {
    const toast = new bootstrap.Toast(toastRef.current);
    toast.show();
    };
    const closeRecipientModal = () => {
        if (recipientModalRef.current) recipientModalRef.current.hide();
    };
    const closeRecipientOffcanvas = () => {
        if (recipientOffcanvasRef.current) recipientOffcanvasRef.current.hide();
    };

    const handleSelectCommonRecipient = (recipient) => {
        setRecipientInfo({
            name: recipient.name,
            tel: recipient.tel,
            email: recipient.email,
            address: recipient.address
        });
    };

    const [showAddRecipientForm, setShowAddRecipientForm] = useState(false);

    const deleteCommonRecipient = (id) => {
        setCommonRecipients(prev => prev.filter(recipient => recipient.id !== id));
    }

  // 更新購物車數量
    const updateCartQty = async (item, newQty) => {
        if (newQty < 1) return;
        setUpdatingId(item.id);
        try {
            await axios.put(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${item.id}`, {
                data: {
                    product_id: item.product_id,
                    qty: newQty
                }
            });
            // 重新取得購物車資料
            const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCartData(response.data.data.carts);
        } catch (error) {
            console.log("更新購物車數量失敗:", error);
        }
        setUpdatingId(null);
    };

    // 刪除購物車項目
    const removeCartItem = async (itemId) => {
        setUpdatingId(itemId);
        try {
            await axios.delete(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${itemId}`);
            // 重新取得購物車資料
            const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCartData(response.data.data.carts);
        } catch (error) {
            console.log("刪除購物車項目失敗:", error);
        }
        setUpdatingId(null);
    };


    // 使用優惠券
    const applyCoupon = async () => {
        if (!couponCode) return;
        setCouponStatus("正在套用...");
        try {
            const response = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/coupon`, {
                data: {
                    code: couponCode
                }
            });
            setCouponStatus(response.data.message || "優惠券已套用！");
            setFinalTotal(response.data.data.final_total);

            // 重新取得購物車資料
            const cartRes = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCartData(cartRes.data.data.carts);
        } catch (error) {
            console.log("套用優惠券失敗:", error);
            setCouponStatus("優惠券無效或已使用。");
            setFinalTotal(null);
        }
    };

    // 計算折扣金額
    const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);

    // 取得表單資料並送出訂單
    const onSubmit = async (formData) => {
        try {
            const recipient = isSameAsBuyer ? {
                name: formData.name,
                email: formData.email,
                tel: formData.tel,
                address: formData.address,
            } : {
                name: recipientInfo.name,
                email: recipientInfo.email,
                tel: recipientInfo.tel,
                address: recipientInfo.address,
            };
            const data = {
                data: {
                    user: {
                        name: formData.name,
                        email: formData.email,
                        tel: formData.tel,
                        address: formData.address,
                    },
                    message: `付款方式:${formData.paymentMethod}，收件人:${recipient.name}，電話:${recipient.tel}，Email:${recipient.email}，地址:${recipient.address}`,
                    recipient,
                }
            };
            const response = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/order`, data);
            setOrderId(response.data.orderId);
            // 更新購物車列表
            const responses2 = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCartData(responses2.data.data.carts || []);
            reset();
            showToast();
        } catch (error) {
            console.error("送出訂單失敗:", error);
        }
    }



  // API 取得購物車資料顯示在此
  useEffect(() => {
    recipientModalRef.current = new bootstrap.Modal('#recipientModal', {
            keyboard: false
        });

        // Modal 關閉時移除焦點
        document
        .querySelector("#recipientModal")
        .addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        });

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCartData(response.data.data.carts);
        } catch (error) {
            console.log("取得購物車資料失敗:", error);
        }
      }
      fetchCartData();
  }, []);
  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-sm-12 col-md-9">
                <div className="mt-6 mb-6 mt-md-15 mb-md-15">
                    <h2 className="cart-heading-title">購物車</h2>
                    {/* 電腦版購物車顯示 */}
                    <div className="d-none d-md-block">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle mb-0">
                            <thead>
                                <tr>
                                <th style={{background: "#EAE1E3"}} scope="col">商品</th>
                                <th style={{background: "#EAE1E3"}} scope="col">單價</th>
                                <th style={{background: "#EAE1E3"}} scope="col">數量</th>
                                <th style={{background: "#EAE1E3"}} scope="col">單位</th>
                                <th style={{background: "#EAE1E3"}} scope="col">小計</th>
                                <th style={{background: "#EAE1E3"}} scope="col">操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.map(item => (
                                <tr key={item.id}>
                                    <td>
                                    <img src={item.product.imageUrl} alt={item.product.title} style={{width: 40, height: 40, objectFit: 'cover', borderRadius: '50%', marginRight: 8}} />
                                    {item.product.title}
                                    </td>
                                    <td>${item.product.price}</td>
                                    <td>
                                        <div className="input-group" style={{maxWidth: 140}}>
                                            <button
                                                className={`btn btn-sm border-0${item.qty === 1 ? ' text-muted border-muted' : ''} me-2`}
                                                type="button"
                                                disabled={item.qty === 1 || updatingId === item.id}
                                                style={item.qty === 1 ? { backgroundColor: '#e9ecef', borderColor: '#e9ecef', color: '#adb5bd' } : {}}
                                                onClick={() => updateCartQty(item, item.qty - 1)}
                                            ><Minus /></button>
                                            <input type="number" min="1" className="text-center bg-white border-0" style={{width: 40, fontSize: "20px"}} value={item.qty} onChange={e => updateCartQty(item, Number(e.target.value))} disabled />
                                            <button className="btn btn-sm border-0" type="button" disabled={updatingId===item.id} onClick={() => updateCartQty(item, item.qty+1)}><Plus /></button>
                                        </div>
                                    </td>
                                    <td className="text-center">{item.product.unit}</td>
                                    <td>{currency(item.total)}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm text-white" disabled={updatingId===item.id} onClick={() => removeCartItem(item.id)}><Trash2 color="white" /> 刪除</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    {/* 手機版購物車顯示 */}
                    <div className="d-md-none">
                        <div className="card mobile-card" style={{borderRadius: "16px 16px 0 0"}}>
                            <div className="mobile-card-header fw-bold mb-2">商品明細</div>
                            {cartData.map(item => (
                            <div key={item.id} className="d-flex justify-content-between align-items-center p-2">
                                <div style={{flex:1}}>
                                    <div className="fw-bold text-p-20-b">{item.product.title}</div>
                                    <div className="d-flex justify-content-start align-items-center mt-1 text-p-16-b">
                                        <span className="text-gray-600">單價 ${item.product.price} / 數量</span>
                                        <div className="input-group" style={{maxWidth: 100}}>
                                            <button
                                                className={`btn btn-sm border-0${item.qty === 1 ? ' text-muted border-muted' : ''} me-2`}
                                                type="button"
                                                disabled={item.qty === 1 || updatingId === item.id}
                                                style={item.qty === 1 ? { backgroundColor: '#e9ecef', borderColor: '#e9ecef', color: '#adb5bd' } : {}}
                                                onClick={() => updateCartQty(item, item.qty - 1)}
                                            ><Minus size={16} color="#777777" /></button>
                                            <input type="number" min="1" className="text-center bg-white border-0" style={{width: 30, fontSize: "16px"}} value={item.qty} onChange={e => updateCartQty(item, Number(e.target.value))} disabled />
                                            <button className="btn btn-sm border-0" type="button" disabled={updatingId===item.id} onClick={() => updateCartQty(item, item.qty+1)}><Plus size={16} color="#777777" /></button>
                                        </div>
                                        <button className="btn btn-sm" disabled={updatingId===item.id} onClick={() => removeCartItem(item.id)}><Trash2 className="text-primary" /></button>
                                    </div>
                                </div>
                                <div className="fw-bold" style={{fontSize: "1.1rem"}}>${item.total}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* 優惠券輸入區塊 */}
                <div className="mt-6 mb-6 mt-md-8 mb-md-8">
                    <h2 className="cart-heading-title">使用優惠券</h2>
                    <div className="d-flex" style={{maxWidth: 400}}>
                        <input type="text" className="form-control me-2" placeholder="輸入優惠券代碼" value={couponCode} onChange={e => setCouponCode(e.target.value)} />
                        <button className="btn btn-primary btn-sm text-white" onClick={applyCoupon}>套用</button>
                    </div>
                    {couponStatus && <p className="mt-2">{couponStatus}</p>}
                </div>
                {/* 付款與取貨方式 */}
                <h2 className="cart-heading-title">付款與取貨方式</h2>
                {/* 付款方式：信用卡、超商取貨付款 */}
                <h3 className="text-p-20-b text-gray-600 mb-3">付款方式</h3>
                <div className="d-flex flex-column mb-6 mb-md-8">
                    <div className="form-check mb-2">
                        <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" className="form-check-input"
                        {...register("paymentMethod", { required: "請選擇付款方式" }) }
                        />
                        <label htmlFor="creditCard" className="form-check-label text-p-16-b">信用卡</label>
                    </div>
                    <div className="form-check mb-2">
                        <input type="radio" id="storePickup" name="paymentMethod" value="storePickup" className="form-check-input"
                        {...register("paymentMethod", { required: "請選擇付款方式" }) }
                        />
                        <label htmlFor="storePickup" className="form-check-label text-p-16-b">超商取貨付款</label>
                    </div>
                </div>

                <hr className="border text-gray-100 mb-6 mb-md-8" />
                <h3 className="text-p-20-b text-gray-600 mb-3">購買人資訊</h3>
                <div className="mb-3">
                <label htmlFor="buyerName" className="form-label text-p-16-b">
                    購買人姓名
                </label>
                <input
                    id="buyerName"
                    name="name"
                    type="text"
                    className="form-control"
                    placeholder="請輸入購買人姓名"
                    {...register("name", {
                        required: "請輸入購買人姓名",
                        minLength: {
                            value: 2,
                            message: "購買人姓名至少需要 2 個字",
                        },
                    })}
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="mb-3">
                <label htmlFor="tel" className="form-label text-p-16-b">
                    聯絡電話
                </label>
                <input
                    id="tel"
                    name="tel"
                    type="tel"
                    className="form-control"
                    placeholder="請輸入聯絡電話"
                    {...register("tel", {
                        required: "請輸入聯絡電話",twPhoneValidation
                    })}
                />
                {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
                </div>
                <div className="mb-6 mb-md-8">
                <label htmlFor="email" className="form-label text-p-16-b">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="請輸入 Email"
                    {...register("email", {
                        required: "請輸入 Email",emailValidation
                    })}
                    //onChange={updateBuyerData}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-6 mb-md-8">
                <label htmlFor="address" className="form-label text-p-16-b">
                    購買人地址
                </label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    className="form-control"
                    placeholder="請輸入地址"
                    {...register("address", {
                        required: "請輸入地址",
                    })}
                />
                {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>
                <hr className="border text-gray-100 mb-6 mb-md-8" />
                <h3 className="text-p-20-b text-gray-600 mb-3">收件人資訊</h3>
                <div className="d-flex flex-column mb-3">
                    <div className="form-check mb-2">
                        <input
                            type="radio"
                            id="sameAsBuyer"
                            name="recipientType"
                            className="form-check-input me-2"
                            checked={isSameAsBuyer}
                            onChange={() => setIsSameAsBuyer(true)}
                        />
                        <label htmlFor="sameAsBuyer" className="form-check-label text-p-16-b">同購買人</label>
                    </div>
                    {isSameAsBuyer && (
                        <div className="border-0 rounded-4 p-5 mb-4" style={{backgroundColor: "#EFEFEF"}}>
                            <p className="text-p-16-r mb-2">姓名: {buyerInfo.name}</p>
                            <p className="text-p-16-r mb-2">電話: {buyerInfo.tel}</p>
                            <p className="text-p-16-r mb-2">Email: {buyerInfo.email}</p>
                            <p className="text-p-16-r mb-2">地址: {buyerInfo.address}</p>
                        </div>
                    )}
                    <div className="form-check d-flex align-items-center">
                        <input
                            type="radio"
                            id="otherRecipient"
                            name="recipientType"
                            className="form-check-input me-2"
                            onChange={() => setIsSameAsBuyer(false)}
                        />
                        <label htmlFor="otherRecipient" className="form-check-label text-p-16-b">指定其他收件人</label>
                        {/* 新增選擇常用收件人按鈕，按鈕在最右邊 */}
                        {!isSameAsBuyer && (
                            <button
                                className="btn border-0 ms-auto"
                                type="button"
                                style={{ padding: "12px 24px 12px 24px", gap: "8px" }}
                                onClick={openRecipientSelector}
                            >
                                <span className="text-p-16-b" style={{color: "#493B3F", borderBottom: "1px solid #493B3F",lineHeight: "150%",paddingBottom: "8px"}}>選擇常用收件人</span>
                            </button>
                        )}
                    </div>
                    {!isSameAsBuyer && (
                        <div style={{ background: "#f3f3f3", borderRadius: 16, padding: 20, marginTop: 16, marginBottom: 32 }}>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label className="fw-bold mb-1">收件人</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={recipientInfo.name || ""}
                                        onChange={updateRecipientData}
                                        placeholder="收件人姓名"
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="fw-bold mb-1">聯絡電話</label>
                                    <input
                                        type="text"
                                        name="tel"
                                        className="form-control"
                                        value={recipientInfo.tel || ""}
                                        onChange={updateRecipientData}
                                        placeholder="收件人電話"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="fw-bold mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={recipientInfo.email || ""}
                                    onChange={updateRecipientData}
                                    placeholder="收件人 Email"
                                />
                            </div>
                        </div>
                    )}
                </div>
                {/* 電腦版 Modal */}
                <div className="modal" id="recipientModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="d-flex">
                                    <h2 className="h6 flex-grow-1">選擇常用收件人</h2>
                                    <button
                                    className="btn border-0 ms-auto"
                                    type="button"
                                    // 點擊後顯示新增收件人表單
                                    onClick={() => setShowAddRecipientForm(true)}
                                    style={{ padding: "12px 24px 12px 24px", gap: "8px" }}
                                    //onClick={openRecipientSelector}
                                >
                                    <span className="text-p-16-b" style={{color: "#493B3F", borderBottom: "1px solid #493B3F",lineHeight: "150%",paddingBottom: "8px"}}>新增常用收件人</span>
                                </button>
                                </div>
                                {/* 這裡可放常用收件人列表與選擇按鈕，若有資料才顯示 */}
                                {commonRecipients.length > 0 ? (
                                    commonRecipients.map(recipient => (
                                        <div key={recipient.id} className="form-check d-flex align-items-center mb-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="commonRecipient"
                                                id={`recipient-${recipient.id}`}
                                                onChange={() => handleSelectCommonRecipient(recipient)}
                                            />
                                            <label className="form-check-label me-2" htmlFor={`recipient-${recipient.id}`}>
                                                {recipient.name} {recipient.tel}
                                            </label>
                                            <button
                                                type="button"
                                                className="btn btn-link p-0"
                                                onClick={() => deleteCommonRecipient(recipient.id)}
                                            >
                                                刪除
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p>尚無常用收件人</p>
                                )}
                                {showAddRecipientForm && (
                                <div style={{ background: "#f3f3f3", borderRadius: 16, padding: 20, marginTop: 16, marginBottom: 32 }}>
                                    <div className="row mb-2">
                                    <div className="col-6">
                                        <label className="fw-bold mb-1">收件人</label>
                                        <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={recipientInfo.name || ""}
                                        onChange={updateRecipientData}
                                        placeholder="收件人姓名"
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label className="fw-bold mb-1">聯絡電話</label>
                                        <input
                                        type="text"
                                        name="tel"
                                        className="form-control"
                                        value={recipientInfo.tel || ""}
                                        onChange={updateRecipientData}
                                        placeholder="收件人電話"
                                        />
                                    </div>
                                    </div>
                                    <div>
                                    <label className="fw-bold mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={recipientInfo.email || ""}
                                        onChange={updateRecipientData}
                                        placeholder="收件人 Email"
                                    />
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-secondary mt-2 w-100"
                                        onClick={() => {
                                            if (recipientInfo.name && recipientInfo.tel && recipientInfo.email) {
                                        setCommonRecipients(prev => [...prev, { id: prev.length + 1, ...recipientInfo }]);
                                    }
                                        }}
                                    >新增常用收件人</button>
                                </div>
                                )}
                            </div>
                            <div className="modal-footer d-flex flex-row gap-2">
                                <button type="button" className="recipientBtn flex-fill" data-bs-dismiss="modal" onClick={closeRecipientModal}>取消</button>
                                <button
                                    type="button"
                                    className="checkoutBtn flex-fill"
                                    onClick={() => {
                                        setShowAddRecipientForm(false);
                                        closeRecipientModal(); closeRecipientOffcanvas();}}
                                >
                                    確定
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 手機版 Offcanvas */}
                <div className="offcanvas offcanvas-bottom custom-offcanvas-80" id="recipientOffcanvas">
                    <div className="offcanvas-body">
                        <div className="d-flex">
                            <h2 className="text-p-24 flex-grow-1">選擇常用收件人</h2>
                            <button
                                className="btn border-0 ms-auto"
                                type="button"
                                style={{ padding: "12px", gap: "10px" }}
                                onClick={() => setShowAddRecipientForm(true)}
                            >
                                <span className="text-p-16-b" style={{color: "#493B3F"}}><Plus size={24} /></span>
                            </button>
                        </div>
                        {/* 這裡可放常用收件人列表與選擇按鈕 */}
                        {commonRecipients.length > 0 ? (
                            commonRecipients.map(recipient => (
                                <div key={recipient.id} className="form-check d-flex align-items-center mb-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="commonRecipient"
                                        id={`recipient-${recipient.id}`}
                                        onChange={() => handleSelectCommonRecipient(recipient)}
                                    />
                                    <label className="form-check-label me-2" htmlFor={`recipient-${recipient.id}`}>
                                        {recipient.name} {recipient.tel}
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={() => deleteCommonRecipient(recipient.id)}
                                    >
                                        刪除
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>尚無常用收件人</p>
                        )}
                        {showAddRecipientForm && (
                        <div style={{ background: "#f3f3f3", borderRadius: 16, padding: 20, marginTop: 16, marginBottom: 32 }}>
                            <div className="row mb-2">
                                <div className="col-6">
                                    <label className="fw-bold mb-1">收件人</label>
                                    <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={recipientInfo.name || ""}
                                    onChange={updateRecipientData}
                                    placeholder="收件人姓名"
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="fw-bold mb-1">聯絡電話</label>
                                    <input
                                    type="text"
                                    name="tel"
                                    className="form-control"
                                    value={recipientInfo.tel || ""}
                                    onChange={updateRecipientData}
                                    placeholder="收件人電話"
                                    />
                                </div>
                            </div>
                            <div>
                            <label className="fw-bold mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={recipientInfo.email || ""}
                                onChange={updateRecipientData}
                                placeholder="收件人 Email"
                            />
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary mt-2 w-100"
                                onClick={() => {
                                    if (recipientInfo.name && recipientInfo.tel && recipientInfo.email) {
                                setCommonRecipients(prev => [...prev, { id: prev.length + 1, ...recipientInfo }]);
                            }
                                }}
                            >新增常用收件人</button>
                        </div>
                        )}
                    </div>
                    <div className="offcanvas-footer d-flex justify-content-between p-3">
                        <button type="button" className="recipientBtn w-50 me-2" onClick={closeRecipientOffcanvas}>取消</button>
                        <button type="button" className="checkoutBtn w-50" onClick={() => {
                            setShowAddRecipientForm(false);
                            closeRecipientModal(); closeRecipientOffcanvas();}}>確定</button>
                    </div>
                </div>
                <hr className="border text-gray-100 mb-6 mb-md-8" />
                {/* 取貨方式 */}
                <h3 className="text-p-20-b text-gray-600 mb-3">取貨方式</h3>
                <div className="d-flex flex-column mb-6 mb-md-8">
                    <div className="form-check d-flex align-items-center  mb-2">
                        <input type="radio" id="familyMart" name="deliveryMethod" value="familyMart" className="form-check-input me-1" defaultChecked />
                        <label htmlFor="familyMart" className="form-check-label text-p-16-b me-2">全家超商取貨</label>
                        <button
                            className="btn border-0"
                            type="button"
                            style={{
                                padding: "12px 24px 12px 24px",
                                gap: "8px",
                            }}
                            onClick={() => {
                                window.open("cvs-map?cvs=UNIMART&IsCollection=N", "", "width=800,height=800");
                            }}
                        >
                            <span className="text-p-16-b" style={{color: "#493B3F", borderBottom: "1px solid #493B3F",lineHeight: "150%",paddingBottom: "8px"}}>搜尋門市</span>
                        </button>
                    </div>
                    <div className="form-check d-flex align-items-center mb-2">
                        <input type="radio" id="uniMart" name="deliveryMethod" value="uniMart" className="form-check-input me-1" />
                        <label htmlFor="uniMart" className="form-check-label text-p-16-b me-2">711 超商取貨</label>
                        <button
                            className="btn border-0"
                            type="button"
                            style={{
                                padding: "12px 24px 12px 24px",
                                gap: "8px",
                            }}
                        >
                            <span className="text-p-16-b" style={{color: "#493B3F", borderBottom: "1px solid #493B3F",lineHeight: "150%",paddingBottom: "8px"}}>搜尋門市</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-3">
                <div className="mt-6 mb-6 mt-md-15 mb-md-15">
                <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="cart-heading-title">結帳明細</h2>
                <div className="billDetails w-100">
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">商品小計</div>
                        <div className="p-2">
                            {currency(cartData.reduce((sum, item) => sum + item.total, 0))}
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">優惠券</div>
                        {finalTotal !== null ? (
                            <div className="p-2 text-success">
                                折扣：- {currency(Math.floor(subtotal - finalTotal))}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">結帳金額</div>
                        <div className="p-2">
                            {cartData.reduce((sum, item) => sum + item.total, 0) === 0 ? 0 : currency(finalTotal !== null ? Math.floor(finalTotal) : subtotal)}
                        </div>
                    </div>
                </div>
                <button
                    className="checkoutBtn w-100"
                    disabled={cartData.length === 0 || !isValid}
                >
                    立即結帳
                </button>
                </form>
                </div>
            </div>
        </div>
    </div>
    <OrderToast ref={toastRef} message="訂單已成立！" isSuccess={true} orderId={orderId} />
    </>
  );
}

export default Cart;