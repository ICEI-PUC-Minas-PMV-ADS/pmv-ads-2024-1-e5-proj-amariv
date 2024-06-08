import { TOKEN_KEY, getApiUrl } from "../AppConstants";

/**
 * UserService
 */
export class UserService {

  /**
   * Get user info.
   */

  static async getUserInfo(token: string): Promise<{ userName: string }> {
    const response = await fetch(getApiUrl() + "UserInfo", {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json",
        'ngrok-skip-browser-warning': '69420',
      }
    });

    if (response.ok) {
      const json = await response.json() as { name: string };
      return { userName: json.name };
    } else {
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
      }
      throw error;
    }
  }

  /**
   * Sign in
   */

  static async signIn({
    email,
    password,
  }: {
    email: string,
    password: string,
  }): Promise<{ token: string }> {
    const response = await fetch(getApiUrl() + "SignIn", {
      method: 'POST',
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'ngrok-skip-browser-warning': '69420',
      },
    });

    if (response.ok) {
      return await response.json() as { token: string };
    } else {
      const error = await response.json();
      if (error.reset === true) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
      }
      throw error;
    }
  }

  /**
   * Logout
   */

  static async logout(token: string): Promise<void> {
    const response = await fetch(getApiUrl() + "Logout", {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
        "Accept": "application/json",
        'ngrok-skip-browser-warning': '69420',
      },
    });

    if (!response.ok) {
      throw await response.json();
    }
  }
}