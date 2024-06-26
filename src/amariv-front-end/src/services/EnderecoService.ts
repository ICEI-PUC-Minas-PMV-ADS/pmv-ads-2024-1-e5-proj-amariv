import { Endereco } from './../types/Endereco';
import { EnderecoForm } from "../types/EnderecoForm";
import { useApi } from '../hooks/useApi';

export const enderecoService = {

  salvarEndereco: async (enderecoDto: Endereco) => {
    const token = localStorage.getItem('authToken')
    const jsonBody = JSON.stringify(enderecoDto)
    const response = await useApi.post(`/SalvarEndereco`, jsonBody, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-type": "application/json; chatset=utf-8"
      }
    });
    return response.data
  },

  updateEndereco: async (end: Endereco) => {
    const token = localStorage.getItem('authToken')
    const jsonBody = JSON.stringify(end)
    const response = await useApi.post(`/UpdateEndereco?id=${end.id}`, jsonBody, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-type": "application/json; chatset=utf-8"
      }
    });
    return response.data
  },

  cadastrarEndereco: async (form: EnderecoForm) => {
    const token = localStorage.getItem('authToken')
    const json = JSON.stringify(form)
    const response = await useApi.post("/salvarendereco", json, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    return response;
  },

  buscarEnderecos: async () => {
    const token = localStorage.getItem('authToken')
    const response = await useApi.get("/enderecosusuario", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
    return response.data;
  },

  buscarEndereco: async (id: number) => {
    const response = await useApi.get(`/RecuperaEndereco?id=${id}`);
    return response.data;
  }
}