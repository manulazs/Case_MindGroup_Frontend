import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Artigo() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then(res => res.json())
      .then(data => setArticle(data));
  }, [id]);

  if (!article) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      {article.image && <img src={article.image} alt={article.title} />}
      <p>{article.text}</p>
      <p>Likes: {article.likes}</p>
    </div>
  );
}
