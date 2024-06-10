import { ComputeRoutesMatrixParams } from "../models/ComputeRoutesMatrixParams";
import { ComputeRoutesParams } from "../models/ComputeRoutesParams";

/**
 * GoogRoutesService
 */

export class GoogRoutesService {
  static async computeRoutes(params: ComputeRoutesParams) {
    const body: any = {
      "origin": {
        "location": {
          "latLng": {
            "latitude": params.origin.lat,
            "longitude": params.origin.lon,
          }
        }
      },
      "destination": {
        "location": {
          "latLng": {
            "latitude": params.destination.lat,
            "longitude": params.destination.lon,
          }
        }
      },
      "travelMode": "DRIVE",
      "routingPreference": "TRAFFIC_AWARE",
      "computeAlternativeRoutes": false,
      "optimizeWaypointOrder": params.optimizeRoutes,
      "routeModifiers": {
        "avoidTolls": false,
        "avoidHighways": false,
        "avoidFerries": false
      },
      "languageCode": "en-US",
      "units": "METRIC"
    };

    if (params.intermediates) {
      body["intermediates"] = params.intermediates!.map((r) => ({
        "location": {
          "latLng": {
            "latitude": r.lat,
            "longitude": r.lon,
          }
        }
      }));
    }

    const response = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.REACT_APP_API_KEY ?? "",
        'X-Goog-FieldMask': 'routes.optimizedIntermediateWaypointIndex,routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('computeRoutes(): Falha ao calcular rota');
    }
  }

  static async computeRoutesMatrix(params: ComputeRoutesMatrixParams) {
    const response = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.REACT_APP_API_KEY ?? "",
        'X-Goog-FieldMask': 'originIndex,destinationIndex,duration,distanceMeters',
      },
      body: JSON.stringify({
        "origins": [
          {
            "waypoint": {
              "location": {
                "latLng": {
                  "latitude": params.origin.lat,
                  "longitude": params.origin.lon,
                }
              }
            }
          }
        ],
        "destinations": params.destinations.map((dest) => ({
          "waypoint": {
            "location": {
              "latLng": {
                "latitude": dest.lat,
                "longitude": dest.lon,
              }
            }
          }
        })),
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE"
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('computeRoutes(): Falha ao calcular rota');
    }
  }
}