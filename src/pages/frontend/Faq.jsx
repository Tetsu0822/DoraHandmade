import { useState } from "react";
import logoImg from "@images/logo.png";

const faqData = [
  {
    category: "會員與帳號",
    items: [
      {
        q: "Q1：沒有註冊會員也可以下單嗎？",
        a: "可以的！即使沒有註冊會員也能正常下單購買商品。不過若未註冊會員，將無法查詢訂單狀況，也無法享有會員專屬優惠。為了保障您的購物權益與方便日後查詢訂單，建議您先註冊會員再進行購買喔！",
      },
      {
        q: "Q2：如何註冊會員？",
        a: "進入官網後，請點選頁面右上角的「人像圖示」，左側會跳出選單，點選「新用戶註冊」，依照系統指示填寫資料並送出即可完成註冊。",
      },
    ],
  },
  {
    category: "訂單與出貨",
    items: [
      {
        q: "Q4：下單後多久可以收到商品？匯款後需要通知嗎？",
        a: null,
        custom: (
          <div style={{ color: "#555", fontSize: "0.92rem", lineHeight: "1.9" }}>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>超商取貨訂單</span>
              <ul style={{ marginTop: "6px", paddingLeft: "1.2em", listStyle: "disc" }}>
                <li>訂單成立後需 <strong>3–7 個工作天備貨</strong></li>
                <li>備貨完成後交由物流配送，約 <strong>3–4 天送達指定超商</strong></li>
                <li>整體約 3–12 個工作天可收到商品</li>
              </ul>
            </div>
            <div>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>匯款訂單</span>
              <ul style={{ marginTop: "6px", paddingLeft: "1.2em", listStyle: "disc" }}>
                <li>備貨完成後，需 2–3 個工作天對帳與寄送</li>
                <li>若遇商品缺貨，會另行以簡訊或私訊通知您</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        q: "Q9：預購商品的出貨時間到了，但還沒收到商品？",
        a: "由於每個蝴蝶結皆為手工製作，實際製作時間可能會因訂單量而提前或稍微延後。若超過預估出貨時間仍未收到商品，歡迎聯繫客服協助查詢。",
      },
      {
        q: "Q10：可以修改或取消訂單嗎？",
        a: "若訂單尚未出貨，可以聯繫客服協助修改或取消訂單；若商品已進入出貨流程，則無法修改或取消。",
      },
    ],
  },
  {
    category: "付款方式",
    items: [
      {
        q: "Q11：有哪些付款方式？",
        a: null,
        custom: (
          <div style={{ color: "#555", fontSize: "0.92rem", lineHeight: "1.9" }}>
            目前提供以下付款方式：
            <ul style={{ marginTop: "6px", paddingLeft: "1.2em", listStyle: "disc" }}>
              <li>超商取貨付款</li>
              <li>銀行轉帳 / 匯款</li>
            </ul>
            <p style={{ marginTop: "8px", color: "#999", fontSize: "0.85rem" }}>
              實際付款方式依官網結帳頁面顯示為準。
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "商品與客製化",
    items: [
      {
        q: "Q5：缺貨商品會再補貨嗎？",
        a: "大部分缺貨商品都會安排補貨，補貨時間約 4–6 週不等。您也可以填寫「補貨通知」，商品補貨後我們會透過 E-mail 寄送補貨通知信給您。",
      },
      {
        q: "Q6：蝴蝶結可以客製化嗎？",
        a: "可以的！我們提供部分蝴蝶結客製化服務，您可以至客製化頁面填寫需求，我們會依照內容與您確認細節。\n※ 客製化商品製作時間會依款式與訂單量有所不同。",
      },
      {
        q: "Q12：蝴蝶結是手工製作會有差異嗎？",
        a: "所有蝴蝶結皆為手工製作，尺寸、花紋位置可能會有些微差異，這也是手作商品獨特之處，敬請見諒。",
      },
    ],
  },
  {
    category: "退換貨",
    items: [
      {
        q: "Q7：收到商品後發現瑕疵，可以退換貨嗎？",
        a: null,
        custom: (
          <div style={{ color: "#555", fontSize: "0.92rem", lineHeight: "1.9" }}>
            <p>若商品有瑕疵或寄錯商品，請在 <strong>收到商品 7 日內</strong> 與客服聯繫辦理退換貨。</p>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>退換貨規則</span>
              <ul style={{ marginTop: "6px", paddingLeft: "1.2em", listStyle: "disc" }}>
                <li><strong>7 日內</strong>：可辦理瑕疵退換或無瑕疵退換</li>
                <li><strong>7 日後</strong>：恕不受理退換貨</li>
              </ul>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>運費說明</span>
              <ul style={{ marginTop: "6px", paddingLeft: "1.2em", listStyle: "disc" }}>
                <li><strong>7 日內瑕疵商品</strong>：退貨運費由賣場負擔</li>
                <li><strong>7 日後申請</strong>：運費需自行負擔</li>
              </ul>
            </div>
            <div>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>聯絡方式</span>
              <p style={{ marginTop: "4px" }}>Instagram：@dora-handmade　Facebook 粉絲團：dora-handmade</p>
            </div>
            <p style={{ marginTop: "10px", color: "#999", fontSize: "0.84rem" }}>
              ※ 請務必先聯繫客服確認後再寄出商品，未經聯繫自行寄出將無法受理。
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "聯繫客服",
    items: [
      {
        q: "Q3：如何聯繫客服？",
        a: null,
        custom: (
          <div style={{ color: "#555", fontSize: "0.92rem", lineHeight: "1.9" }}>
            為了能更快速協助您解決問題，請依照您的需求聯繫以下窗口：
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>訂單、退換貨、商品相關問題</span>
              <p style={{ marginTop: "4px" }}>Instagram：@dora-handmade</p>
              <p>Facebook 粉絲團：dora-handmade</p>
            </div>
            <div>
              <span style={{ fontWeight: 600, color: "#C2547A" }}>行銷合作、品牌合作等事宜</span>
              <p style={{ marginTop: "4px" }}>Email：dora-handmade@gmail.com</p>
            </div>
            <p style={{ marginTop: "10px", color: "#999", fontSize: "0.84rem" }}>
              ※ 為避免重複回覆，建議擇一管道聯繫即可。
            </p>
          </div>
        ),
      },
      {
        q: "Q8：有實體門市嗎？",
        a: "目前僅提供線上購物，實體門市仍在規劃中，未來若有新消息會在社群平台公告。",
      },
    ],
  },
];

const categoryIcons = {
  會員與帳號: "👤",
  訂單與出貨: "📦",
  付款方式: "💳",
  商品與客製化: "🎀",
  退換貨: "🔄",
  聯繫客服: "💬",
};

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderBottom: "1px solid #F0E8EC",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          textAlign: "left",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "0.95rem",
            fontWeight: isOpen ? 600 : 500,
            color: isOpen ? "#C2547A" : "#3a3a3a",
            lineHeight: "1.5",
            transition: "color 0.2s",
            fontFamily: "'Noto Serif TC', serif",
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: isOpen ? "#C2547A" : "#F5EDF1",
            color: isOpen ? "#fff" : "#C2547A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: 700,
            transition: "all 0.25s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "600px" : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div
          style={{
            paddingBottom: "20px",
            paddingLeft: "0",
          }}
        >
          {item.custom ? (
            item.custom
          ) : (
            <p
              style={{
                color: "#555",
                fontSize: "0.92rem",
                lineHeight: "1.9",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {item.a}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Faq() {
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);

  const toggle = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData =
    activeCategory !== null
      ? faqData.filter((_, i) => i === activeCategory)
      : faqData;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDFAFA",
        fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600&family=Noto+Serif+TC:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        ul { margin: 0; }
      `}</style>

      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #FFF0F4 0%, #FCE8F0 40%, #F8D9E8 100%)",
          padding: "64px 24px 52px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "rgba(220,50,115,0.06)",
        }} />
        <div style={{
          position: "absolute", bottom: "-30px", left: "5%",
          width: "120px", height: "120px", borderRadius: "50%",
          background: "rgba(220,50,115,0.05)",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: "0.78rem",
            letterSpacing: "0.25em",
            color: "#C2547A",
            textTransform: "uppercase",
            marginBottom: "12px",
            fontWeight: 500,
          }}>
            DORA HANDMADE
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 600,
              color: "#2a2a2a",
              margin: "0 0 12px",
              fontFamily: "'Noto Serif TC', serif",
              letterSpacing: "0.05em",
            }}
          >
            常見問題
          </h1>
          <p style={{
            color: "#C2547A",
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            margin: 0,
          }}>
            Frequently Asked Questions
          </p>
          {/* Decorative ribbon */}
          <div style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}>
            <div style={{ height: "1px", width: "40px", background: "#D4849E" }} />
            <img src={logoImg} alt="Logo" />
            <div style={{ height: "1px", width: "40px", background: "#D4849E" }} />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #F0E4EA",
          padding: "16px 24px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            maxWidth: "860px",
            margin: "0 auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: "8px 18px",
              borderRadius: "20px",
              border: "1.5px solid",
              borderColor: activeCategory === null ? "#C2547A" : "#E8D0DA",
              background: activeCategory === null ? "#C2547A" : "#fff",
              color: activeCategory === null ? "#fff" : "#888",
              fontSize: "0.82rem",
              cursor: "pointer",
              fontWeight: activeCategory === null ? 600 : 400,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
          >
            全部
          </button>
          {faqData.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(activeCategory === i ? null : i)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "1.5px solid",
                borderColor: activeCategory === i ? "#C2547A" : "#E8D0DA",
                background: activeCategory === i ? "#C2547A" : "#fff",
                color: activeCategory === i ? "#fff" : "#888",
                fontSize: "0.82rem",
                cursor: "pointer",
                fontWeight: activeCategory === i ? 600 : 400,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              {categoryIcons[cat.category]} {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {filteredData.map((cat, catIdx) => {
          const originalIdx = faqData.indexOf(cat);
          return (
            <div key={catIdx} style={{ marginBottom: "40px" }}>
              {/* Category Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "4px",
                  paddingBottom: "14px",
                  borderBottom: "2px solid #ECD4DE",
                }}
              >
                <span style={{ fontSize: "1.15rem" }}>
                  {categoryIcons[cat.category]}
                </span>
                <h2
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#C2547A",
                    margin: 0,
                    letterSpacing: "0.06em",
                    fontFamily: "'Noto Serif TC', serif",
                  }}
                >
                  {cat.category}
                </h2>
              </div>

              {/* Items */}
              {cat.items.map((item, itemIdx) => (
                <AccordionItem
                  key={itemIdx}
                  item={item}
                  isOpen={!!openItems[`${originalIdx}-${itemIdx}`]}
                  onToggle={() => toggle(originalIdx, itemIdx)}
                />
              ))}
            </div>
          );
        })}

        {/* Contact CTA */}
        <div
          style={{
            marginTop: "24px",
            background: "linear-gradient(135deg, #FFF0F4, #FCE4EE)",
            borderRadius: "16px",
            padding: "36px 28px",
            textAlign: "center",
            border: "1px solid #F0D8E4",
          }}
        >
          <img src={logoImg} alt="Logo" />
          <h3
            style={{
              fontFamily: "'Noto Serif TC', serif",
              fontSize: "1.05rem",
              color: "#2a2a2a",
              margin: "12px 0 8px",
              fontWeight: 600,
            }}
          >
            還有其他問題嗎？
          </h3>
          <p
            style={{
              color: "#888",
              fontSize: "0.88rem",
              lineHeight: "1.7",
              margin: "0 0 20px",
            }}
          >
            歡迎透過以下方式聯繫我們，我們會盡快回覆您 ♡
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://instagram.com/dora-handmade"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                borderRadius: "24px",
                background: "#C2547A",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
            >
              📸 Instagram
            </a>
            <a
              href="https://facebook.com/dora-handmade"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 22px",
                borderRadius: "24px",
                background: "#fff",
                color: "#C2547A",
                border: "1.5px solid #C2547A",
                fontSize: "0.85rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              👥 Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;