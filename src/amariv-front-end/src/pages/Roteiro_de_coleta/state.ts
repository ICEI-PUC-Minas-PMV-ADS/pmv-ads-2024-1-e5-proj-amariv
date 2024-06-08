import { ReadColetaDto } from "../../models/ColetaDtos/ReadColetaDto";
import { FuncionarioDto } from "../../models/FuncionarioDtos/FuncionarioDto";
import { RoteiroDeColetaDto } from "../../models/RoteiroDeColetaDtos/RoteiroDeColetaDto";

/**
 * RoteiroDeColetaState
 */

export type RoteiroDeColetaState = {
  roteiroDeColeta: RoteiroDeColetaDto | null,
  coletasRoteiro: ReadColetaDto[],
  coletasAprovadas: ReadColetaDto[],
  startPosition: { lat: number, lon: number } | null,
  funcionarios: FuncionarioDto[],
  availableRoteiroDeColetas: RoteiroDeColetaDto[],
  dadosDasRotas: any | null,
};

/**
 * initialRoteiroDeColetaState
 */

export const initialRoteiroDeColetaState: RoteiroDeColetaState = {
  roteiroDeColeta: null,
  coletasRoteiro: [],
  coletasAprovadas: [],
  startPosition: null,
  funcionarios: [],
  availableRoteiroDeColetas: [],
  dadosDasRotas: null,
};

/**
 * RoteiroDeColetaAction
 */

export type RoteiroDeColetaAction = {
  type: 'set_coletas',
  payload: { roteiroDeColeta: RoteiroDeColetaDto | null, coletasRoteiro: ReadColetaDto[], coletasAprovadas: ReadColetaDto[] },
} | {
  type: 'set_coletas_roteiro',
  payload: ReadColetaDto[],
} | {
  type: 'set_coletas_aprovadas',
  payload: ReadColetaDto[],
} | {
  type: 'set_start_position',
  payload: { lat: number, lon: number },
} | {
  type: 'set_funcionarios',
  payload: FuncionarioDto[],
} | {
  type: 'set_roteiro_de_coleta',
  payload: RoteiroDeColetaDto,
} | {
  type: 'set_valid_roteiro_de_coletas',
  payload: RoteiroDeColetaDto[],
} | {
  type: 'set_routes_data',
  payload: any,
};