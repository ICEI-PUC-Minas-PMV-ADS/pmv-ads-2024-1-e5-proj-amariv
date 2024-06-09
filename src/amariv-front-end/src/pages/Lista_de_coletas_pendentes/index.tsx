import React from "react";
import { PageComponent } from "../../framework/component";
import { ListaDeColetasPendentesContext } from "./context";
import { ColetaViewerList } from "./components/ColetaViewerList";

/**
 * ListaDeColetasPendentesPage 
 */

const ListaDeColetasPendentesPageImpl = () => {
  const token = '';
  const state = ListaDeColetasPendentesContext.usePageState();
  const ctrl = ListaDeColetasPendentesContext.usePageController();

  /**
   * Effect
   */

  React.useEffect(() => {
    ctrl?.getAll(token);
  }, [ctrl, token]);

  /**
   * Events
   */

  const handleAprovarColeta = React.useCallback((coletaId: number): void => {
    ctrl?.aprovarColeta(token, coletaId);
  }, [token]);

  const handleRecusarColeta = React.useCallback((coletaId: number): void => {
    ctrl?.recusarColeta(token, coletaId);
  }, [token]);

  /**
   * Layout
   */

  return (
    <div className="w-full min-h-screen bg-[#F4FAF6]">
      <div className="flex ms-[4rem] me-[4rem]">
        <div className="w-full">

          {/*
            Seletor de roteiro.
          */}

          <h1 className="text-[2rem] text-[#53735B] pt-[2rem]">Lista de coletas solicitadas</h1>
          <div className="h-[2rem]"></div>

          {/*
            Lista de coletas.
          */}

          <div className="w-full px-4">
            <ColetaViewerList
              coletas={state.coletas}
              onAprovarColeta={handleAprovarColeta}
              onRecusarColeta={handleRecusarColeta}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export const ListaDeColetasPendentesPage = PageComponent(
  ListaDeColetasPendentesPageImpl,
  ListaDeColetasPendentesContext.Provider,
);