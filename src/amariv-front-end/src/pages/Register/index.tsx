import React from "react";
import AmarivLogo from "../../assets/images/amariv_logo.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { MaskedUtils } from "../../utils/MaskedUtils";
import { UserService } from "../../services/UserService";
import { AuthUtils } from "./../../utils/AuthUtils";
import { AppContext } from "../../AppContext";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * Register page
 */
export function RegisterPage() {
  const appContext = React.useContext(AppContext);
  const navigate = useNavigate();

  /**
   * States
   */

  const phoneInput = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confPassword, setConfPassword] = React.useState("");

  /**
   * Events
   */

  const handleSubmit = React.useCallback(
    async (evt: React.FormEvent<HTMLFormElement>) => {
      try {
        evt.preventDefault();

        const phoneIsInvalid =
          !MaskedUtils.isValidPhone(phone) && !MaskedUtils.isValidMobile(phone);
        if (phoneIsInvalid && phoneInput.current) {
          phoneInput.current.setCustomValidity(
            "Este campo deve ter um numero de telefone valido!"
          );
          return;
        }

        const user = await UserService.signIn({
          name,
          email,
          password,
          confPassword,
          phone,
        });

        //AuthUtils.login(appContext, );

        navigate("/home");
      } catch (e) {
        console.log(e);
      }
    },
    [appContext, navigate, name, email, password, confPassword, phone]
  );

  const handlePhoneMask = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      try {
        if (phoneInput.current) {
          phoneInput.current.setCustomValidity("");
        }
        const maskedUtils = new MaskedUtils(evt.target.value);
        if (maskedUtils.hasChanged()) {
          setPhone(maskedUtils.getMaskedValue());
        }
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  /**
   * Redirect if authenticated.
   */

  if (AuthUtils.isAuth(appContext)) {
    return <Navigate to="/home" replace={true} />;
  }

  /**
   * Layout
   */

  return (
    <div className="flex w-full h-full bg-amariv justify-center items-center">
      <div className="w-[30rem] bg-[#E8F4EB] shadow-2xl p-10 flex items-center flex-col">
        <img
          src={AmarivLogo}
          alt="Amariv logo"
          className="w-[10rem] h-[5rem]"
        />
        <h2 className="text-[#53735B] text-[1.75rem]">Cadastre-se</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              label="Nome"
              onChange={(evt) => {
                setName(evt.target.value);
              }}
              value={name}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              label="Email"
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
              value={email}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              label="Senha"
              onChange={(evt) => {
                setPassword(evt.target.value);
              }}
              value={password}
              required
              minLength={6}
            />
          </div>
          <div>
            <Input
              type="password"
              label="Confirmar senha"
              onChange={(evt) => {
                setConfPassword(evt.target.value);
              }}
              value={confPassword}
              required
              minLength={6}
            />
          </div>
          <div>
            <Input
              ref={phoneInput}
              type="text"
              label="Telefone"
              onChange={handlePhoneMask}
              value={phone}
              required
            />
          </div>
          <p className="text-[#666666] text-xs my-4">Ir para login</p>
          <Button type="submit" label="Cadastrar" className="w-[60%]" />
        </Form>
      </div>
    </div>
  );
}
