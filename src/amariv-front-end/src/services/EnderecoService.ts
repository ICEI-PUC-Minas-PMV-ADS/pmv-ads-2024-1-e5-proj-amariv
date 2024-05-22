import axios from "axios";
import { CreateEnderecoDto } from "../models/EnderecoDtos/CreateEnderecoDto";

const useApi = axios.create({
    baseURL: "http://localhost:5100"
});

export const EnderecoService = {

    salvarEndereco: async (enderecoDto: CreateEnderecoDto) => {
        const jsonBody = JSON.stringify(enderecoDto) 
        const response = await useApi.post(`/SalvarEndereco`, jsonBody ,{
          headers: {
            "Content-type": "application/json; chatset=utf-8"
          }
        });
        return response.data       
    }

    
}