# 客製化訂單功能開發紀錄

## 一、圖片上傳問題分析

### 問題根源

原本設計是將圖片以 **base64** 格式直接塞進 `message` 欄位字串，造成以下問題：

| 問題 | 說明 |
|------|------|
| Payload 體積爆炸 | 一張圖片 base64 編碼後可達 100KB+，5 張直接超過 API 限制 |
| 結構混亂 | 文字與圖片 base64 混在同一個字串，後台無法解析 |
| 無公開上傳端點 | 六角 API 的 `/admin/upload` 需要 token，一般使用者無法使用 |

### 解決方案：串接 Uploadcare

改用 **Uploadcare** 圖床，一般使用者只需 Public Key 即可上傳，不需要登入。

```
上傳流程：
選圖 → 格式/大小驗證 → Uploadcare uploadFile() → 取得 cdnUrl → 存入 fileReferences[]
```

#### 環境變數設定

```env
VITE_UPLOADCARE_PUBLIC_KEY=你的公開金鑰
VITE_UPLOADCARE_CDN_BASE=https://你的自訂CDN網域  # 如：https://44f417c52u.ucarecd.net
```

#### 安裝套件

```bash
npm install @uploadcare/upload-client
```

#### 核心上傳程式碼

```javascript
import { UploadClient } from "@uploadcare/upload-client";

const uploadcareClient = VITE_UPLOADCARE_PUBLIC_KEY
  ? new UploadClient({ publicKey: VITE_UPLOADCARE_PUBLIC_KEY })
  : null;

const uploadImage = async (file) => {
  const uploadedFile = await uploadcareClient.uploadFile(file, {
    onProgress: ({ isComputable, value }) => {
      if (isComputable) setUploadProgress(Math.round(20 + value * 75));
    },
  });

  // 使用自訂 CDN 網域組成完整 URL
  const uuid = uploadedFile.uuid;
  const cdnBase = VITE_UPLOADCARE_CDN_BASE?.replace(/\/$/, "") ?? "https://ucarecdn.com";
  const imageUrl = `${cdnBase}/${uuid}/-/preview/`;

  setFormData(prev => ({
    ...prev,
    fileReferences: [...prev.fileReferences, imageUrl],
  }));
};
```

---

## 二、Message 欄位結構設計

### 問題

六角 API 的訂單只有一個 `message` 字串欄位，需要同時儲存客製化需求文字與圖片 URL 陣列。

### 解決方案：結構化換行格式

每行一個欄位，以 `鍵：值` 表示，圖片 URL 以 JSON 陣列儲存。

```javascript
const buildMessage = () => [
  `客製化顏色：${formData.selectedColor}`,
  `客製化花色：${formData.selectedPattern}`,
  `客製化需求說明：${formData.requestDescription || "無"}`,
  `imgUrls：${JSON.stringify(formData.fileReferences)}`,
].join("\n");
```

#### 解析方式

```javascript
const parseCustomMessage = (message) => {
  const lines = message.split("\n");
  const getValue = (prefix) => {
    const line = lines.find(l => l.startsWith(prefix));
    return line ? line.replace(prefix, "").trim() : "";
  };
  let imgUrls = [];
  try {
    imgUrls = JSON.parse(getValue("imgUrls：")) || [];
  } catch { imgUrls = []; }

  return {
    color:       getValue("客製化顏色："),
    pattern:     getValue("客製化花色："),
    description: getValue("客製化需求說明："),
    imgUrls,
  };
};
```

> **優點**：用 `startsWith` 逐行比對，不怕使用者在需求說明裡自行輸入換行或逗號。

---

## 三、訂單送出流程

### 問題

六角 API 的 `POST /order` 要求購物車不能為空，但客製化表單沒有任何商品。

### 解決方案：佔位商品

在後台新增一個專用「客製化服務」商品（`is_placeholder: true`），送出前暫時加入購物車。

```
Step 1  POST /cart    加入佔位商品（qty: 1）
Step 2  POST /order   建立訂單（API 自動清空購物車）
→ 完成
```

#### 環境變數

```env
VITE_CUSTOM_PRODUCT_ID=後台客製化佔位商品的ID
```

#### 核心程式碼

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  // Step 1：加入佔位商品
  await axios.post(`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`, {
    data: { product_id: VITE_CUSTOM_PRODUCT_ID, qty: 1 },
  });

  // Step 2：建立訂單（API 自動清空購物車）
  const response = await axios.post(
    `${VITE_API_BASE}/api/${VITE_API_PATH}/order`,
    { data: { user: { ... }, message: buildMessage() } }
  );
};
```

---

## 四、佔位商品設定

### 後台商品欄位新增

在 `INITIAL_TEMPLATE_DATA` 新增 `is_placeholder` 欄位：

```javascript
const INITIAL_TEMPLATE_DATA = {
  // ... 原有欄位
  is_placeholder: false, // 佔位商品（供客製化表單使用，前台不顯示）
};
```

### 後台建立佔位商品

| 欄位 | 設定值 |
|------|--------|
| 標題 | 客製化服務 |
| 售價 | 1 |
| 是否啟用 | ✅ 開啟 |
| 佔位商品 | ✅ 勾選 |

### 前台商品列表過濾

```javascript
// Products.jsx - fetchProducts
const enabledProducts = res.data.products?.filter(
  p => p.is_enabled && !p.is_placeholder
);
```

---

## 五、訂單類型判斷

所有頁面共用同一個判斷函式：

```javascript
const isCustomOrder = (message) => message?.includes("客製化顏色：") ?? false;
```

---

## 六、各頁面修改重點

### 前台

| 頁面 | 修改重點 |
|------|---------|
| `CustomForm.jsx` | 圖片改用 Uploadcare 上傳；message 改為結構化格式；送出前加入佔位商品 |
| `Orders.jsx` | 客製化訂單的「訂單狀態」顯示黃色 `另行報價` badge；「訂單金額」顯示棕色 `另行報價`；隱藏付款按鈕 |
| `SingleOrder.jsx` | 客製化訂單隱藏付款狀態、總額、付款按鈕；商品明細隱藏所有金額；合計改為 `另行報價`；右欄顯示 🎀 客製化需求卡片 + 🖼️ 參考圖片卡片 |
| `Products.jsx` | filter 掉 `is_placeholder: true` 的商品 |

### 後台

| 頁面 | 修改重點 |
|------|---------|
| `AdminProducts.jsx` | 新增 `is_placeholder` 欄位；商品列表顯示 `佔位` 黃色 badge |
| `ProductModal.jsx` | 新增「佔位商品」checkbox（與 `is_hot`、`is_new` 並列） |
| `AdminOrders.jsx` | 客製化訂單的「訂單狀態」與「訂單金額」欄位顯示 `另行報價` |
| `OrderModal.jsx` | 客製化訂單：隱藏付款狀態 toggle；金額顯示 `另行報價`；左欄顯示客製化需求 + 參考圖片；右欄商品明細隱藏金額；隱藏「儲存變更」按鈕 |

---

## 七、完整 .env 設定清單

```env
VITE_API_BASE=https://ec-course-api.hexschool.io/v2
VITE_API_PATH=你的API路徑

# Uploadcare 圖片上傳
VITE_UPLOADCARE_PUBLIC_KEY=你的Uploadcare公開金鑰
VITE_UPLOADCARE_CDN_BASE=https://你的自訂CDN網域

# 客製化訂單佔位商品
VITE_CUSTOM_PRODUCT_ID=後台佔位商品的ID
```
