import React from "react";
import { isDesktop } from "react-device-detect";
import { RoutesContext } from "../context";

/**
 * RouteViewerProps
 */
export type RouteViewerProps = {
  canEdit: boolean,
  onFinishGathering: (gatheringId: number) => void,
};

/**
 * RouteViewer
 */

export function RouteViewer({ canEdit, onFinishGathering }: RouteViewerProps) {
  const { currentGathering } = RoutesContext.usePageState()

  /**
   * Events
   */

  const handleNavigate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (currentGathering) {
      window.open(`google.navigation:q=${currentGathering.lat},${currentGathering.lon}&mode=d`, '_system');
    }
  }, [currentGathering]);

  const handleStartFinishGathering = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (currentGathering) {
      onFinishGathering(currentGathering.id)
    }
  }, [onFinishGathering, currentGathering]);

  /**
   * Layout
   */

  return (
    <>
      <div className="w-full bg-[#53735B] rounded">
        <div className="w-full p-3">
          <p className="text-lg text-white font-bold">
            {currentGathering?.usuario?.nome ?? currentGathering?.clienteNome}
          </p>
          <p className="text-sm text-[#CADDA8] font-normal">
            {currentGathering?.endereco.logradouro}, {currentGathering?.endereco.numero}<br />
            {currentGathering?.endereco.bairro} - CEP: {currentGathering?.endereco.cep}
          </p>
        </div>

        <div className="w-full flex flex-row border-t border-[#ffffff40]">
          <div className="flex-1 p-4 text-white font-normal">
            Celular: {currentGathering?.clienteCel}
          </div>
          {!isDesktop &&
            <div className="py-4 px-[2rem] border-s border-[#ffffff30] text-[#CADDA8] font-bold">
              Ligar
            </div>}
        </div>

        <div className="w-full flex flex-row border-t border-b border-[#ffffff40]">
          <div className="flex-1 p-4 text-white font-normal">
            Telefone: {currentGathering?.usuario?.telefone ?? currentGathering?.clienteTel}
          </div>
          {!isDesktop &&
            <div className="py-4 px-[2rem] border-s border-[#ffffff40] text-[#CADDA8] font-bold">
              Ligar
            </div>}
        </div>

        <div className="w-full p-3 text-white">
          <strong>Materiais:</strong> {currentGathering?.listaItensColeta ?? ""}.
        </div>

        {canEdit &&
          <div className="w-full flex items-stretch flex-row border-t border-[#ffffff40] text-white font-bold">
            {!isDesktop && <div className="flex-1 text-[#CADDA8] text-xl font-bold flex justify-center items-center" onClick={handleNavigate}>
              <div className="py-4">Navegar</div>
            </div>}
            <div
              className="flex-1  text-xl text-[#CADDA8] font-bold flex justify-center items-center border-s border-[#ffffff40]"
              onClick={handleStartFinishGathering}>
              <div className="py-4">Finalizar</div>
            </div>
          </div>}
      </div>
    </>
  );
}