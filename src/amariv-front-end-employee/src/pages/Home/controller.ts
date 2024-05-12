import { UserService } from "src/services/UserService";
import { PageBaseController } from "../../framework/controller";
import { GatheringService } from "src/services/GatheringService";
import { GatheringItinerary } from "src/models/GatheringItinerary";
import { loader } from "src/AppMap";
import { GoogRoutesService } from "src/services/GoogRoutesService";
import { GatheringItineraryService } from "src/services/GatheringItineraryService";

/**
 * Home state.
 */

export type HomeState = {
  userName: string,
  startPosition: { lat: number, lon: number } | null,
};

/**
 * Home initial state.
 */

export const initialHomeState: HomeState = {
  userName: '',
  startPosition: null,
};

/**
 * Home action.
 */

export type HomeAction = {
  type: 'set_username',
  userName: string,
} | {
  type: 'set_position',
  lat: number,
  lon: number,
};

/**
 * Home controller.
 */

export class HomeController extends PageBaseController<HomeState, HomeAction> {
  async populateData(token: string) {
    await GatheringItineraryService.populateData(token);
  }

  async renderCurrentRouteAndGenerateTimeEstimated(
    map: google.maps.Map,
    startPosition: { lat: number; lon: number; },
    gatheringItinerary: GatheringItinerary,
  ): Promise<number> {
    await this.generateOriginPin(map, startPosition);
    return await this.generateCurrentRoute(map, startPosition, gatheringItinerary);
  }

  async getStartPosition(token: string) {
    const { lat, lon } = await GatheringService.getStartPosition(token);
    this.dispatch({ type: 'set_position', lat, lon })
  }

  async getUserInfo(token: string) {
    const { userName } = await UserService.getUserInfo(token);
    this.dispatch({ type: 'set_username', userName })
  }

  private async generateOriginPin(
    map: google.maps.Map,
    startPosition: { lat: number; lon: number; },
  ) {
    const { PinElement, AdvancedMarkerElement } = await loader.importLibrary("marker");
    const pin = new PinElement({ background: 'blue', glyphColor: 'white' });
    new AdvancedMarkerElement({
      map,
      content: pin.element,
      position: { lat: startPosition.lat, lng: startPosition.lon },
    });
  }

  private async generateCurrentRoute(
    map: google.maps.Map,
    startPosition: { lat: number; lon: number; },
    gatheringItinerary: GatheringItinerary,
  ): Promise<number> {
    /*
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    const targetPosition = gatheringItinerary.itemsDeRoteiroDeColeta[0].geoLocation;

    new AdvancedMarkerElement({
      map,
      position: { lat: targetPosition.lat, lng: targetPosition.lon },
    });

    const r = await GoogRoutesService.computeRoutes({
      origin: startPosition,
      destination: targetPosition,
    });

    const d = r.routes[0].duration as string;
    const normalizedDuration = d.substring(0, d.length - 1);

    new google.maps.Polyline({
      map,
      path: google.maps.geometry.encoding.decodePath(r.routes[0].polyline.encodedPolyline),
      strokeColor: 'green',
    });
    */
    return parseInt("2") / 60;
  }

  doReducer(prevState: HomeState, action: HomeAction): HomeState {
    switch (action.type) {
      case 'set_username':
        return { ...prevState, userName: action.userName }
      case 'set_position':
        return { ...prevState, startPosition: { lat: action.lat, lon: action.lon } };
    }
  }
}