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
    <div className="bg-[#e8f4eb] rounded-[5px] p-4 pr-16 pl-16 mb-4 w-full md:w-full lg:w-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{material.descricao}</h3>
      <p className="text-sm text-gray-600 mb-2">Tipo: {material.tipo}</p>
      <div className="flex justify-end">
        {
          (material.id != 1 && material.id != 2 && material.id != 3 && material.id != 4) &&
          <>
            <button className="bg-[#53735B] hover:bg-[#53735B] text-white font-semibold py-2 px-4 rounded mr-2" onClick={onEdit}>
              Editar
            </button>
            <button className="bg-[#E36C6C] hover:bg-[#E36C6C] text-white font-semibold py-2 px-4 rounded" onClick={onDelete}>
              Excluir
            </button>
          </>
        }
        {
          (material.id == 1 || material.id == 2 || material.id == 3 || material.id == 4) &&
          <div>
            <p className='text-sm font-extralight'>*Não é possível editar ou excluir os materiais básicos.</p>
          </div>
        }
      </div>
    </div>
  );
};

export default MaterialCard;
