import React, { useState } from 'react';

interface FuncionarioInfo {
  id: string;
  nome: string;
  email: string;
  sexo: string;
  telefone: string;
  cargo: string;
  senha: string;
  suportaPeso: boolean;
}

interface FuncionarioModalProps {
  title: string;
  funcionarioInfo: FuncionarioInfo;
  setFuncionarioInfo: React.Dispatch<React.SetStateAction<FuncionarioInfo>>;
  onSave: (event: React.FormEvent) => void;
  onCancel: () => void;
}

const FuncionarioModal: React.FC<FuncionarioModalProps> = ({
  title,
  funcionarioInfo,
  setFuncionarioInfo,
  onSave,
  onCancel,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFuncionarioInfo({ ...funcionarioInfo, suportaPeso: event.target.checked });
  };

  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!funcionarioInfo.nome) tempErrors.nome = 'Nome é obrigatório';
    if (!funcionarioInfo.email) tempErrors.email = 'Email é obrigatório';
    else if (!/\S+@\S+\.\S+/.test(funcionarioInfo.email)) tempErrors.email = 'Email inválido';
    if (!funcionarioInfo.sexo) tempErrors.sexo = 'Sexo é obrigatório';
    if (!funcionarioInfo.telefone) tempErrors.telefone = 'Telefone é obrigatório';
    if (!funcionarioInfo.cargo) tempErrors.cargo = 'Cargo é obrigatório';
    if (!funcionarioInfo.senha) tempErrors.senha = 'Senha é obrigatória';
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(funcionarioInfo.senha)) {
      tempErrors.senha = 'A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate()) {
      onSave(event);
    }
  };

  return (
    <div className="bg-[#e8f4eb] rounded-[5px] p-4 pr-16 pl-16">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="text-sm text-gray-600">Nome:</label>
          <input
            type="text"
            id="nome"
            value={funcionarioInfo.nome}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, nome: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="text-sm text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            value={funcionarioInfo.email}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, email: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="sexo" className="text-sm text-gray-600">Sexo:</label>
          <select
            id="sexo"
            value={funcionarioInfo.sexo}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, sexo: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
          {errors.sexo && <span className="text-red-500 text-sm">{errors.sexo}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="text-sm text-gray-600">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={funcionarioInfo.telefone}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, telefone: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.telefone && <span className="text-red-500 text-sm">{errors.telefone}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="text-sm text-gray-600">Cargo:</label>
          <select
            id="cargo"
            value={funcionarioInfo.cargo}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, cargo: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione</option>
            <option value="Motorista">Motorista</option>
            <option value="Reciclagem">Reciclagem</option>
            <option value="outro">Outro</option>
          </select>
          {errors.cargo && <span className="text-red-500 text-sm">{errors.cargo}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="text-sm text-gray-600">Senha:</label>
          <input
            type="password"
            id="senha"
            value={funcionarioInfo.senha}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, senha: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {errors.senha && <span className="text-red-500 text-sm">{errors.senha}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="suportaPeso" className="text-sm text-gray-600 mr-2">Suporta Peso:</label>
          <input
            type="checkbox"
            id="suportaPeso"
            checked={funcionarioInfo.suportaPeso}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-[#53735B] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FuncionarioModal;
