import { useApi } from "../hooks/useApi";
import { EnderecoForm } from "../types/EnderecoForm";

export const EnderecoService = {
  cadastrarEndereco: async (form: EnderecoForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/salvarendereco", json, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response;
  },
  buscarEnderecos: async (token?: string) => {
    const response = await useApi.get("/enderecosusuario", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response;
  }
}