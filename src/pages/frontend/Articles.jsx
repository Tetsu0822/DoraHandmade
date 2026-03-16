function Articles() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDFAFA",
        fontFamily: "'Noto Sans TC', 'PingFang TC', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600&family=Noto+Serif+TC:wght@400;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .float-icon { animation: float 4s ease-in-out infinite; }
        .fade-up    { animation: fadeUp 0.7s ease both; }
        .fade-up-2  { animation: fadeUp 0.7s ease 0.15s both; }
        .fade-up-3  { animation: fadeUp 0.7s ease 0.3s both; }
        .fade-up-4  { animation: fadeUp 0.7s ease 0.45s both; }
        .skeleton {
          background: linear-gradient(90deg, #F5EDF1 25%, #FFF0F4 50%, #F5EDF1 75%);
          background-size: 400px 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 8px;
        }
        .article-card:hover {
          box-shadow: 0 8px 28px rgba(194,84,122,0.12) !important;
          transform: translateY(-3px) !important;
        }
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
            文章專區
          </h1>
          <p style={{
            color: "#C2547A",
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            margin: 0,
          }}>
            Articles &amp; Stories
          </p>
          <div style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}>
            <div style={{ height: "1px", width: "40px", background: "#D4849E" }} />
            <span style={{ fontSize: "1.2rem" }}>📖</span>
            <div style={{ height: "1px", width: "40px", background: "#D4849E" }} />
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "60px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Floating icon */}
        <div className="float-icon" style={{ fontSize: "3rem", marginBottom: "28px" }}>
          🌸
        </div>

        {/* Badge */}
        <div
          className="fade-up"
          style={{
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: "20px",
            background: "#FFF0F4",
            border: "1.5px solid #ECD4DE",
            color: "#C2547A",
            fontSize: "0.78rem",
            letterSpacing: "0.2em",
            fontWeight: 600,
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </div>

        <h2
          className="fade-up-2"
          style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
            fontWeight: 600,
            color: "#2a2a2a",
            margin: "0 0 20px",
            lineHeight: "1.6",
          }}
        >
          用文字記錄每一個<br />
          手作的當下
        </h2>

        <p
          className="fade-up-3"
          style={{
            color: "#888",
            fontSize: "0.95rem",
            lineHeight: "1.9",
            margin: "0 0 52px",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          文章專區即將與你見面。<br />
          我們將在這裡分享品牌故事、穿搭靈感、手作日記，以及每一個蝴蝶結背後的小故事——那些只有用心才看得見的溫度。
        </p>


        {/* Topics preview */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "28px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "#F0E4EA" }} />
          <span style={{ color: "#D4A0B4", fontSize: "0.8rem", letterSpacing: "0.1em" }}>即將收錄的主題</span>
          <div style={{ flex: 1, height: "1px", background: "#F0E4EA" }} />
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "52px",
        }}>
          {["品牌故事", "穿搭靈感", "手作日記", "新品介紹", "選材心法", "生活風格", "客戶故事"].map((tag, i) => (
            <span
              key={i}
              style={{
                padding: "7px 16px",
                borderRadius: "20px",
                background: i % 2 === 0 ? "#FFF0F4" : "#fff",
                border: "1.5px solid #ECD4DE",
                color: "#C2547A",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Follow CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFF0F4, #FCE4EE)",
            borderRadius: "16px",
            padding: "36px 28px",
            border: "1px solid #F0D8E4",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>📬</span>
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "0.95rem",
            color: "#2a2a2a",
            fontWeight: 600,
            margin: "12px 0 8px",
          }}>
            不想錯過任何文章？
          </p>
          <p style={{
            color: "#aaa",
            fontSize: "0.84rem",
            lineHeight: "1.7",
            margin: "0 0 20px",
          }}>
            追蹤我們的社群，第一時間掌握品牌最新故事與靈感 ♡
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://instagram.com/dora-handmade"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "10px 22px", borderRadius: "24px",
                background: "#C2547A", color: "#fff",
                fontSize: "0.85rem", fontWeight: 500,
                textDecoration: "none",
              }}
            >
              📸 追蹤 Instagram
            </a>
            <a
              href="https://facebook.com/dora-handmade"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "10px 22px", borderRadius: "24px",
                background: "#fff", color: "#C2547A",
                border: "1.5px solid #C2547A",
                fontSize: "0.85rem", fontWeight: 500,
                textDecoration: "none",
              }}
            >
              👥 追蹤 Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;