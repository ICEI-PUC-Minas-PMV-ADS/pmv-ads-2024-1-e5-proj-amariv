import { getApiUrl } from "src/AppConstants";
import { GatheringItinerary } from "src/models/GatheringItinerary";

/**
 * GatheringItineraryService
 */

export class GatheringItineraryService {
  static async changeGatheringOrder(
    token: string,
    id: number,
    RouteIdMap: any[],
  ): Promise<GatheringItinerary> {
    const response = await fetch(getApiUrl() + "ChangeGatheringOrder", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        id,
        RouteIdMap,
      }),
    });

    if (response.ok) {
      return await response.json() as GatheringItinerary;
    } else {
      throw await response.json();
    }
  }

  static async populateData(token: string) {
    const response = await fetch(getApiUrl() + "CreateGatheringItinerary", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420',
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
        'ngrok-skip-browser-warning': '69420',
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  }

  static async getStartPosition(token: string): Promise<{ lat: number, lon: number }> {
    const response = await fetch(getApiUrl() + "GetStartPosition", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw await response.json();
    }
  }
}