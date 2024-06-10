import AmarivLogo from "../../assets/images/amariv_logo.png";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";

/**
 * Password Recovery page
 */
export function PasswordRecoveryPage() {
  /**
   * Layout
   */

  return (
    <div className="flex w-full h-full bg-amariv justify-center items-center">
      <div>
        <div className="w-[30rem] bg-[#E8F4EB] shadow-2xl p-10 flex items-center flex-col">
          <img
            src={AmarivLogo}
            alt="Amariv logo"
            className="w-[10rem] h-[5rem]"
          />
          <h2 className="text-[#53735B] text-[1.75rem]">Recuperar senha</h2>
          <div className="form">
            <Form>
              <div className="espaco1"></div>
              <Input className="input" type="email" label="Email" required />
              <div className="espaco1"></div>
              <Button
                type="submit"
                label="Recuperar Senha"
                className="w-[80%]"
              />
              <p className="text-[#666666] text-xs my-4">Ir para login</p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
