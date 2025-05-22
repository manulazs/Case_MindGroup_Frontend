import { useState, useEffect } from 'react';

type Article = {
  id: number;
  title: string;
  image: string;
  text: string;
  likes: number;
};

export function Artigos() {
  const [articles, setArticles] = useState<Article[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  const handleLike = (id: number) => {
    fetch(`http://localhost:3000/articles/${id}/like`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
    });
  };

  return (
    <div>
      {articles.map((a: any) => (
        <div key={a.id}>
          <h2>{a.title}</h2>
          <img src={a.image} alt="" />
          <p>{a.text}</p>
          <p>Likes: {a.likes}</p>
          {token && <button onClick={() => handleLike(a.id)}>Curtir ❤️</button>}
        </div>
      ))}
    </div>
  );
}
