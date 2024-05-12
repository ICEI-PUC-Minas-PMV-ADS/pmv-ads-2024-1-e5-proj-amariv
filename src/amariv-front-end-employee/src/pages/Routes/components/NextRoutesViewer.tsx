import React from "react";
import { NextRouteList } from "./NextRouteList";
import { GatheringItem, GatheringItinerary } from "src/models/GatheringItinerary";

/**
 * NextRoutesViewerProps
 */

export type NextRoutesViewerProps = {
  gatheringItinerary: GatheringItinerary | null,
};

/**
 * NextRoutesViewer
 */

export function NextRoutesViewer({ gatheringItinerary }: NextRoutesViewerProps) {
  const [routeItems, setRouteItems] = React.useState<GatheringItem[]>([]);

  /**
   * Effects.
   */

  React.useEffect(() => {
    if (gatheringItinerary) {
      setRouteItems(gatheringItinerary.itemsDeRoteiroDeColeta.filter((i) => i.isActive === true));
    }
  }, [gatheringItinerary]);

  /**
   * Layout
   */

  return (
    <div className="w-full">
      <NextRouteList
        routes={routeItems}
        onChangeRoutes={(newRoutes) => {
          setRouteItems(newRoutes);
        }} />
    </div>
  );
}