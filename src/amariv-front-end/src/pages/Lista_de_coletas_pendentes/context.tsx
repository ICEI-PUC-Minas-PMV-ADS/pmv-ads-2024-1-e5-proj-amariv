import { createPageContext } from "../../framework/context";
import { ListaDeColetasPendentesController } from "./controller";
import { initialListaDeColetasPendentesState } from "./state";

/**
 * ListaDeColetasPendentesContext
 */

export const ListaDeColetasPendentesContext = createPageContext({
  controllerClass: ListaDeColetasPendentesController,
  initialState: initialListaDeColetasPendentesState,
});