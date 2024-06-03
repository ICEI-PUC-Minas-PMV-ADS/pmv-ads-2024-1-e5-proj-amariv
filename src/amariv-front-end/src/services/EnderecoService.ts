import axios from "axios";
import { CreateEnderecoDto } from "../models/EnderecoDtos/CreateEnderecoDto";
import { EnderecoForm } from "../types/EnderecoForm";

const useApi = axios.create({
    baseURL: "http://localhost:5100"
});

export const enderecoService = {
    salvarEndereco: async (enderecoDto: CreateEnderecoDto) => {
        const jsonBody = JSON.stringify(enderecoDto) 
        const response = await useApi.post(`/SalvarEndereco`, jsonBody ,{
          headers: {
            "Content-type": "application/json; chatset=utf-8"
          }
        });
        return response.data       
    },

    cadastrarEndereco: async (form: EnderecoForm) => {
      const json = JSON.stringify(form)
      const response = await useApi.post("/salvarendereco", json, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return response;
    },

    buscarEnderecos: async () => {
      const token = localStorage.getItem('authToken')
      const response = await useApi.get("/enderecosusuario", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      return response;
    }
       
}