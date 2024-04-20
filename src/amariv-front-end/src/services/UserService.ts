import { Constants } from "../Constants";
import { UserFactory } from "../factories/UserFactory";
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
    const response = await fetch(Constants.ApiHost + "signin", {
      method: 'POST',
      body: JSON.stringify({ 
        Nome: name,
        Email: email,
        Password: password,
        RePassword: confPassword,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      return UserFactory.toJson(await response.json());
    }
    throw new Error('Falha em nossos servidores, tente novamente mais tarde!');
  }
}