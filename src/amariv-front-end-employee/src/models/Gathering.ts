import { Address } from "./Address";
import { GatheringItinerary } from "./GatheringItinerary";
import { User } from "./User";

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
  isSuccess: boolean,
  lat: number,
  lon: number,
  dataCadastro: string,
  dataDeColeta: string,
  listaItensColeta: string,
  usuario: User | null,
}