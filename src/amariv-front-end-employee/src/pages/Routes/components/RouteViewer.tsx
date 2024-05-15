import React from "react";
import { isDesktop } from "react-device-detect";
import { Gathering } from "src/models/Gathering";
import { GatheringItinerary } from "src/models/GatheringItinerary";

/**
 * RouteViewerProps
 */

export type RouteViewerProps = {
  gatheringItinerary: GatheringItinerary | null,
};

/**
 * RouteViewer
 */

export function RouteViewer({ gatheringItinerary }: RouteViewerProps) {
  const [currentRoute, setCurrentRoute] = React.useState<Gathering | null>(null);

  /**
   * Effects
   */
  React.useEffect(() => {
    if (gatheringItinerary !== null) {
      const filteredGatherings = gatheringItinerary.coletas.filter((i) => i.status === true && i.delete === false);
      const sortedAndFilteredGatherings = filteredGatherings.sort((a, b) => a.posicaoLista - b.posicaoLista);
      setCurrentRoute(sortedAndFilteredGatherings[0]);
    }
  }, [gatheringItinerary]);

  /**
   * Layout
   */

  return (
    <div className="w-full bg-[#53735B] rounded">
      <div className="w-full p-3">
        <p className="text-lg text-white font-bold">
          {currentRoute?.usuario?.nome ?? currentRoute?.clienteNome}
        </p>
        <p className="text-sm text-[#CADDA8] font-normal">
          {currentRoute?.endereco.logradouro}, {currentRoute?.endereco.numero}<br />
          {currentRoute?.endereco.bairro} - CEP: {currentRoute?.endereco.cep}
        </p>
      </div>

      <div className="w-full flex flex-row border-t border-[#ffffff40]">
        <div className="flex-1 p-4 text-white font-normal">
          Celular: {currentRoute?.clienteCel}
        </div>
        {!isDesktop &&
          <div className="py-4 px-[2rem] border-s border-[#ffffff30] text-[#CADDA8] font-bold">
            Ligar
          </div>}
      </div>

      <div className="w-full flex flex-row border-t border-b border-[#ffffff40]">
        <div className="flex-1 p-4 text-white font-normal">
          Telefone: {currentRoute?.usuario?.telefone ?? currentRoute?.clienteTel}
        </div>
        {!isDesktop &&
          <div className="py-4 px-[2rem] border-s border-[#ffffff40] text-[#CADDA8] font-bold">
            Ligar
          </div>}
      </div>

      <div className="w-full p-3 text-white font-bold">
        Materiais: {currentRoute?.listaItensColeta}
      </div>

      <div className="w-full flex items-stretch flex-row border-t border-[#ffffff40] text-white font-bold">
        {!isDesktop && <div className="flex-1 text-[#CADDA8] text-xl font-bold flex justify-center items-center">
          <div className="py-4">Navegar</div>
        </div>}
        <div className="flex-1  text-xl text-[#CADDA8] font-bold flex justify-center items-center border-s border-[#ffffff40]">
          <div className="py-4">Finalizar</div>
        </div>
      </div>
    </div>
  );
}