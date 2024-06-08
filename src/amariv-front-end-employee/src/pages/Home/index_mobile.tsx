import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { Reminder } from "./components/Reminder";
import { Button } from "../../components/Button";
import { BottomNav } from "../../components/BottomNav";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "./context";
import { DefaultMap } from "src/components/DefaultMap";
import { AppContext } from "src/AppContext";
import { Gathering } from "src/models/Gathering";
import { useNotification } from "src/components/NotificationProvider";

/**
 * Home page mobile
 */

export function HomeMobilePage() {
  const ctrl = HomeContext.usePageController();
  const { state: { gatheringItinerary }, dispatch } = React.useContext(AppContext);
  const { userName, startPosition } = HomeContext.usePageState();
  const [routeItems, setRouteItems] = React.useState<Gathering[] | null>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [prevTime, setPrevTime] = React.useState<number | null>(null);
  const navigate = useNavigate();
  const notification = useNotification();

  /**
   * Effects
   */

  React.useEffect(() => {
    (async function () {
      try {
        if (map && startPosition && gatheringItinerary) {
          const estimatedTime = await ctrl
            .renderCurrentRouteAndGenerateTimeEstimated(map, startPosition, gatheringItinerary);
          setPrevTime(estimatedTime);
        }
      } catch (e: any) {
        notification(e);
      }
    })();
  }, [ctrl, map, startPosition, gatheringItinerary, notification]);

  React.useEffect(() => {
    if (gatheringItinerary && routeItems === null) {
      const filteredGatherings = gatheringItinerary.coletas.filter((i) => i.status === true && i.isSuccess === false && i.delete === false);
      const sortedAndFilteredGatherings = filteredGatherings.sort((a, b) => a.posicaoLista - b.posicaoLista);
      setRouteItems(sortedAndFilteredGatherings);
    }
  }, [gatheringItinerary, routeItems, ctrl]);

  /**
   * Events
   */

  const handleRoutesClick = React.useCallback((_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    navigate("/routes", { replace: true });
  }, [navigate]);

  const handleMenuExitClick = React.useCallback(async (): Promise<void> => {
    dispatch({ type: 'set_show_logout_confirmation', payload: true });
  }, [dispatch]);

  /**
   * Layout
   */

  return (
    <>
      {(startPosition !== null) &&
        <div className="w-full h-full bg-[#E8F4EB] overflow-y-auto flex flex-col">
          <div className="w-screen flex-1 overflow-y-auto">
            <NavBar title="AMARIV" onClickExit={handleMenuExitClick} />
            <div className="px-[2rem] py-[2rem]">
              <h2 className="text-2xl font-bold">Bem vindo {userName}!</h2>
              <Spacer height="1rem" />
              {(gatheringItinerary !== null && routeItems && routeItems.length > 0)
                ? <>
                  <Reminder duration={prevTime} gatheringItinerary={gatheringItinerary} />
                  <Spacer height="1rem" />
                  <DefaultMap center={startPosition} onCreateMap={setMap} />
                  <Spacer height="1rem" />
                  <div className="w-full flex justify-end">
                    <Button
                      className="w-[10rem]"
                      color="secondary"
                      rounded="sm"
                      label="Ver rotas"
                      onClick={handleRoutesClick} />
                  </div>
                </>
                : <>
                  <p className="text-2xl">Não ha rotas definidas!</p>
                </>}
              <Spacer height="2rem" />
            </div>
          </div>
          <BottomNav />
        </div>}
    </>
  );
}