import { Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="logo">M.</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/artigos">Artigos</Link>
        <Link to="/register">Registrar</Link>
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

//o codigo acima é um componente de cabeçalho que exibe o logotipo e um menu de navegação. O menu de navegação inclui links para as páginas "Home", "Artigos", "Registrar" e "Publicar" (se o usuário estiver autenticado). Se o usuário estiver autenticado, um menu suspenso com opções de perfil e desconexão é exibido. O componente utiliza o hook useAuth para verificar se o usuário está autenticado e exibe o avatar padrão se o usuário estiver logado. O botão de desconexão remove o token do armazenamento local e redireciona para a página inicial.

