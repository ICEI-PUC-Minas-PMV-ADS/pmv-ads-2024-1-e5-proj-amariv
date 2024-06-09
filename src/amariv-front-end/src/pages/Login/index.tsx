import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, useAppContext } from "../../AppContext";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { AuthUtils } from "../../utils/AuthUtils";
import { User } from "../../models/User";
import AmarivLogo from "../../assets/images/amariv_logo.png";
import BackgroundLogin from "../../assets/images/background-login.png";
import React from "react";

const API_BASE_URL = 'http://localhost:5100';

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
  }, [state]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('Enviando solicitação de login...');

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      console.log('Resposta recebida:', response);

      if (response.ok) {
        console.log('Login bem-sucedido!');

        // Extrai os dados do usuário da resposta JSON
        const responseData = await response.json();

        // Cria um objeto user do tipo User com as informações do usuário
        const user: User = {
          id: responseData.id,
          nome: responseData.nome,
          email: responseData.email,
          telefone: responseData.telefone || undefined,
        };

        // Chama a função login do AuthUtils passando o contexto da aplicação e o objeto user PODE GERAR UM ERRO!!!
        AuthUtils.login({ state, dispatch }, responseData[0].message);

        navigate("/home");
      } else {
        console.log('Login falhou.');

        // Extrai a mensagem de erro da resposta JSON
        const errorData = await response.json();

        alert(errorData.message || "Usuário ou senha inválidos");
      }
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
            <img src={AmarivLogo} alt="Amariv logo" className="logo" />
            <div className="message">ACESSO RESTRITO</div>

            <div className="flex flex-col items-center">
              <div>Entrar</div>

              <Form onSubmit={handleLogin}>
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
                <Button type="submit" label="Login" className="button" />
              </Form>
            </div>
          </div>
        </div>
        <div className="w-full h-full" style={{ backgroundImage: `url(${BackgroundLogin})`, backgroundRepeat: 'no-repeat' }}></div>
      </div>
    </>
  );
}
