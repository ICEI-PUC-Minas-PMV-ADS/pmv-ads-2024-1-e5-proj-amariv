import { UserFactory } from "../factories/UserFactory";
import { useApi } from "../hooks/useApi";
import { User } from "../models/User";

/**
 * UserService
 */
export class UserService {
  static async signIn({
    name,
    email,
    password,
    confPassword,
    phone,
  }: {
    name: string,
    email: string,
    password: string,
    confPassword: string,
    phone: string,
  }): Promise<User> {
    try {
      const body = {
        Nome: name,
        Email: email,
        Password: password,
        RePassword: confPassword,
      };
      const response = await useApi.post("signin", body);
      return UserFactory.toJson(await response.data);
    } catch (e) {
      throw new Error('Falha em nossos servidores, tente novamente mais tarde!');
    }
  }
}