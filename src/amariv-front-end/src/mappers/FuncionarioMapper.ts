import { Funcionario } from '../models/Funcionario'; // Importe a classe Funcionario aqui

export class FuncionarioMapper {
  static mapFuncionarioFromApi(apiFuncionario: any): Funcionario {
    return new Funcionario(
      apiFuncionario.id,
      apiFuncionario.nome,
      apiFuncionario.email,
      apiFuncionario.sexo,
      apiFuncionario.telefone,
      apiFuncionario.cargo,
      apiFuncionario.senha,
      apiFuncionario.suportaPeso
    );
  }

  static mapFuncionarioToApi(funcionario: Funcionario): any {
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      email: funcionario.email,
      sexo: funcionario.sexo,
      telefone: funcionario.telefone,
      cargo: funcionario.cargo,
      senha: funcionario.senha,
      suportaPeso: funcionario.suportaPeso
    };
  }
}
