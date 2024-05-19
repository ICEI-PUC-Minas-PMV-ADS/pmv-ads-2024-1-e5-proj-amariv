import { Gathering } from "src/models/Gathering";
import { PageBaseController } from "../../framework/controller";
import { GatheringItinerary } from "src/models/GatheringItinerary";
import { GatheringService } from "src/services/GatheringService";

/**
 * Routes state.
 */

export type RoutesState = {
  currentGathering: Gathering | null,
};

/**
 * Routes initial state.
 */

export const initialRoutesState: RoutesState = {
  currentGathering: null,
};

/**
 * Routes action.
 */

export type RoutesAction = {
  type: 'set_gathering',
  payload: { currentGathering: Gathering | null },
};

/**
 * Routes controller.
 */

export class RoutesController extends PageBaseController<RoutesState, RoutesAction> {
  async setFinishGathering(
    token: string,
    gatheringItineraryId: number,
    gatheringId: number,
    isSuccess: boolean,
  ): Promise<GatheringItinerary> {
    return await GatheringService.setFinishGathering(token, gatheringItineraryId, gatheringId, isSuccess);
  }

  setCurrentRoute(currentGathering: Gathering | null) {
    this.dispatch({ type: 'set_gathering', payload: { currentGathering } });
  }

  doReducer(prevState: RoutesState, action: RoutesAction): RoutesState {
    switch (action.type) {
      case 'set_gathering':
        return { ...prevState, currentGathering: action.payload.currentGathering };
    }
    return prevState;
  }
}