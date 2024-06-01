import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { BottomNav } from "../../components/BottomNav";
import { HistoryGatheringViewer } from "./components/HistoryGatheringViewer";
import { AppContext } from "src/AppContext";

/**
 * History page mobile
 */

export function HistoryMobilePage() {
  const { state: { gatheringItinerary }, dispatch } = React.useContext(AppContext);

  /**
   * Events
   */

  const handleMenuExitClick = React.useCallback(async (): Promise<void> => {
    dispatch({ type: 'set_show_logout_confirmation', payload: true });
  }, [dispatch]);

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