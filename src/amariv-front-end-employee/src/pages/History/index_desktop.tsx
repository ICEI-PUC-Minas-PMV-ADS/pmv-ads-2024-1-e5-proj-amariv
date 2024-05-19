import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { HistoryGatheringViewer } from "./components/HistoryGatheringViewer";
import { useNavigate } from "react-router-dom";
import { AppContext } from "src/AppContext";
import { UserService } from "src/services/UserService";
import { useNotification } from "src/components/NotificationProvider";

/**
 * History page desktop
 */

export function HistoryDesktopPage() {
  const { state: { token, gatheringItinerary }, dispatch } = React.useContext(AppContext);
  const notification = useNotification();
  const navigate = useNavigate();

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
    try {
      if (token) {
        await UserService.logout(token);
        dispatch({ type: 'logout' });
      }
    } catch (e: any) {
      notification(e.message);
    }
  }, [token, dispatch, notification]);

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
              <HistoryGatheringViewer historyGatherings={gatheringItinerary?.coletas ?? []} />}
            <Spacer height='2rem' />
          </div>
        </div>
      </div>
    </div>
  );
}