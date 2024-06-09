import { ReadColetaDto } from "../../models/ColetaDtos/ReadColetaDto";

/**
 * ListaDeColetasPendentesState
 */

export type ListaDeColetasPendentesState = {
  coletas: ReadColetaDto[],
};

/**
 * initialListaDeColetasPendentesState
 */
export const initialListaDeColetasPendentesState: ListaDeColetasPendentesState = {
  coletas: [],
};

/**
 * ListaDeColetasPendentesAction
 */

export type ListaDeColetasPendentesAction = {
  type: 'set_coletas',
  payload: ReadColetaDto[],
};
