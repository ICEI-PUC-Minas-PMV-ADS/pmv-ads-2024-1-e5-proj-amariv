import { getApiUrl } from "src/AppConstants";
import { GatheringItinerary } from "src/models/GatheringItinerary";

/**
 * GatheringService
 */

export class GatheringService {
  static async setFinishGathering(
    token: string,
    gatheringItineraryId: number,
    gatheringId: number,
    isSuccess: boolean,
  ): Promise<GatheringItinerary> {
    const response = await fetch(getApiUrl() + "SetFinishRoute", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        gatheringItineraryId,
        gatheringId,
        isSuccess,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  }
}