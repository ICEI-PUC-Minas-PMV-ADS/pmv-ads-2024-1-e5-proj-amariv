import { useState, useEffect } from 'react'
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";
import { LoginForm } from '../../types/LoginForm';
import { UserService } from '../../services/UserService';
import { RegisterForm } from '../../types/RegisterForm';
import LoadingScreen from '../../components/LoadingScreen';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null)
  const [infosLoaded, setInfosLoaded] = useState(false)

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
  }, []);

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

  const signup = async (form: RegisterForm) => {
    const data = await UserService.signup(form)
    if (data.token) {
      setToken(data.token)
      const userData = await UserService.getUser()
      setUser(userData)
      setInfosLoaded(true)
      return true;
    }
    return false;
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
      <AuthContext.Provider value={{ user, login, logout, signup }}>
        {children}
      </AuthContext.Provider>
    </>

  )
}

