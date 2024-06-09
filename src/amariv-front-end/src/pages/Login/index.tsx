import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import AmarivLogo from "../../assets/images/amariv_logo.png";
import BackgroundLogin from "../../assets/images/background-login.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { AuthUtils } from "../../utils/AuthUtils";
import { User } from "../../models/User";

const API_BASE_URL = 'http://localhost:5100';

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Usa o hook useNavigate para redirecionar o usuário após o login
  const navigate = useNavigate();

  // Usa o hook useAppContext para acessar o contexto da aplicação
  const { state, dispatch } = useAppContext();

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

        // Exibir o token retornado no console
        console.log('Token retornado:', responseData.token);

        // Cria um objeto user do tipo User com as informações do usuário
        const user: User = {
          id: responseData.id,
          nome: responseData.nome,
          email: responseData.email,
          telefone: responseData.telefone || undefined,
        };

        // Chama a função login do AuthUtils passando o contexto da aplicação e o objeto user PODE GERAR UM ERRO!!!
        AuthUtils.login({ state, dispatch }, responseData.token);

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
      <div
        style={{
          backgroundImage: `url(${BackgroundLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div className="login-box">
          <div className="centered-div">
            <img src={AmarivLogo} alt="Amariv logo" className="logo" />
            <div className="message">ACESSO RESTRITO</div>

            <div className="login-form">
              <div className="entrar-message">Entrar</div>

              <Form onSubmit={handleLogin}>
                <div>
                  <Input
                    type="email"
                    label=""
                    placeholder="Email"
                    required
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    label=""
                    placeholder="Senha"
                    required
                    minLength={6}
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" label="Login" className="button" />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
