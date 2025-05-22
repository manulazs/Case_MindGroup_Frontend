import { useState, useEffect } from 'react';

type Article = {
  id: number;
  title: string;
  image: string;
  text: string;
  likes: number;
};

export function Artigos() {
  const [articles, setArticles] = useState<Article[]>([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  const handleLike = (id: number) => {
    fetch(`http://localhost:3000/articles/${id}/like`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
    });
  };

  return (
    <div>
      {articles.map((a: any) => (
        <div key={a.id}>
          <h2>{a.title}</h2>
          <img src={a.image} alt="" />
          <p>{a.text}</p>
          <p>Likes: {a.likes}</p>
          {token && <button onClick={() => handleLike(a.id)}>Curtir ❤️</button>}
        </div>
      ))}
    </div>
  );
}

// o codigo acima é um componente React que exibe uma lista de artigos. Ele utiliza o hook useState para armazenar os artigos e o hook useEffect para buscar os dados da API assim que o componente é montado. Cada artigo possui um título, imagem, texto e número de curtidas. Se o usuário estiver autenticado (token presente), ele pode curtir os artigos, o que atualiza o número de curtidas na interface. O código também lida com a atualização do estado dos artigos após uma curtida, garantindo que a interface reflita as mudanças em tempo real.
// O componente utiliza a função fetch para fazer requisições à API, e o método PATCH para atualizar o número de curtidas de um artigo específico. A lista de artigos é renderizada em um loop, exibindo as informações de cada artigo e um botão de curtir, se o usuário estiver autenticado. O botão de curtir chama a função handleLike, que faz a requisição para atualizar o número de curtidas e atualiza o estado local dos artigos.
