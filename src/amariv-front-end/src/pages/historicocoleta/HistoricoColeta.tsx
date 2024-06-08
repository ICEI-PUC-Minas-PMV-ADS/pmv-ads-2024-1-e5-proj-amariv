import React, { useState, useEffect } from 'react';
import FilterHistorico from '../../components/FilterHistorico';
import HistoricoCard from '../../components/HistoricoCard';

interface HistoricoColetaProps {
  title: string;
}

interface Coleta {
  id: number;
  clienteNome: string;
  clienteCel: string;
  clienteTel: string;
  dataDeColeta: string;
  listaItensColeta: string;
  status: boolean;
}

const HistoricoColeta: React.FC<HistoricoColetaProps> = ({ title }) => {
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [filteredColetas, setFilteredColetas] = useState<Coleta[]>([]);

  useEffect(() => {
    fetch('http://localhost:5100/RecuperaTodasColetas')
      .then((response) => response.json())
      .then((data) => {
        setColetas(data);
        setFilteredColetas(data); // Definindo coletas filtradas inicialmente iguais a todas as coletas
      });
  }, []);

  const handleFilterChange = (value: string, field: string) => {
    const filtered = coletas.filter((coleta) => {
      switch (field) {
        case 'pesquisa':
          return coleta.clienteNome.toLowerCase().includes(value.toLowerCase());
        case 'peso':
          return coleta.listaItensColeta.includes(value);
        case 'status':
          return coleta.status.toString() === value;
        case 'material':
          return coleta.listaItensColeta.toLowerCase().includes(value.toLowerCase());
        case 'dataDeColeta':
          return coleta.dataDeColeta.includes(value);
        default:
          return true;
      }
    });
    setFilteredColetas(filtered);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <div className="flex-none text-left">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-[#666666]">{title}</h1> 
      </div>
      <div className="flex-none mb-4">
        <FilterHistorico onFilterChange={handleFilterChange} />
      </div>
      <div className="flex-grow mt-4 overflow-y-auto mt-20"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredColetas.map((coleta) => (
            <HistoricoCard key={coleta.id} coleta={coleta} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoricoColeta;
