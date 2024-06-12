import React, { useState } from 'react';
import DynamicIcon from './re_components/DynamicIcon';

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
  onSave: (event: React.FormEvent) => void;
  onCancel: () => void;
}

const FuncionarioModal: React.FC<FuncionarioModalProps> = ({
  title,
  funcionarioInfo,
  setFuncionarioInfo,
  onSave,
  onCancel,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFuncionarioInfo({ ...funcionarioInfo, suportaPeso: event.target.checked });
  };

  const [passwordEspecial, setPasswordEspecial] = useState(false)
  const [passwordLenght, setPasswordLenght] = useState(false)
  const [passwordNumber, setPasswordNumber] = useState(false)
  const [passwordUppercase, setPasswordUppercase] = useState(false)
  const [passwordLowercase, setPasswordLowercase] = useState(false)

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

  return (
    <div className="bg-[#e8f4eb] rounded-[5px] p-4 pr-16 pl-16">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <form onSubmit={onSave}>
        <div className="mb-3">
          <label htmlFor="nome" className="text-sm text-gray-600">Nome:</label>
          <input
            type="text"
            id="nome"
            value={funcionarioInfo.nome}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, nome: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="text-sm text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            value={funcionarioInfo.email}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, email: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sexo" className="text-sm text-gray-600">Sexo:</label>
          <select
            id="sexo"
            value={funcionarioInfo.sexo}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, sexo: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Selecione</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="text-sm text-gray-600">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            value={funcionarioInfo.telefone}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, telefone: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cargo" className="text-sm text-gray-600">Cargo:</label>
          <select
            id="cargo"
            value={funcionarioInfo.cargo}
            onChange={(e) => setFuncionarioInfo({ ...funcionarioInfo, cargo: e.target.value })}
            className="w-full py-2 px-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="Todos">Selecione</option>
            <option value="Motorista">Motorista</option>
            <option value="Reciclagem">Reciclagem</option>
            <option value="Administrador">Administrador</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="text-sm text-gray-600">Senha:</label>
          <input
            type="password"
            id="senha"
            value={funcionarioInfo.senha}
            onChange={(e) => {
              verificarSenha(e.target.value)
              setFuncionarioInfo({ ...funcionarioInfo, senha: e.target.value })
            }}
            className="w-full py-2 px-3 rounded border mb-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {
            funcionarioInfo.senha.length != 0 &&
            <div className="text-[10px] ml-2 mb-2">
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
        <div className="mb-3">
          <label htmlFor="suportaPeso" className="text-sm text-gray-600 mr-2">Suporta Peso:</label>
          <input
            type="checkbox"
            id="suportaPeso"
            checked={funcionarioInfo.suportaPeso}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-600"></span>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
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
      </form>
    </div>
  );
};

export default FuncionarioModal;
