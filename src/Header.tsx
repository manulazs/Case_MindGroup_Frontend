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
// o codigo acima é um componente de cabeçalho (Header) para um aplicativo React. Ele exibe o logotipo do aplicativo e um menu de navegação com links para diferentes páginas, como "Home", "Artigos", "Registrar" e "Publicar". O cabeçalho também lida com a autenticação do usuário, exibindo opções diferentes dependendo se o usuário está logado ou não. Se o usuário estiver logado, ele verá um menu suspenso com opções para acessar o perfil e desconectar-se. Caso contrário, verá um link para entrar no aplicativo. O componente utiliza o hook useAuth para verificar o estado de autenticação do usuário e renderiza o menu apropriado com base nessa informação.
//