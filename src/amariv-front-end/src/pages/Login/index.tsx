import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { AuthUtils } from "../../utils/AuthUtils";
import AmarivLogo from "../../assets/images/amariv_logo.png";
import BackgroundLogin from "../../assets/images/background-login.png";
import React from "react";
import { useApi } from "../../hooks/useApi";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Usa o hook useNavigate para redirecionar o usuário após o login
  const navigate = useNavigate();

  // Usa o hook useAppContext para acessar o contexto da aplicação
  const { state, dispatch } = useAppContext();

  React.useLayoutEffect(() => {
    if (state.token) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('Enviando solicitação de login...');

      const body = { Email: email, Password: password };
      const response = await useApi.post(`login`, body);

      console.log('Resposta recebida:', response);

      console.log('Login bem-sucedido!');

      // Extrai os dados do usuário da resposta JSON
      const responseData = await response.data;

      // Chama a função login do AuthUtils passando o contexto da aplicação e o objeto user PODE GERAR UM ERRO!!!
      AuthUtils.login({ state, dispatch }, responseData[0].message);

      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-row">
        <div className="w-[50rem] px-4 bg-[#53735B] flex justify-center items-center">
          <div className="w-[30rem] p-[5rem] flex flex-col items-center">
            <img src={AmarivLogo} alt="Amariv logo" className="w-[13rem] h-[9rem]" />
            <div className="text-[1.25rem] text-[#FBFFF3] pb-[1.25rem]">
              ACESSO RESTRITO
            </div>

            <div className="flex flex-col items-center w-full">
              <div className="text-[1.5rem] text-[#FFFFFF] w-full font-bold">Entrar</div>

              <Form className="w-full" onSubmit={handleLogin}>
                <div className="w-full">
                  <Input
                    type="email"
                    label=""
                    placeholder="Email"
                    required
                    className="input w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <Input
                    type="password"
                    label=""
                    placeholder="Senha"
                    required
                    minLength={6}
                    className="input w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="w-full px-[5rem]">
                  <Button type="submit" label="Login" className="button" />
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="w-full h-auto" style={{ backgroundImage: `url(${BackgroundLogin})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}></div>
      </div>
    </>
  );
}
