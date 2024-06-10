import React, { useEffect, useState } from 'react';
import { materialService } from '../services/MaterialService';
import { DateConvert } from '../utils/DateConvert';

interface HistoricoCardProps {
  coleta: {
    id: number;
    clienteNome: string;
    clienteCel: string;
    clienteTel: string;
    dataDeColeta: string;
    listaItensColeta: string;
    status: boolean;
    isSuccess: boolean;
    cancelada: boolean
  };
}

const HistoricoCard: React.FC<HistoricoCardProps> = ({ coleta }) => {
  const statusColor = coleta.status ? 'text-red-600' : 'text-green-600';
 
  const validaStatus = () => {
    if (coleta.isSuccess === true){
      if(coleta.cancelada === false)
         return <span className="bg-[green] text-[white] p-1 rounded ms-4" >Concluída </span>
      else
         return <span className="bg-[red] text-[white] p-1 rounded ms-4">Cancelada</span>
    }else
    {
      if(coleta.cancelada === true)
        return <span className="bg-[red] text-[white] p-1 rounded ms-4">Cancelada</span>
      else
      return <span className="bg-[#c08e31] text-[white] p-1 rounded ms-4">Em Aberto</span>
    }
  }

  return (
    <div className="block p-4 border rounded-lg bg-[#E8F4EB]">
      <p className="text-base mb-2 text-[#666666] ">
        <span className="font-bold me-1">Data de Coleta:</span> { DateConvert.getLocalDate(coleta.dataDeColeta)} {validaStatus()}
      </p>
      <hr className='mb-3'/>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-bold">Nome do Cliente:</span> {coleta.clienteNome}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-bold">Horário da coleta:</span> {DateConvert.getLocalHour(coleta.dataDeColeta)}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-bold">Celular:</span> {coleta.clienteCel}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-bold">Telefone:</span> {coleta.clienteTel}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-bold">Materiais:</span> { coleta.listaItensColeta }
      </p>
    </div>
  );
};

export default HistoricoCard;
