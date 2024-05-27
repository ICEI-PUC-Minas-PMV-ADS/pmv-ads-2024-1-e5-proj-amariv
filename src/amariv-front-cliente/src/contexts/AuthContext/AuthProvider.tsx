import { useState, useEffect } from 'react'
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { LoginForm } from '../../types/LoginForm';
import { UserService } from '../../services/UserService';
import { RegisterForm } from '../../types/RegisterForm';
import LoadingScreen from '../../components/LoadingScreen';
import { Endereco } from '../../types/Endereco';
import { EnderecoService } from '../../services/EnderecoService';
import { Material } from '../../types/Material';
import { MaterialService } from '../../services/MaterialService';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null)
  const [enderecos, setEnderecos] = useState<Endereco[]>([])
  const [infosLoaded, setInfosLoaded] = useState(false)
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
          await EnderecoService.buscarEnderecos().then(e => {
            setEnderecos(e.data)
          })
          setUser(userData)
          setInfosLoaded(true)
        }
      } else setInfosLoaded(true)
    }
    validarToken()

    MaterialService.getAll().then(x => {
      setMateriais(x.data)
    })
  }, []);

  const atualizarEnderecos = async () => {
    await EnderecoService.buscarEnderecos().then(e => {
      setEnderecos(e.data)
      console.log(e.data)
    })
  }

  const login = async (form: LoginForm): Promise<boolean> => {
    const result = await UserService.login(form).then(async (e) => {
      localStorage.setItem('authToken', e.data[0].message)
      const userData = await UserService.getUser()
      if (userData) {
        await EnderecoService.buscarEnderecos().then(e => {
          setEnderecos(e.data)
        })
      }
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
      setEnderecos([])
      return true
    }
    return false
  }

  const signup = async (form: RegisterForm) => {
    const result = await UserService.signup(form).then(async (e) => {
      localStorage.setItem('authToken', e.data[0].message)
      const userData = await UserService.getUser()
      setUser(userData)
      return true
    }).catch(e => {
      return false
    })

    return result
  }

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  const loadUserData = async () => {
    const userData = await UserService.getUser()
    setUser(userData)
    return userData
  }

  return (
    <>
      <LoadingScreen open={!infosLoaded} />
      <AuthContext.Provider value={{ user, login, logout, signup, enderecos, atualizarEnderecos, materiais }}>
        {children}
      </AuthContext.Provider>
    </>

  )
}

