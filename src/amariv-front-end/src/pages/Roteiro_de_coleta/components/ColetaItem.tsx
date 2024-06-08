import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";

/**
 * ColetaItemProps
 */
export type ColetaItemProps = {
  item: ReadColetaDto,
};

/**
 * ColetaItem
 */

export const ColetaItem = ({ item }: ColetaItemProps) => {
  return (
    <div className="w-full"></div>
  );
};