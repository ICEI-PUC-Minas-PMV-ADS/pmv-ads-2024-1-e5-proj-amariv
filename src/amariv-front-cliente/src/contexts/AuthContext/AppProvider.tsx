import { useState, useEffect } from 'react'
import { User } from "../../types/User";
import { AppContext } from "./AppContext";
import { LoginForm } from '../../types/LoginForm';
import { UserService } from '../../services/UserService';
import { RegisterForm } from '../../types/RegisterForm';
import LoadingScreen from '../../components/LoadingScreen';
import { Endereco } from '../../types/Endereco';
import { EnderecoService } from '../../services/EnderecoService';
import { Material } from '../../types/Material';
import { MaterialService } from '../../services/MaterialService';
import { UpdateUsuarioForm } from '../../types/UpdateUsuarioForm';
import { Snackbar } from '@mui/material';
import { ColetaService } from '../../services/ColetaService';
import { Pagination } from '../../types/Pagination';
import { Coleta } from '../../types/Coleta';
import DialogComponent from '../../components/DialogComponent';

export const AppProvider = ({ children }: { children: JSX.Element }) => {

  const [user, setUser] = useState<User | null>(null)
  const [enderecos, setEnderecos] = useState<Endereco[]>([])
  const [infosLoaded, setInfosLoaded] = useState(false)
  const [materiais, setMateriais] = useState<Material[]>([])
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [messageSnackBar, setMessageSnackBar] = useState("")
  const [totalPagesColetasAberto, setTotalPagesColetasAberto] = useState(0)
  const [pageNumberColetasAberto, setPageNumberColetasAberto] = useState(1)
  const [coletasAberto, setColetasAberto] = useState<Coleta[]>([])
  const [totalPagesColetasFinalizado, setTotalPagesColetasFinalizado] = useState(0)
  const [pageNumberColetasFinalizado, setPageNumberColetasFinalizado] = useState(1)
  const [coletasFinalizado, setColetasFinalizado] = useState<Coleta[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMessage, setDialogMessage] = useState("")
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogOnAccept, setDialogOnAccept] = useState<() => void>(() => () => {
    setDialogOpen(false);
  })
  const [dialogAlert, setDialogAlert] = useState(false)

  useEffect(() => {
    const validarToken = async () => {
      const tokenLocalStorage = localStorage.getItem('authToken')
      if (tokenLocalStorage != null) {

        await UserService.getUser().then(async (e) => {
          setUser(e)
          await EnderecoService.buscarEnderecos().then(e => {
            setEnderecos(e.data)
          })
          await ColetaService.coletasAberto(pageNumberColetasAberto).then(r => {
            let result: Pagination<Coleta> = r.data
            setColetasAberto(result.items)
            console.log(result.items)
            setTotalPagesColetasAberto(result.pageCount)
            setPageNumberColetasAberto(result.pageNumber)
          })

          await ColetaService.coletasFinalizado(pageNumberColetasAberto).then(r => {
            let result: Pagination<Coleta> = r.data
            setColetasFinalizado(result.items)
            setTotalPagesColetasFinalizado(result.pageCount)
            setPageNumberColetasFinalizado(result.pageNumber)
          })

        }).catch(e => {
          alert('Sessão expirada!')
          localStorage.removeItem('authToken')
          setUser(null)
          setInfosLoaded(true)
        })
        setInfosLoaded(true)
      }
      await MaterialService.getAll().then(x => {
        setMateriais(x.data)
      })
    }
    validarToken()
    setInfosLoaded(true)
  }, []);

  const atualizarEnderecos = async () => {
    await EnderecoService.buscarEnderecos().then(e => {
      setEnderecos(e.data)
    })
  }

  const fetchMoreColetasAberto = async () => {
    if (pageNumberColetasAberto < totalPagesColetasAberto) {
      await ColetaService.coletasAberto(pageNumberColetasAberto + 1).then(
        r => {
          let result: Pagination<Coleta> = r.data
          setColetasAberto(coletasAberto.concat(result.items))
          setTotalPagesColetasAberto(result.pageCount)
          setPageNumberColetasAberto(result.pageNumber)
        }
      )
    }
  }

  const resetColetasAberto = async () => {
    await ColetaService.coletasAberto(1).then(r => {
      let result: Pagination<Coleta> = r.data
      setColetasAberto(result.items)
      setTotalPagesColetasAberto(result.pageCount)
      setPageNumberColetasAberto(result.pageNumber)
    })
  }

  const fetchMoreColetasFinalizado = async () => {
    if (pageNumberColetasAberto < totalPagesColetasAberto) {
      await ColetaService.coletasFinalizado(pageNumberColetasAberto + 1).then(
        r => {
          let result: Pagination<Coleta> = r.data
          setColetasFinalizado(coletasAberto.concat(result.items))
          setTotalPagesColetasFinalizado(result.pageCount)
          setPageNumberColetasFinalizado(result.pageNumber)
        }
      )
    }
  }

  const resetColetasFinalizado = async () => {
    await ColetaService.coletasFinalizado(1).then(r => {
      let result: Pagination<Coleta> = r.data
      setColetasFinalizado(result.items)
      setTotalPagesColetasFinalizado(result.pageCount)
      setPageNumberColetasFinalizado(result.pageNumber)
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
        await resetColetasAberto()
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

  const cancelarColeta = (coletaId: number) => {
    setDialogAlert(false)
    setDialogMessage("Você deseja realmente cancelar essa coleta?")
    setDialogTitle("")
    setDialogOpen(true)
    setDialogOnAccept(() => {
      const handleAccept = async () => {
        setInfosLoaded(false);
        try {
          await ColetaService.cancelarColeta(coletaId);
          await resetColetasAberto();
          await resetColetasFinalizado();
          setDialogOpen(false);
          setSnackBarOpen(true);
          setMessageSnackBar("Coleta cancelada com sucesso!");
        } catch (error) {
          setDialogTitle("");
          setDialogMessage("Não foi possível cancelar a coleta, tente novamente mais tarde.");
          setDialogAlert(true);
        }
        setInfosLoaded(true);
      };

      return handleAccept;
    })
  }


  return (
    <>
      <DialogComponent
        alert={dialogAlert}
        open={dialogOpen}
        text={dialogMessage}
        title={dialogTitle}
        onAccept={dialogOnAccept}
        onClose={() => {
          setDialogOpen(false)
        }}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarOpen}
        onClose={() => { setSnackBarOpen(false) }}
        autoHideDuration={3000}
        message={messageSnackBar}
      />
      <LoadingScreen open={!infosLoaded} />
      <AppContext.Provider value={{ user, login, logout, signup, enderecos, atualizarEnderecos, materiais, updateUsuario, setSnackBarOpen, setMessageSnackBar, coletasAberto, fetchMoreColetasAberto, resetColetasAberto, totalPagesColetasAberto, pageNumberColetasAberto, coletasFinalizado, fetchMoreColetasFinalizado, resetColetasFinalizado, totalPagesColetasFinalizado, pageNumberColetasFinalizado, cancelarColeta }}>
        {children}
      </AppContext.Provider>
    </>

  )
}

