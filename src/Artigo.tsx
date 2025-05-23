import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Artigo.css';

export function Artigo() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    }

    fetch(`http://localhost:3000/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao carregar artigo:', err);
        setLoading(false);
      });
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
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setArticle({ ...article, likes: article.likes + 1 });
      });
  };

  if (loading) return <p>Carregando...</p>;
  if (!article) return <p>Artigo não encontrado.</p>;

  return (
    <div className="artigo-container">
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} />}
      <p>{article.text}</p>

      <p><strong>Autor:</strong> {article.author_name}</p>
      <p><strong>Publicado em:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
      <p><strong>Likes:</strong> {article.likes}</p>

      {user && <button onClick={handleLike}>Curtir</button>}
    </div>
  );
}
