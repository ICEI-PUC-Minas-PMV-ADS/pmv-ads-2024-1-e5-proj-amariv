import { useState, useEffect } from 'react'
import { PrivateUser } from "../../types/PrivateUser";
import { AuthContext } from "./AuthContext";
import { LoginForm } from '../types/LoginForm';
import { UserService } from '../services/UserService';
import { RegisterForm } from '../../types/RegisterForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrivateAddress } from '../../types/PrivateAddress';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<PrivateUser | null>(null)
  const [defaultAddress, setDefaultAddress] = useState<PrivateAddress | null>(null)
  const [infosLoaded, setInfosLoaded] = useState(false)

  useEffect(() => {
    const validarToken = async () => {
      const tokenLocalStorage = await AsyncStorage.getItem('authToken')
      const defaultAddressLocalStorage = await AsyncStorage.getItem('defaultAddress')
      if (defaultAddressLocalStorage) {
        const data = JSON.parse(defaultAddressLocalStorage)
        setDefaultAddress(data)
      }
      if (tokenLocalStorage) {
        const userData: PrivateUser = await UserService.getPrivateUser().catch(e => {
          alert('Sessão expirada!')
          AsyncStorage.removeItem('authToken')
          setUser(null)
          setDefaultAddress(null)
          AsyncStorage.removeItem('defaultAddress')
          setInfosLoaded(true)
        })
        
        if (userData) {
          const firstAddress = userData.addresses[0]
          setUser(userData)

          if (firstAddress != null) {
            if (defaultAddressLocalStorage) {
              const address = JSON.parse(defaultAddressLocalStorage)
              setDefaultAddress(address)
              setInfosLoaded(true)

            }
            else {
              const json = JSON.stringify(firstAddress)
              setDefaultAddress(firstAddress)
              AsyncStorage.setItem('defaultAddress', json)
              setInfosLoaded(true)
            }
          }
        }
      } else setInfosLoaded(true)
    }
    validarToken()
  }, []);

  const login = async (form: LoginForm) => {
    const data = await UserService.login(form)
    if (data.token) {
      setToken(data.token)

      const userData = await UserService.getPrivateUser()
      setUser(userData)
      if (userData.addresses[0] != null) {
        const json = JSON.stringify(userData.addresses[0])
        setDefaultAddress(userData.addresses[0])
        AsyncStorage.setItem('defaultAddress', json)
      }
      setInfosLoaded(true)
      return true;
    }
    return false;
  }

  const logout = async () => {
    const data = await UserService.logout()
    if (data.status == 200) {
      setUser(null)
      setDefaultAddress(null)
      await AsyncStorage.removeItem('authToken')
      await AsyncStorage.removeItem('defaultAddress')
      return true
    }
    return false
  }

  const signup = async (form: RegisterForm) => {
    const data = await UserService.signup(form)
    if (data.token) {
      setToken(data.token)
      const userData = await UserService.getPrivateUser()
      setUser(userData)
      setInfosLoaded(true)
      return true;
    }
    return false;
  }

  const setToken = (token: string) => {
    AsyncStorage.setItem('authToken', token)
  }

  const loadUserData = async () => {
    const userData = await UserService.getPrivateUser()
    setUser(userData)
    return userData
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

