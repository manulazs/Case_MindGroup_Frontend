import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './Header.css';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="logo">M.</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/artigos">Artigos</Link>
        {!user && <Link to="/register">Registrar</Link>}
        {user && <Link to="/publicar">Publicar</Link>}
        {user ? (
          <div className="user-menu">
            <img src="/default-avatar.png" alt="avatar" className="avatar" />
            <div className="dropdown">
              <Link to="/perfil">Perfil</Link>
              <button onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}>Desconectar</button>
            </div>
          </div>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </nav>
    </header>
  );
}
