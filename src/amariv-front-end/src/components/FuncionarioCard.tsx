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
    <div className="bg-[#e8f4eb] rounded-[5px] p-3 mb-3 w-full max-w-md md:max-w-full lg:max-w-full">
      <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">{funcionario.nome}</h3>
      <p className="text-sm text-gray-600 mb-1 truncate">{funcionario.email}</p>
      <p className="text-sm text-gray-600 mb-1">Cargo: {funcionario.cargo}</p>
      {showDetails && (
        <div>
          <p className="text-sm text-gray-600 mb-1">Sexo: {funcionario.sexo}</p>
          <p className="text-sm text-gray-600 mb-1">Telefone: {funcionario.telefone}</p>
          <p className="text-sm text-gray-600 mb-1">Suporta Peso: {funcionario.suportaPeso ? 'Sim' : 'Não'}</p>
        </div>
      )}
      <div className="flex justify-center gap-2">
        <button
          className="bg-[#53735B] hover:bg-[#6A9275] text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 my-2 max-w-full text-lg sm:text-base lg:text-sm sm:py-1 lg:py-2 sm:px-3 lg:px-4"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="bg-[#53735B] hover:bg-[#6A9275] text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 my-2 max-w-full text-lg sm:text-base lg:text-sm sm:py-1 lg:py-2 sm:px-3 lg:px-4"
          onClick={toggleDetails}
        >
          {showDetails ? 'Ocultar' : 'Detalhes'}
        </button>
        <button
          className="bg-[#E36C6C] hover:bg-[#FF8080] text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 my-2 max-w-full text-lg sm:text-base lg:text-sm sm:py-1 lg:py-2 sm:px-3 lg:px-4"
          onClick={() => onDelete(funcionario.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default FuncionarioCard;
