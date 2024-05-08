import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { Reminder } from "./components/Reminder";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "./context";
import { DefaultMap } from "src/components/DefaultMap";
import { loader } from "src/AppMap";
import { GoogRoutesService } from "src/services/GoogRoutesService";
import { AppContext } from "src/AppContext";

/**
 * Home page desktop
 */

export function HomeDesktopPage() {
  const { state: { gatheringItinerary } } = React.useContext(AppContext);
  const { userName, startPosition } = HomeContext.usePageState();
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [prevTime, setPrevTime] = React.useState<number | null>(null);
  const navigate = useNavigate();

  /**
   * Effects
   */

  React.useEffect(() => {
    (async function () {
      if (map && startPosition && gatheringItinerary) {
        const { PinElement, AdvancedMarkerElement } = await loader.importLibrary("marker");
        const pin = new PinElement({ background: 'blue', glyphColor: 'white' });
        const intermediates: { lat: number, lon: number }[] = [];

        // Origin
        new AdvancedMarkerElement({
          map,
          content: pin.element,
          position: { lat: startPosition.lat, lng: startPosition.lon },
        });

        for (let i = 0; i < gatheringItinerary.itemsDeRoteiroDeColeta.length; i++) {
          const g = gatheringItinerary.itemsDeRoteiroDeColeta[i];

          intermediates.push(g.geoLocation);

          // First gathering
          new AdvancedMarkerElement({
            map, position: {
              lat: g.geoLocation.lat,
              lng: g.geoLocation.lon,
            },
          });
        }

        const r = await GoogRoutesService.computeRoutes({
          origin: startPosition,
          destination: startPosition,
          intermediates: intermediates,
        });

        const d = r.routes[0].duration as string;
        const normalizedDuration = d.substring(0, d.length - 1);
        setPrevTime(parseInt(normalizedDuration) / 60);

        // Trace route
        new google.maps.Polyline({
          map,
          path: google.maps.geometry.encoding.decodePath(r.routes[0].polyline.encodedPolyline),
          strokeColor: 'green',
        });
      }
    })();
  }, [map, startPosition, gatheringItinerary]);

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

  /**
   * Layout
   */

  return (
    <>
      {(startPosition !== null && gatheringItinerary !== null) &&
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
                <Spacer height="2rem" />
              </div>
            </div>
          </div>
        </div>}
    </>
  );
}