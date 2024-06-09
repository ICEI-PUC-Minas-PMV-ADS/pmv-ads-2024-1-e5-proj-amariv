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
  const [errors, setErrors] = useState<Partial<FuncionarioInfo>>({});

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFuncionarioInfo({ ...funcionarioInfo, suportaPeso: event.target.checked });
  };

  const validateForm = () => {
    const newErrors: Partial<FuncionarioInfo> = {};

    if (!funcionarioInfo.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!funcionarioInfo.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(funcionarioInfo.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!funcionarioInfo.sexo) {
      newErrors.sexo = 'Sexo é obrigatório';
    }

    if (!funcionarioInfo.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!funcionarioInfo.cargo) {
      newErrors.cargo = 'Cargo é obrigatório';
    }

    if (!funcionarioInfo.senha.trim()) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(funcionarioInfo.senha)) {
      newErrors.senha = 'Senha deve ter pelo menos um caractere, uma letra maiúscula, uma letra minúscula e um número';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
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
            className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${errors.nome ? 'border-red-500' : ''}`}
          />
          {errors.nome && <div className="text-red-500 text-sm mt-1">{errors.nome}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="text-sm text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            value={funcionarioInfo.email}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, email: e.target.value })}
            className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="sexo" className="text-sm text-gray-600">Sexo:</label>
          <select
            id="sexo"
            value={funcionarioInfo.sexo}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, sexo: e.target.value })}
            className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${errors.sexo ? 'border-red-500' : ''}`}
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
          {errors.sexo && <div className="text-red-500 text-sm mt-1">{errors.sexo}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="text-sm text-gray-600">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={funcionarioInfo.telefone}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, telefone: e.target.value })}
            className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${errors.telefone ? 'border-red-500' : ''}`}
          />
          {errors.telefone && <div className="text-red-500 text-sm mt-1">{errors.telefone}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="text-sm text-gray-600">Cargo:</label>
          <select
            id="cargo"
            value={funcionarioInfo.cargo}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, cargo: e.target.value })}
            className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${errors.cargo ? 'border-red-500' : ''}`}
          >
            <option value="Todos">Selecione</option>
            <option value="Motorista">Motorista</option>
            <option value="Reciclagem">Reciclagem</option>
            <option value="outro">Outro</option>
          </select>
          {errors.cargo && <div className="text-red-500 text-sm mt-1">{errors.cargo}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="text-sm text-gray-600">Senha:</label>
          <input
            type="password"
            id="senha"
            value={funcionarioInfo.senha}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, senha: e.target.value })}
            className={`w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500 ${errors.senha ? 'border-red-500' : ''}`}
          />
          {errors.senha && <div className="text-red-500 text-sm mt-1">{errors.senha}</div>}
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
          <span className="text-sm text-gray-600"></span>
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