import './Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="logo">M.</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Artigos</a>
        <span>|</span>
        <a href="#">Entrar</a>
        <button className="register-btn">Registrar</button>
      </nav>
    </header>
  );
}
