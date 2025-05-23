import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Artigo.css';

export function Artigo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setUser(JSON.parse(atob(token.split('.')[1])));
    fetch(`http://localhost:3000/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);

  const handleLikeToggle = () => {
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
        setArticle({ ...article, likes: data.liked ? article.likes + 1 : article.likes - 1 });
      });
  };

  const handleEdit = () => {
    navigate(`/editar/${article.id}`);
  };

  if (!article) return <p>Carregando...</p>;

  return (
    <div className="artigo-container">
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} />}
      <p>{article.text}</p>
      <p>Autor: {article.author_name}</p>
      <p>Likes: {article.likes}</p>
      {user && (
        <button onClick={handleLikeToggle}>Curtir/Descurtir</button>
      )}
      {user?.id === article.user_id && (
        <button onClick={handleEdit}>Editar</button>
      )}
    </div>
  );
}
