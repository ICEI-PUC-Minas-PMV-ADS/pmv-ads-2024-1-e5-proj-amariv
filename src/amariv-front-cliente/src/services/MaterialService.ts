import { useApi } from "../hooks/useApi"

export const MaterialService = {
  getAll: async () => {
    let result = await useApi.get("/recuperaMateriais")
    console.log(result.data)
    return result
  }
}