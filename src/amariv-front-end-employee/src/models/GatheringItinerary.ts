/**
 * GatheringItinerary
 */

export interface GatheringItinerary {
  id: number;
  funcionarioId: string;
  dataRoteiro: Date;
  dataCadastro: Date;
  status: boolean;
  delete: boolean;
  numeroDeColetas: number;
  numeroMaxColetas: number;
  itemsDeRoteiroDeColeta: GatheringItem[];
}

export interface GatheringItem {
  id: number;
  id_RoreiroDeColetas: number;
  id_Coletas: number;
  posicaoLista: number;
  endereco: string,
  materiais: string,
  isActive: boolean;
  geoLocation: GatheringGeoLocation;
}

export interface GatheringGeoLocation {
  lat: number;
  lon: number;
}