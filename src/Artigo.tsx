import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Artigos.css';

export function Artigo() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }

    fetch(`http://localhost:3000/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);

  const handleLike = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para curtir!');
      return;
    }

    fetch(`http://localhost:3000/articles/${article.id}/like`, {
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
        setArticle({ ...article, likes: article.likes + 1 });
      })
      .catch(err => alert(err.message));
  };

  if (!article) return <p>Carregando...</p>;

  return (
    <div className="artigos-container">
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} />}
      <p>{article.text}</p>
      <p><strong>Autor:</strong> {article.author_name}</p>
      <p><strong>Criado em:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
      <p><strong>Likes:</strong> {article.likes}</p>
      {user && <button onClick={handleLike}>Curtir</button>}
    </div>
  );
}
