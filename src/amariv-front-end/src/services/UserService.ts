import { getApiUrl } from "../AppConstants";

/**
 * UserService
 */
export class UserService {
  static async login({
    email,
    password,
  }: {
    email: string,
    password: string,
  }): Promise<string> {
    const response = await fetch(getApiUrl() + "login", {
      method: 'POST',
      body: JSON.stringify({ 
        Email: email,
        Password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      const json = await response.json() as { message: string }[];
      return json[0].message;
    } else {
      const error = await response.json();
      if (error && error.title) {
        throw new Error(error.title);
      }
    }
    throw new Error('Falha em nossos servidores, tente novamente mais tarde!');
  }

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
  }): Promise<string> {
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
      const json = await response.json() as { message: string }[];
      return json[0].message;
    } else {
      const error = await response.json();
      if (error && error.title) {
        throw new Error(error.title);
      }
    }
    throw new Error('Falha em nossos servidores, tente novamente mais tarde!');
  }
}