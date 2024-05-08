
export class ReadColetaDto {
    constructor(
    
    public id : number,
    public userId: number,
    public enderecoId: number,
    public roteiroColetaId: number,
    public posicaoLista: number,
    public clienteNome: string,
    public clienteCel: string,
    public clienteTel: string,
    public status: string,
    public lat: number,
    public lon: number,
    public dataCadastro: Date,
    public dataDeColeta: Date,
    public listaItensColeta: string
     
    ) {}
}