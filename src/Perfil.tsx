import { useState, useEffect } from 'react';

export function Perfil() {
  const [form, setForm] = useState({ name: '', surname: '', email: '' });

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

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome</label>
      <input name="name" value={form.name} onChange={handleChange} />
      <label>Sobrenome</label>
      <input name="surname" value={form.surname} onChange={handleChange} />
      <label>Email</label>
      <input name="email" value={form.email} onChange={handleChange} />
      <button type="submit">Atualizar</button>
    </form>
  );
}
// o código acima é um componente React que exibe e permite a edição do perfil do usuário. Ele utiliza o hook useState para armazenar os dados do formulário e o useEffect para buscar os dados do perfil assim que o componente é montado. O token de autenticação é enviado no cabeçalho da requisição. O componente renderiza um formulário com campos para nome, sobrenome e email, e ao enviar o formulário, ele faz uma requisição PUT para atualizar os dados do perfil no servidor.
// O componente também exibe mensagens de sucesso ou erro com base na resposta do servidor. O código é um exemplo básico de como gerenciar o estado e as requisições em um aplicativo React, utilizando hooks para lidar com o ciclo de vida do componente e a manipulação de eventos.