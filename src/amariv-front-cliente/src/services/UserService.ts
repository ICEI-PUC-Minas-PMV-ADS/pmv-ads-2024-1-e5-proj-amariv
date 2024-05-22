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
    return response.data;
  }, // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT

  signup: async (form: RegisterForm) => {
    const json = JSON.stringify(form)
    const response = await useApi.post("/signin", json, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } // NÃO USAR ESSA FUNÇÃO DIRETAMENTE, USE O AUTHCONTEXT
}