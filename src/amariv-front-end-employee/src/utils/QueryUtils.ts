import { Gathering } from "src/models/Gathering";
import { GatheringItinerary } from "src/models/GatheringItinerary";

export class QueryUtils {
  static getPendentGatheringsFromItinerary(gatheringItineraty: GatheringItinerary) {
    return gatheringItineraty.coletas.filter((gathering: Gathering): boolean => {
      const isActive = gathering.status === true;
      const isNotCanceled = gathering.cancelada === false;
      const isNotDeleted = gathering.delete === false;
      const isNotFinished = gathering.isSuccess === false;
      return isActive && isNotCanceled && isNotDeleted && isNotFinished;
    });
  }

  static getFinishedGatheringsFromItinerary(gatheringItineraty: GatheringItinerary) {
    return gatheringItineraty.coletas.filter((gathering: Gathering): boolean => {
      const isActive = gathering.status === true;
      const isNotDeleted = gathering.delete === false;
      const isCanceled = gathering.cancelada === false;
      const isFinished = gathering.isSuccess === false;
      return isActive && isNotDeleted && (isCanceled || isFinished);
    });
  }

  static sortGatheringByPosition(gatherings: Gathering[]): Gathering[] {
    return gatherings.sort((a, b) => a.posicaoLista!! - b.posicaoLista!!);
  }
}