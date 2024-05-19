import React from 'react';
import { DropdownInput } from './DropdownInput';
import { Input } from './Input';

interface MaterialModalProps {
  materialInfo: {
    id: number;
    descricao: string;
    tipo: string;
    peso: string;
  };
  materialOptions: string[];
  weightOptions: string[];
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

const MaterialModal: React.FC<MaterialModalProps> = ({
  materialInfo,
  materialOptions,
  weightOptions,
  onSave,
  onCancel,
  onChange,
}) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="bg-gray-500 bg-opacity-75 fixed inset-0"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
            Adicionar material
          </h3>
          <div className="mt-4">
            <div>
              <Input
                type="text"
                label="Descrição"
                value={materialInfo.descricao}
                onChange={(e) => onChange('descricao', e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <DropdownInput
                label="Tipo"
                options={materialOptions}
                value={materialInfo.tipo}
                onChange={(e) => onChange('tipo', e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <DropdownInput
                label="Peso"
                options={weightOptions}
                value={materialInfo.peso}
                onChange={(e) => onChange('peso', e.target.value)}
                required
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 flex justify-center">
          <button
            type="button"
            onClick={onSave}
            className="inline-flex justify-center w-24 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm mr-4"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex justify-center w-24 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;