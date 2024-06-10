import logo from "../assets/amariv.png"
import img from "../assets/home-image.jpeg"
import DynamicIcon from "../components/DynamicIcon";
import PrimaryButton from "../components/PrimaryButton";
import location from "../assets/amariv-location.png"
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col bg-light-green w-full min-h-screen justify-between">
      <div className="flex flex-col gap-4 p-4 lg:p-6 text-primary-green w-full items-center mb-4">
        <div className="w-full flex justify-between">
          <img src={logo} className="w-20" />
          <div className="w-1/2 flex justify-center items-center max-w-[250px]">
            <PrimaryButton title="Agendar coleta" onClick={() => {
              navigate("/login")
            }} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full lg:flex-row h-[90vh] justify-center lg:gap-32 pb-20">
          <div className="flex flex-col items-center mt-4 lg:items-start">
            <h1 className="text-3xl font-bold lg:text-7xl">Bem vindo</h1>
            <p className="text-md font-light text-center lg:text-left mt-2 lg:text-2xl">à Associação de Catadores de Materiais Recicláveis da Ilha de Vitoria.</p>
          </div>
          <img src={img} className="w-[90%] md:w-[35%] rounded-lg mt-4" />
        </div>
        <div className="mt-6 w-full lg:flex lg:flex-row lg:gap-32 lg:justify-center">
          <div className="block md:hidden">
            <h1 className="text-2xl font-bold lg:text-right lg:text-5xl">Venha nos visitar</h1>
            <div className=" flex gap-4 mt-2">
              <DynamicIcon iconName="IconMapPin" className="mt-2" size={35} />
              <a className="text-md font-semibold mt-2 cursor-pointer lg:text-right lg:text-2xl" target="_blank" href="https://maps.app.goo.gl/oqYUefcgvfxKDgXM9">
                R. Ouro Preto, 95 - Maria Ortiz, Vitória - ES <DynamicIcon iconName="IconLink" className="inline-flex" size={20} /></a>
            </div>
          </div>
          <img src={location} className="md:w-[40%] rounded-lg mt-4 lg:block cursor-pointer" onClick={() => {
            window.open("https://maps.app.goo.gl/oqYUefcgvfxKDgXM9", "_blank")
          }} />
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold lg:text-right lg:text-5xl">Venha nos visitar</h1>
            <div className=" flex gap-4 mt-2">
              <DynamicIcon iconName="IconMapPin" className="mt-2" size={35} />
              <a className="text-md font-semibold mt-2 cursor-pointer lg:text-right lg:text-2xl" target="_blank" href="https://maps.app.goo.gl/oqYUefcgvfxKDgXM9">
                R. Ouro Preto, 95 - Maria Ortiz, Vitória - ES <DynamicIcon iconName="IconLink" className="inline-flex" size={20} /></a>
            </div>
          </div>
        </div>
        <div className=" my-16 w-full lg:mt-52 lg:mb-36">
          <h1 className="text-2xl font-bold lg:text-5xl text-center">Agende uma coleta</h1>
          <div className="flex w-full justify-center mt-4 lg:mt-8">
            <div className="w-2/3 max-w-[250px]">
              <PrimaryButton title="Agendar coleta" onClick={() => {
                navigate("/login")
              }} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-primary-green p-4">
        <img src={logo} className="w-20" />
      </div>
    </div>
  );
}

export default Landing;