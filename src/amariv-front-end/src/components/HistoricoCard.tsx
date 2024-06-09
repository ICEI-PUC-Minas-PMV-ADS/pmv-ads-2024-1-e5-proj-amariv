import React from 'react';

interface HistoricoCardProps {
  coleta: {
    id: number;
    clienteNome: string;
    clienteCel: string;
    clienteTel: string;
    dataDeColeta: string;
    listaItensColeta: string;
    status: boolean;
  };
}

const HistoricoCard: React.FC<HistoricoCardProps> = ({ coleta }) => {
  const statusColor = coleta.status ? 'text-red-600' : 'text-green-600';

  return (
    <div className="block p-4 border rounded-lg bg-[#E8F4EB]">
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-semibold">Data de Coleta:</span> {coleta.dataDeColeta} | <span className={statusColor}>{coleta.status ? 'Inativo' : 'Ativo'}</span>
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-semibold">Nome do Cliente:</span> {coleta.clienteNome}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-semibold">Celular:</span> {coleta.clienteCel}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-semibold">Telefone:</span> {coleta.clienteTel}
      </p>
      <p className="text-base mb-2 text-[#666666]">
        <span className="font-semibold">Materiais:</span> {coleta.listaItensColeta}
      </p>
    </div>
  );
};

export default HistoricoCard;
