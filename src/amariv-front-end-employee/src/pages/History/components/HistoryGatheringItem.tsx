
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

export function HistoryGatheringItem(props: HistoryGatheringItemProps) {
  return (
    <div className="w-full py-4 border-b border-[#00000050]">
      <p className="text-xl"><strong>José Ernesto</strong></p>
      <p>
        Rua Professor Carlos de Souza, 2560,
        Vila José Gonçalves, Nova Cidade
      </p>
      <p><strong>Celular:</strong> (00) 00000-0000</p>
      <p><strong>Telefone:</strong> (00) 00000-0000</p>
      <p>
        <strong>Materiais:</strong> Plásticos (1kg), Latinhas (5kg),
        Papel (0,5kg)
      </p>
      <p><strong>Concluída em: 04/04/2024 13:40</strong></p>
    </div>
  );
}