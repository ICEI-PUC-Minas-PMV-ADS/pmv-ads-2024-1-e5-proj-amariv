import { createContext } from "react";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";
import { User } from "../../types/User";
import { Endereco } from "../../types/Endereco";
import { Material } from "../../types/Material";
import { UpdateUsuarioForm } from "../../types/UpdateUsuarioForm";

export type AuthContextType = {
  user: User | null
  login: (form: LoginForm) => Promise<boolean>
  logout: () => Promise<boolean>;
  signup: (form: RegisterForm) => Promise<boolean>
  enderecos: Endereco[]
  atualizarEnderecos: () => Promise<void>
  materiais: Material[]
  updateUsuario: (form: UpdateUsuarioForm) => Promise<boolean>
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessageSnackBar: React.Dispatch<React.SetStateAction<string>>
};

export const AuthContext = createContext<AuthContextType>(null!);