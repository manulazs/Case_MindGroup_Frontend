import { useState, useEffect, useRef } from 'react';
import './Perfil.css';

export function Perfil() {
  const [form, setForm] = useState({ name: '', surname: '', email: '', avatar: '/default-avatar.png' });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/auth/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setForm(data.user));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => alert(data.message));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="perfil-container">
      <div className="perfil-avatar" onClick={() => setMenuOpen(!menuOpen)}>
        <img src={form.avatar} alt="avatar" />
        {menuOpen && (
          <div className="perfil-menu" ref={menuRef}>
            <button onClick={() => alert('Alterar Perfil')}>Alterar Perfil</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}>Sair</button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="perfil-form">
        <label>Nome</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Sobrenome</label>
        <input name="surname" value={form.surname} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Avatar (URL)</label>
        <input name="avatar" value={form.avatar} onChange={handleChange} />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}
