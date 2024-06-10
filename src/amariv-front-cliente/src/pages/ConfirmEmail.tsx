import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { UserService } from "../services/UserService";
import DynamicIcon from "../components/DynamicIcon";

function ConfirmEmail() {

  let { usuarioId, codigo } = useParams()
  const [confirmed, setConfirmed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState(false)

  useEffect(() => {
    handleConfirm()
  }, [])

  const handleConfirm = async () => {
    await UserService.confirmarEmail({ usuarioId: usuarioId as string, codigoAtivacao: codigo as string }).then(x => {
      setConfirmed(true)
    }).catch(() => {
      setServerError(true)
    })
    setLoading(false)
  }

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3f5745] to-primary-green lg:py-6">
        <div className="w-full min-h-screen md:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
          <TopBar title="Confirmar email" backButton={false} />
          {
            confirmed == false &&
            <>
              {
                loading == true &&
                <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
                  <p className="text-3xl font-bold text-primary-green mb-2 mt-8">Confirmando email</p>
                  <div className="w-full p-12 flex items-center justify-center mb-4">
                    <CircularProgress
                      size={40}
                      sx={
                        {
                          color: "#CADDA8"
                        }
                      } />
                  </div>
                </div>
              }
              {
                serverError == true &&
                <div className="w-full px-6 max-w-[420px] p-12">
                  <Alert severity="error">Houver algum erro ao confimar seu email. Tente novamente mais tarde.</Alert>
                </div>
              }

            </>
          }
          {
            confirmed == true &&
            <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
              <p className="text-2xl font-bold text-primary-green mb-2 mt-8">Email confirmado com sucesso!</p>
              <div className="w-full flex items-center justify-center mb-8 text-primary-green">
                <DynamicIcon iconName="IconCheckbox" size={100} />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default ConfirmEmail;