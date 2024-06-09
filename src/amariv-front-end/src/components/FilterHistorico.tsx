import React, { useState } from 'react';

interface FilterHistoricoProps {
  onFilterChange: (value: string, field: string) => void;
}

const FilterHistorico: React.FC<FilterHistoricoProps> = ({ onFilterChange }) => {
  const [filterValues, setFilterValues] = useState({
    pesquisa: '',
    peso: '',
    status: '',
    material: '',
    dataDeColeta: ''
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
          <label className="block mb-2 text-gray-600">Pesquisa</label>
          <input
            type="text"
            value={filterValues.pesquisa}
            onChange={(e) => handleFilterChange(e.target.value, 'pesquisa')}
            className="w-full px-20 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Peso</label>
          <select
            value={filterValues.peso}
            onChange={(e) => handleFilterChange(e.target.value, 'peso')}
            className="w-full px-10 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="Leve">Leve</option>
            <option value="Médio">Médio</option>
            <option value="Pesado">Pesado</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Status</label>
          <select
            value={filterValues.status}
            onChange={(e) => handleFilterChange(e.target.value, 'status')}
            className="w-full px-10 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Todos</option>
            <option value="false">Ativo</option>
            <option value="true">Inativo</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <label className="block mb-2 text-gray-600">Data de Coleta</label>
          <input
            type="date"
            value={filterValues.dataDeColeta}
            onChange={(e) => handleFilterChange(e.target.value, 'dataDeColeta')}
            className="w-full px-10 py-3 border rounded-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterHistorico;
