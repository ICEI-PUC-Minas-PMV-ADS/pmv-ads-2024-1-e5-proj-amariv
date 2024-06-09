import { Endereco } from './../types/Endereco';
import axios from "axios";
import { EnderecoForm } from "../types/EnderecoForm";

const useApi = axios.create({
    baseURL: "http://localhost:5100"
});

export const enderecoService = {

    salvarEndereco: async (enderecoDto: Endereco) => {
        const jsonBody = JSON.stringify(enderecoDto) 
        const response = await useApi.post(`/SalvarEndereco`, jsonBody ,{
          headers: {
            "Content-type": "application/json; chatset=utf-8"
          }
        });
        return response.data       
    },

    updateEndereco: async (end: Endereco) => {
      const jsonBody = JSON.stringify(end) 
      const response = await useApi.post(`/UpdateEndereco?id=${end.id}`, jsonBody ,{
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
      return response.data;
    },

    buscarEndereco: async (id: number) => {
      const token = localStorage.getItem('authToken')
      const response = await useApi.get(`/RecuperaEndereco?id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      return response.data;
    }
      
       
}