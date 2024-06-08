/**
 * ReadColetaDto
 */

import { EnderecoDto } from "../EnderecoDto";

export interface ReadColetaDto {
  id?: number,
  userId?: string,
  enderecoId?: number,
  roteiroDeColetaId?: number,
  posicaoLista?: number,
  clienteNome?: string,
  clienteCel?: string,
  clienteTel?: string,
  status?: boolean,
  delete?: boolean,
  lat?: number,
  lon?: number,
  dataCadastro?: Date,
  dataDeColeta?: Date,
  listaItensColeta?: string
  endereco: EnderecoDto,
};