import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";
import { NextRouteList } from "./NextRouteList";

/**
 * NextRoutesViewerProps
 */
export type NextRoutesViewerProps = {
  routeItems: ReadColetaDto[],
  onClickItem: (item: ReadColetaDto) => void,
  onUpdateRouteItems: (items: ReadColetaDto[]) => void,
};

/**
 * NextRoutesViewer
 */

export function NextRoutesViewer({ routeItems, onClickItem, onUpdateRouteItems }: NextRoutesViewerProps) {

  /**
   * Layout
   */

  return (
    <div className="w-full">
      <NextRouteList
        routes={routeItems}
        onClickItem={onClickItem}
        onChangeRoutes={(newRoutes) => {
          onUpdateRouteItems(newRoutes);
        }} />
    </div>
  );
}