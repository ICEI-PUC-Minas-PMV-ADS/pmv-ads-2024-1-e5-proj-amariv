import { createContext } from "react";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";
import { User } from "../../types/User";

export type AuthContextType = {
  user: User | null;
  login: (form: LoginForm) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signup: (form: RegisterForm) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);