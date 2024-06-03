import { useState, useEffect } from 'react'
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { LoginForm } from '../../types/LoginForm';
import { UserService } from '../../services/UserService2';
import { RegisterForm } from '../../types/RegisterForm';
import LoadingScreen from '../../components/re_components/LoadingScreen';
import { Endereco } from '../../types/Endereco';
import { Material } from '../../types/Material';
import { UpdateUsuarioForm } from '../../types/UpdateUsuarioForm';
import { enderecoService } from '../../services/EnderecoService';
import { materialService } from '../../services/MaterialService';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null)
  const [infosLoaded, setInfosLoaded] = useState(false)
  const [enderecos, setEnderecos] = useState<Endereco[]>([])
  const [materiais, setMateriais] = useState<Material[]>([])

  useEffect(() => {
    const validarToken = async () => {
      const tokenLocalStorage = localStorage.getItem('authToken')
      if (tokenLocalStorage) {
        const userData: User = await UserService.getUser().catch(e => {
          alert('Sessão expirada!')
          localStorage.removeItem('authToken')
          setUser(null)
          setInfosLoaded(true)
        })

        if (userData) {      
          setUser(userData)
          setInfosLoaded(true)
        }
      } else setInfosLoaded(true)
    }
    validarToken()

    materialService.getAll().then(x => {
      setMateriais(x.data)
    })
  }, []);

  const atualizarEnderecos = async () => {
    await enderecoService.buscarEnderecos().then(e => {
      setEnderecos(e.data)
    })
  }

  const login = async (form: LoginForm): Promise<boolean> => {
    const result = await UserService.login(form).then(async (e) => {
      localStorage.setItem('authToken', e.data[0].message)
      const userData = await UserService.getUser()      
      setUser(userData)
      return true
    }).catch(e => {
      return false
    })

    return result
  }

  const logout = async () => {
    const data = await UserService.logout()
    if (data.status == 200) {
      setUser(null)
      localStorage.removeItem('authToken')    
      return true
    }
    return false
  }

  const updateUsuario = async (form: UpdateUsuarioForm) => {
    const result = await UserService.updateUsuario(form).then(async (e) => {
      const userData = await UserService.getUser()
      setUser(userData)
      return true
    }).catch(e => {
      return false
    })

    return result
  }

  return (
    <>
      <LoadingScreen open={!infosLoaded} />
      <AuthContext.Provider value={{ user, login, logout,enderecos, atualizarEnderecos, materiais, updateUsuario }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

