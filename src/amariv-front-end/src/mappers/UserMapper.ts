import { User } from "../models/User";

/**
 * User factory
 */
export class UserMapper {
  static fromJson(data: any): User {
    return new User(
      data['id'],
      data['nome'],
      data['email'],
      data['phoneNumber'],
    );
  }
}