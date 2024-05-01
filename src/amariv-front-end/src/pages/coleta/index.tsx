import React, { useState } from "react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import "./index.css";
import { Link } from "react-router-dom";

export function ColetaPage() {
  const [active, setMode] = useState(false);
  const ToggleMode = () => {
    setMode(!active);
  };
  return (
    <>
      <div className="App">
        <div
          className={active ? "icon iconActive" : "icon"}
          onClick={ToggleMode}
        >
          <div className="hamburger hamburgerIcon"></div>
        </div>
        <div className={active ? "menu menuOpen" : "menu menuClose"}>
          <div className="list">
            <Link className="listItems" to={""}>
              Coletas pendentes
            </Link>
            <Link className="listItems" to={""}>
              Roteiro de coletas
            </Link>
            <Link className="listItems" to={""}>
              Roteiro de coletas
            </Link>
            <Link className="listItems" to={""}>
              Agendamento
            </Link>
            <Link className="listItems" to={""}>
              Histórico de Coletas
            </Link>
            <Link className="listItems" to={""}>
              Materiais
            </Link>
            <Link className="listItems" to={""}>
              Funcionários
            </Link>
          </div>
        </div>
        <div className="content">
          <h2 className="text-[#53735B] text-[1.75rem]">
            Novo agendamento de coleta
          </h2>
          <p className="text-[#666666] text-s my-4">Dados do cliente</p>
          <div className="dados-cliente">
            <form></form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ColetaPage;
