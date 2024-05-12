import React from "react";
import { NextRouteList } from "./NextRouteList";
import { GatheringItinerary } from "src/models/GatheringItinerary";
import { Gathering } from "src/models/Gathering";

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
  const [routeItems, setRouteItems] = React.useState<Gathering[]>([]);

  /**
   * Effects.
   */

  React.useEffect(() => {
    if (gatheringItinerary) {
      setRouteItems(gatheringItinerary.coletas.filter((i) => i.status === true && i.delete === false));
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