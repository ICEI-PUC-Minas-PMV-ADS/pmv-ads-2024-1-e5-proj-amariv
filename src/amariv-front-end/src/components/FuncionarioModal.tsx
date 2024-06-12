import React, { useState } from 'react';
import DynamicIcon from './re_components/DynamicIcon';
import SelectInput from './re_components/Inputs/SelectInput';
import Input from './re_components/Inputs/Input';
import PasswordInput from './re_components/Inputs/PasswordInput';
import { IconSquare, IconSquareCheck } from '@tabler/icons-react';
import { UserService } from '../services/UserService2';

interface FuncionarioInfo {
  id: string;
  nome: string;
  email: string;
  sexo: string;
  telefone: string;
  cargo: string;
  senha: string;
  suportaPeso: boolean;
}

interface FuncionarioModalProps {
  title: string;
  funcionarioInfo: FuncionarioInfo;
  setFuncionarioInfo: React.Dispatch<React.SetStateAction<FuncionarioInfo>>;
  onSave: () => void;
  onCancel: () => void;
}

const FuncionarioModal: React.FC<FuncionarioModalProps> = ({
  title,
  funcionarioInfo,
  setFuncionarioInfo,
  onSave,
  onCancel,
}) => {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const [cargoOptionsOpen, setCargoOptionsOpen] = useState(false)
  const [sexoOptionsOpen, setSexoOptionsOpen] = useState(false)
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("")

  const [passwordEspecial, setPasswordEspecial] = useState(false)
  const [passwordLenght, setPasswordLenght] = useState(false)
  const [passwordNumber, setPasswordNumber] = useState(false)
  const [passwordUppercase, setPasswordUppercase] = useState(false)
  const [passwordLowercase, setPasswordLowercase] = useState(false)

  const [loadingEmail, setLoadingEmail] = useState(false)
  const [emailAvailable, setEmailAvailable] = useState(false)
  const [emailValidated, setEmailValidated] = useState(false)

  const [nomeError, setNomeError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [telefoneError, setTelefoneError] = useState(false)
  const [cargoError, setCargoError] = useState(false)
  const [sexoError, setSexoError] = useState(false)
  const [repasswordError, setRepasswordError] = useState(false)

  const [messageErrorEmail, setMessageErrorEmail] = useState("Digite um email válido. Ex: email@email.com.br")

  const emailUnavaliable = () => {
    setMessageErrorEmail("Esse endereço de email já está em uso por outra conta")
    setEmailError(true)
  }

  const emailValidateFailed = () => {
    setMessageErrorEmail("Digite um email válido. Ex: email@email.com.br")
    setEmailError(true)
  }

  const checkPasswordLenght = (senha: string) => {
    if (senha.length < 6) {
      setPasswordLenght(false)
      return false
    }
    setPasswordLenght(true)
    return true
  }

  const checkPasswordEspecial = (senha: string) => {
    const caracteresEspeciais = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!caracteresEspeciais.test(senha)) {
      setPasswordEspecial(false)
      return false;
    }
    setPasswordEspecial(true)
    return true
  }

  const checkPasswordNumber = (senha: string) => {
    const numeros = /[0-9]/;
    if (!numeros.test(senha)) {
      setPasswordNumber(false)
      return false;
    }
    setPasswordNumber(true)
    return true
  }

  const checkPasswordUpperCase = (senha: string) => {
    const maiusculas = /[A-Z]/;
    if (!maiusculas.test(senha)) {
      setPasswordUppercase(false)
      return false;
    }
    setPasswordUppercase(true)
    return true
  }

  const checkPasswordLowercase = (senha: string) => {
    const minusculas = /[a-z]/;
    if (!minusculas.test(senha)) {
      setPasswordLowercase(false)
      return false;
    }
    setPasswordLowercase(true)
    return true
  }

  function verificarSenha(senha: string) {
    checkPasswordEspecial(senha)
    checkPasswordNumber(senha)
    checkPasswordLenght(senha)
    checkPasswordLowercase(senha)
    checkPasswordUpperCase(senha)
  }

  const validarCampos = (): boolean => {

    if (funcionarioInfo.nome == null || funcionarioInfo.nome == "" || funcionarioInfo.nome == undefined) {
      setNomeError(true)
      return false
    }

    if (title != "Editar Funcionário" && !emailRegex.test(funcionarioInfo.email)) {
      emailValidateFailed()
      return false
    }

    if (funcionarioInfo.sexo == null || funcionarioInfo.sexo == "" || funcionarioInfo.sexo == undefined) {
      setSexoError(true)
      return false
    }

    if (funcionarioInfo.telefone.length < 10 || funcionarioInfo.telefone == null || funcionarioInfo.telefone == undefined) {
      setTelefoneError(true)
      return false
    }

    if (funcionarioInfo.cargo == null || funcionarioInfo.cargo == "" || funcionarioInfo.cargo == undefined) {
      setCargoError(true)
      return false
    }

    if (
      !checkPasswordEspecial(funcionarioInfo.senha) ||
      !checkPasswordNumber(funcionarioInfo.senha) ||
      !checkPasswordLenght(funcionarioInfo.senha) ||
      !checkPasswordLowercase(funcionarioInfo.senha) ||
      !checkPasswordUpperCase(funcionarioInfo.senha)
    ) {
      setPasswordError(true)
      return false
    }

    if (funcionarioInfo.senha != confirmacaoSenha) {
      setRepasswordError(true)
      return false
    }

    return true
  }

  return (
    <div className="bg-light-backgroud rounded-[5px] py-8  px-16">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="mb-2">
        <Input
          title='Nome'
          error={nomeError}
          value={funcionarioInfo.nome}
          errorMessage="Digite um nome"
          onChange={(e) => {
            setNomeError(false)
            setFuncionarioInfo({ ...funcionarioInfo, nome: e.target.value })
          }}
          requiredField
          titleColor='dark'
        />
      </div>
      <div className="mb-2">
        {
          title != "Editar Funcionário" &&
          <Input title="Email" titleColor="dark" value={funcionarioInfo.email}
            error={emailError}
            errorMessage={messageErrorEmail}
            rightIcon={emailValidated ? (emailAvailable ? "IconCheck" : "IconX") : undefined}
            onChangeDebounce={async (value) => {
              if (emailRegex.test(value) && value != "") {
                setEmailAvailable(false)
                setLoadingEmail(true)
                let result = await UserService.emailAvaliable(value)
                if (result) {
                  setEmailValidated(true)
                  setEmailAvailable(true)
                }
                else {
                  setEmailValidated(true)
                  setEmailAvailable(false)
                  emailUnavaliable()
                }
                setLoadingEmail(false)
              }
              else if (!emailRegex.test(value) && value != "") {
                emailValidateFailed()
              }
            }}
            requiredField
            rightLoading={loadingEmail}
            onChange={e => {
              setEmailValidated(false)
              setEmailError(false)
              setFuncionarioInfo({ ...funcionarioInfo, email: e.target.value })
            }} />
        }
        {
          title == "Editar Funcionário" &&
          <Input
            title='Email'
            disabled
            value={funcionarioInfo.email}
            onChange={(e) => {
              setEmailError(false)
              setFuncionarioInfo({ ...funcionarioInfo, email: e.target.value })
            }}
            titleColor='dark'
          />
        }
      </div>
      <div className="mb-2">
        <SelectInput
          requiredField
          title='Sexo'
          error={sexoError}
          errorMessage='Selecione um sexo'
          titleColor='dark'
          value={funcionarioInfo.sexo == "" ? "Selecionar" : funcionarioInfo.sexo}
          onClickSelectableInput={() => {
            setSexoError(false)
            setSexoOptionsOpen(!sexoOptionsOpen)
          }}
          iconOpen={sexoOptionsOpen}
          optionsSelectableInputOpen={sexoOptionsOpen}
          optionsSelectableInput={[
            {
              label: "Masculino",
              value: "masculino"
            },
            {
              label: "Feminino",
              value: "feminino"
            },
          ]}
          onClickOptionSelectable={(value) => {
            setFuncionarioInfo({ ...funcionarioInfo, sexo: value })
            setSexoOptionsOpen(false)
          }}
        />
      </div>
      <div className="mb-2">
        <Input
          title="Telefone"
          error={telefoneError}
          titleColor="dark"
          value={funcionarioInfo.telefone}
          mask={funcionarioInfo.telefone ? (funcionarioInfo.telefone.length < 10 ? "(99)9999-9999" : "(99)99999-9999") : ""}
          errorMessage="Digite um número válido. Ex: (31)9999-9999"
          requiredField
          onChange={(e) => {
            setTelefoneError(false)
            setFuncionarioInfo({ ...funcionarioInfo, telefone: e.target.value.replace(/\D/g, '') })
          }} />
      </div>
      <div className="mb-2">
        <SelectInput
          requiredField
          title='Cargo'
          error={cargoError}
          errorMessage='Selecione um cargo'
          titleColor='dark'
          value={funcionarioInfo.cargo == "" ? "Selecionar" : funcionarioInfo.cargo}
          onClickSelectableInput={() => {
            setCargoError(false)
            setCargoOptionsOpen(!cargoOptionsOpen)
          }}
          iconOpen={cargoOptionsOpen}
          optionsSelectableInputOpen={cargoOptionsOpen}
          optionsSelectableInput={[
            {
              label: "Todos",
              value: "Todos"
            },
            {
              label: "Motorista",
              value: "Motorista"
            },
            {
              label: "Reciclagem",
              value: "Reciclagem"
            },
            {
              label: "Administrador",
              value: "Administrador"
            },
            {
              label: "Outro",
              value: "outro"
            }
          ]}
          onClickOptionSelectable={(value) => {
            setFuncionarioInfo({ ...funcionarioInfo, cargo: value })
            setCargoOptionsOpen(false)
          }}
        />
      </div>
      <div className="mb-2">
        <PasswordInput
          title="Senha"
          titleColor="dark"
          value={funcionarioInfo.senha}
          error={passwordError}
          errorMessage="Digite uma senha válida"
          requiredField
          onChange={e => {
            setPasswordError(false)
            verificarSenha(e.target.value)
            setFuncionarioInfo({ ...funcionarioInfo, senha: e.target.value })
          }} />
        {
          (funcionarioInfo.senha && funcionarioInfo.senha.length != 0) &&
          <div className="text-[10px] ml-2 mb-2 mt-2">
            <div >
              <p className="font-bold">A senha deve conter:</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <DynamicIcon iconName={passwordLenght ? "IconCheck" : "IconX"} size={10} className={passwordLenght ? "text-green-600" : "text-red-500"} />
              <p>Pelo menos 6 caracteres</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <DynamicIcon iconName={passwordEspecial ? "IconCheck" : "IconX"} size={10} className={passwordEspecial ? "text-green-600" : "text-red-500"} />
              <p>Pelo menos um caractere especial</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <DynamicIcon iconName={passwordNumber ? "IconCheck" : "IconX"} size={10} className={passwordNumber ? "text-green-600" : "text-red-500"} />
              <p>Pelo menos um número</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <DynamicIcon iconName={passwordLowercase ? "IconCheck" : "IconX"} size={10} className={passwordLowercase ? "text-green-600" : "text-red-500"} />
              <p>Pelo menos uma letra minúscula</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <DynamicIcon iconName={passwordUppercase ? "IconCheck" : "IconX"} size={10} className={passwordUppercase ? "text-green-600" : "text-red-500"} />
              <p>Pelo menos uma letra maiúscula</p>
            </div>
          </div>
        }
      </div>
      <div className='mb-6'>
        <PasswordInput title="Confirmar senha" titleColor="dark" value={confirmacaoSenha}
          requiredField
          error={repasswordError}
          errorMessage="As senhas digitadas não coincidem"
          onChange={v => {
            setRepasswordError(false)
            setConfirmacaoSenha(v.target.value)
          }} />
      </div>
      <div className="flex flex-row items-center cursor-pointer mb-12" onClick={() => {
        setFuncionarioInfo({ ...funcionarioInfo, suportaPeso: !funcionarioInfo.suportaPeso })
      }}>
        {
          funcionarioInfo.suportaPeso == false &&
          <IconSquare className=" text-primary-green" />
        }
        {
          funcionarioInfo.suportaPeso == true &&
          <IconSquareCheck className=" text-primary-green" />
        }
        <p className="font-light text-text-gray dark:text-white pl-2">Funcionário suporta peso</p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => {
            if (validarCampos()) {
              onSave()
            }
          }}
          className="bg-[#53735B] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FuncionarioModal;
