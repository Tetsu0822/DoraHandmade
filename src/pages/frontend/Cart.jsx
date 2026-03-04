import axios from "axios";
import { useState, useEffect } from "react";
import { RefreshCcw, Trash2 } from "lucide-react";
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

  // 計算折扣金額
    const subtotal = cartData.reduce((sum, item) => sum + item.total, 0);

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

  // API 取得購物車資料顯示在此
  useEffect(() => {
      const fetchCartData = async () => {
          const response = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
          //console.log(response.data);
          setCartData(response.data.data.carts);
      }
      fetchCartData();
  }, []);
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-9">
          <div className="mt-6 mb-6 mt-md-15 mb-md-15">
            <h2 className="h6 text-gray-900 mb-4 mb-md-6">購物車</h2>
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
                                <div className="input-group" style={{maxWidth: 120}}>
                                    <button
                                        className={`btn btn-outline-secondary btn-sm${item.qty === 1 ? ' text-muted border-muted' : ''}`}
                                        type="button"
                                        disabled={item.qty === 1 || updatingId === item.id}
                                        style={item.qty === 1 ? { backgroundColor: '#e9ecef', borderColor: '#e9ecef', color: '#adb5bd' } : {}}
                                        onClick={() => updateCartQty(item, item.qty - 1)}
                                    >-</button>
                                    <input type="number" min="1" className="form-control form-control-sm text-center" style={{width: 50}} value={item.qty} onChange={e => updateCartQty(item, Number(e.target.value))} disabled={updatingId===item.id} />
                                    <button className="btn btn-outline-secondary btn-sm" type="button" disabled={updatingId===item.id} onClick={() => updateCartQty(item, item.qty+1)}>+</button>
                                </div>
                            </td>
                            <td className="text-center">{item.product.unit}</td>
                            <td>${item.total}</td>
                            <td>
                                {/* <button className="btn btn-primary btn-sm text-white me-1" disabled={updatingId===item.id} onClick={() => updateCartQty(item, item.qty)}><RefreshCcw color="white" /> 更新</button> */}
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
                <div className="card">
                    <div className="fw-bold mb-2" style={{background: "#ede6e8", color: "#8f7e82", borderRadius: "8px 8px 0 0", padding: "8px 12px"}}>商品明細</div>
                    {cartData.map(item => (
                    <div key={item.id} className="d-flex justify-content-between align-items-start py-2 border-bottom">
                        <div style={{flex:1}}>
                            <div className="fw-bold" style={{fontSize: "1.1rem"}}>{item.product.title}</div>
                            <div className="text-secondary" style={{fontSize: "0.95rem"}}>
                                單價 ${item.product.price}
                                <div>
                                    <span className="mx-1">數量</span>
                                    <button className="btn btn-outline-secondary btn-sm px-2 py-0" type="button" disabled={item.qty ===1 || updatingId===item.id}
                                    style={item.qty === 1 ? { backgroundColor: '#e9ecef', borderColor: '#e9ecef', color: '#adb5bd' } : {}}
                                    onClick={() => updateCartQty(item, item.qty-1)}>-</button>
                                    <input type="number" min="1" className="form-control form-control-sm d-inline-block text-center mx-1" style={{width: 50, height: 28}} value={item.qty} onChange={e => updateCartQty(item, Number(e.target.value))} disabled={updatingId===item.id} />
                                    <button className="btn btn-outline-secondary btn-sm px-2 py-0" type="button" disabled={updatingId===item.id} onClick={() => updateCartQty(item, item.qty+1)}>+</button>
                                    {/* <button className="btn btn-primary btn-sm ms-2" disabled={updatingId===item.id} onClick={() => updateCartQty(item, item.qty)}><RefreshCcw color="white" /></button> */}
                                    <button className="btn btn-danger btn-sm ms-1" disabled={updatingId===item.id} onClick={() => removeCartItem(item.id)}><Trash2 color="white" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="fw-bold" style={{fontSize: "1.1rem"}}>${item.total}</div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3">
            <div className="mt-6 mb-6 mt-md-15 mb-md-15">
              <h2 className="h6 text-gray-900 mb-4">結帳明細</h2>
              <div className="billDetails w-100">
                  <div className="d-flex">
                      <div className="p-2 flex-grow-1">商品小計</div>
                      <div className="p-2">
                          {/* 商品小計金額 */}
                          ${cartData.reduce((sum, item) => sum + item.total, 0)}
                      </div>
                  </div>
                  <div className="d-flex">
                      <div className="p-2 flex-grow-1">優惠券</div>
                      {finalTotal !== null ? (
                          <div className="p-2 text-success">
                              優惠券折扣：- ${Math.floor(subtotal - finalTotal)}
                          </div>
                      ) : (
                          <div className="p-2 text-secondary">
                              尚未套用優惠券
                          </div>
                      )}
                  </div>
                  <div className="d-flex">
                      <div className="p-2 flex-grow-1">運費</div>
                      <div className="p-2">
                          +$100
                      </div>
                  </div>
                  <div className="d-flex">
                      <div className="p-2 flex-grow-1">結帳金額</div>
                      <div className="p-2">
                          {/* 商品小計+新會員折扣+運費 */}
                          {finalTotal !== null
                              ? Math.floor(finalTotal) + 100
                              : subtotal + 100}
                      </div>
                  </div>
              </div>
              <button
                className="checkoutBtn btn btn-primary w-100 text-white"
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