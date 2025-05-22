import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3000/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
      })
      .catch(err => console.error('Erro ao buscar perfil:', err));
  }, []);

  return { user };
}

// o codigo acima é um hook personalizado que busca o perfil do usuário autenticado
// ele utiliza o useState para armazenar o usuário e o useEffect para buscar os dados do perfil assim que o componente é montado. O token de autenticação é enviado no cabeçalho da requisição. Se o token não estiver presente, a função retorna null.
// O hook retorna o usuário, que pode ser utilizado em outros componentes para exibir informações do perfil ou controlar o acesso a determinadas rotas. Além disso, o hook lida com erros de forma simples, exibindo uma mensagem no console caso ocorra algum problema na requisição.
