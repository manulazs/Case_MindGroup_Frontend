import './newPass.css';

export function Newpass() {
  return (
    <div className="newPass-container">
      <div className="newPass-left">
        <h1 className="logo">M.</h1>
        <p>Inovação ao Seu Alcance.</p>
      </div>

      <div className="newPass-right">
        <h2 className='newPass-text'>Nova Senha</h2>
        <form className="newPass-form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email@email.com" />

          <label htmlFor="password">Nova Senha</label>
          <input type="password" id="password" placeholder="****" />

          <label htmlFor="confirm-password">Confirmar Nova Senha</label>
          <input type="password" id="confirm-password" placeholder="****" />

          <button type="submit" className="newPass-button">Salvar</button>

         
        </form>
      </div>
    </div>
  );
}
