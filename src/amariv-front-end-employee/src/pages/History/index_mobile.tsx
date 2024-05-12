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
  const { state: { gatheringItinerary } } = React.useContext(AppContext);

  /**
   * Layout
   */

  return (
    <div className="w-screen h-screen bg-[#E8F4EB] overflow-y-auto flex flex-col">
      <div className="w-screen flex-1 overflow-y-auto">
        <div className="w-full h-[1.5rem] bg-[#53735B]"></div>
        <NavBar title="Histórico de coletas" />
        <div className="px-[2rem] py-[2rem]">
          <h2 className="text-2xl font-bold">Coletas concluídas</h2>
          <Spacer height='1rem' />
          {gatheringItinerary !== null &&
            <HistoryGatheringViewer historyGatherings={gatheringItinerary?.gatherings ?? []} />}
          <Spacer height='2rem' />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}