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
      name: "NomeFicticio",   // Pode criar campos no formulário se quiser coletar.
      surname: "SobrenomeFicticio",
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
}
