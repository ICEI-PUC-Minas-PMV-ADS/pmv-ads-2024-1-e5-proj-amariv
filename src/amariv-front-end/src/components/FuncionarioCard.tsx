import React, { useState } from 'react';

interface Funcionario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  sexo: string;
  telefone: string;
  suportaPeso: boolean;
}

interface FuncionarioCardProps {
  funcionario: Funcionario;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const FuncionarioCard: React.FC<FuncionarioCardProps> = ({ funcionario, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="bg-[#e8f4eb] rounded-[5px] p-3 pr-8 pl-8 mb-3 w-full md:w-full lg:w-full">
      <h3 className="text-base font-semibold text-gray-800 mb-1">{funcionario.nome}</h3>
      <p className="text-sm text-gray-600 mb-1">{funcionario.email}</p>
      <p className="text-sm text-gray-600 mb-1">Cargo: {funcionario.cargo}</p>
      {showDetails && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Sexo: {funcionario.sexo}</p>
          <p className="text-sm text-gray-600 mb-1">Telefone: {funcionario.telefone}</p>
          <p className="text-sm text-gray-600 mb-1">Suporta Peso: {funcionario.suportaPeso ? 'Sim' : 'Não'}</p>
        </div>
      )}
      <div className="flex justify-between mt-3">
        <button
          className="bg-[#53735B] hover:bg-[#53735B] text-white font-semibold py-1 px-3 rounded mr-1"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="bg-[#53735B] hover:bg-[#53735B] text-white font-semibold py-1 px-3 rounded mr-1"
          onClick={toggleDetails}
        >
          {showDetails ? 'Ocultar' : 'Detalhes'}
        </button>
        <button
          className="bg-[#E36C6C] hover:bg-[#E36C6C] text-white font-semibold py-1 px-3 rounded"
          onClick={() => onDelete(funcionario.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default FuncionarioCard;
