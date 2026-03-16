import logoImg from "@images/logo.png";

function Workshop() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FDFAFA",
        fontFamily: "'Noto Serif TC', 'PingFang TC', sans-serif",
      }}
    >

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
            手作小教室
          </h1>
          <p style={{
            color: "#C2547A",
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            margin: 0,
          }}>
            DIY Workshop
          </p>
          <div style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}>
            <div style={{ height: "1px", width: "40px", background: "#D4849E" }} />
            <img src={logoImg} alt="Dora Handmade Logo" />
            <div style={{ height: "1px", width: "40px", background: "#D4849E" }} />
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "64px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Floating icon */}
        <div className="float-icon" style={{ fontSize: "3.2rem", marginBottom: "32px" }}>
          🎀
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

        {/* Main message */}
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
          正在為你準備<br />
          最溫柔的手作體驗
        </h2>

        <p
          className="fade-up-3"
          style={{
            color: "#888",
            fontSize: "0.95rem",
            lineHeight: "1.9",
            margin: "0 0 48px",
          }}
        >
          手作小教室即將上線。<br />
          我們將分享蝴蝶結的製作技巧、選布心法，以及各種讓日常多一點儀式感的手作靈感，<br />
          讓你也能在家做出屬於自己的獨一無二配件。
        </p>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "40px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "#F0E4EA" }} />
          <span style={{ color: "#D4A0B4", fontSize: "0.8rem", letterSpacing: "0.1em" }}>敬請期待</span>
          <div style={{ flex: 1, height: "1px", background: "#F0E4EA" }} />
        </div>

        {/* Follow CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #FFF0F4, #FCE4EE)",
            borderRadius: "16px",
            padding: "32px 24px",
            border: "1px solid #F0D8E4",
          }}
        >
          <p style={{
            fontFamily: "'Noto Serif TC', serif",
            fontSize: "0.95rem",
            color: "#2a2a2a",
            fontWeight: 600,
            margin: "0 0 8px",
          }}>
            想第一個收到上線通知？
          </p>
          <p style={{
            color: "#aaa",
            fontSize: "0.84rem",
            lineHeight: "1.7",
            margin: "0 0 20px",
          }}>
            追蹤我們的社群，新課程上線時你會是第一個知道的 ♡
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

export default Workshop;
