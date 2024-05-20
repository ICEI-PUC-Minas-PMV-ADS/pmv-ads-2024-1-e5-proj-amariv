// FuncionarioCard.tsx
import React from 'react';

interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

interface FuncionarioCardProps {
  funcionario: Funcionario;
  onEdit: () => void;
  onDelete: (id: number) => void;
}

const FuncionarioCard: React.FC<FuncionarioCardProps> = ({ funcionario, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold">{funcionario.nome}</h3>
      <p className="text-gray-600">{funcionario.email}</p>
      <p className="text-gray-600">Cargo: {funcionario.cargo}</p>
      <div className="flex justify-end mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={onEdit}
        >
          Editar
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => onDelete(funcionario.id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default FuncionarioCard;