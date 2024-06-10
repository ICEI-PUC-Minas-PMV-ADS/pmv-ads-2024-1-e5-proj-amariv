import { createPageContext } from "../../framework/context";
import { HistoryAction, HistoryController, HistoryState, initialHistoryState } from "./controller";

/**
 * History context.
 */

export const HistoryContext = createPageContext<
  HistoryState,
  HistoryAction,
  HistoryController
>({
  controllerClass: HistoryController,
  initialState: initialHistoryState,
});