import React, { useState, useRef } from "react";
import { Input } from "../../components/Input";
import { Button2 } from "../../components/Button2";
import { Button3 } from "../../components/Button3";
import { DropdownInput } from "../../components/DropdownInput";
import { Form } from "../../components/Form";
import "./index.css";
import { Link } from "react-router-dom";
import { InputDate } from "../../components/InputDate";

interface Funcionario {
  description: string;
  quantity: string;
}

export function FuncionarioPage() {
  const [active, setMode] = useState(false);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [showFuncionarioPanel, setShowFuncionarioPanel] = useState(false);
  const [funcionarioInfo, setFuncionarioInfo] = useState<Funcionario>({
    description: "",
    quantity: "",
  });

  const toggleMode = () => {
    setMode(!active);
  };

  const toggleFuncionarioPanel = () => {
    setShowFuncionarioPanel(!showFuncionarioPanel);
  };
  const handleCancelClick = () => {
    setShowFuncionarioPanel(!showFuncionarioPanel);
  };

  const handleFuncionarioInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFuncionarioInfo({
      ...funcionarioInfo,
      [name]: value,
    });
  };

  const addFuncionario = () => {
    setFuncionarios((prevFuncionarios) => [...prevFuncionarios, funcionarioInfo]);
    setFuncionarioInfo({
      description: "",
      quantity: "",
    });
    toggleFuncionarioPanel();
  };

  const funcionarioRef = useRef<HTMLSelectElement>(null);

  const handleFuncionarioChange = () => {
    if (funcionarioRef.current) {
      const selectedFuncionario = funcionarioRef.current.value;
      console.log("Material selecionado:", selectedFuncionario);
    }
  };
  const funcionarioOptions = [
    "Selecione...",
    "Masculino",
    "Feminino",
    "Outro",
  ];
  const materialOptions = [
    " ",
    "Metal",
    "Vidro",
    "Papel",
    "Plástico",
    "Papelão"
  ];
  const pesoOptions = [
    " ",
    "Leve",
    "Médio",
    "Pesado",
  ];

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
          <div className="title">
            <div>
              <h2 className="mt-[30px] text-[#53735B] text-[1.75rem]">
                Funcionários
              </h2>
            </div>
            <div>
              <div>
                <Button2
                  type="button"
                  label="Adicionar funcionário"
                  onClick={toggleFuncionarioPanel}
                  className="w-[150px] mt-[15px]"
                />
                {showFuncionarioPanel && (
                  
                  <div className="material-panel">
                    <div className="title">
                      <p className="text-[#666666] text-m my-1">
                        Adicionar funcionário
                      </p>
                    </div>
                    <div className="funcionario-list">
                    <div className="addmaterial">
                      <div>
                        <Input type="text" label="Nome" required />
                      </div>
                      <div>
                      <Input type="text" label="E-mail"  />
                      </div>
                      <div>
                        <InputDate type="date" label="Data de admissão" required />
                      </div>
                      <div>
                        <DropdownInput
                          label="Sexo"
                          options={funcionarioOptions}
                          placeholder="Selecione um material..."
                          ref={funcionarioRef}
                          onChange={handleFuncionarioChange}
                          required
                        />
                      </div>
                      <div>
                        <Input type="text" label="Telefone fixo" />
                      </div>
                      <div>
                        <Input type="password" label="Senha" required />
                      </div>
                    
                      <div>
                        <Input type="text" label="Suporta peso" required />
                      </div>
                                            
                    </div>
                    <div className="addmaterial">
                      <div>
                        <Input type="text" label="Matrícula" required />
                      </div>
                      <div>
                        <Input type="text" label="CPF" />
                      </div>
                      <div>
                        <InputDate type="date" label="Data de nascimento" required />
                      </div>
                      <div>
                        <Input type="text" label="Cargo" required />
                      </div>
                      <div>
                        <Input type="text" label="Telefone celular" required />
                      </div>
                      <div>
                        <Input type="password" label="Confirme a senha" required />
                      </div>
                                                              
                    </div>
                  </div>
                    
                    
                    <div className="material-buttons">
                      <div>
                        <Button3
                          type="button"
                          label="Cancelar"
                          onClick={handleCancelClick}
                          className="w-[140px]"
                        />
                      </div>
                      <div>
                        <Button2
                          type="button"
                          label="Adicionar"
                          onClick={addFuncionario}
                          className="w-[140px]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Form>
            <div className="title">
              <p className="text-[#666666] text-m my-1">Filtros</p>
            </div>
            <div className="dados-cliente">
              <div>
                <Input type="text" label="Pesquisar por nome" required />
              </div>
              <div>
                <DropdownInput
                  label="Pesquisar por tipo"
                  options={materialOptions}
                  placeholder="Selecione um material..."
                />
              </div>
              <div>
                <DropdownInput
                  label="Pesquisar por tipo"
                  options={pesoOptions}
                  placeholder="Selecione um material..."
                />
              </div>
            </div>
            <div className="dados-cliente">
              <div>
                <DropdownInput
                  label="Pesquisar por tipo"
                  options={materialOptions}
                  placeholder="Selecione um material..."
                />
              </div>
              <div>
                <InputDate type="date" label="Data" required />
              </div> 
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FuncionarioPage;
