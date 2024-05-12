/**
 * GatheringItinerary
 */

import { Gathering } from "./Gathering";

export interface GatheringItinerary {
  id: number,
  funcionarioId: string,
  dataRoteiro: Date,
  dataCadastro: Date,
  status: boolean,
  delete: boolean,
  numeroDeColetas: number,
  numeroMaxColetas: number,
  gatherings: Gathering[],
}