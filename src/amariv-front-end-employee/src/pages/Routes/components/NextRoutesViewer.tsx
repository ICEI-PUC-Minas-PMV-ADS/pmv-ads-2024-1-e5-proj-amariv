import React from "react";
import { NextRouteList } from "./NextRouteList";
import { GatheringItinerary } from "src/models/GatheringItinerary";
import { Gathering } from "src/models/Gathering";
import { GatheringItineraryService } from "src/services/GatheringItineraryService";
import { AppContext } from "src/AppContext";

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
  const { state: { token }, dispatch } = React.useContext(AppContext);
  const [routeItems, setRouteItems] = React.useState<Gathering[]>([]);

  /**
   * Effects.
   */

  const handleChangeRoute = React.useCallback((newRoute: Gathering[]) => {
    (async function () {
      try {
        if (gatheringItinerary !== null && token !== undefined) {
          const newGatheringItinerary = await GatheringItineraryService.changeGatheringOrder(
            token,
            gatheringItinerary!.id,
            newRoute.map((g, i) => ({ id: g.id, posicaoLista: i })),
          );
          dispatch({ type: 'set_gathering_itinerary', payload: newGatheringItinerary });
          setRouteItems(newRoute);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [gatheringItinerary, token, dispatch]);

  React.useEffect(() => {
    if (gatheringItinerary && routeItems.length === 0) {
      const filteredGatherings = gatheringItinerary.coletas.filter((i) => i.status === true && i.delete === false);
      const sortedAndFilteredGatherings = filteredGatherings.sort((a, b) => a.posicaoLista - b.posicaoLista);
      setRouteItems(sortedAndFilteredGatherings);
    }
  }, [gatheringItinerary, routeItems]);

  /**
   * Layout
   */

  return (
    <div className="w-full">
      <NextRouteList
        routes={routeItems}
        onChangeRoutes={(newRoutes) => {
          handleChangeRoute(newRoutes);
        }} />
    </div>
  );
}