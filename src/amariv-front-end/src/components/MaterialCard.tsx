import React from 'react';
import { Button2 } from './Button2';
import { Button3 } from './Button3';

interface Material {
  descricao: string;
  tipo: string;
  peso: string;
}

interface MaterialCardProps {
  material: Material;
  onEdit: () => void;
  onDelete: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onEdit, onDelete }) => {
  return (
    <div className="material-card">
      <h3>{material.descricao}</h3>
      <p>Tipo: {material.tipo}</p>
      <p>Peso: {material.peso}</p>
      <div className="card-buttons">
        <Button2 label="Editar" onClick={onEdit} />
        <Button3 label="Excluir" onClick={onDelete} />
      </div>
    </div>
  );
};

export default MaterialCard;
