import { NextRouteList } from "./NextRouteList";
import { Gathering } from "src/models/Gathering";

/**
 * NextRoutesViewerProps
 */
export type NextRoutesViewerProps = {
  routeItems: Gathering[],
  onUpdateRouteItems: (items: Gathering[]) => void,
};

/**
 * NextRoutesViewer
 */

export function NextRoutesViewer({ routeItems, onUpdateRouteItems }: NextRoutesViewerProps) {

  /**
   * Layout
   */

  return (
    <div className="w-full">
      <NextRouteList
        routes={routeItems}
        onChangeRoutes={(newRoutes) => {
          onUpdateRouteItems(newRoutes);
        }} />
    </div>
  );
}