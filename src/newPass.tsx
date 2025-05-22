import './newPass.css';
import { useState } from 'react';

export function Newpass() {
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

    const token = localStorage.getItem('token');

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
        alert(data.message);
      })
      .catch(err => {
        console.error('Erro:', err);
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
          <input type="email" id="email" placeholder="email@email.com" onChange={handleChange} />

          <label htmlFor="password">Nova Senha</label>
          <input type="password" id="password" placeholder="****" onChange={handleChange} />

          <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
          <input type="password" id="confirmPassword" placeholder="****" onChange={handleChange} />

          <button type="submit" className="newPass-button">Salvar</button>
        </form>
      </div>
    </div>
  );
}

// o codigo acima é um componente React que renderiza um formulário para redefinir a senha do usuário. O formulário coleta o email, a nova senha e a confirmação da nova senha. Quando o formulário é enviado, ele verifica se as senhas coincidem e, em seguida, faz uma solicitação POST para o servidor com os dados do formulário. Se a solicitação for bem-sucedida, exibe uma mensagem de sucesso; caso contrário, exibe um erro no console.
// O componente utiliza o hook useState do React para gerenciar o estado do formulário e o hook useEffect para lidar com efeitos colaterais, como a verificação de autenticação do usuário. Além disso, o componente faz uso de classes CSS para estilizar os elementos e garantir uma boa experiência do usuário.
