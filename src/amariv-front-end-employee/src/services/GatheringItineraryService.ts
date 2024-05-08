import { getApiUrl } from "src/AppConstants";

/**
 * GatheringItineraryService
 */

export class GatheringItineraryService {
  static async getGatheringItinerary(token: string) {
    const response = await fetch(getApiUrl() + "GetGatheringItinerary", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  }
}