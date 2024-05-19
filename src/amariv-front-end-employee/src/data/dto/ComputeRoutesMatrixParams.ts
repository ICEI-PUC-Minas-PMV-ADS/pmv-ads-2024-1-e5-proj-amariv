export interface ComputeRoutesMatrixParams {
  origin: { lat: number, lon: number },
  destinations: { lat: number, lon: number }[],
}