export interface Coleta {   

    id?: number,
    userId?: string,
    enderecoId?:  number,
    roteiroColetaId?:  number,
    posicaoLista?: number,
    clienteNome?: string,
    clienteCel?: string,
    clienteTel?: string,
    status?: boolean,
    cancelada?: boolean,
    isSuccess?: boolean,
    delete?: boolean,
    lat?: Number,
    lon?: Number,
    localidadeExata?: boolean,
    dataCadastro?: Date,
    dataDeColeta?: Date,
    listaItensColeta?: string
    
}