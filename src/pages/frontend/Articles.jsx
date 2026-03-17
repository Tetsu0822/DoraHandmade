import ArticleCard from '@components/ArticleCard';
import { articles } from '@data/articles';
import { Facebook, Instagram } from '@components/icons';

function Articles() {
  return (
    <div
      style={{
        background: "#FDFAFA",
      }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .float-icon { animation: float 4s ease-in-out infinite; }
        .skeleton {
          background: linear-gradient(90deg, #F5EDF1 25%, #FFF0F4 50%, #F5EDF1 75%);
          background-size: 400px 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 8px;
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
      <div className="container py-10 py-lg-15">
        {/* <h1 className="text-p-28-b text-center text-secondary-700 py-15">文章專區</h1> */}
        <ul className="row row-gap-6 row-gap-md-8 ps-0 mb-6 mb-lg-12">
          {articles.map((article) => (
            <li className="col-12 list-unstyled" key={article.id || article.title}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
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
          style={{
            fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
            fontWeight: 600,
            margin: "0 0 20px",
            lineHeight: "1.6",
          }}
        >
          用文字記錄每一個<br />
          手作的當下
        </h2>

        <p
          className="text-gray-600"
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.9",
            margin: "0 0 52px",
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          更多文章即將與你見面。<br />
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
            fontSize: "0.95rem",
            color: "#2a2a2a",
            fontWeight: 600,
            margin: "12px 0 8px",
          }}>
            不想錯過任何文章？
          </p>
          <p
            className="text-gray-600"
            style={{
            fontSize: "0.84rem",
            lineHeight: "1.7",
            margin: "0 0 20px",
          }}>
            追蹤我們的社群，第一時間掌握品牌最新故事與靈感 ♡
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://instagram.com/dora-handmade"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dora"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "10px 22px", borderRadius: "24px",
                fontSize: "0.85rem", fontWeight: 500,
              }}
            >
              <Instagram color="currentColor" size={16} />
              追蹤 Instagram
            </a>
            <a
              href="https://facebook.com/dora-handmade"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dora-outline"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "10px 22px", borderRadius: "24px",
                fontSize: "0.85rem", fontWeight: 500,
              }}
            >
              <Facebook color="currentColor" />
              追蹤 Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;