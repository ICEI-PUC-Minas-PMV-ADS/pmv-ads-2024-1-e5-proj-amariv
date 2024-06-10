const crypto = require('crypto-js');

/**
 * Data
 */
const ROUTE_MAP_KEY = "r_fetch_cache";

/**
 * RouteCache
 */

export class RouteCache {
  constructor() {
    const map = window.localStorage.getItem(ROUTE_MAP_KEY);
    if (!map) {
      window.localStorage.setItem(ROUTE_MAP_KEY, JSON.stringify({}));
    }
  }

  hasCache(routeBody: any): boolean {
    const map = window.localStorage.getItem(ROUTE_MAP_KEY) as any;
    const hash = crypto(JSON.stringify(routeBody));
    return map[hash] !== undefined;
  }

  getCache(routeBody: any): any {
    const map = window.localStorage.getItem(ROUTE_MAP_KEY) as any;
    const hash = crypto(JSON.stringify(routeBody));
    return map[hash];
  }

  cacheRoute(routeBody: any, response: any) {
    const map = window.localStorage.getItem(ROUTE_MAP_KEY) as any;
    const hash = crypto(JSON.stringify(routeBody));
    map[hash] = JSON.stringify(response);
  }

  static getInstance(): RouteCache {
    return routeCacheInstance;
  }
}

/**
 * Route cache instance.
 */

const routeCacheInstance: RouteCache = new RouteCache();