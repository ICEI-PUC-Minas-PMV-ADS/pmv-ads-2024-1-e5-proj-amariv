import { useApi } from "../hooks/useApi";
import { EnderecoForm } from "../types/EnderecoForm";

export const EnderecoService = {
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