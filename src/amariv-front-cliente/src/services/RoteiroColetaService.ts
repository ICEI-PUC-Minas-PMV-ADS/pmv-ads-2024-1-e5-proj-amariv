import { useApi } from "../hooks/useApi"

export const RoteiroColetaService = {
  datasIndisponiveis: async () => {
    let result = await useApi.get("/datasindisponiveis", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    return result
  }
}