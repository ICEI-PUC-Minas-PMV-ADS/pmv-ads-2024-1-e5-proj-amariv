import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { RouteViewer } from "./components/RouteViewer";
import { NextRoutesViewer } from "./components/NextRoutesViewer";
import { AppContext } from "src/AppContext";
import { useNavigate } from "react-router-dom";

/**
 * Routes page desktop
 */

export function RoutesDesktopPage() {
  const { state: { gatheringItinerary } } = React.useContext(AppContext);
  const navigate = useNavigate();

  /**
   * Events
   */

  const handleMenuHomeClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/", { replace: true });
  }, [navigate]);

  const handleMenuHistoryClick = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    navigate("/history", { replace: true });
  }, [navigate]);

  /**
   * Layout
   */

  return (
    <div className="w-screen h-screen bg-[#E8F4EB] overflow-y-auto flex flex-col">
      <div className="w-screen flex-1 overflow-y-auto">
        <NavBar title="Rotas">
          <div className="flex flex-row">
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuHomeClick}>Home</div>
            <Spacer width="2rem" />
            <div className="text-[#ffffff] cursor-pointer">Rotas</div>
            <Spacer width="2rem" />
            <div className="text-[#E8F4EB] cursor-pointer" onClick={handleMenuHistoryClick}>Historico de coletas</div>
          </div>
        </NavBar>
        <div className="flex justify-center px-[2rem] py-[2rem]">
          <div className="w-[30vw]">
            <h2 className="text-2xl font-bold">Rota atual</h2>
            <Spacer height='1rem' />
            <RouteViewer />
            <Spacer height='2rem' />
            <h2 className="text-2xl font-bold">Proximas rotas</h2>
            <p className="font-md text-[#6E6E6E]">Arraste para reordenar</p>
            <Spacer height='1rem' />
            <NextRoutesViewer gatheringItinerary={gatheringItinerary} />
            <Spacer height='2rem' />
          </div>
        </div>
      </div>
    </div>
  );
}