import { getApiUrl } from "src/AppConstants";
import { GatheringItinerary } from "src/models/GatheringItinerary";

/**
 * GatheringItineraryService
 */

export class GatheringItineraryService {
  static async populateData(token: string) {
    const response = await fetch(getApiUrl() + "CreateGatheringItinerary", {
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

  static async getGatheringItinerary(token: string): Promise<GatheringItinerary[]> {
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