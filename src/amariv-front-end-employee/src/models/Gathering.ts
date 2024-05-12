import { Address } from "./Address";
import { GatheringItinerary } from "./GatheringItinerary";

/**
 * Gathering
 */

export interface Gathering {
  id: number,
  userId: number,
  endereco: Address,
  roteiroColeta: GatheringItinerary,
  posicaoLista: number,
  clienteNome: string,
  clienteCel: string,
  clienteTel: string,
  status: boolean,
  delete: boolean,
  aprovacaoAdmin: boolean,
  lat: number,
  lon: number,
  dataCadastro: Date,
  dataDeColeta: Date,
  listaItensColeta: string,
}