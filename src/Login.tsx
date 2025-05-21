import './Login.css';
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="logo">M.</h1>
        <p>Inovação ao Seu Alcance.</p>
      </div>

      <div className="login-right">
        <h2>Conectar</h2>
        <form className="login-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@email.com" />

          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="****" />

          <a href="#" className="forgot-password">Esqueceu a senha?</a>

          <button type="submit" className="login-button">Entrar</button>

          <Link to="/Register" className="register-link">Não possui uma conta? Clique aqui</Link>
        </form>
      </div>
    </div>
  );
}
