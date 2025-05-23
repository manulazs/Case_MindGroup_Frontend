import { useState, useEffect } from 'react';
import './Artigos.css';
import { Link } from 'react-router-dom';

export function Artigos() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }

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

  const handleLike = (id: number, index: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para curtir!');
      return;
    }

    fetch(`http://localhost:3000/articles/${id}/like`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.message) });
        }
        return res.json();
      })
      .then(() => {
        // Apenas se sucesso incrementa
        const updated = [...articles];
        updated[index].likes += 1;
        setArticles(updated);
      })
      .catch(err => alert(err.message));
  };

  if (loading) return <p>Carregando artigos...</p>;

  return (
    <div className="artigos-container">
      <h1>Artigos</h1>
      <div className="artigos-list">
        {articles.map((article, index) => (
          <div key={article.id} className="artigo-card">
            <h2>{article.title}</h2>
            <p><strong>Autor:</strong> {article.author_name}</p>
            {article.image && <img src={article.image} alt={article.title} />}
            <p>{article.text.substring(0, 100)}...</p>
            <p><strong>Likes:</strong> {article.likes}</p>
            {user && <button onClick={() => handleLike(article.id, index)}>Curtir</button>}
            <Link to={`/artigo/${article.id}`}>Ler mais</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
