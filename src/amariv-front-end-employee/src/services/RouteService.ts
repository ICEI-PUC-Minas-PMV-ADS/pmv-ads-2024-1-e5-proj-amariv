import { Route } from "../models/Route";

/**
 * RouteService
 */

export class RouteService {
  static async getNextRoutes(): Promise<Route[]> {
    return [
      new Route(1),
      new Route(2),
      new Route(3),
    ];
  }
}