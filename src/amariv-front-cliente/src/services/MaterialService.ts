import { useApi } from "../hooks/useApi"

export const MaterialService = {
  getAll: async () => {
    let result = await useApi.get("/recuperaMateriais")
    return result
  }
}