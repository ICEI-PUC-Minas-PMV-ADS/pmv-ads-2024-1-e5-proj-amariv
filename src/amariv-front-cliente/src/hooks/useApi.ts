import axios from 'axios'

//http://localhost:5000

export const useApi = axios.create(
  {
    baseURL: "https://api.amariv.com",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      "Content-type": "application/json; chatset=utf-8",
      "Accept": "application/json"
    }
  }
)