import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Minus, Plus, Trash2 } from "lucide-react";
import { currency } from "../../utils/filter";
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
            console.log("Error updating cart:", error);
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
            console.log("Error removing cart item:", error);
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
            setCouponStatus("優惠券無效或已使用。");
            setFinalTotal(null);
        }
    };

    // 計算折扣金額
    const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);

    // useForm 表單驗證
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        mode: "onChange"
    });

    // 收件人選擇：true=同購買人，false=指定其他收件人
    const [isSameAsBuyer, setIsSameAsBuyer] = useState(true);
    // 其他收件人資訊
    const [recipientInfo, setRecipientInfo] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const updateRecipientData = (e) => {
        const { name, value } = e.target;
        setRecipientInfo(prev => ({ ...prev, [name]: value }));
    };

    // 購買人資訊用 state 儲存
    const [buyerInfo, setBuyerInfo] = useState({
        name: "林小明",
        phone: "0910552225",
        email: "ming.lin@gmail.com"
    });

    const updateBuyerData = (e) => {
        const { name, value } = e.target;
        setBuyerInfo(prev => ({ ...prev, [name]: value }));
    }

    // 更新指定收件人資訊
    // const updateRecipientData = (e) => {
    //     const { name, value } = e.target;
    //     setRecipientInfo(prev => ({ ...prev, [name]: value }));
    // };

    // 驗證購物車資料是否正確
    const [buyerErrors, setBuyerErrors] = useState({});

    // const validateBuyerInfo = () => {
    // const errors = {};
    // if (!buyerInfo.name || buyerInfo.name.length < 2) {
    //     errors.name = "購買人姓名至少需要 2 個字";
    // }
    // if (!buyerInfo.phone || !/^[0-9]{10}$/.test(buyerInfo.phone)) {
    //     errors.phone = "請輸入正確的手機號碼";
    // }
    // if (!buyerInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerInfo.email)) {
    //     errors.email = "請輸入正確的 Email";
    // }
    // setBuyerErrors(errors);
    // return Object.keys(errors).length === 0;
    // };

    // 送出表單時
    // const onSubmit = () => {
    //     if (!validateBuyerInfo()) {
    //         return;
    //     }
    //     // 這裡可以呼叫 API 送出訂單資料
    //     alert("訂單已送出！");
    //     // 送出後可以清空購物車和表單
    //     setCartData([]);
    //     reset();
    // }


  // API 取得購物車資料顯示在此
  useEffect(() => {
      const fetchCartData = async () => {
          try {
            const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
            setCartData(response.data.data.carts);
          } catch (error) {
            console.log("Error fetching cart data:", error);
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
                <h3 className="text-p-20-b text-gray-600">付款方式</h3>
                <div className="d-flex flex-column mb-6 mb-md-8">
                    <div className="form-check mb-2">
                        <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" className="form-check-input" {...register("paymentMethod", { required: "請選擇付款方式" })} defaultChecked />
                        <label htmlFor="creditCard" className="form-check-label text-p-16-b">信用卡</label>
                    </div>
                    <div className="form-check mb-2">
                        <input type="radio" id="storePickup" name="paymentMethod" value="storePickup" className="form-check-input" {...register("paymentMethod", { required: "請選擇付款方式" })} />
                        <label htmlFor="storePickup" className="form-check-label text-p-16-b">超商取貨付款</label>
                    </div>
                    {errors.paymentMethod && <p className="text-danger">{errors.paymentMethod.message}</p>}
                </div>
                <hr className="border text-gray-100 mb-6 mb-md-8" />
                <h3 className="text-p-20-b text-gray-600">購買人資訊</h3>
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
                    value={buyerInfo.name}
                    onChange={updateBuyerData}
                />
                {buyerErrors.name && <p className="text-danger">{buyerErrors.name}</p>}
                </div>
                <div className="mb-3">
                <label htmlFor="tel" className="form-label text-p-16-b">
                    聯絡電話
                </label>
                <input
                    id="tel"
                    name="phone"
                    type="tel"
                    className="form-control"
                    placeholder="請輸入聯絡電話"
                    value={buyerInfo.phone}
                    onChange={updateBuyerData}
                    // {...register("tel", twPhoneValidation)}
                />
                {buyerErrors.phone && <p className="text-danger">{buyerErrors.phone}</p>}
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
                    value={buyerInfo.email}
                    onChange={updateBuyerData}
                />
                {buyerErrors.email && <p className="text-danger">{buyerErrors.email}</p>}
                </div>
                <hr className="border text-gray-100 mb-6 mb-md-8" />
                <h3 className="text-p-20-b text-gray-600">收件人資訊</h3>
                <div className="d-flex flex-column mb-3">
                    <div className="form-check mb-2">
                        <input
                            type="radio"
                            id="sameAsBuyer"
                            name="recipientType"
                            checked={isSameAsBuyer}
                            onChange={() => setIsSameAsBuyer(true)}
                            className="form-check-input"
                        />
                        <label htmlFor="sameAsBuyer" className="form-check-label text-p-16-b">同購買人</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            id="otherRecipient"
                            name="recipientType"
                            checked={!isSameAsBuyer}
                            onChange={() => setIsSameAsBuyer(false)}
                            className="form-check-input"
                        />
                        <label htmlFor="otherRecipient" className="form-check-label text-p-16-b">指定其他收件人</label>
                    </div>
                </div>

                {isSameAsBuyer ? (
                    <div style={{ background: "#f3f3f3", borderRadius: 16, padding: 20, marginTop: 10 }}>
                        <div>姓名：{buyerInfo.name}</div>
                        <div>聯絡電話：{buyerInfo.phone}</div>
                        <div>Email：{buyerInfo.email}</div>
                    </div>
                ) : (
                    <div style={{ background: "#f3f3f3", borderRadius: 16, padding: 20, marginTop: 10 }}>
                        <div className="row mb-2">
                            <div className="col-6">
                                <label className="fw-bold mb-1">收件人</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={recipientInfo.name}
                                    onChange={updateRecipientData}
                                    placeholder="收件人姓名"
                                />
                            </div>
                            <div className="col-6">
                                <label className="fw-bold mb-1">聯絡電話</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={recipientInfo.phone}
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
                                value={recipientInfo.email}
                                onChange={updateRecipientData}
                                placeholder="收件人 Email"
                            />
                        </div>
                    </div>
                )}

            </div>
            <div className="col-sm-12 col-md-3">
                <div className="mt-6 mb-6 mt-md-15 mb-md-15">
                <h2 className="cart-heading-title">結帳明細</h2>
                <div className="billDetails w-100">
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">商品小計</div>
                        <div className="p-2">
                            {/* 商品小計金額 */}
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
                        <div className="p-2 flex-grow-1">運費</div>
                        <div className="p-2">
                            {
                                // 商品小計為 0 時免運費，反之則+$100
                                cartData.reduce((sum, item) => sum + item.total, 0) === 0 ? "免運費" : currency(100)
                            }
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="p-2 flex-grow-1">結帳金額</div>
                        <div className="p-2">
                            {
                                // 商品小計為 0 時結帳金額為 0，反之則為商品小計+新會員折扣+運費
                                cartData.reduce((sum, item) => sum + item.total, 0) === 0 ? 0 : currency(finalTotal !== null ? Math.floor(finalTotal) + 100 : subtotal + 100)
                            }
                        </div>
                    </div>
                </div>
                <button
                    className="checkoutBtn btn btn-primary w-100 text-white"
                    disabled={cartData.length === 0 || !isValid}
                    // onClick={onsubmit}
                >
                    立即結帳
                </button>
                </div>
            </div>
        </div>
        </div>
    </>
  );
}

export default Cart;