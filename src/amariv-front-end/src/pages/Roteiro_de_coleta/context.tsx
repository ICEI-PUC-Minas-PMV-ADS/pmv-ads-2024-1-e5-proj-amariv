import { createPageContext } from "../../framework/context";
import { RoteiroDeColetaController } from "./controller";
import { RoteiroDeColetaAction, RoteiroDeColetaState, initialRoteiroDeColetaState } from "./state";

/**
 * RoteiroDeColetaContext
 */

export const RoteiroDeColetaContext = createPageContext<
  RoteiroDeColetaState,
  RoteiroDeColetaAction,
  RoteiroDeColetaController
>({
  controllerClass: RoteiroDeColetaController,
  initialState: initialRoteiroDeColetaState,
});