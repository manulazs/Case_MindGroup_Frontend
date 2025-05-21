import './Header.css';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="logo">M.</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/artigos">Artigos</Link>
        <span>|</span>
        <Link to="/login">Entrar</Link>
        <Link to="/Register">
          <button className="register-btn">Registrar</button>
        </Link>
      </nav>
    </header>
  );
}
