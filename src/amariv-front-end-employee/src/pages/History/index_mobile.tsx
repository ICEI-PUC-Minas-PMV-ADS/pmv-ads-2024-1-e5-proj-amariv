import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { BottomNav } from "../../components/BottomNav";
import { HistoryGatheringViewer } from "./components/HistoryGatheringViewer";
import { AppContext } from "src/AppContext";
import { UserService } from "src/services/UserService";
import { useNotification } from "src/components/NotificationProvider";

/**
 * History page mobile
 */

export function HistoryMobilePage() {
  const { state: { token, gatheringItinerary }, dispatch } = React.useContext(AppContext);
  const notification = useNotification();

  /**
   * Events
   */

  const handleMenuExitClick = React.useCallback(async (): Promise<void> => {
    try {
      if (token) {
        await UserService.logout(token);
        dispatch({ type: 'logout' });
      }
    } catch (e: any) {
      notification(e);
    }
  }, [token, dispatch, notification]);

  /**
   * Layout
   */

  return (
    <div className="w-full h-full bg-[#E8F4EB] overflow-y-auto flex flex-col">
      <div className="w-screen flex-1 overflow-y-auto">
        <NavBar title="Histórico de coletas" onClickExit={handleMenuExitClick} />
        <div className="px-[2rem] py-[2rem]">
          <h2 className="text-2xl font-bold">Coletas concluídas</h2>
          <Spacer height='1rem' />
          {gatheringItinerary !== null &&
            <HistoryGatheringViewer historyGatherings={gatheringItinerary?.coletas ?? []} />}
          <Spacer height='2rem' />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}