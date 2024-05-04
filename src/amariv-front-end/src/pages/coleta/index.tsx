import React, { useState } from "react";
import { Input } from "../../components/Input";
import { Button2 } from "../../components/Button2";
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
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem]">
            Novo agendamento de coleta
          </h2>
          <div className="title">
            <p className="text-[#666666] text-m my-1">Dados do cliente</p>
          </div>

          <Form>
            <div className="dados-cliente">
              <div>
                <Input type="text" label="Nome" required />
              </div>
              <div>
                <Input type="tel" label="Celular" required />
              </div>
              <div>
                <Input type="tel" label="Telefone Fixo" required />
              </div>
            </div>

            <div className="title">
              <p className="text-[#666666] text-m my-1">Endereço do cliente</p>
            </div>
            <div className="endereco-cliente">
              <div>
                <Input type="text" label="CEP" required />
              </div>
              <div>
                <Input type="text" label="Logradouro" required />
              </div>
              <div>
                <Input type="text" label="Número" required />
              </div>
            </div>
            <div className="endereco-cliente">
              <div>
                <Input type="text" label="Bairro" required />
              </div>
              <div>
                <Input type="text" label="Cidade" required />
              </div>
              <div>
                <Input type="text" label="Complemento" required />
              </div>
            </div>
            <div className="title">
              <p className="text-[#666666] text-m my-1">Materiais da coleta</p>
            </div>
            <div className="dados-cliente">
              <div>
                <Input
                  type="text"
                  label="Descrição do material"
                  placeholder="latas, garrafas, etc."
                  required
                />
              </div>
              <div>
                <Button2
                  type="submit"
                  label="Adicionar material"
                  className="w-[80%] mt-[15px]"
                />
              </div>
            </div>
            <Button2
              type="submit"
              label="Criar agendamento"
              className="w-[40%] "
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default ColetaPage;
