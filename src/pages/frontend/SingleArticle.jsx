import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { articles } from '@data/articles';

function SingleArticle() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const [redirectSeconds, setRedirectSeconds] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      // 模擬延遲
      await new Promise(resolve => setTimeout(resolve, 100));
      const foundArticle = articles.find((article) => '' + article.id === id);
      setArticle(foundArticle);
      setIsLoading(false);
    };
    
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (!article && !isLoading) {
      const timer = setInterval(() => {
        setRedirectSeconds(prev => {
          if (prev <= 1) {
            navigate('/article');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [article, isLoading, navigate]);

  if (isLoading) {
    return (
      <div style={{ height: '80vh' }}></div>
    );
  }
  if (!article) {
    return (
      <div className="container py-10 py-lg-15" style={{ height: '80vh' }}>
        <div className="text-center py-10 py-lg-15">
          <p className="t-h-3">此篇文章不存在</p>
          <p>將在 {redirectSeconds} 秒後返回文章列表...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-10 py-lg-15">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="article">
            <h1 className="article-title t-h-3 text-center text-secondary-700 mb-6 mb-lg-8">{article.title}</h1>
            <div className="article-image-wrapper mx-auto mb-10 mb-lg-15">
              <img className="article-image mw-100" src={article.image} alt={article.title} />
            </div>
            <ArticleContent sections={article.sections} />
          </div>
        </div>
      </div>
    </div>
  )
}


function ArticleContent({ sections }) {
  return (
    <div className="article-body">
      {sections.map((section, index) => {
        const sectionClass = `article-section section-${section.type}`;
        switch (section.type) {
          case 'paragraph':
            return <p key={index} className={sectionClass}>{section.text}</p>;
          case 'unordered-list':
            return (
              <ul key={index} className={sectionClass}>
                {section.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            );
          case 'ordered-list':
            return (
              <ol key={index} className={sectionClass}>
                {section.items.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            );
          case 'table':
            return (
              <table key={index} className={sectionClass + ' table border'}>
                <thead>
                  <tr>{section.headers.map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            );
          default:
            return <div key={index} className={sectionClass}>{section.text}</div>;
        }
      })}
    </div>
  );
};

export default SingleArticle;
