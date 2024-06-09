import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";
import { ColetaViewerItem } from "./ColetaViewerItem";

/**
 * ColetaViewerListProps
 */
export type ColetaViewerListProps = {
  coletas: ReadColetaDto[],
  onAprovarColeta: (coletaId: number) => void,
  onRecusarColeta: (coletaId: number) => void,
};

/**
 * ColetaViewerList
 */

export const ColetaViewerList = ({ coletas, onAprovarColeta, onRecusarColeta }: ColetaViewerListProps) => {
  return (
    <div className="
      grid w-full grid-cols-1 mx-auto gap-y-4
      min-[1000px]:grid-cols-2 min-[1000px]:gap-x-2
      min-[1300px]:grid-cols-3
      min-[1550px]:grid-cols-4
    ">
      {
        coletas.map((coleta) => <ColetaViewerItem
          key={coleta.id}
          coleta={coleta}
          onAprovarColeta={onAprovarColeta}
          onRecusarColeta={onRecusarColeta} />)
      }
    </div>
  );
};