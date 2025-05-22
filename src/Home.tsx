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
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, assumenda?</p>
          </li>
          <li><strong>Computação Quântica:</strong> O Próximo Grande Salto
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, assumenda?</p>
          </li>
          <li><strong>IoT:</strong> Como a Internet das Coisas Está Moldando as Cidades
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, assumenda?</p>
          </li>
          <li><strong>RA/RV:</strong> O Impacto no Setor Educacional
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, assumenda?</p>
          </li>
        </ul>
      </aside>

      <section className="top-articles">
        <h2>Artigos Mais Curtidos</h2>
        <div className="articles-list">
          {topArticles.map((article: any) => (
            <div key={article.id} className="article-card">
              <h3>{article.title}</h3>
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
// // o codigo acima é um componente React que exibe uma lista de artigos. Ele utiliza o hook useState para armazenar os artigos e o hook useEffect para buscar os dados da API assim que o componente é montado. Cada artigo possui um título, imagem, texto e número de curtidas. Se o usuário estiver autenticado (token presente), ele pode curtir os artigos, o que atualiza o número de curtidas na interface. O código também lida com a atualização do estado dos artigos após uma curtida, garantindo que a interface reflita as mudanças em tempo real.
// // O componente utiliza a função fetch para fazer requisições à API, e o método PATCH para atualizar o número de curtidas de um artigo específico. A lista de artigos é renderizada em um loop, exibindo as informações de cada artigo e um botão de curtir, se o usuário estiver autenticado. O botão de curtir chama a função handleLike, que faz a requisição para atualizar o número de curtidas e atualiza o estado local dos artigos.
