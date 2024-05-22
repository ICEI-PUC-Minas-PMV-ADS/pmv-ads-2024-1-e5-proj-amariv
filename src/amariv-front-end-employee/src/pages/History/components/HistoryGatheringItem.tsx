import React from "react";
import { Gathering } from "src/models/Gathering";

/**
 * HistoryGatheringItemProps
 */

export type HistoryGatheringItemProps = {
  gathering: Gathering,
};

/**
 * HistoryGatheringItem
 */

export function HistoryGatheringItem({ gathering }: HistoryGatheringItemProps) {

  /**
   * Layout
   */

  return (
    <div className="w-full py-4 border-b border-[#00000050]">
      <p className="text-xl"><strong>{gathering.usuario?.nome ?? gathering.clienteNome}</strong></p>
      <p>
        {gathering.endereco.logradouro}, {gathering.endereco.numero}<br />
        {gathering.endereco.bairro} - CEP: {gathering.endereco.cep}
      </p>
      <p><strong>Celular:</strong> {gathering.clienteCel}</p>
      <p><strong>Telefone:</strong> {gathering.usuario?.telefone ?? gathering.clienteTel}</p>
      <p>
        <strong>Materiais:</strong> {gathering.listaItensColeta}
      </p>
      <p><strong>Concluída em: {gathering.dataDeColeta}</strong></p>
    </div>
  );
}