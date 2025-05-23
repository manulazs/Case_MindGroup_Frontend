import { useState, useEffect } from 'react';
import './Artigos.css';
import { Link } from 'react-router-dom';

export function Artigos() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar artigos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando artigos...</p>;

  return (
    <div className="artigos-container">
      <h1>Artigos</h1>
      <div className="artigos-list">
        {articles.map(article => (
          <div key={article.id} className="artigo-card">
            <h2>{article.title}</h2>
            {article.image && <img src={article.image} alt={article.title} />}
            <p>{article.text.substring(0, 100)}...</p>

            <p><strong>Autor:</strong> {article.author_name}</p>
            <p><strong>Publicado em:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
            <p><strong>Likes:</strong> {article.likes}</p>

            <Link to={`/artigo/${article.id}`}>Ler mais</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
