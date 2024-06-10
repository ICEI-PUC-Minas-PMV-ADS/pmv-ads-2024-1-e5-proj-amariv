import React, { useState } from 'react';

interface FilterHistoricoProps {
  onFilterChange: (value: string, field: string) => void;
}

const FilterHistorico: React.FC<FilterHistoricoProps> = ({ onFilterChange }) => {
  const [filterValues, setFilterValues] = useState({
    funcionario: '',
    peso: '',
    status: '',
    material: '',
    dataDeColetaDe: '',
    dataDeColetaAte: ''
  });

  const handleFilterChange = (value: string, field: string) => {
    setFilterValues((prevValues) => ({ ...prevValues, [field]: value }));
    onFilterChange(value, field); 
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-[#666666]">Filtro</h2>
      <div className="w-full p-9 px-20 border rounded-lg bg-[#E8F4EB] md:flex md:flex-wrap md:gap-10">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Funcionário </label>
          <input
            type="text"
            value={filterValues.funcionario}
            onChange={(e) => handleFilterChange(e.target.value, 'funcionario')}
            className="w-full px-20 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
           />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Material </label>
          <input
            type="text"
            value={filterValues.material}
            onChange={(e) => handleFilterChange(e.target.value, 'material')}
            className="w-full px-20 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
           />
        </div>

        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Status</label>
          <select
            value={filterValues.status}
            onChange={(e) => handleFilterChange(e.target.value, 'status')}
            className="w-full px-10 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="0">Em Aberto</option>
            <option value="1">Concluídas</option>
            <option value="2">Canceladas</option>
          </select>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Data de Início</label>
          <input
            type="date"
            value={filterValues.dataDeColetaDe}
            onChange={(e) => handleFilterChange(e.target.value, 'dataDeColetaDe')}
            className="w-full px-10 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500 me-1"
          />      
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Data de Término</label>         
          <input
            type="date"
            value={filterValues.dataDeColetaAte}
            onChange={(e) => handleFilterChange(e.target.value, 'dataDeColetaAte')}
            className="w-full px-10 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500 me-1"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterHistorico;
