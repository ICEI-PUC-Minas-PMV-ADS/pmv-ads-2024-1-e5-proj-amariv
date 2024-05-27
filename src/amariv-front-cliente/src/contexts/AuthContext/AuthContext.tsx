import { createContext } from "react";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";
import { User } from "../../types/User";
import { Endereco } from "../../types/Endereco";
import { Material } from "../../types/Material";

export type AuthContextType = {
  user: User | null;
  login: (form: LoginForm) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signup: (form: RegisterForm) => Promise<boolean>;
  enderecos: Endereco[]
  atualizarEnderecos: () => Promise<void>
  materiais: Material[]
};

export const AuthContext = createContext<AuthContextType>(null!);