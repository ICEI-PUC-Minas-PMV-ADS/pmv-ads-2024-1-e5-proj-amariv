import { createContext } from "react";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";
import { User } from "../../types/User";
import { Endereco } from "../../types/Endereco";
import { Material } from "../../types/Material";
import { UpdateUsuarioForm } from "../../types/UpdateUsuarioForm";

export type AuthContextType = {
  user: User | null;
  login: (form: LoginForm) => Promise<boolean>;
  logout: () => Promise<boolean>;
  atualizarEnderecos : () => Promise<void>;
  enderecos: Endereco[]
  materiais: Material[]
  updateUsuario: (form: UpdateUsuarioForm) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);