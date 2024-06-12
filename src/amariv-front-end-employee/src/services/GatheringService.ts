import { TOKEN_KEY, getApiUrl } from "src/AppConstants";
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
    const roteiroDate = await fetch(getApiUrl() + "GetRoteiroDeColetaDate?roteiroDeColetaId=" + gatheringItineraryId, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    });

    const roteiroDeColetaDate = await roteiroDate.json();
    const [y, m, d] = roteiroDeColetaDate.split('T')[0].split('-');
    const startDate = new Date(y, m - 1, d, 0, 0, 0).toISOString();
    const endDate = new Date(y, m - 1, d, 23, 59, 59).toISOString();

    const response = await fetch(getApiUrl() + "SetFinishGathering", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        gatheringItineraryId,
        gatheringId,
        isSuccess,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
      }
      throw error;
    }
  }
}