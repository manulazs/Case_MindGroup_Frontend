import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Artigo.css';

export function Artigo() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <p>Carregando artigo...</p>;
  if (!article) return <p>Artigo não encontrado.</p>;

  return (
    <div className="artigo-container">
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} />}
      <p>{article.text}</p>
    </div>
  );
}
