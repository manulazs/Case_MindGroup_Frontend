import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function EditarArtigo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', text: '', image: '' });

  useEffect(() => {
    fetch(`http://localhost:3000/articles/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(form)
    }).then(res => res.json())
      .then(data => {
        alert(data.message);
        navigate(`/artigo/${id}`);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} />
      <input name="image" value={form.image} onChange={handleChange} />
      <textarea name="text" value={form.text} onChange={handleChange}></textarea>
      <button type="submit">Salvar</button>
    </form>
  );
}
