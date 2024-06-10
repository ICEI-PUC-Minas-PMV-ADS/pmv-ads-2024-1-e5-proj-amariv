import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";
import { ColetaItem } from "./ColetaItem";

/**
 * ColetaListProps
 */
export type ColetaListProps = {
  list: ReadColetaDto[],
};

/**
 * ColetaList
 */

export const ColetaList = ({ list }: ColetaListProps) => {
  return (
    <div className="w-full">
      {list.map((item) => <ColetaItem key={item.id} item={item} />)}
    </div>
  );
};