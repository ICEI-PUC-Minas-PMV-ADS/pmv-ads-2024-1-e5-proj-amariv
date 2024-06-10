import { createContext } from "react";
import { LoginForm } from "../../types/LoginForm";
import { RegisterForm } from "../../types/RegisterForm";
import { User } from "../../types/User";
import { Endereco } from "../../types/Endereco";
import { Material } from "../../types/Material";
import { UpdateUsuarioForm } from "../../types/UpdateUsuarioForm";
import { Coleta } from "../../types/Coleta";

export type AppContextType = {
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
  coletasAberto: Coleta[]
  fetchMoreColetasAberto: () => Promise<void>
  resetColetasAberto: () => Promise<void>
  totalPagesColetasAberto: number
  pageNumberColetasAberto: number
  coletasFinalizado: Coleta[]
  fetchMoreColetasFinalizado: () => Promise<void>
  resetColetasFinalizado: () => Promise<void>
  totalPagesColetasFinalizado: number
  pageNumberColetasFinalizado: number
  cancelarColeta: (coletaId: number) => void
  useAlert: (message: string, onClose: () => void) => void
  unavailableDates: string[]
  resetUnavailableDates: () => Promise<void>
  loginGoogle: () => Promise<boolean>
  enviarConfirmacaoEmail: () => Promise<void>
};

export const AppContext = createContext<AppContextType>(null!);