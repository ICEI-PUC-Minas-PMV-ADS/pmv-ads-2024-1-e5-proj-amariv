import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { HistoryGatheringViewer } from "./components/HistoryGatheringViewer";
import { HistoryContext } from "./context";
import { useNavigate } from "react-router-dom";

/**
 * History page desktop
 */

export function HistoryDesktopPage() {
  const { historyGatherings } = HistoryContext.usePageState();
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
          </div>
        </NavBar>
        <div className="w-full flex justify-center">
          <div className="w-[30rem] px-[2rem] py-[2rem]">
            <h2 className="text-2xl font-bold">Coletas concluídas</h2>
            <Spacer height='1rem' />
            <HistoryGatheringViewer historyGatherings={historyGatherings} />
            <Spacer height='2rem' />
          </div>
        </div>
      </div>
    </div>
  );
}