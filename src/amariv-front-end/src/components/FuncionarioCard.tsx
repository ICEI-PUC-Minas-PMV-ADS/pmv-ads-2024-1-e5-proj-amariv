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
    <div className="bg-[#e8f4eb] rounded-[5px] p-4 sm:pr-8 sm:pl-8 md:pl-12 md:pr-16 mb-4 w-full md:w-full lg:w-full min-w-[250px]">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{funcionario.nome}</h3>
        <p className="text-sm text-gray-600 mb-2">{funcionario.email}</p>
        <p className="text-sm text-gray-600 mb-2">Cargo: {funcionario.cargo}</p>
        {showDetails && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Sexo: {funcionario.sexo}</p>
            <p className="text-sm text-gray-600 mb-2">Telefone: {funcionario.telefone}</p>
            <p className="text-sm text-gray-600 mb-2">Suporta Peso: {funcionario.suportaPeso ? 'Sim' : 'Não'}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            className="bg-[#53735B] hover:bg-[#53735B] text-white font-semibold py-1 px-2 rounded mr-2 sm:py-1 sm:px-2 md:py-2 md:px-4"
            onClick={onEdit}
            aria-label="Editar funcionário"
          >
            Editar
          </button>
          <button
            className="bg-[#53735B] hover:bg-[#53735B] text-white font-semibold py-1 px-2 rounded mr-2 sm:py-1 sm:px-2 md:py-2 md:px-4"
            onClick={toggleDetails}
            aria-label={showDetails ? 'Ocultar detalhes' : 'Mostrar detalhes'}
          >
            {showDetails ? 'Ocultar' : 'Detalhes'}
          </button>
          <button
            className="bg-[#E36C6C] hover:bg-[#E36C6C] text-white font-semibold py-1 px-2 rounded sm:py-1 sm:px-2 md:py-2 md:px-4"
            onClick={() => onDelete(funcionario.id)}
            aria-label="Excluir funcionário"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuncionarioCard;
