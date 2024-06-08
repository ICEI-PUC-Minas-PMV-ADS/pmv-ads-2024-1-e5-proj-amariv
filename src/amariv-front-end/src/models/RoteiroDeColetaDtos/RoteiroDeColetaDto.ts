import { FuncionarioDto } from "../FuncionarioDtos/FuncionarioDto";

export interface RoteiroDeColetaDto {
  id?: number;
  roteiroDeColeraId?: number;
  funcionarioId?: string;
  dataRoteiro?: string;
  dataCadastro?: string;
  status?: boolean;
  delete?: boolean;
  numeroDeColetas?: number;
  numeroMaxColetas?: number;
  funcionario?: FuncionarioDto;
  label?: string;
}