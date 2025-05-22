import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { Newpass } from './newPass';
import { Publicar } from './publicar';
import { Artigos } from './Artigos';

function AppContent() {
  const location = useLocation();

  const hideHeaderRoutes = ['/login', '/register', '/newPass'];
  const hideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newPass" element={<Newpass />} />
        <Route path="/publicar" element={<Publicar />} />
        <Route path="/artigos" element={<Artigos />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

// o codigo acima é um componente principal de aplicativo que utiliza o React Router para gerenciar a navegação entre diferentes páginas do aplicativo. O componente AppContent renderiza o cabeçalho e as rotas com base na localização atual. O cabeçalho é ocultado em algumas rotas específicas, como "/login", "/register" e "/newPass". As rotas disponíveis incluem a página inicial, login, registro, redefinição de senha, publicação e artigos. O componente App é o ponto de entrada do aplicativo e envolve o AppContent dentro do Router para habilitar a navegação.
// O componente utiliza o hook useLocation do React Router para obter a localização atual e determinar se o cabeçalho deve ser exibido ou não. As rotas são definidas usando o componente Routes, que contém várias Route, cada uma mapeando um caminho específico para um componente correspondente. Isso permite que o aplicativo tenha uma navegação fluida entre diferentes páginas sem recarregar a página inteira.
// O componente Header é responsável por exibir o logotipo e o menu de navegação, que inclui links para as diferentes páginas do aplicativo. O cabeçalho também lida com a autenticação do usuário, exibindo opções diferentes dependendo se o usuário está logado ou não. O componente utiliza o hook useAuth para verificar o estado de autenticação do usuário e renderiza o menu apropriado com base nessa informação.