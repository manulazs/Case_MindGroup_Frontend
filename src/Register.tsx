import './Register.css';
import { Link } from 'react-router-dom';

export function Register() {
  return (
    <div className="register-container">
      <div className="register-left">
        <h1 className="logo">M.</h1>
        <p>Inovação ao Seu Alcance.</p>
      </div>

      <div className="register-right">
        <h2 className='register-text'>Registrar</h2>
        <form className="register-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@email.com" />

          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="****" />

          <label htmlFor="confirm-password">Confirmar Senha</label>
          <input type="password" id="confirm-password" placeholder="****" />

          <button type="submit" className="register-button">Registrar</button>
          
          <Link to="/login" className="login-link">Já possui uma conta? Clique aqui</Link>
        </form>
      </div>
    </div>
  );
}
