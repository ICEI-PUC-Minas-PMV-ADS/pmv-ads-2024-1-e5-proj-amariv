export class Funcionario {
    constructor(
      public id: number,
      public nome: string,
      public email: string,
      public sexo: string,
      public telefone: string,
      public cargo: string,
      public senha: string,
      public suportaPeso: boolean
    ) {}
  }
  