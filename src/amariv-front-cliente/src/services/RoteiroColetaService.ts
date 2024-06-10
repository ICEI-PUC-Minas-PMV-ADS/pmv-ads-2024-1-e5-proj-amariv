import { useApi } from "../hooks/useApi"

export const RoteiroColetaService = {
  datasIndisponiveis: async () => {
    let result = await useApi.get("/datasindisponiveis")
    return result
  }
}