import React from 'react';
import { DropdownInput } from './DropdownInput';
import { Input } from './Input';
import { Form } from './Form';

interface MaterialFilterProps {
  materialOptions: string[];
  selectedMaterialType: string;
  setSelectedMaterialType: React.Dispatch<React.SetStateAction<string>>;
  searchDescription: string;
  setSearchDescription: React.Dispatch<React.SetStateAction<string>>;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({
  materialOptions,
  selectedMaterialType,
  setSelectedMaterialType,
  searchDescription,
  setSearchDescription,
}) => {
  return (
    <Form>
      <div className="title">
        <p className="text-[#666666] text-m my-1">Filtros</p>
      </div>
      <div className="dados-cliente">
        <div>
          <Input
            type="text"
            label="Pesquisar por descrição"
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
            required
            className="rounded-[30px] bg-[#e8f4eb] p-2"
          />
        </div>
        <div>
          <DropdownInput
            label="Pesquisar por tipo"
            options={materialOptions}
            placeholder="Selecione um material..."
            value={selectedMaterialType}
            onChange={(e) => setSelectedMaterialType(e.target.value)}
            required
            className="rounded-[30px] bg-[#e8f4eb] p-2"
          />
        </div>
      </div>
    </Form>
  );
};

export default MaterialFilter;