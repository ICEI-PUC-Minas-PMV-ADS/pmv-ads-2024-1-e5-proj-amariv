import axios from 'axios'

export const useApi = axios.create(
  {
    baseURL: "https://localhost:7273",
  }
)