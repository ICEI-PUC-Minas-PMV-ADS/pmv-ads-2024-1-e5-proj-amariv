import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { HistoryGatheringViewer } from "./components/HistoryGatheringViewer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/AppContext";
import { useNotification } from "src/components/NotificationProvider";
import { Gathering } from "src/models/Gathering";
import { QueryUtils } from "src/utils/QueryUtils";

/**
 * History page desktop
 */

export function HistoryDesktopPage() {
  const { state: { gatheringItinerary }, dispatch } = React.useContext(AppContext);
  const navigate = useNavigate();

  const [gatheringItems, setGatheringItems] = React.useState<Gathering[]>([]);
  const notification = useNotification();

  /**
   * Effect
   */

  React.useEffect(() => {
    (async () => {
      try {
        if (gatheringItinerary) {
          const finishedGatherings = QueryUtils.getFinishedGatheringsFromItinerary(gatheringItinerary);
          setGatheringItems(QueryUtils.sortGatheringByPosition(finishedGatherings));
        }
      } catch (e: any) {
        notification(e);
      }
    })();
  }, [gatheringItinerary, notification]);

  /**
   * Events
   */

  const handleMenuHomeClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/", { replace: true });
  }, [navigate]);

  const handleMenuRouteClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/routes", { replace: true });
  }, [navigate]);

  const handleMenuExitClick = React.useCallback(async (): Promise<void> => {
    dispatch({ type: 'set_show_logout_confirmation', payload: true });
  }, [dispatch]);

  /**
   * Layout
   */

  return (
    <div className="w-screen h-screen bg-[#E8F4EB] overflow-y-auto flex flex-col">
      <div className="w-screen flex-1 overflow-y-auto">
        <NavBar title="Histórico de coletas">
          <div className="flex flex-row">
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuHomeClick}>Home</div>
            <Spacer width="2rem" />
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuRouteClick}>Rotas</div>
            <Spacer width="2rem" />
            <div className="text-[#ffffff] cursor-pointer">Historico de coletas</div>
            <Spacer width="2rem" />
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuExitClick}>Sair</div>
          </div>
        </NavBar>
        <div className="w-full flex justify-center">
          <div className="w-[40rem] px-[2rem] py-[2rem]">
            <h2 className="text-2xl font-bold">Coletas concluídas</h2>
            <Spacer height='1rem' />
            {gatheringItinerary !== null &&
              <HistoryGatheringViewer historyGatherings={gatheringItems} />}
            <Spacer height='2rem' />
          </div>
        </div>
      </div>
    </div>
  );
}