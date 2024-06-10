import axios from 'axios'
import { TOKEN_KEY } from '../Constants'

export const useApi = axios.create(
  {
    baseURL: "http://localhost:5100",
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
      "Content-type": "application/json; chatset=utf-8",
    }
  }
)