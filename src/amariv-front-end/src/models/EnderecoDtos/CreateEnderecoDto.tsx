

export class CreateEnderecoDto {
    constructor(
        
        public logradouro : string,
        public numero : string,
        public bairro : string,
        public cep : string,
        public cidade : string,
        public referencia : string

    ) { }
}