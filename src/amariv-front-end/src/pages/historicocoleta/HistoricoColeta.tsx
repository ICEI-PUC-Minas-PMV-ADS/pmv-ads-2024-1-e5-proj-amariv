import React, { useState, useEffect } from 'react';
import FilterHistorico from '../../components/FilterHistorico';
import HistoricoCard from '../../components/HistoricoCard';
import { DateConvert } from '../../utils/DateConvert';
import { useApi } from '../../hooks/useApi';
import { RoteiroDeColetaDto } from '../../models/RoteiroDeColetaDtos/RoteiroDeColetaDto';

interface HistoricoColetaProps {
  title: string;
}

interface Coleta {
  id: number;
  clienteNome: string;
  clienteCel: string;
  clienteTel: string;
  dataDeColeta: string;
  dataDeColetaDe: string;
  dataDeColetaAte: string;
  listaItensColeta: string;
  status: boolean;
  isSuccess: boolean;
  delete: boolean;
  cancelada: boolean;
  roteiroDeColetas?: RoteiroDeColetaDto;
}

const HistoricoColeta: React.FC<HistoricoColetaProps> = ({ title }) => {
  const [coletas, setColetas] = useState<Coleta[]>([]);
  const [filteredColetas, setFilteredColetas] = useState<Coleta[]>([]);

  const [fucionarioFilter, setFucionarioFilter] = React.useState("");
  const [materialFilter, setMaterialFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [startDateFilter, setStartDateFilter] = React.useState("");
  const [endDateFilter, setEndDateFilter] = React.useState("");

  React.useEffect(() => {
    useApi.get('RecuperaTodasColetas')
      .then((response) => response.data)
      .then((data) => {
        setColetas(data);
        setFilteredColetas(data ?? []); // Definindo coletas filtradas inicialmente iguais a todas as coletas
      });
  }, []);

  useEffect(() => {
    let filteredContent: Coleta[] = coletas;
    if (fucionarioFilter.length > 0) {
      filteredContent = filteredContent.filter((x) => {
        if (x.roteiroDeColetas?.funcionario?.nome) {
          return x.roteiroDeColetas.funcionario.nome.toLowerCase().includes(fucionarioFilter.toLowerCase());
        }
        return false;
      });
    }
    if (materialFilter.length > 0) {
      filteredContent = filteredContent.filter((x) => x.listaItensColeta.toLowerCase().includes(materialFilter.toLowerCase()));
    }
    if (statusFilter.length > 0) {
      if (statusFilter === '0') {
        filteredContent = filteredContent.filter((x) => x.status === true && x.cancelada === false && x.isSuccess === false && x.delete === false);
      } else if (statusFilter === '1') {
        filteredContent = filteredContent.filter((x) => x.status === true && x.cancelada === false && x.isSuccess === true && x.delete === false);
      } else if (statusFilter === '2') {
        filteredContent = filteredContent.filter((x) => x.cancelada === true && x.isSuccess === false && x.delete === false);
      }
    }
    if (startDateFilter.length > 0 && endDateFilter.length > 0) {
      const startDate = DateConvert.getLocalDateObject(startDateFilter);
      const endDate = DateConvert.getLocalDateObject(endDateFilter);
      filteredContent = filteredContent.filter((x) => DateConvert.getUTCDateObject(x.dataDeColeta).getTime() >= startDate.getTime() && DateConvert.getUTCDateObject(x.dataDeColeta).getTime() <= endDate.getTime());
    } else if (startDateFilter.length > 0) {
      const startDate = DateConvert.getLocalDateObject(startDateFilter);
      filteredContent = filteredContent.filter((x) => DateConvert.getUTCDateObject(x.dataDeColeta).getTime() >= startDate.getTime());
    } else if (endDateFilter.length > 0) {
      const endDate = DateConvert.getLocalDateObject(endDateFilter);
      filteredContent = filteredContent.filter((x) => DateConvert.getUTCDateObject(x.dataDeColeta).getTime() <= endDate.getTime());
    }
    setFilteredColetas(filteredContent);
  }, [
    coletas,
    fucionarioFilter,
    materialFilter,
    statusFilter,
    startDateFilter,
    endDateFilter,
  ]);

  const handleFilterChange = (value: string, field: string) => {
    switch (field) {
      case 'funcionario':
        setFucionarioFilter(value);
        break;
      case 'material':
        setMaterialFilter(value);
        break;
      case 'status':
        setStatusFilter(value);
        break;
      case 'dataDeColetaDe':
        setStartDateFilter(value);
        break;
      case 'dataDeColetaAte':
        setEndDateFilter(value);
        break;
      default:
        return true;
    };
  };

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <div className="flex-none text-left">
        <h1 className="text-3xl font-bold mb-4 mt-10 text-[#666666]">{title}</h1>
      </div>

      <div className="flex-none mb-4">
        <FilterHistorico onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-grow mt-4 overflow-y-auto flex flex-col items-center">
        <div className="
          grid gap-4 col-span-1
          min-[960px]:grid-cols-2
          min-[1300px]:grid-cols-3
          min-[1600px]:grid-cols-4
        ">
          {filteredColetas.map((coleta) => (
            <HistoricoCard key={coleta.id} coleta={coleta} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default HistoricoColeta;
