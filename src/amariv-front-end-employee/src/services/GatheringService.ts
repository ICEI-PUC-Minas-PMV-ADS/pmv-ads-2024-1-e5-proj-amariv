import { getApiUrl } from "src/AppConstants";
import { Gathering } from "src/models/Gathering";

export class GatheringService {
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
      throw await response.json();
    }
  }

  static async getNextGathering(token: string): Promise<{ gathering: Gathering }> {
    const response = await fetch(getApiUrl() + "GetNextGathering", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json; chatset=utf-8',
        'Accept': 'application/json',
      }
    });

    if (response.ok) {
      return { gathering: await response.json() };
    } else {
      throw await response.json();
    }
  }
}