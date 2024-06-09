import React from "react";
import SelectInput from "../../components/re_components/Inputs/SelectInput";
import SelectModal from "../../components/re_components/SelectModal";

import { PageComponent } from "../../framework/component";
import { DefaultMap } from "./components/DefaultMap";
import { RoteiroDeColetaContext } from "./context";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FuncionarioDto } from "../../models/FuncionarioDtos/FuncionarioDto";
import { InputDate } from "../../components/InputDate";
import { useSearchParams } from "react-router-dom";
import { RoteiroDeColetaDto } from "../../models/RoteiroDeColetaDtos/RoteiroDeColetaDto";
import { NextRoutesViewer } from "./components/NextRoutesViewer";
import { ReadColetaDto } from "../../models/ColetaDtos/ReadColetaDto";
import CustomModal from "../../components/CustomModal";

/**
 * RoteiroDeColetaPageProps
 */

export type RoteiroDeColetaPageProps = {};

/**
 * RoteiroDeColetaPage
 */

const RoteiroDeColetaPageImpl = () => {
  const token = '';
  const state = RoteiroDeColetaContext.usePageState();
  const ctrl = RoteiroDeColetaContext.usePageController();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const [canOptimizeRoute, setCanOptimizeRoute] = React.useState(window.localStorage.getItem('optimizeFlag') === null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [roteiroDeColetaId, setRoteiroDeColetaId] = React.useState<number | null>(null);
  const [dataRoteiro, setDataRoteiro] = React.useState<string>("");
  const [funcionarioId, setFuncionarioId] = React.useState<string>("");
  const [maxColetas, setMaxColetas] = React.useState<string>("");
  const [canBeSaved, setCanBeSaved] = React.useState(false);
  const [canBeCreated, setCanBeCreated] = React.useState(false);

  const [hasRouteChange, setHasRouteChange] = React.useState<boolean>(false);
  const [lastRouteItems, setLastRouteItems] = React.useState<ReadColetaDto[]>([]);

  const [selectedAvailableRoute, setSelectedAvailableRoute] = React.useState<ReadColetaDto | null>(null);
  const [modalAvailableRouteOpen, setModalAvailableRouteOpen] = React.useState(false);

  const [selectedRoteiroRoute, setSelectedRoteiroRoute] = React.useState<ReadColetaDto | null>(null);
  const [modalRoteiroRouteOpen, setModalRoteiroRouteOpen] = React.useState(false);

  const [erroAvailableRoteiroDeColetas, setErroAvailableRoteiroDeColetas] = React.useState(false);
  const [modalAvailableRoteiroDeColetasOpen, setModalAvailableRoteiroDeColetasOpen] = React.useState(false);

  const [erroFuncionario, setErroFuncionario] = React.useState(false);
  const [modalMaterialOpen, setModalMaterialOpen] = React.useState(false);

  /**
   * Effects
   */

  React.useEffect(() => {
    ctrl?.initialize(token);
  }, [ctrl]);

  React.useEffect(() => {
    try {
      if (ctrl && state.startPosition && roteiroDeColetaId) {
        ctrl.getColetasByDate(token, state.startPosition, roteiroDeColetaId);
      }
    } catch (e: any) {
      alert(e.message);
    }
  }, [ctrl, state.startPosition, roteiroDeColetaId]);

  React.useEffect(() => {
    try {
      if (searchParams) {
        const roId = searchParams.get("id");
        if (roId) {
          setRoteiroDeColetaId(parseInt(roId));
        }
      }
    } catch (e) {
      alert(e);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (state.roteiroDeColeta && state.roteiroDeColeta.dataRoteiro) {
      setDataRoteiro(`${state.roteiroDeColeta.dataRoteiro.split('T')[0]}`);
    }
    if (state.roteiroDeColeta && state.roteiroDeColeta.numeroMaxColetas) {
      setMaxColetas(state.roteiroDeColeta.numeroMaxColetas.toString());
    }
    if (state.roteiroDeColeta && state.roteiroDeColeta.funcionarioId) {
      setFuncionarioId(state.roteiroDeColeta.funcionarioId);
    }
    if (state.coletasRoteiro && lastRouteItems.length === 0) {
      setLastRouteItems(state.coletasRoteiro)
    }
  }, [
    lastRouteItems,
    state.coletasRoteiro,
    state.roteiroDeColeta,
  ]);

  React.useEffect(() => {
    ctrl?.renderRoutes(
      map,
      state.startPosition,
      state.coletasRoteiro,
      state.dadosDasRotas,
    );
  }, [
    map,
    ctrl,
    state.startPosition,
    state.coletasRoteiro,
    state.dadosDasRotas,
  ]);

  React.useEffect(() => {
    if (roteiroDeColetaId !== null && state.roteiroDeColeta !== null) {
      const dataRoteiroOri = state.roteiroDeColeta?.dataRoteiro?.split('T')[0];
      if (dataRoteiro !== dataRoteiroOri) {
        setCanBeSaved(true);
        return;
      }
      if (funcionarioId !== state.roteiroDeColeta?.funcionarioId) {
        setCanBeSaved(true);
        return;
      }
      if (maxColetas.length > 0 && maxColetas !== state.roteiroDeColeta?.numeroMaxColetas?.toString()) {
        setCanBeSaved(true);
        return;
      }
      setCanBeSaved(false);
    }
  }, [
    state.roteiroDeColeta,
    roteiroDeColetaId,
    dataRoteiro,
    funcionarioId,
    maxColetas,
  ]);

  React.useEffect(() => {
    if (roteiroDeColetaId === null || state.roteiroDeColeta === null) {
      if (dataRoteiro && funcionarioId && maxColetas && maxColetas.length > 0) {
        if (parseInt(maxColetas) > 0) {
          setCanBeCreated(true);
          return;
        }
      }
      setCanBeCreated(false);
    }
  }, [
    roteiroDeColetaId,
    state.roteiroDeColeta,
    dataRoteiro,
    funcionarioId,
    maxColetas,
  ]);

  /**
   * Events
   */

  const handleMaxColetaChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setMaxColetas(event.target.value);
  }, []);

  const handleSaveRoteiroDeColeta = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    try {
      if (!isPending && roteiroDeColetaId && state.startPosition) {
        setIsPending(true);

        const response = await ctrl.saveRoteiroDeColeta(token, state.startPosition, roteiroDeColetaId, funcionarioId, maxColetas, dataRoteiro);

        window.localStorage.removeItem('optimizeFlag');

        setCanOptimizeRoute(window.localStorage.getItem('optimizeFlag') === null);
        setLastRouteItems(response);
        setSelectedAvailableRoute(null);
        setModalAvailableRouteOpen(false);
        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [
    ctrl,
    token,
    isPending,
    roteiroDeColetaId,
    funcionarioId,
    maxColetas,
    dataRoteiro,
    state.startPosition,
  ]);

  const handleCreateRoteiroDeColeta = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    try {
      if (!isPending) {
        setIsPending(true);

        const response = await ctrl?.createRoteiroDeColeta(token, state.startPosition!, funcionarioId, maxColetas, dataRoteiro);

        window.localStorage.removeItem('optimizeFlag');

        ctrl?.initialize(token);

        setSearchParams({ id: response.roteiroDeColeta.id!.toString() });

        setCanOptimizeRoute(window.localStorage.getItem('optimizeFlag') === null);
        setLastRouteItems(response.coletasRoteiro);
        setRoteiroDeColetaId(response.roteiroDeColeta.id!);
        setSelectedAvailableRoute(null);
        setModalAvailableRouteOpen(false);
        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [
    ctrl,
    token,
    isPending,
    state.startPosition,
    funcionarioId,
    maxColetas,
    dataRoteiro,
    setSearchParams,
  ]);

  const onUpdateRouteItems = React.useCallback((newRoute: ReadColetaDto[]) => {
    if (!isPending) {
      setIsPending(true);

      if (newRoute.length !== lastRouteItems.length) {
        ctrl.changeRoutes(newRoute);
        setHasRouteChange(true);
        setIsPending(false);
        return;
      }

      for (let i = 0; i < lastRouteItems.length; i++) {
        if (lastRouteItems[i].id !== newRoute[i].id) {
          ctrl.changeRoutes(newRoute);
          setHasRouteChange(true);
          setIsPending(false);
          return;
        }
      }

      ctrl.changeRoutes(newRoute);

      setHasRouteChange(false);
      setIsPending(false);
    }
  }, [isPending, lastRouteItems, ctrl]);

  const handleUpdateRoutes = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    try {
      if (!isPending && ctrl && roteiroDeColetaId && state.coletasRoteiro && state.startPosition) {
        setIsPending(true);

        const newRoutes = await ctrl.updateRoutes(
          token,
          state.startPosition,
          roteiroDeColetaId,
          state.coletasRoteiro.map((g, i) => ({ id: g.id, posicaoLista: i })),
        );

        setHasRouteChange(false);
        setLastRouteItems(newRoutes);
        setCanOptimizeRoute(true);

        window.localStorage.removeItem('optimizeFlag');

        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [
    ctrl,
    token,
    isPending,
    roteiroDeColetaId,
    state.startPosition,
    state.coletasRoteiro,
  ]);

  const handleOptimizeRoute = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    try {
      if (!isPending && ctrl && state.startPosition && state.coletasRoteiro && roteiroDeColetaId && canOptimizeRoute) {
        setIsPending(true);

        window.localStorage.setItem('optimizeFlag', 'true');

        setCanOptimizeRoute(false);

        await ctrl.optimizeRoutes(
          token,
          state.startPosition,
          roteiroDeColetaId,
          state.coletasRoteiro,
        );

        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [
    ctrl,
    token,
    isPending,
    state.startPosition,
    state.coletasRoteiro,
    roteiroDeColetaId,
    canOptimizeRoute,
  ]);

  const handleRemoveRouteToRoteiroDeColeta = React.useCallback(async (route: ReadColetaDto | null) => {
    try {
      if (!isPending && route && route.id && roteiroDeColetaId && state.startPosition) {
        setIsPending(true);

        const response = await ctrl?.removeRouteToRoteiroDeColeta(
          token,
          state.startPosition,
          roteiroDeColetaId,
          route.id,
        );

        window.localStorage.removeItem('optimizeFlag');

        setCanOptimizeRoute(window.localStorage.getItem('optimizeFlag') === null);
        setLastRouteItems(response);
        setSelectedRoteiroRoute(null);
        setModalRoteiroRouteOpen(false);
        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [
    ctrl,
    token,
    isPending,
    roteiroDeColetaId,
    state.startPosition,
  ]);

  const handleAddRouteToRoteiroDeColeta = React.useCallback(async (coleta: ReadColetaDto | null) => {
    try {
      if (!isPending && coleta && coleta.id && roteiroDeColetaId && state.startPosition) {
        setIsPending(true);

        const response = await ctrl?.addRouteToRoteiroDeColeta(
          token,
          state.startPosition,
          roteiroDeColetaId,
          coleta.id,
        );

        window.localStorage.removeItem('optimizeFlag');

        setCanOptimizeRoute(window.localStorage.getItem('optimizeFlag') === null);
        setLastRouteItems(response);
        setSelectedAvailableRoute(null);
        setModalAvailableRouteOpen(false);
        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [
    ctrl,
    token,
    isPending,
    roteiroDeColetaId,
    state.startPosition,
  ]);

  const handleCancelarColeta = React.useCallback(async (coleta: ReadColetaDto | null): Promise<void> => {
    try {
      if (!isPending && coleta && coleta.id && state.startPosition && roteiroDeColetaId) {
        setIsPending(true);

        await ctrl?.cancelarColeta(token, state.startPosition, roteiroDeColetaId, coleta.id);

        setModalAvailableRouteOpen(false)
        setIsPending(false);
      }
    } catch (e: any) {
      setIsPending(false);
      alert(e.message);
    }
  }, [ctrl, isPending, roteiroDeColetaId, state.startPosition]);

  /**
   * Aux function
   */

  const getSelectedRoteiroDeColetaLabel = React.useCallback((): string => {
    if (state.availableRoteiroDeColetas.length === 0) {
      return "Selecionar";
    }
    const ro = state.availableRoteiroDeColetas.find(x => x.id === roteiroDeColetaId);
    if (!ro) {
      return "Selecionar";
    }
    const dtArr = ro.dataRoteiro!.split('T')[0].split('-');
    return `${ro.funcionario?.nome} (${dtArr[2]}/${dtArr[1]}/${dtArr[0]})`;
  }, [state.availableRoteiroDeColetas, roteiroDeColetaId]);

  console.log(funcionarioId);

  /**
   * Layout
   */

  return (
    <>

      {/*
        Rotas do roteiro
      */}

      <CustomModal
        title="Ações da rota"
        isOpen={modalRoteiroRouteOpen}
        onCancel={() => setModalRoteiroRouteOpen(false)}>

        <div className="w-full flex flex-col justify-center items-center">
          <Button
            label="Remover coleta do roteiro"
            className="w-[20rem]"
            fontSize="medium"
            onClick={() => handleRemoveRouteToRoteiroDeColeta(selectedRoteiroRoute)} />
        </div>
      </CustomModal>

      {/*
        Rotas não atreladas a um roteiro.
      */}

      <CustomModal
        title="Ações da rota"
        isOpen={modalAvailableRouteOpen}
        onCancel={() => setModalAvailableRouteOpen(false)}>

        <div className="w-full flex flex-col justify-center items-center">
          <Button
            label="Incluir coleta ao roteiro"
            className="w-[20rem]"
            fontSize="medium"
            onClick={() => handleAddRouteToRoteiroDeColeta(selectedAvailableRoute)} />
          <div className="h-[.4rem]"></div>
          <Button
            label="Reagendar coleta do roteiro"
            className="w-[20rem]"
            fontSize="medium"
            onClick={() => { }} />
          <div className="h-[.4rem]"></div>
          <Button
            label="Cancelar coleta do roteiro"
            className="w-[20rem]"
            fontSize="medium"
            onClick={() => handleCancelarColeta(selectedAvailableRoute)} />
        </div>
      </CustomModal>

      <SelectModal
        title="Selecionar funcionario"
        itens={state.funcionarios}
        labelField="nome"
        isOpen={modalMaterialOpen}
        onConfirmSelection={(item: FuncionarioDto) => {
          setFuncionarioId(item.id!);
          setModalMaterialOpen(false)
        }}
        onCancelSelection={() => setModalMaterialOpen(false)}
        valueField="id"
        value={funcionarioId} />

      <SelectModal
        title="Selecionar o roteiro"
        itens={[{ label: "Limpar", id: -1 }, ...state.availableRoteiroDeColetas]}
        labelField="label"
        isOpen={modalAvailableRoteiroDeColetasOpen}
        onConfirmSelection={(item: RoteiroDeColetaDto) => {
          if (item.id) {
            if (item.id > 0) {
              setSearchParams({ id: item.id!.toString() });
              setModalAvailableRoteiroDeColetasOpen(false)
            } else {
              ctrl.clearData();

              setFuncionarioId("");
              setMaxColetas("");
              setDataRoteiro("");
              setRoteiroDeColetaId(null);
              setSearchParams({});
              setModalAvailableRoteiroDeColetasOpen(false)
            }
          }
        }}
        onCancelSelection={() => setModalAvailableRoteiroDeColetasOpen(false)}
        valueField="id"
        value={roteiroDeColetaId} />

      <div className="w-full min-h-full bg-[#F4FAF6]">
        <div className="ms-[20rem] me-[4rem] flex">
          <div className="flex flex-col w-[90%]">

            {/*
              Seletor de roteiro.
            */}

            <h1 className="text-[2rem] text-[#53735B] pt-[2rem]">Selecione o roteiro</h1>

            <div className="w-full flex flex-col bg-[#E8F4EB] p-4">
              <div className="flex flex-row w-full">
                <div className="flex flex-row flex-1 items-center justify-stretch">
                  <SelectInput
                    title="Roteiro de coleta"
                    value={getSelectedRoteiroDeColetaLabel()}
                    error={erroAvailableRoteiroDeColetas}
                    errorMessage="Selecione o roteiro de coleta"
                    onClickSelectableInput={() => {
                      setErroAvailableRoteiroDeColetas(false);
                      setModalAvailableRoteiroDeColetasOpen(true);
                    }} />
                </div>
              </div>
            </div>

            <h1 className="text-[2rem] text-[#53735B] pt-[2rem]">Detalhes do roteiro</h1>

            {/*
              Barra de pesquisa
            */}

            <div className="w-full flex flex-col bg-[#E8F4EB] p-4">
              <div className="flex flex-row w-full">
                <div className="flex flex-row flex-1 items-center justify-stretch">
                  <SelectInput
                    title="Funcionario"
                    value={state.funcionarios.find(x => x.id === funcionarioId)?.nome ?? "Selecionar"}
                    error={erroFuncionario}
                    errorMessage="Selecione o Funcionario responsavel"
                    onClickSelectableInput={() => {
                      setErroFuncionario(false)
                      setModalMaterialOpen(true)
                    }} />
                </div>
                <div className="flex flex-row flex-1">
                  <div style={{ width: '1.75rem' }}></div>
                  <Input
                    label="Limite:"
                    type="number"
                    value={maxColetas}
                    onChange={handleMaxColetaChange} />
                  <div style={{ width: '1.75rem' }}></div>
                  <InputDate
                    label="Data:"
                    type="date"
                    value={dataRoteiro}
                    onChange={(evt) => setDataRoteiro(evt.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-end">
                {
                  (roteiroDeColetaId !== null && state.roteiroDeColeta !== null)
                    ? (
                      <>
                        <Button
                          label="Salvar"
                          color="secondary"
                          className="w-[10rem]"
                          fontSize="medium"
                          disabled={!canBeSaved}
                          onClick={handleSaveRoteiroDeColeta} />
                      </>
                    ) : (
                      <>
                        <Button
                          label="Criar roteiro"
                          color="secondary"
                          className="w-[10rem]"
                          fontSize="medium"
                          disabled={!canBeCreated}
                          onClick={handleCreateRoteiroDeColeta} />
                      </>
                    )
                }
              </div>
            </div>

            {/*
              Mapa
            */}

            <DefaultMap
              height="25rem"
              center={state.startPosition}
              onCreateMap={setMap} />

            {/*
              Lista de coletas atreladas ao roteiro
            */}

            <div className="w-full">
              <div style={{ height: '1.75rem' }}></div>
              <h1 className="text-[#53735B] text-[2rem]">Roteiro de coleta:</h1>
              <h3 className="text-[#6E6E6E] text-[1rem]">Arraste para reordenar</h3>
              <div style={{ height: '1.75rem' }}></div>
              <NextRoutesViewer
                routeItems={state.coletasRoteiro}
                onUpdateRouteItems={onUpdateRouteItems}
                onClickItem={(item) => {
                  setSelectedRoteiroRoute(item);
                  setModalRoteiroRouteOpen(true);
                }} />

              {roteiroDeColetaId !== null && (
                <div className="w-full flex flex-row justify-end mt-4">
                  <Button
                    label="Rota mais curta"
                    color="secondary"
                    className="w-[10rem]"
                    fontSize="medium"
                    disabled={!canOptimizeRoute || state.coletasRoteiro.length <= 1}
                    onClick={handleOptimizeRoute} />

                  <div className="w-[1rem]"></div>

                  <Button
                    label="Confirmar"
                    color="secondary"
                    className="w-[10rem]"
                    fontSize="medium"
                    disabled={!hasRouteChange}
                    onClick={handleUpdateRoutes} />
                </div>
              )}
            </div>

            {/*
              Lista de coletas para o dia, sem roteiro atrelado.
            */}

            <div>
              <div style={{ height: '1.75rem' }}></div>
              <h1 className="text-[#53735B] text-[2rem]">Coletas cadastradas:</h1>
              <h3 className="text-[#6E6E6E] text-[1rem]">Arraste para reordenar</h3>
              <div style={{ height: '1.75rem' }}></div>
              <NextRoutesViewer
                routeItems={state.coletasAprovadas}
                onUpdateRouteItems={() => { }}
                onClickItem={(item) => {
                  setSelectedAvailableRoute(item);
                  setModalAvailableRouteOpen(true);
                }}
              />
              <div className="h-[3rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const RoteiroDeColetaPage = PageComponent(RoteiroDeColetaPageImpl, RoteiroDeColetaContext.Provider);