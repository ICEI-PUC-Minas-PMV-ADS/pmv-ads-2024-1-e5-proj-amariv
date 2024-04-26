import React from "react";
import logo from "./logo.png";
import "./registro-cliente.css";

const ClientRegister = () => {
  return (
    <>
      <body className="body">
        <header className="header">
          <div>
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <a href="#">Funcionários</a>
              </li>
              <li className="nav-item">
                <a href="#">Coletas</a>
              </li>
              <li className="nav-item">
                <a href="#">Rotas</a>
              </li>
              <li className="nav-item">
                <a href="#">Materiais</a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="barra"></div>

        <div className="content">
          <div className="container">
            <div className="profile-container">
              <div className="title">
                <h2>Dados do Perfil</h2>
              </div>
              <div className="form-input">
                <label htmlFor="nome">Nome:</label>
                <br />
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="full-width"
                />
              </div>
              <div className="form-input">
                <label htmlFor="email">E-mail:</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="full-width"
                />
              </div>
              <div className="row-phone">
                <div className="form-input">
                  <label htmlFor="complemento">Telefone 1:</label>
                  <br />
                  <input type="tel" id="complemento" name="complemento" />
                </div>
                <div className="form-input">
                  <label htmlFor="bairro">Telefone 2:</label>
                  <br />
                  <input type="tel" id="bairro" name="bairro" />
                </div>
              </div>
            </div>

            <div className="profile-container">
              <div className="title">
                <h2>Dados do Perfil</h2>
              </div>
              <div className="form-input">
                <label htmlFor="cep">CEP:</label>
                <br />
                <input type="text" id="cep" name="cep" />
              </div>
              <div className="row">
                <div className="form-input">
                  <label htmlFor="nome">Logradouro:</label>
                  <br />
                  <input
                    type="text"
                    id="logradouro"
                    name="logradouro"
                    className="large-width"
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="numero">Número</label>
                  <br />
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    className="small-width"
                  />
                </div>
              </div>
              <div className="row-phone">
                <div className="form-input">
                  <label htmlFor="complemento">Complemento:</label>
                  <br />
                  <input type="tel" id="complemento" name="complemento" />
                </div>
                <div className="form-input">
                  <label htmlFor="bairro">Bairro:</label>
                  <br />
                  <input type="tel" id="bairro" name="bairro" />
                </div>
              </div>
              <div className="row-phone">
                <div className="form-input">
                  <label htmlFor="cidade">Cidade:</label>
                  <br />
                  <input type="tel" id="cidade" name="cidade" />
                </div>
                <div className="form-input">
                  <label htmlFor="estado">Estado:</label>
                  <br />
                  <input type="tel" id="estado" name="estado" />
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="referencia">Ponto de referência:</label>
                <br />
                <input type="text" id="referencia" name="referencia" />
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="button">
            Entrar
          </button>
        </div>
      </body>
    </>
  );
};

export default ClientRegister;
