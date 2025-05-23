import { useState, useEffect } from 'react';
import articleImage from './assets/programacao-scaled.jpg';
import './App.css';

type Article = {
  id: number;
  title: string;
  author_name: string;
  image?: string;
  text: string;
  likes: number;
  created_at: string;
};

export function Home() {
  const [topArticles, setTopArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => {
        const top4 = data
          .filter((a: any) => a.likes > 0)
          .sort((a: any, b: any) => b.likes - a.likes)
          .slice(0, 4);
        setTopArticles(top4);
      });
  }, []);

  return (
    <main className="container">
      <section className="main-article">
        <img src={articleImage} alt="JavaScript destaque" />
        <h1>Desvendando o JavaScript: Dicas e Técnicas Essenciais para Desenvolvedores</h1>
        <p className="author">Por John Doe – Março 20, 2025</p>
        <button className="read-more">LER MAIS</button>
      </section>

      <aside className="sidebar">
        <h2>New</h2>
        <ul>
          <li><strong>IA:</strong> O Futuro da Automação e da Transformação Digital
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
          <li><strong>Computação Quântica:</strong> O Próximo Grande Salto
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
          <li><strong>IoT:</strong> Como a Internet das Coisas Está Moldando as Cidades
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
          <li><strong>RA/RV:</strong> O Impacto no Setor Educacional
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          </li>
        </ul>
      </aside>

      <div className="top-articles">
        <h2>Artigos Mais Curtidos</h2>
        <div className="articles-list">
          {topArticles.map((article, index) => (
            <div key={article.id} className="article-card">
              <h4>{article.title}</h4>
              <p>Por: {article.author_name}</p>
              <p>Criado em: {new Date(article.created_at).toLocaleDateString()}</p>
              {article.image && <img src={article.image} alt={article.title} />}
              <p>{article.text.substring(0, 100)}...</p>
              <p>Likes: {article.likes}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
