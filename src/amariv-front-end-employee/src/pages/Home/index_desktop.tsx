import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { Reminder } from "./components/Reminder";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "./context";
import { DefaultMap } from "src/components/DefaultMap";
import { AppContext } from "src/AppContext";

/**
 * Home page desktop
 */

export function HomeDesktopPage() {
  const ctrl = HomeContext.usePageController();
  const { state: { token, gatheringItinerary } } = React.useContext(AppContext);
  const { userName, startPosition } = HomeContext.usePageState();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [prevTime, setPrevTime] = React.useState<number | null>(null);
  const navigate = useNavigate();

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
      } catch (e) {
        console.log(e);
      }
    })();
  }, [ctrl, map, startPosition, gatheringItinerary]);

  /**
   * Events
   */

  const handleRoutesClick = React.useCallback((_: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    navigate("/routes", { replace: true });
  }, [navigate]);

  const handleMenuRouteClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/routes", { replace: true });
  }, [navigate]);

  const handleMenuHistoryClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/history", { replace: true });
  }, [navigate]);

  const handlePopulateClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    try {
      if (token) {
        ctrl.populateData(token);
      }
    } catch (e) {
      console.log(e);
    }
  }, [ctrl, token]);

  /**
   * Layout
   */

  return (
    <>
      {(startPosition !== null) &&
        <div className="w-screen h-screen bg-[#E8F4EB] overflow-y-auto flex flex-col">
          <div className="w-screen flex-1 overflow-y-auto">
            <NavBar title="Home">
              <div className="flex flex-row">
                <div className="text-[#ffffff] cursor-pointer">Home</div>
                <Spacer width="2rem" />
                <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuRouteClick}>Rotas</div>
                <Spacer width="2rem" />
                <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuHistoryClick}>Historico de coletas</div>
              </div>
            </NavBar>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-[30vw] px-[2rem] py-[2rem]">
                <h2 className="text-2xl font-bold">Bem vindo {userName}!</h2>
                <Spacer height="1rem" />
                {gatheringItinerary !== null
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
                        label="Popular dados"
                        onClick={handlePopulateClick} />
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
          </div>
        </div>}
    </>
  );
}