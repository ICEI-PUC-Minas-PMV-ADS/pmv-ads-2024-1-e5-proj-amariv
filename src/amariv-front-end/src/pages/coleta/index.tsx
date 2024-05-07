import React, { useState, useRef } from "react";
import { Input } from "../../components/Input";
import { InputDate } from "../../components/InputDate";
import { InputTime } from "../../components/InputTime";
import { Button2 } from "../../components/Button2";
import { Button3 } from "../../components/Button3";
import { DropdownInput } from "../../components/DropdownInput";
import { Form } from "../../components/Form";
import "./index.css";
import { Link } from "react-router-dom";
import { FormAddMateriais } from "./components/FormAddMateriais";



export function ColetaPage() {
  const [active, setMode] = useState(false);
  
 

  const toggleMode = () => {
    setMode(!active);
  };

  const dateInputRef = useRef<HTMLInputElement>(null);
  const handleDateChange = () => {
    if (dateInputRef.current) {
      const selectedDate = dateInputRef.current.value;
      console.log("Data selecionada:", selectedDate);
    }
  };


  const timeInputRef = useRef<HTMLInputElement>(null);
  const handleTimeChange = () => {
    if (timeInputRef.current) {
      const selectedTime = timeInputRef.current.value;
      console.log("Hora selecionada:", selectedTime);
    }
  };

 



  return (
    <>
      <div className="App">
        <div
          className={active ? "icon iconActive" : "icon"}
          onClick={toggleMode}
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
            <Link className="listItems" to={"/coleta"}>
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
                <Input type="text" label="Nome" id="txtNome" required />
              </div>
              <div>
                <Input type="tel" label="Celular" id="txtCel" required />
              </div>
              <div>
                <Input type="tel" label="Telefone Fixo"  id="txtTel" required />
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
            <div className="endereco-cliente">
              <div>
                <InputDate
                  label="Data da coleta"
                  type="date"
                  ref={dateInputRef}
                  onChange={handleDateChange}
                />
              </div>
              <div>
                <InputTime
                  label="Horário de Coleta"
                  type="time"
                  ref={timeInputRef}
                  onChange={handleTimeChange}
                />
              </div>
              <div>
                <Button2
                  type="button"
                  label="Verificar disponibilidade"
                  className="w-[90%] mt-[15px]"
                />
              </div>
            </div>
            
            <FormAddMateriais 
            />

            <Button2
              type="submit"
              label="Criar agendamento"
              className="w-[40%] mt-[15px]"
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default ColetaPage;
