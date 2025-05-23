import { useState, useEffect } from 'react';
import './Artigos.css';
import { Link } from 'react-router-dom';

export function Artigos() {
  const [articles, setArticles] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => setArticles(data));

    const token = localStorage.getItem('token');
    if (token) setUser(JSON.parse(atob(token.split('.')[1])));
  }, []);

  const handleEdit = (articleId: number) => {
    window.location.href = `/editar/${articleId}`;
  };

  return (
    <div className="artigos-container">
      <h1>Artigos</h1>
      <div className="artigos-list">
        {articles.map(article => (
          <div key={article.id} className="artigo-card">
            <h2>{article.title}</h2>
            {article.image && <img src={article.image} alt={article.title} />}
            <p>{article.text.substring(0, 100)}...</p>
            <p>Likes: {article.likes}</p>
            {user?.id === article.user_id && (
              <button onClick={() => handleEdit(article.id)}>Editar</button>
            )}
            <Link to={`/artigo/${article.id}`}>Ler mais</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
