import React from "react";
import { NavBar } from "../../components/NavBar";
import { Spacer } from "../../components/Spacer";
import { BottomNav } from "../../components/BottomNav";
import { RouteViewer } from "./components/RouteViewer";
import { NextRoutesViewer } from "./components/NextRoutesViewer";
import { AppContext } from "src/AppContext";

/**
 * Routes page mobile
 */

export function RoutesMobilePage() {
  const { state: { gatheringItinerary } } = React.useContext(AppContext);

  /**
   * Layout
   */

  return (
    <div className="w-screen h-screen bg-[#E8F4EB] overflow-y-auto flex flex-col">
      <div className="w-screen flex-1 overflow-y-auto">
        <div className="w-full h-[1.5rem] bg-[#53735B]"></div>
        <NavBar title="Rotas" />
        <div className="px-[2rem] py-[2rem]">
          {gatheringItinerary !== null
            ? <>
              <h2 className="text-2xl font-bold">Rota atual</h2>
              <Spacer height='1rem' />
              <RouteViewer gatheringItinerary={gatheringItinerary} />
              <Spacer height='2rem' />
              <h2 className="text-2xl font-bold">Proximas rotas</h2>
              <p className="font-md text-[#6E6E6E]">Arraste para reordenar</p>
              <Spacer height='1rem' />
              <NextRoutesViewer gatheringItinerary={gatheringItinerary} />
              <Spacer height='2rem' />
            </>
            : <>
              <p className="text-2xl">Não ha rotas definidas!</p>
            </>}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}