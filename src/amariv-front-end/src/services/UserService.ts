import { getApiUrl } from "../AppConstants";
import { UserMapper } from "../mappers/UserMapper";
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
    const response = await fetch(getApiUrl() + "signin", {
      method: 'POST',
      body: JSON.stringify({ 
        Nome: name,
        Email: email,
        Password: password,
        RePassword: confPassword,
        Phone: phone,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      return UserMapper.fromJson(await response.json());
    } else {
      const error = await response.json();
      if (error && error.title) {
        throw new Error(error.title);
      }
    }
    throw new Error('Falha em nossos servidores, tente novamente mais tarde!');
  }
}