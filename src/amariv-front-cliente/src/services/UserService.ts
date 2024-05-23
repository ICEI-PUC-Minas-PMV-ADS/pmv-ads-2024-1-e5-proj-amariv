import { useApi } from "../hooks/useApi";
import { LoginForm } from "../types/LoginForm";
import { RegisterForm } from "../types/RegisterForm";

export const UserService = {
  login: async (form: LoginForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/login", json, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  signup: async (form: RegisterForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/signin", json, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  getUser: async () => {
    const token = localStorage.getItem('authToken')
    const response = await useApi.get("/user", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data;
  },

  logout: async () => {
    const token = localStorage.getItem('authToken')
    const response = await useApi.post("/logout", {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response;
  },

  emailAvaliable: async (email: string): Promise<boolean> => {
    const form = { email: email }
    const response = await useApi.post("/emaildisponivel", form).then(e => (true)).catch(e => (false))
    return response
  },
}