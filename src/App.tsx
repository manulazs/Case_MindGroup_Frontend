import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Home } from './Home';
import { Login } from './Login';
import { Register } from './Register';
import { newPass } from './newPass';

function AppRoutes() {
  const location = useLocation();
  const hideHeaderOn = ['/login', '/Register', './newPass']; // Oculta o header nessas páginas

  return (
    <>
      {!hideHeaderOn.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/newPass" element={<newPass />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
