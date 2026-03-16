import { useParams } from 'react-router';
import { articles } from '@data/articles';

function SingleArticle() {
  const { id } = useParams();
  const article = articles.find((article) => '' + article.id === id);
  return (
    <>
      {article && (
        <div className="container py-10 py-lg-15">
          <div className="article">
            <h1 className="article-title t-h-3 text-center text-secondary-700 mb-6 mb-lg-8">{article.title}</h1>
            <div className="article-image-wrapper mx-auto mb-8">
              <img className="article-image mw-100" src={article.image} alt={article.title} />
            </div>
            <p className="article-abstract">{article.abstract}</p>
          </div>
        </div>
      )}
    </>
  )
}


// function ArticleBody() {
//   return (
//     <div className="article-body">
//     </div>
//   )
// }

export default SingleArticle;
