import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { RouteViewer } from "./components/RouteViewer";
import { NextRoutesViewer } from "./components/NextRoutesViewer";
import { AppContext } from "src/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button";
import { Gathering } from "src/models/Gathering";
import { GatheringItineraryService } from "src/services/GatheringItineraryService";

/**
 * Routes page desktop
 */

export function RoutesDesktopPage() {
  const { state: { token, gatheringItinerary }, dispatch } = React.useContext(AppContext);
  const [lastRouteItems, setLastRouteItems] = React.useState<Gathering[]>([]);
  const [routeItems, setRouteItems] = React.useState<Gathering[]>([]);
  const [hasChange, setHasChange] = React.useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Effects.
   */
  React.useEffect(() => {
    if (gatheringItinerary && routeItems.length === 0) {
      const filteredGatherings = gatheringItinerary.coletas.filter((i) => i.status === true && i.delete === false);
      const sortedAndFilteredGatherings = filteredGatherings.sort((a, b) => a.posicaoLista - b.posicaoLista);
      setRouteItems(sortedAndFilteredGatherings);
      setLastRouteItems(sortedAndFilteredGatherings);
    }
  }, [gatheringItinerary, routeItems]);

  /**
   * Events
   */

  const handleMenuHomeClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/", { replace: true });
  }, [navigate]);

  const handleMenuHistoryClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/history", { replace: true });
  }, [navigate]);

  const onUpdateRouteItems = React.useCallback((newRoute: Gathering[]) => {
    if (newRoute.length !== lastRouteItems.length) {
      setHasChange(true);
      setRouteItems(newRoute);
      return;
    }
    for (let i = 0; i < lastRouteItems.length; i++) {
      if (lastRouteItems[i].id !== newRoute[i].id) {
        setHasChange(true);
        setRouteItems(newRoute);
        return;
      }
    }
    setHasChange(false);
    setRouteItems(newRoute);
  }, [lastRouteItems]);

  const handleConfirmClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    (async function () {
      try {
        if (gatheringItinerary !== null && token !== undefined && routeItems.length > 0) {
          const newGatheringItinerary = await GatheringItineraryService.changeGatheringOrder(
            token,
            gatheringItinerary!.id,
            routeItems.map((g, i) => ({ id: g.id, posicaoLista: i })),
          );
          dispatch({ type: 'set_gathering_itinerary', payload: newGatheringItinerary });
          setLastRouteItems(routeItems);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token, gatheringItinerary, routeItems, dispatch]);

  /**
   * Layout
   */

  return (
    <div className="w-screen h-screen bg-[#E8F4EB] overflow-y-auto flex flex-col">
      <div className="w-screen flex-1 overflow-y-auto">
        <NavBar title="Rotas">
          <div className="flex flex-row">
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuHomeClick}>Home</div>
            <Spacer width="2rem" />
            <div className="text-[#ffffff] cursor-pointer">Rotas</div>
            <Spacer width="2rem" />
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuHistoryClick}>Historico de coletas</div>
          </div>
        </NavBar>
        <div className="flex justify-center px-[2rem] py-[2rem]">
          <div className="w-[40vw]">
            {gatheringItinerary !== null
              ? <>
                <h2 className="text-2xl font-bold">Rota atual</h2>
                <Spacer height='1rem' />
                <RouteViewer />
                <Spacer height='2rem' />
                <h2 className="text-2xl font-bold">Proximas rotas</h2>
                <p className="font-md text-[#6E6E6E]">Arraste para reordenar</p>
                <Spacer height='1rem' />
                <NextRoutesViewer routeItems={routeItems} onUpdateRouteItems={onUpdateRouteItems} />
                <Spacer height='1rem' />
                <div className="w-full flex justify-end">
                  <Button
                    className="w-[10rem]"
                    color="secondary"
                    rounded="sm"
                    label="Confirmar"
                    style={{ display: hasChange !== true ? 'none' : 'block' }}
                    onClick={handleConfirmClick} />
                </div>
                <Spacer height='2rem' />
              </>
              : <>
                <p className="text-2xl">Não ha rotas definidas!</p>
              </>}
          </div>
        </div>
      </div>
    </div>
  );
}