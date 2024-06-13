import axios from 'axios'
const token = localStorage.getItem('authToken')

export const useApi = axios.create(
  {
    baseURL: "http://localhost:5100",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
)