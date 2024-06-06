import { useApi } from "../hooks/useApi";
import { CreateColetaForm } from "../types/CreateColetaForm";

export const ColetaService = {
  cadastrarColeta: async (form: CreateColetaForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/salvarcoleta", json, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response;
  },
  buscarColetas: async (page: number) => {
    const token = localStorage.getItem('authToken')
    const response = await useApi.get(`/coletasusuario?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    return response;
  }
}