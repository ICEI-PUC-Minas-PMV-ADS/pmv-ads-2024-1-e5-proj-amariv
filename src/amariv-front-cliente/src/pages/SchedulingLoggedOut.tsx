import Input from "../components/Inputs/Input";
import PasswordInput from "../components/Inputs/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";

function SchedulingLoggedOut() {
  const navigate = useNavigate()

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3f5745] to-primary-green lg:py-6">
      <div className="w-full min-h-screen flex bg-light-green items-center flex-col justify-center gap-4 lg:w-[550px] lg:rounded-2xl lg:px-16 px-8">
        <div className="w-full flex flex-col gap-2 mb-20 max-w-[360px]">
          <text className="text-3xl font-bold text-primary-green mb-2 mt-8">Seus dados</text>
          <Input title="Nome" titleColor="dark" requiredField />
          <Input title="Celular" titleColor="dark" requiredField />
          <Input title="Telefone" titleColor="dark" />
          <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereço</text>
          <Input title="CEP" titleColor="dark" />
          <Input title="Logradouro" titleColor="dark" requiredField />
          <Input title="Número" titleColor="dark" requiredField />
          <Input title="Bairro" titleColor="dark" requiredField />
          <Input title="Cidade" titleColor="dark" requiredField />
          <Input title="Complemento" titleColor="dark" />
          <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Materiais da coleta</text>
          <Input title="Descrição geral dos materiais" titleColor="dark" requiredField />
          <div className="w-full flex items-center justify-center">
            <div className="w-2/3 mt-6 max-w-[250px]">
              <PrimaryButton title="Agendar coleta" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchedulingLoggedOut;