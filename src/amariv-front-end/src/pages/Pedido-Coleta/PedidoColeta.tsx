import React from "react";
import logo from "./logo.png";


const PedidoColeta = () => {
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
        <h2 className="title">Cadastro de pedido de coleta</h2>
        <div className="content">
          <div className="container">
            <div className="profile-container">
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
                <label htmlFor="materiais">Material:</label>
                <br />
                <input
                  type="materiais"
                  id="materiais"
                  name="materiais"
                  className="full-width"
                />
              </div>
              <div className="row-phone">
                <div className="form-input">
                  <label htmlFor="peso">Peso do material (kg)</label>
                  <br />
                  <input type="text" id="peso" name="peso" />
                </div>
                <div className="form-input">
                  <label htmlFor="data">Data</label>
                  <br />
                  <input type="date" id="data" name="data" />
                </div>
                <div className="form-input">
                  <label htmlFor="horario">Data</label>
                  <br />
                  <input type="time" id="horario" name="horario" />
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="observacao">Observações:</label>
                <br />
                <input
                  type="text"
                  id="observacao"
                  name="observacao"
                  className="full-width"
                />
              </div>
            </div>

            <div className="profile-container">
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
            Enviar pedido
          </button>
        </div>
      </body>
    </>
  );
};

export default PedidoColeta;
