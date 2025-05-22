import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Artigo.css';

export function Artigo() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Artigo não encontrado');
        }
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="artigo-container">
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} />}
      <p>{article.text}</p>
      <p>Likes: {article.likes}</p>
    </div>
  );
}
