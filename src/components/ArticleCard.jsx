import { Heart } from "lucide-react";

function ArticleCard({ article }) {
  return (
    <div className="article-card d-flex flex-column flex-md-row gap-4 p-4 border border-primary-500 rounded-4">
      <a href="#" className="d-block overflow-hidden rounded-4">
        <img src={article.image} className="mw-100 hover:zoom-in" alt={article.title} />
      </a>
      <div className="article-card__body flex-md-grow-1 d-flex flex-column justify-content-between">
        <div className="mb-4">
          <h5 className="text-p-24-b mb-4 mb-md-2">{article.title}</h5>
          <p className="mb-0">{article.content}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center text-secondary-700">
            <button type="button" className="article-likeBtn bg-transparent p-3">
              <Heart />
            </button>
            <span className="text-p-20-b">{article.likes}</span>
          </div>
          <a href="#" className="btn btn-underline">
            繼續閱讀
          </a>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard;
