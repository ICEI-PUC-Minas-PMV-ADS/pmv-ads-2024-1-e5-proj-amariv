export type Coleta = {
  id: number,
  userId?: string,
  roteiroColetaId?: number,
  posicaoLista?: number,
  enderecoId: number,
  clienteNome: string,
  clienteCel: string,
  clienteTel: string | null,
  dataCadastro: string,
  dataDeColeta: string,
  listaItensColeta: string,
  lat: number,
  lon: number,
  status: boolean,
  delete: boolean
}