import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import './Header.css';
import { useState, useRef, useEffect } from 'react';

export function Header() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo">M.</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/artigos">Artigos</Link>
        {!user && <Link to="/register">Registrar</Link>}
        {user && <Link to="/publicar">Publicar</Link>}
        {user ? (
          <div className="user-menu" ref={menuRef}>
            <img 
              src={(user.avatar) ? user.avatar : '/default-avatar.png'} 
              alt="avatar" 
              className="avatar"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="dropdown">
                <Link to="/perfil">Perfil</Link>
                <button onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}>Desconectar</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </nav>
    </header>
  );
}
