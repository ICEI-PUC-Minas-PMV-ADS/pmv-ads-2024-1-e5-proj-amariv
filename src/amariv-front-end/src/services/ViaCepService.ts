import axios from "axios"
import { ViaCep } from "../types/ViaCep"

export const ViaCepService = {
  buscarEndereco: async (cep: string) => {
    const response = await axios.get("https://viacep.com.br/ws" + `/${cep}/json`)
    const data: ViaCep = response.data
    return data
  }
}