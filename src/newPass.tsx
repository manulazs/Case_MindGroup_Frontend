import './newPass.css';
import { useState } from 'react';

export function Newpass() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisa estar logado para alterar a senha!');
      return;
    }

    fetch('http://localhost:3000/auth/newpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        newPassword: form.password,
        email: form.email
      })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        if (data.message.includes('sucesso')) {
          setForm({
            email: '',
            password: '',
            confirmPassword: ''
          });
        }
      })
      .catch(err => {
        console.error('Erro:', err);
        setMessage('Erro ao atualizar a senha.');
      });
  };

  return (
    <div className="newPass-container">
      <div className="newPass-left">
        <h1 className="logo">M.</h1>
        <p>Inovação ao Seu Alcance.</p>
      </div>

      <div className="newPass-right">
        <h2 className='newPass-text'>Nova Senha</h2>
        <form className="newPass-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="email@email.com"
            onChange={handleChange}
            value={form.email}
          />

          <label htmlFor="password">Nova Senha</label>
          <input
            type="password"
            id="password"
            placeholder="****"
            onChange={handleChange}
            value={form.password}
          />

          <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="****"
            onChange={handleChange}
            value={form.confirmPassword}
          />

          <button type="submit" className="newPass-button">Salvar</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
