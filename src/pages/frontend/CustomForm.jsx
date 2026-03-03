import { useState } from "react";
import { WandSparkles } from "lucide-react";
import customFormBanner from "@images/custom_form_banner.png";

const CustomForm = () => {
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = () => {
    console.log("Triggering file upload dialog...");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "請填寫姓名";
    if (!formData.phone) newErrors.phone = "請填寫電話";
    if (!formData.email) newErrors.email = "請填寫 Email";
    if (!formData.selectedColor) newErrors.selectedColor = "必填";
    if (!formData.selectedPattern) newErrors.selectedPattern = "必填";
    if (!formData.isConfirmed) newErrors.isConfirmed = "請確認內容正確";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submit Data:", formData);
      alert("需求已送出！我們會再以 Email 與您聯繫。");
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
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">聯絡電話</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="請輸入聯絡電話"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="請輸入購買人 Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </section>

          {/* Section 2: 蝴蝶結設計需求 */}
          <section className="design-section">
            <h2 className="section-title">2. 蝴蝶結設計需求</h2>

            <div className="form-group">
              <label>選擇顏色 (必填)</label>
              <div className="radio-grid">
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
            </div>

            <div className="form-group">
              <label>選擇花色 (必填)</label>
              <div className="radio-grid">
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
            </div>

            <div className="form-group">
              <label htmlFor="requestDescription">需求說明</label>
              <textarea
                id="requestDescription"
                name="requestDescription"
                rows="4"
                placeholder="選填，可描述想要的風格、尺寸或使用場合，幫助我們更貼近您的需求。"
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
            <label className="confirm-checkbox">
              <input
                type="checkbox"
                name="isConfirmed"
                checked={formData.isConfirmed}
                onChange={handleInputChange}
              />
              我已確認填寫內容正確
            </label>
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
    </div>
  );
};

export default CustomForm;
