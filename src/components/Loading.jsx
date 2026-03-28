import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
/**
 * Loading 元件 — 通用資料載入中畫面
 *
 * Props:
 *   isLoading  {boolean}  是否顯示 loading（預設 true）
 *   text       {string}   自訂提示文字（預設「資料載入中」）
 *   fullPage   {boolean}  是否覆蓋整個視窗（預設 false，僅填滿父容器）
 *
 * 使用範例：
 *   <Loading isLoading={isLoading} />
 *   <Loading isLoading={isLoading} text="訂單處理中" fullPage />
 */
function Loading({ isLoading = true, text = "資料載入中", fullPage = false }) {
  const [dots, setDots] = useState("");

  // 動態省略號
  useEffect(() => {
    if (!isLoading) return;
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "．"));
    }, 450);
    return () => clearInterval(id);
  }, [isLoading]);

  if (!isLoading) return null;

  const overlayStyle = {
    position: fullPage ? "fixed" : "absolute",
    inset: 0,
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 252, 250, 0.88)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  };

  return (
    <div style={overlayStyle} role="status" aria-live="polite">
      {/* 旋轉圖示 */}
      <div style={{ position: "relative", width: 64, height: 64, marginBottom: 20 }}>
        {/* 外圈旋轉環 */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          style={{ position: "absolute", inset: 0, animation: "spin 1.4s linear infinite" }}
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#e8d5c4"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#9b6a4a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="44 132"
            strokeDashoffset="0"
          />
        </svg>

        {/* 旋轉圖示 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            animation: "sway 2.8s ease-in-out infinite",
          }}
        >
          <Loader2 size={32} color="#9b6a4a" style={{ animation: "spin 1s linear infinite" }} />
        </div>
      </div>

      {/* 提示文字 */}
      <p
        style={{
          fontFamily: "'Noto Serif TC', 'PingFang TC', serif",
          fontSize: "0.95rem",
          color: "#7a5c44",
          letterSpacing: "0.08em",
          margin: 0,
          minWidth: 110,
          textAlign: "center",
        }}
      >
        {text}
        <span style={{ display: "inline-block", minWidth: "2em", textAlign: "left" }}>
          {dots}
        </span>
      </p>

      {/* CSS 動畫 */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-6deg); }
          50%       { transform: rotate(6deg); }
        }
      `}</style>
    </div>
  );
}

export default Loading;