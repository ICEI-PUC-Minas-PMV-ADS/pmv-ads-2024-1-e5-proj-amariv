import { useApi } from "../hooks/useApi"

export const MaterialService = {
  getAll: async () => {
    let result = await useApi.get("/recuperaMateriais", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    return result
  }
}