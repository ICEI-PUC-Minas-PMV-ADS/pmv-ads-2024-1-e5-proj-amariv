export type CreateColetaForm = {
  userId: string,
  enderecoId: number,
  clienteNome: string,
  clienteCel: string,
  clienteTel: string | null,
  dataCadastro: string,
  dataDeColeta: string,
  listaItensColeta: string
}