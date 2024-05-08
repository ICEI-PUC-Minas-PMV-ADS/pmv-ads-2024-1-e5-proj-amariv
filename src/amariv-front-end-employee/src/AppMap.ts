import { Loader } from "@googlemaps/js-api-loader";

/**
 * Loader
 */

export const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY ?? "",
  libraries: ['core', 'routes', 'maps', 'geometry', 'marker'],
  version: "weekly",
});