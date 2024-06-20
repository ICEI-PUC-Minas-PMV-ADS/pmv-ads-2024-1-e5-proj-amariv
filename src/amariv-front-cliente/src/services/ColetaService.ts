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
  coletasAberto: async (page: number, token?: string) => {
    const response = await useApi.get(`/coletasaberto?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token ? token : localStorage.getItem('authToken')}`
      }
    })
    return response;
  },
  coletasFinalizado: async (page: number, token?: string) => {
    const response = await useApi.get(`/coletasfinalizado?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token ? token : localStorage.getItem('authToken')}`
      }
    })
    return response;
  },

  cancelarColeta: async (idColeta: number) => {
    const response = await useApi.post(`/cancelarcoleta?idColeta=${idColeta}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
    return response;
  },

  horariosDisponiveis: async (date: string) => {
    const response = await useApi.get(`/horariosdisponiveis?date=${date}`)
    return response;
  }
}