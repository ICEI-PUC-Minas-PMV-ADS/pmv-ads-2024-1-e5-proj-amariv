

export interface CreateColetaDto {   

    userId?: string,
    enderecoId?:  number,
    roteiroColetaId?:  number,
    posicaoLista?: number,
    clienteNome?: string,
    clienteCel?: string,
    clienteTel?: string,
    status?: boolean,
    lat?: number,
    lon?: number,
    dataCadastro?: Date,
    dataDeColeta?: Date,
    listaItensColeta?: string
}