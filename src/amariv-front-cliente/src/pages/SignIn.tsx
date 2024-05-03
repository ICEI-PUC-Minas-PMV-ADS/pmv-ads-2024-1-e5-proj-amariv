import logo from "../assets/amariv.png"
import Input from "../components/Inputs/Input";
import PasswordInput from "../components/Inputs/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-green to-[#3f5745] lg:py-6">
      <div className="w-full min-h-screen flex bg-light-green items-center flex-col justify-center gap-4 lg:w-[550px] lg:rounded-2xl lg:px-16 px-8">
        <img src={logo} className="w-36 mt-6" />
        <div className="w-full flex flex-col gap-2 mb-20 max-w-[360px]">
          <text className="text-4xl font-bold text-primary-green text-center mb-2">Cadastre-se</text>
          <Input title="Nome" titleColor="dark" />
          <Input title="Email" titleColor="dark" />
          <PasswordInput title="Senha" titleColor="dark" />
          <PasswordInput title="Confirmar senha" titleColor="dark" />
          <Input title="Telefone" titleColor="dark" />
          <div className="w-full flex items-center justify-center">
            <div className="w-2/3 mt-6 max-w-[250px]">
              <PrimaryButton title="Cadastrar" />
            </div>
          </div>
          <text onClick={() => {
            navigate("/login")
          }}
            className="text-md mt-8 cursor-pointer text-primary-green text-center">Já possui uma conta? <text className="font-bold">Entrar</text></text>
        </div>
      </div>
    </div>
  );
}

export default SignIn;