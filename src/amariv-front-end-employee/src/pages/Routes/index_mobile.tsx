import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { BottomNav } from "../../components/BottomNav";
import { RouteViewer } from "./components/RouteViewer";
import { NextRoutesViewer } from "./components/NextRoutesViewer";
import { AppContext } from "src/AppContext";
import { Button } from "src/components/Button";
import { Gathering } from "src/models/Gathering";
import { GatheringItineraryService } from "src/services/GatheringItineraryService";
import { RoutesContext } from "./context";

/**
 * Routes page mobile
 */

export function RoutesMobilePage() {
  const ctrl = RoutesContext.usePageController();
  const { state: { token, gatheringItinerary }, dispatch } = React.useContext(AppContext);
  const [lastRouteItems, setLastRouteItems] = React.useState<Gathering[]>([]);
  const [routeItems, setRouteItems] = React.useState<Gathering[]>([]);
  const [hasChange, setHasChange] = React.useState<boolean>(false);
  const [showConfirm, setShowConfirm] = React.useState<boolean>(true);
  const [isSuccess, setIsSuccess] = React.useState<boolean | null>(null);

  /**
   * Effects.
   */
  React.useEffect(() => {
    if (gatheringItinerary && routeItems.length === 0) {
      const filteredGatherings = gatheringItinerary.coletas.filter((i) => i.status === false && i.delete === false);
      const sortedAndFilteredGatherings = filteredGatherings.sort((a, b) => a.posicaoLista - b.posicaoLista);
      if (sortedAndFilteredGatherings.length > 0) {
        ctrl.setCurrentRoute(sortedAndFilteredGatherings[0]);
      }
      setRouteItems(sortedAndFilteredGatherings);
      setLastRouteItems(sortedAndFilteredGatherings);
    }
  }, [gatheringItinerary, routeItems, ctrl]);

  /**
   * Events
   */
  const onUpdateRouteItems = React.useCallback((newRoute: Gathering[]) => {
    if (newRoute.length > 0) {
      ctrl.setCurrentRoute(newRoute[0]);
    }
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
  }, [lastRouteItems, ctrl]);

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
          setHasChange(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token, gatheringItinerary, routeItems, dispatch]);

  const handleFinishGathering = React.useCallback(async (gatheringId: number): Promise<void> => {
    try {
      if (isSuccess === null) {
        if (showConfirm === false) {
          setShowConfirm(true);
        } else {
          if (token && gatheringItinerary && isSuccess !== null) {
            const updatedGatheringItinerary = await ctrl.setFinishGathering(
              token,
              gatheringItinerary.id,
              gatheringId,
              isSuccess,
            );

            dispatch({ type: 'set_gathering_itinerary', payload: updatedGatheringItinerary });

            setShowConfirm(false);
            setIsSuccess(null);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [gatheringItinerary, isSuccess, showConfirm, token, dispatch]);

  const handleModalYes = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setIsSuccess(true);
  }, []);

  const handleModalNo = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setIsSuccess(false);
  }, []);

  const handleModalCancel = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setShowConfirm(false);
  }, []);

  /**
   * Layout
   */

  return (
    <>
      {/*
        Confirm modal
      */}

      {showConfirm && <>
        <div className="w-full h-full bg-[#000000A0] absolute">
          <div className="w-[80%] relative bg-white p-4 rounded left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2">
            <h2 className="text-center">Você confirmar a finalização desta rota?</h2>
            <Spacer height=".5rem" />
            <h3 className="text-center font-bold">A coleta foi realizada?</h3>
            <Spacer height=".5rem" />
            <div>
              <div className="flex flex-row">
                <Button label="Sim" className="w-1/2" onClick={handleModalYes} />
                <div className="w-[1px] h-full bg-[#E8F4EB]"></div>
                <Button label="Não" className="w-1/2" onClick={handleModalNo} />
              </div>
              <div className="w-full h-[1px] bg-[#E8F4EB]"></div>
              <Button label="Cancelar" onClick={handleModalCancel} />
            </div>
          </div>
        </div>
      </>}

      {/*
        Main page
      */}

      <div className="w-full h-full bg-[#E8F4EB] overflow-y-auto flex flex-col">
        <div className="w-full flex-1 overflow-y-auto">
          <NavBar title="Rotas" />
          <div className="px-[2rem] py-[2rem]">
            {gatheringItinerary !== null
              ? <>
                <h2 className="text-2xl font-bold">Rota atual</h2>
                <Spacer height='1rem' />
                <RouteViewer canEdit={hasChange !== true} onFinishGathering={handleFinishGathering} />
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
        <BottomNav />
      </div>
    </>
  );
}