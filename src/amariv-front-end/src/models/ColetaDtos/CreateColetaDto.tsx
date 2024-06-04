

export interface CreateColetaDto {   

    userId?: string,
    enderecoId?:  number,
    roteiroColetaId?:  number,
    posicaoLista?: number,
    clienteNome?: string,
    clienteCel?: string,
    clienteTel?: string,
    status?: boolean,
    lat?: Number,
    lon?: Number,
    localidadeExata?: boolean,
    dataCadastro?: Date,
    dataDeColeta?: Date,
    listaItensColeta?: string
}