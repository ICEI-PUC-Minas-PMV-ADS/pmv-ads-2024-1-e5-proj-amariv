import { TOKEN_KEY, getApiUrl } from "src/AppConstants";
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
      },
      body: JSON.stringify({
        id,
        RouteIdMap,
      }),
    });

    if (response.ok) {
      return await response.json() as GatheringItinerary;
    } else {
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
      }
      throw error;
    }
  }

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
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
      }
      throw error;
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
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
      }
      throw error;
    }
  }

  static async getStartPosition(token: string): Promise<{ lat: number, lon: number }> {
    const response = await fetch(getApiUrl() + "GetStartPosition", {
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
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
      }
      throw error;
    }
  }
}