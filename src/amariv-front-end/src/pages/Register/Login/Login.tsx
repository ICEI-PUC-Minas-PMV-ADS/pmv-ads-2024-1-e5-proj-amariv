import React from 'react';
import logo from './logo.png';

const Login = () => {
  return (<>

    <body className='body'>
      <header className="header">
        <div>
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <nav>
          <ul className="nav">
            <li className="nav-item"><a href="#">Funcionários</a></li>
            <li className="nav-item"><a href="#">Coletas</a></li>
            <li className="nav-item"><a href="#">Rotas</a></li>
            <li className="nav-item"><a href="#">Materiais</a></li>
          </ul>
        </nav>
      </header>
      <div className="barra" ></div>
      <div className="login-container">
        <h2>Login para prosseguir</h2>
        <div className="login-form">
          <form>
            <div className="form-input">
              <label htmlFor="email">E-mail:</label><br />
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-input">
              <label htmlFor="password">Senha:</label><br />
              <input type="password" id="password" name="password" />
            </div>
            <div>
              <button type="submit" className="login-button">Entrar</button>
              <div className="forgot-password">
                <a href="#">Esqueci minha senha</a>
              </div>
            </div>
            <div className='signup'>
              <p>Ainda não tem conta? <a href="#">Cadastre-se</a></p>
            </div>
          </form>
        </div>
      </div>
    </body>



  </>
  );
};

export default Login;
