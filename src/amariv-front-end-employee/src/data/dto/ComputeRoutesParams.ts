/**
 * ComputeRoutesParams
 */

export interface ComputeRoutesParams {
  origin: { lat: number, lon: number },
  destination: { lat: number, lon: number },
  intermediates?: { lat: number, lon: number }[],
}