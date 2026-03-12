import { useState, useRef } from "react";
import * as bootstrap from "bootstrap";
import { Link } from "react-router";
import { WandSparkles } from "lucide-react";
import customFormBanner from "@images/custom_form_banner.png";
import axios from "axios";

const VITE_API_BASE = import.meta.env.VITE_API_BASE;
const VITE_API_PATH = import.meta.env.VITE_API_PATH;


const CustomForm = () => {
  const toastRef = useRef(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsSuccess, setToastIsSuccess] = useState(true);
  const [toastOrderId, setToastOrderId] = useState("");

  const showToast = (msg, isSuccess = true, orderId = "") => {
    setToastMessage(msg);
    setToastIsSuccess(isSuccess);
    setToastOrderId(orderId);
    if (toastRef.current) {
      const toast = new bootstrap.Toast(toastRef.current);
      toast.show();
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    selectedColor: "",
    selectedPattern: "",
    requestDescription: "",
    fileReference: "",
    isConfirmed: false,
  });

  const [errors, setErrors] = useState({});

  const colorOptions = [
    { id: "cream-white", label: "奶油白" },
    { id: "cherry-blossom", label: "櫻花粉" },
    { id: "caramel-brown", label: "焦糖棕" },
    { id: "mint-green", label: "客製色" },
  ];

  const patternOptions = [
    { id: "classic", label: "經典單層蝴蝶結" },
    { id: "double-layer", label: "雙層立體蝴蝶結" },
    { id: "drooping", label: "垂墜絲帶蝴蝶結" },
    { id: "silk", label: "蕾絲/紗質蝴蝶結" },
    { id: "patterned", label: "造型裝飾蝴蝶結" },
  ];

  // 驗證單一欄位
  const validateField = (name, value) => {
    switch (name) {
      case "name": {
        if (!value.trim()) return "請填寫姓名";
        if (value.trim().length < 2) return "姓名長度不足";
        // 只允許中文、英文、數字及空格，禁止特殊符號
        const nameRegex = /^[a-zA-Z0-9\u4e00-\u9fa5\s]+$/;
        if (!nameRegex.test(value)) return "姓名不可包含特殊符號";
        return "";
      }
      case "phone": {
        if (!value.trim()) return "請填寫電話";
        // 支援手機 (09xx-xxx-xxx) 與市話 (0x-xxxxxxx)
        const phoneRegex = /^09\d{8}$|^0\d{1,3}-?\d{6,8}$/;
        if (!phoneRegex.test(value.replace(/[\s-]/g, ""))) return "電話格式不正確 (需為手機或市話)";
        return "";
      }
      case "email": {
        if (!value.trim()) return "請填寫 Email";
        // 確保後綴至少兩位且格式正確
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) return "Email 格式不正確 (例如: example@mail.com)";
        return "";
      }
      case "selectedColor":
        if (!value) return "請選擇顏色";
        return "";
      case "selectedPattern":
        if (!value) return "請選擇花色";
        return "";
      case "isConfirmed":
        if (!value) return "請確認內容正確";
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));

    // 即時驗證輸入欄位
    const error = validateField(name, inputValue);
    if (error || errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (error) {
          newErrors[name] = error;
        } else {
          delete newErrors[name];
        }
        return newErrors;
      });
    }
  };

  const handleFileUpload = () => {
    console.log("Triggering file upload dialog...");
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // 先檢查購物車是否為空，避免 API 直接回傳 404
        const cartRes = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`);
        const carts = cartRes.data?.data?.carts;
        
        if (!carts || carts.length === 0) {
          showToast("貼心提醒：由於系統限制，送出客製化需求前，請確保購物車內至少有一項商品（可隨意加入一件現貨）。");
          return;
        }

        const payload = {
          data: {
            user: {
              name: formData.name,
              email: formData.email,
              tel: formData.phone,
              address: "客製化需求預約 (自取/待詳談)", // 預填地址，以防爆錯
            },
            message: `【客製化蝴蝶結需求】\n顏色: ${formData.selectedColor}\n花色: ${formData.selectedPattern}\n需求說明: ${formData.requestDescription || "無"}`
          }
        };
        const response = await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/order`, payload);
        
        if (response.data.success) {
          showToast(`您的客製化需求已成功送出！\n訂單編號：${response.data.orderId}`, true, response.data.orderId);
          
          // 成功後重設表單
          setFormData({
            name: "",
            phone: "",
            email: "",
            selectedColor: "",
            selectedPattern: "",
            requestDescription: "",
            fileReference: "",
            isConfirmed: false,
          });
          setErrors({});
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        showToast(`送出失敗，請稍後再試：\n${Array.isArray(errorMsg) ? errorMsg.join('\n') : errorMsg}`);
      }
    } else {
      showToast("表單有部分內容填寫不完整或格式錯誤，請檢查紅字提示喔！");
    }
  };

  return (
    <div className="custom-form-page">
      <div className="form-banner">
        <img src={customFormBanner} alt="客製化蝴蝶結 banner" />
        <div className="banner-content">
          <h2 className="banner-title">
            每一個蝴蝶結，
            <br className="mobile-br" />
            都只為你而生
          </h2>
          <p className="banner-subtitle">
            Dream it, pick it, wear it - <br className="mobile-br" />
            super cute guaranteed.
          </p>
        </div>
      </div>

      <header className="form-header">
        <h1>
          <WandSparkles size={24} />
          客製化蝴蝶結服務
        </h1>
      </header>
      <div className="custom-form-container">
        <form onSubmit={handleSubmit}>
          {/* Section 1: 用戶填資料 */}
          <section className="form-section">
            <h2 className="section-title">1. 客戶基本資料</h2>
            <div className="form-group">
              <label htmlFor="name">購買人姓名</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="請輸入購買人姓名"
                className={errors.name ? "is-invalid" : ""}
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">聯絡電話</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="請輸入聯絡電話"
                className={errors.phone ? "is-invalid" : ""}
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="請輸入購買人 Email"
                className={errors.email ? "is-invalid" : ""}
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </section>

          {/* Section 2: 蝴蝶結設計需求 */}
          <section className="design-section">
            <h2 className="section-title">2. 蝴蝶結設計需求</h2>

            <div className="form-group">
              <label>選擇顏色 (必填)</label>
              <div className={`radio-grid ${errors.selectedColor ? "is-invalid" : ""}`}>
                {colorOptions.map((option) => (
                  <label key={option.id} className="radio-option">
                    <input
                      type="radio"
                      name="selectedColor"
                      value={option.label}
                      checked={formData.selectedColor === option.label}
                      onChange={handleInputChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.selectedColor && <span className="error-message">{errors.selectedColor}</span>}
            </div>

            <div className="form-group">
              <label>選擇花色 (必填)</label>
              <div className={`radio-grid ${errors.selectedPattern ? "is-invalid" : ""}`}>
                {patternOptions.map((option) => (
                  <label key={option.id} className="radio-option">
                    <input
                      type="radio"
                      name="selectedPattern"
                      value={option.label}
                      checked={formData.selectedPattern === option.label}
                      onChange={handleInputChange}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.selectedPattern && <span className="error-message">{errors.selectedPattern}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="requestDescription">需求說明</label>
              <textarea
                id="requestDescription"
                name="requestDescription"
                rows="4"
                placeholder="選填，可描述想要的風格、尺寸 or 使用場合，幫助我們更貼近您的需求。"
                value={formData.requestDescription}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="fileReference">上傳圖案</label>
              <div className="upload-group">
                <input
                  type="text"
                  id="fileReference"
                  placeholder="選選擇圖案上傳"
                  readOnly
                  value={formData.fileReference}
                />
                <button
                  type="button"
                  className="upload-btn"
                  onClick={handleFileUpload}
                >
                  上傳檔案
                </button>
              </div>
            </div>
          </section>

          {/* Section 3: 確認送出 */}
          <section className="confirmation-section">
            <h2 className="section-title">3. 確認送出</h2>
            <label className={`confirm-checkbox ${errors.isConfirmed ? "is-invalid-text" : ""}`}>
              <input
                type="checkbox"
                name="isConfirmed"
                checked={formData.isConfirmed}
                onChange={handleInputChange}
              />
              我已確認填寫內容正確
            </label>
            {errors.isConfirmed && <div className="error-message">{errors.isConfirmed}</div>}
            <p className="notice">
              *送出後我們將以 Email 與您聯繫確認細節並進行報價
            </p>
            <button
              type="submit"
              className="submit-btn"
              disabled={!formData.isConfirmed}
            >
              送出客製化需求
            </button>
          </section>
        </form>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1055 }}>
        <div ref={toastRef} className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000">
          <div className="toast-header bg-primary text-white">
            <strong className="me-auto">系統通知</strong>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body" style={{ whiteSpace: "pre-line", fontSize: "16px" }}>
            {toastMessage}
            {toastIsSuccess && toastOrderId && (
              <div className="mt-3">
                <Link to={`/order/${toastOrderId}`} className="btn btn-sm btn-outline-primary w-100">查看訂單詳情</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;
