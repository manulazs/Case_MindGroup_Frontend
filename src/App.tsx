import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { Newpass } from './newPass';
import { Publicar } from './publicar';
import { Artigos } from './Artigos';
import { Perfil } from './Perfil';
import { Artigo } from './Artigo';
import './App.css';

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
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/artigo/:id" element={<Artigo />} />
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
