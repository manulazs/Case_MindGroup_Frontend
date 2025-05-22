import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    // Montar o objeto que será enviado
    const data = {
      name: "Nome",   
      surname: "Sobrenome",
      email: form.email,
      password: form.password
    };

    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
      })
      .catch(err => {
        console.error('Erro:', err);
      });
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <h1 className="logo">M.</h1>
        <p>Inovação ao Seu Alcance.</p>
      </div>

      <div className="register-right">
        <h2 className='register-text'>Registrar</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@email.com" onChange={handleChange} />

          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="****" onChange={handleChange} />

          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input type="password" id="confirmPassword" placeholder="****" onChange={handleChange} />

          <button type="submit" className="register-button">Registrar</button>
          
          <Link to="/login" className="login-link">Já possui uma conta? Clique aqui</Link>
        </form>
      </div>
    </div>
  );
}
