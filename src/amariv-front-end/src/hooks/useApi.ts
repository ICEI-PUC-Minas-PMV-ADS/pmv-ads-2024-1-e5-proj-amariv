import axios from 'axios'
import { TOKEN_KEY } from '../Constants'

export const useApi = axios.create(
  {
    baseURL: "https://api.amariv.com",
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
      "Content-type": "application/json; chatset=utf-8",
    }
  }
)