import axios from "axios"
import { CreateEnderecoDto } from "../models/EnderecoDtos/CreateEnderecoDto";
import { API_KEY } from "../Constants";

const geoApi = axios.create({
baseURL: "https://maps.googleapis.com/maps/api/geocode"
});


export const GoogleGeocodingService = {
    buscarLocalizacao: async (endereco : CreateEnderecoDto ) => {  
      const response = await geoApi.get(`json?address=${endereco.numero}+${endereco.logradouro},+${endereco.bairro},+${endereco.cidade},+mg&components=country:BR&key=${API_KEY}`, {
            headers : {
                "Content-type": "application/json; chatset=utf-8"
            }
        });
        return response.data.results[0].geometry
    }

}