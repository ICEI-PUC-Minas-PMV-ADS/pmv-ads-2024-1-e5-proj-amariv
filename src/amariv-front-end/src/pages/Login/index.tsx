import React from "react";
import AmarivLogo from "../../assets/images/amariv_logo.png";
import BackgroundLogin from "../../assets/images/background-login.jpeg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import "./index.css";

/**
 * Login Page
 */
export function LoginPage() {
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
              <Form>
                <Input
                  type="text"
                  label=""
                  placeholder="Usuário"
                  required
                  className="input"
                />
                <Input
                  type="password"
                  label=""
                  placeholder="Senha"
                  required
                  minLength={6}
                  className="input"
                />
                <Button type="submit" label="Login" className="button" />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
