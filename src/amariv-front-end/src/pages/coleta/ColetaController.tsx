import { CreateEnderecoDto } from "../../models/EnderecoDtos/CreateEnderecoDto"
import { EnderecoService } from "../../services/EnderecoService"

export const coletaController = {

    converteStringEmDate : (dataEntrada: string) => {
           
        var dataConvertida: Date = new Date(dataEntrada)

        return dataConvertida;
    },
        
  
}


