import './App.css';
import { Header } from './Header';
import articleImage from './assets/programacao-scaled.jpg';

function App() {
  return (
    <>
      <Header />
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
            <li><strong>IA:</strong> O Futuro da Automação e da Transformação Digital</li>
            <li><strong>Computação Quântica:</strong> O Próximo Grande Salto</li>
            <li><strong>IoT:</strong> Como a Internet das Coisas Está Moldando as Cidades</li>
            <li><strong>RA/RV:</strong> O Impacto no Setor Educacional</li>
          </ul>
        </aside>
      </main>
    </>
  );
}

export default App;
