import React, { useState, useRef } from "react";
import { Input } from "../../components/Input";
import { Button2 } from "../../components/Button2";
import { Button3 } from "../../components/Button3";
import { DropdownInput } from "../../components/DropdownInput";
import { Form } from "../../components/Form";
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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h2 className="text-[#53735B] text-4xl">Funcionários</h2>
        <Button2
          type="button"
          label="Adicionar funcionário"
          onClick={toggleFuncionarioPanel}
          className="w-[150px]"
        />
      </div>
      {showFuncionarioPanel && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 w-full max-w-4xl">
          <p className="text-[#666666] text-base mb-4">Adicionar funcionário</p>
          <div className="grid grid-cols-2 gap-4">
            <Input type="text" label="Nome" required />
            <Input type="text" label="E-mail" />
            <InputDate type="date" label="Data de admissão" required />
            <DropdownInput
              label="Sexo"
              options={funcionarioOptions}
              placeholder="Selecione um material..."
              ref={funcionarioRef}
              onChange={handleFuncionarioChange}
              required
            />
            <Input type="text" label="Telefone fixo" />
            <Input type="password" label="Senha" required />
            <Input type="text" label="Suporta peso" required />
            <Input type="text" label="Matrícula" required />
            <Input type="text" label="CPF" />
            <InputDate type="date" label="Data de nascimento" required />
            <Input type="text" label="Cargo" required />
            <Input type="text" label="Telefone celular" required />
            <Input type="password" label="Confirme a senha" required />
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <Button3
              type="button"
              label="Cancelar"
              onClick={handleCancelClick}
              className="w-[140px]"
            />
            <Button2
              type="button"
              label="Adicionar"
              onClick={addFuncionario}
              className="w-[140px]"
            />
          </div>
        </div>
      )}

      <Form className="w-full max-w-4xl">
        <p className="text-[#666666] text-base mb-4">Filtros</p>
        <div className="grid grid-cols-2 gap-4">
          <Input type="text" label="Pesquisar por nome" required />
          <DropdownInput
            label="Pesquisar por tipo"
            options={materialOptions}
            placeholder="Selecione um material..."
          />
          <DropdownInput
            label="Pesquisar por tipo"
            options={pesoOptions}
            placeholder="Selecione um material..."
          />
          <DropdownInput
            label="Pesquisar por tipo"
            options={materialOptions}
            placeholder="Selecione um material..."
          />
          <InputDate type="date" label="Data" required />
        </div>
      </Form>
    </div>
  );
}

export default FuncionarioPage;