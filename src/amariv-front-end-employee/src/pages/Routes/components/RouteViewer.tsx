import React from "react";
import moment from "moment";
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
  const { currentGathering } = RoutesContext.usePageState();

  /**
   * Events
   */

  const handleNavigate = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (currentGathering && canEdit) {
      window.open(`google.navigation:q=${currentGathering.lat},${currentGathering.lon}&mode=d`, '_system');
    }
  }, [currentGathering, canEdit]);

  const handleStartFinishGathering = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (currentGathering && canEdit) {
      onFinishGathering(currentGathering.id)
    }
  }, [onFinishGathering, currentGathering, canEdit]);

  const handleCelCall = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (currentGathering && canEdit) {
      let tel = currentGathering.clienteCel;
      if (tel && tel.length > 0) {
        tel = tel.replaceAll('(', '');
        tel = tel.replaceAll(')', '');
        tel = tel.replaceAll(' ', '');
        tel = tel.replaceAll('-', '');
        window.open('tel:' + tel);
      }
    }
  }, [currentGathering, canEdit]);

  const handleTelCall = React.useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (currentGathering && canEdit) {
      let tel = currentGathering.usuario?.telefone ?? currentGathering.clienteTel;
      if (tel && tel.length > 0) {
        tel = tel.replaceAll('(', '');
        tel = tel.replaceAll(')', '');
        tel = tel.replaceAll(' ', '');
        tel = tel.replaceAll('-', '');
        window.open('tel:' + tel);
      }
    }
  }, [currentGathering, canEdit]);

  /**
   * Aux functions
   */

  const formatDate = (dataHoraColeta: string | undefined) => {
    if (dataHoraColeta) {
      return moment.utc(dataHoraColeta).local().format('HH:mm');
    }
    return "";
  };

  /**
   * Layout
   */

  return (
    <>
      <div className="flex justify-center">
        {currentGathering?.localidadeExata === false &&
          <strong className="text-red-500 text-center">
            Não foi possivel determinar a localidade exata deste endereço.<br />
            Portanto, sua indicação no mapa pode não refletir o local correto.
          </strong>}
      </div>
      <div className="w-full bg-[#53735B] rounded">
        <div className="w-full p-3">
          <p className="text-md text-white font-bold border-b border-[#ffffff40] pb-4">
            <strong>Hora estimada:</strong> {formatDate(currentGathering?.dataDeColeta)}
          </p>
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
            <div
              className="py-4 px-[2rem] border-s border-[#ffffff30] font-bold"
              style={{ color: canEdit ? "#CADDA8" : "#9AAD78" }}
              onClick={handleCelCall}>
              Ligar
            </div>}
        </div>

        <div className="w-full flex flex-row border-t border-b border-[#ffffff40]">
          <div className="flex-1 p-4 text-white font-normal">
            Telefone: {currentGathering?.usuario?.telefone ?? currentGathering?.clienteTel}
          </div>
          {!isDesktop &&
            <div
              className="py-4 px-[2rem] border-s border-[#ffffff40] font-bold"
              style={{ color: canEdit ? "#CADDA8" : "#9AAD78" }}
              onClick={handleTelCall}>
              Ligar
            </div>}
        </div>

        <div className="w-full h-[6rem] p-3 text-white">
          <strong>Materiais:</strong> {currentGathering?.listaItensColeta ?? ""}.
        </div>

        <div className="w-full flex items-stretch flex-row border-t border-[#ffffff40] text-white font-bold">
          {!isDesktop &&
            <div
              className="flex-1 text-xl font-bold flex justify-center items-center"
              style={{ color: canEdit ? "#CADDA8" : "#9AAD78" }}
              onClick={handleNavigate}>
              <div className="py-4">Navegar</div>
            </div>
          }
          <div
            className="flex-1  text-xl font-bold flex justify-center items-center border-s border-[#ffffff40] cursor-pointer"
            style={{ color: canEdit ? "#CADDA8" : "#9AAD78" }}
            onClick={handleStartFinishGathering}>
            <div className="py-4">Finalizar</div>
          </div>
        </div>
      </div>
    </>
  );
}