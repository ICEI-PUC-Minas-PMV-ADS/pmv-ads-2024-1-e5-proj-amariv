import React from 'react';

interface Material {
  id: number;
  descricao: string;
  tipo: string;
}

interface MaterialCardProps {
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onEdit, onDelete }) => {
  return (
    <div className="bg-[#e8f4eb] rounded-[5px] p-4 sm:pr-8 sm:pl-8 md:pl-12 md:pr-16 mb-4 w-full md:w-full lg:w-full min-w-[250px]">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{material.descricao}</h3>
        <p className="text-sm text-gray-600 mb-2">Tipo: {material.tipo}</p>
        <div className="flex">
          <button className="bg-[#53735B] hover:bg-[#53735B] text-white font-semibold py-1 px-2 rounded mr-2 sm:py-1 sm:px-2 md:py-2 md:px-4" onClick={onEdit}>
            Editar
          </button>
          <button className="bg-[#E36C6C] hover:bg-[#E36C6C] text-white font-semibold py-1 px-2 rounded sm:py-1 sm:px-2 md:py-2 md:px-4" onClick={onDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
