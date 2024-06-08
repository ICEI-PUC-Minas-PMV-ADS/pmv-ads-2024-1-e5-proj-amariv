import { User } from "../models/User";

/**
 * User factory
 */
export class UserFactory {
  static toJson(data: any): User {
    return new User(
      data['id'] as string,
      data['nome'] as string,
      data['email'] as string,
    );
  }
}