import { useState, useEffect } from 'react';
import './Artigos.css';
import { Link, useNavigate } from 'react-router-dom';

export function Artigos() {
  const [articles, setArticles] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => setArticles(data));

    const token = localStorage.getItem('token');
    if (token) setUser(JSON.parse(atob(token.split('.')[1])));
  }, []);

  const handleLikeToggle = (article: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para curtir!');
      return;
    }

    fetch(`http://localhost:3000/articles/${article.id}/like-toggle`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setArticles(articles.map(a =>
          a.id === article.id ? { ...a, likes: data.liked ? a.likes + 1 : a.likes - 1 } : a
        ));
      });
  };

  const handleEdit = (articleId: number) => {
    navigate(`/editar/${articleId}`);
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
            <p>Autor: {article.author_name}</p>
            <p>Criado em: {new Date(article.created_at).toLocaleDateString()}</p>
            <p>Likes: {article.likes}</p>
            {user && (
              <button onClick={() => handleLikeToggle(article)}>Curtir/Descurtir</button>
            )}
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
