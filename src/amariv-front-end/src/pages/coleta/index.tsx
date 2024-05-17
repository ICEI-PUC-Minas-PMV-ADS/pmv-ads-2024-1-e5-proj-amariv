import React, { useState, useRef } from "react";
import { Input } from "../../components/Input";
import { InputDate } from "../../components/InputDate";
import { InputTime } from "../../components/InputTime";
import { Button2 } from "../../components/Button2";
import { Form } from "../../components/Form";
import "./index.css";
import { Link } from "react-router-dom";
import { FormAddMateriais } from "./components/FormAddMateriais";
import { CreateColetaDto } from "../../models/ColetaDtos/CreateColetaDto";



export function ColetaPage() {
  const [active, setMode] = useState(false);
  const [endereco, setEndereco] = useState(CreateColetaDto);
  const [nome, setNome ] = useState()
  const [cel, setCel ] = useState()
  const [tel, setTel] = useState()
  const [cep, setCep ] = useState()
  const [logradouro, setLogradouro ] = useState()
  const [numero, setNumero ] = useState()
  const [bairro, setBairro ] = useState()
  const [cidade, setCidade ] = useState()
  const [complemento, setComplemento] = useState()

  const [dataColeta, setDataColeta ] = useState()
  const [horarioColeta, setHorarioColeta ] = useState()
 
  const toggleMode = () => {
    setMode(!active);
  };



  function HanleNomeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNome(event.target.value)
  }

  function HandleCelChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleTelChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleCepChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleLogradouroChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleNumeroChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleBairroChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleCidadeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function HandleComplementoChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleDataColetaChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleHorarioColetaChange(event: React.ChangeEvent<HTMLInputElement>): void {
    throw new Error("Function not implemented.");
  }

  // const dateInputRef = useRef<HTMLInputElement>(null);
  // const handleDateChange = () => {
  //   if (dateInputRef.current) {
  //     const selectedDate = dateInputRef.current.value;
  //     console.log("Data selecionada:", selectedDate);
  //   }
  // };


  // const timeInputRef = useRef<HTMLInputElement>(null);
  // const handleTimeChange = () => {
  //   if (timeInputRef.current) {
  //     const selectedTime = timeInputRef.current.value;
  //     console.log("Hora selecionada:", selectedTime);
  //   }
  // };

 


  return (
    <>
      <div className="App">
        <div
          className={active ? "icon iconActive" : "icon"}
          onClick={toggleMode}
        >
          <div className="hamburger hamburgerIcon"></div>
        </div>
        {/* <div className={active ? "menu menuOpen" : "menu menuClose"}>
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
        </div> */}

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
                <Input type="text" label="Nome" id="txtNome" onChange={HanleNomeChange} required />
              </div>
              <div>
                <Input type="tel" label="Celular" id="txtCel" onChange={HandleCelChange} required />
              </div>
              <div>
                <Input type="tel" label="Telefone Fixo"  id="txtTel" onChange={HandleTelChange} required />
              </div>
            </div>

            <div className="title">
              <p className="text-[#666666] text-m my-1">Endereço do cliente</p>
            </div>
            <div className="endereco-cliente">
              <div>
                <Input type="text" label="CEP" onChange={HandleCepChange} required />
              </div>
              <div>
                <Input type="text" label="Logradouro" onChange={HandleLogradouroChange} required />
              </div>
              <div>
                <Input type="text" label="Número" onChange={HandleNumeroChange} required />
              </div>
            </div>
            <div className="endereco-cliente">
              <div>
                <Input type="text" label="Bairro" onChange={HandleBairroChange} required />
              </div>
              <div>
                <Input type="text" label="Cidade" onChange={HandleCidadeChange} required />
              </div>
              <div>
                <Input type="text" label="Complemento" onChange={HandleComplementoChange} required />
              </div>
            </div>
            <div className="endereco-cliente">
              <div>
                <InputDate
                  label="Data da coleta"
                  type="date"               
                  onChange={handleDataColetaChange}
                />
              </div>
              <div>
                <InputTime
                  label="Horário de Coleta"
                  type="time"            
                  onChange={handleHorarioColetaChange}
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
