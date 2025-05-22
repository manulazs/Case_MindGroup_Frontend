import { useState } from 'react';

export function Publicar() {
  const [form, setForm] = useState({ title: '', image: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(data => alert(data.message))
    .catch(err => console.error('Erro:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Adicione um título" onChange={handleChange} />
      <input name="image" placeholder="Adicione uma imagem" onChange={handleChange} />
      <textarea name="text" placeholder="Escreva seu artigo" onChange={handleChange}></textarea>
      <button type="submit">Salvar</button>
    </form>
  );
}
