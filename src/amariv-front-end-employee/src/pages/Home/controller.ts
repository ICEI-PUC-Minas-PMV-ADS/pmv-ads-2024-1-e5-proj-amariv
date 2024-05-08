import { UserService } from "src/services/UserService";
import { PageBaseController } from "../../framework/controller";
import { GatheringService } from "src/services/GatheringService";
import { Gathering } from "src/models/Gathering";

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

  async getStartPosition(token: string) {
    const { lat, lon } = await GatheringService.getStartPosition(token);
    this.dispatch({ type: 'set_position', lat, lon })
  }

  async getUserInfo(token: string) {
    const { userName } = await UserService.getUserInfo(token);
    this.dispatch({ type: 'set_username', userName })
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