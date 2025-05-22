import { useState, useEffect } from 'react';
import articleImage from './assets/programacao-scaled.jpg';
import './App.css';

export function Home() {
  const [topArticles, setTopArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => {
        const top4 = data
          .filter((a: any) => a.likes >= 1)
          .sort((a: any, b: any) => 
            b.likes - a.likes || new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
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

      <section className="top-articles">
        <h2>Artigos Mais Curtidos</h2>
        <div className="articles-list">
          {topArticles.map((article: any, index: number) => (
            <div key={article.id} className="article-card">
              <h3>{String(index + 1).padStart(2, '0')}</h3>
              <h4>{article.title}</h4>
              {article.image && <img src={article.image} alt={article.title} />}
              <p>{article.text.substring(0, 100)}...</p>
              <p>Likes: {article.likes}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
// O código acima é um componente React que representa a página inicial de um site. Ele exibe um artigo em destaque, uma lista de artigos mais curtidos e uma barra lateral com notícias recentes. O componente utiliza o hook useState para armazenar os artigos mais curtidos e o hook useEffect para buscar os dados da API assim que o componente é montado. A lista de artigos é filtrada, ordenada e limitada a quatro itens antes de ser exibida. O layout é estilizado com classes CSS, e as imagens são carregadas a partir de um arquivo local.
// O componente também inclui um botão "LER MAIS" que pode ser usado para redirecionar o usuário para a página do artigo em destaque. A barra lateral contém uma lista de notícias recentes, cada uma com um título e uma breve descrição. O código é um exemplo de como estruturar uma página inicial com artigos e notícias, utilizando React para gerenciar o estado e renderizar os dados dinamicamente.