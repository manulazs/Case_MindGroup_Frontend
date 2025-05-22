import './Login.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Login realizado com sucesso!');
          window.location.href = '/';
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Erro:', err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1 className="logo">M.</h1>
        <p>Inovação ao Seu Alcance.</p>
      </div>

      <div className="login-right">
        <h2>Conectar</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@email.com" onChange={handleChange} />

          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="****" onChange={handleChange} />

          <Link to="/newPass" className="forgot-password">Esqueci minha senha</Link>

          <button type="submit" className="login-button">Entrar</button>

          <Link to="/register" className="register-link">Não possui uma conta? Clique aqui</Link>
        </form>
      </div>
    </div>
  );
}
