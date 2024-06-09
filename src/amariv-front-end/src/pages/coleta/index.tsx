import { useEffect, useState  } from "react";
import Input from "../../components/re_components/Inputs/Input";
import { Button2 } from "../../components/Button2";
import { Form } from "../../components/Form";
import "./index.css";
import { FormAddMateriais } from "./components/FormAddMateriais";
import { coletaService } from "../../services/ColetaService";
import { enderecoService } from "../../services/EnderecoService";
import { FormAddEndereco } from "./components/FormAddEndereco";
import { FormVerificaData } from "./components/FormVerificaData";
import { GoogleGeocodingService } from "../../services/GoogleGeocodingService";
import { Endereco } from "../../types/Endereco";
import { Coleta } from "../../types/Coleta";
import { useSearchParams } from "react-router-dom";
import { DateConvert } from "../../utils/DateConvert";
import { Alert } from "@mui/material";
import { Button } from "../../components/Button";


export interface local {
  latitude: Number,
  longitude: Number,
  tipo: string
}

export function ColetaPage() {
  const [searchParams]= useSearchParams();
  const [errorNome, setErrorNome] = useState(false)
  const [errorCel, setErrorCel] = useState(false)
  const [errorEndereco, setErrorEndereco] = useState(false)
  const [nome, setNome ] = useState(String)
  const [cel, setCel ] = useState(String)
  const [tel, setTel] = useState(String)
  const [listaMateriais, setListaMateriais ]  = useState<string>("")
  const [dataColeta, setDataColeta ] = useState(String)
  const [enderecoDto, setEnderecoDto] = useState<any>()
  const [mensagemErro ,setMensagemErro] = useState()
  const [coletaUpdate, setColetaUpdate] = useState<Coleta>()
  const [isUpdate , setIsUpdate] = useState<boolean>(false) 
  
  useEffect( () => {    
    const idColeta = searchParams.get("id");
    
    if (idColeta != null){   
      CarregaColetaCadastrada(Number.parseInt(idColeta))
      setIsUpdate(true)
    }else{
      setIsUpdate(false)
    }
  },[])

  const CarregaColetaCadastrada = async (id : number) => {
      let coleta : Coleta = {}    
    try
    {
      coleta = await coletaService.getColeta(id)
      if (coleta != undefined) {
        let endereco = await enderecoService.buscarEndereco(coleta.enderecoId!)
        setColetaUpdate(coleta)    
        setEnderecoDto(endereco)
        setListaMateriais(coleta.listaItensColeta != undefined ? coleta.listaItensColeta : "")  
        setNome(coleta.clienteNome ? coleta.clienteNome : "")
        setCel(coleta.clienteCel ? coleta.clienteCel : "")
        setTel(coleta.clienteTel ? coleta.clienteTel : "")
        setDataColeta(coleta.dataDeColeta ? DateConvert.getIsoDateTime(coleta.dataDeColeta.toString()) : "")
      }
    }catch(err){
      alert(err)
    }
  } 

  const consultaLocal  = async ( endereco : Endereco ) => {
    const geometry =  await GoogleGeocodingService.buscarLocalizacao(endereco)
     const local : local = {
      latitude:  parseFloat(geometry.location.lat),
      longitude: parseFloat(geometry.location.lng),
      tipo: geometry.location_type
     }   
      return local
  }
  
const consultaLocalidadeExata = (local: local) => {
   if (local.tipo="ROOFTOP")
    return true
   else
    return false
} 

  const jogaMensagemErro = (status: boolean) => {
    if (!status) {
        return (
            <div className=" bg-input-color w-[60%] flex flex-row justify-between p-4 rounded-lg">
                <p className=""> Favor Preencha todos os campos no formulário de endereço!</p>
                <button onClick={() => {setMensagemErro(undefined)}} className="w-[1.5rem] h-[1.5rem] flex justify-center items-center text-[1.5rem] text-red-600">X</button>
            </div>
        )
    } else {
        return (
            <div className=" bg-input-color w-full flex flex-col p-4 rounded-lg">
                <p className=""> Favor adicione material na coleta! </p>
                <button onClick={() => {setMensagemErro(undefined)}} className="w-[1.5rem] h-[1.5rem] flex justify-center items-center text-[1.5rem] text-red-600">X</button>
            </div>
        )
    }
  }

  const validarCampos = () => {

    if ( nome == undefined || nome == "" || nome == null) {
      setErrorNome(true)
      return false
    }

    if ( cel == undefined || cel == "" || cel == null)  {
      setErrorCel(true)
      return false
    }

    if ( listaMateriais == undefined || listaMateriais == "" || listaMateriais == null)  {
      window.alert("Favor cadastrar material!")
      return false
    }

    
    if (errorEndereco){
      window.alert("Favor Preencher os campos obrigatórios no endereço!") 
      return false
    }

    if (dataColeta == undefined || dataColeta == null || dataColeta == "") {  
      window.alert("Favor Preencher os campos de data e hora!")
      return false
    }
   
    return true
  }


  async function CriarAgendamentoColeta(): Promise<void> {
    try {
      
      if (enderecoDto !== undefined) {
        const endereco = await enderecoService.salvarEndereco(enderecoDto);
        const local = await consultaLocal(enderecoDto)       
        var coletaDto: Coleta = {            
          enderecoId: endereco.successes[0].message,
          clienteNome: nome,
          clienteCel: cel,
          clienteTel: tel,
          lat: local.latitude,
          lon: local.longitude,
          localidadeExata: consultaLocalidadeExata(local),
          dataCadastro: new Date(Date.now()),
          dataDeColeta: new Date(dataColeta),
          listaItensColeta: listaMateriais,
          status: true
        };
        const coleta = await coletaService.salvarColeta(coletaDto);
        window.alert("A coleta foi salva com sucesso!!")
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  async function AlterarAgendamentoColeta(): Promise<void> {
    try {
      
      if (enderecoDto !== undefined) {
        const endereco = await enderecoService.updateEndereco(enderecoDto);
        const local = await consultaLocal(enderecoDto)       
        var coletaDto: Coleta = {
          id: coletaUpdate?.id,
          enderecoId: coletaUpdate?.enderecoId,            
          clienteNome: nome,
          clienteCel: cel,
          clienteTel: tel,
          lat: local.latitude,
          lon: local.longitude,
          localidadeExata: consultaLocalidadeExata(local),
          dataDeColeta: new Date(dataColeta),
          listaItensColeta: listaMateriais,
        };
        const col = await coletaService.updateColeta(coletaDto);
        window.alert("A coleta foi salva com sucesso!!")
      }
    } catch (e: any) {
      window.alert(e)
    }
  }

  const deletarAgendamento = async () => {
    try {
      var confirmar: boolean = window.confirm("Você realmente gostária de deletar essa coleta?")
      if (confirmar) {
        if (coletaUpdate !== undefined) {
          var newColeta: Coleta = coletaUpdate;
          newColeta.delete = true
          coletaService.updateColeta(newColeta)
        }
      }
    } catch (err) {

    }
  }

  return (
    <>
      <div className="App">
       { mensagemErro }
        <div className="content">
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem]">
            Novo agendamento de coleta
          </h2>
          <div className="title">
            <p className="text-[#666666] text-sm my-1">Dados do cliente</p>
          </div>

          <Form>
            <div  className="w-[80%] justify-between p-8 items-center lg:min-h-fit flex bg-light-backgroud  flex-row lg:min-w-max ">
              <div className="w-[40%]">
                <Input 
                  title="Nome Cliente"
                  error = {errorNome}
                  errorMessage = "Digite o nome do cliente"
                  titleColor="dark"
                  requiredField             
                  value={nome}
                  onChange={ (evt) => {
                    setErrorNome(false)
                    setNome(evt.target.value)
                  }}               
                  />
              </div>
              <div>
                <Input 
                  title="Telefone Celular"
                  error = {errorCel}
                  mask = "(99) 99999-9999"
                  errorMessage = "Digite o telefone celular"
                  titleColor="dark"
                  requiredField 
                  value={cel}
                  onChange={ (evt) => {
                    setErrorCel(false)
                    setCel(evt.target.value)}} 
                  />
              </div>
              <div>
                <Input 
                  title="Telefone Fixo"                
                  mask="9999-9999"
                  errorMessage = "Digite o telefone Fixo"
                  titleColor="dark"          
                  value={tel}
                  onChange={ (evt) => {                  
                    setTel(evt.target.value)}}                    
                  />
              </div>
            </div>

            <div className="title">
              <p className="text-[#666666] text-m my-1">Endereço do cliente</p>
            </div>

           <FormAddEndereco
            salvarEndereco = { (newEndereco) => { setEnderecoDto(newEndereco) }}
            endereco={enderecoDto ?? {} }
            setErrorEndereco={ (e) => setErrorEndereco(e) }
            
          />
                 
           <FormVerificaData
              setDataColetaFinal ={ (coleta) =>{ setDataColeta(coleta)}}
              dataColeta={dataColeta}
                 
            />

            <FormAddMateriais
              listaMateriais = {listaMateriais}
              salvarMateriaislista = { (materiais) => setListaMateriais(materiais)}             
            /> 

           
            <div className="flex w-full justify-center">
              <div className="flex w-fit">
                {
                  isUpdate === true &&
                  <>
                    <div className="w-[14rem] me-10">
                      <Button
                        type="button"
                        color="info"
                        label="Cancelar"
                        className="w-full mt-[15px] mb-5"
                        onClick={() => {

                        }}
                      />
                    </div>
                    <div className="w-[14rem] me-40">
                      <Button
                        type="button"
                        label="Excluir agendamento"
                        color="danger"

                        className="w-full mt-[15px] mb-5"
                        onClick={() => {
                          if (isUpdate) {
                            deletarAgendamento()
                          }
                        }}
                      />
                    </div>
                  </>
                }
              
                <div className="w-[16rem] me-2">
                  <Button2
                    type="button"
                    label="Enviar agendamento"
                    className="w-full mt-[15px] mb-5"
                    onClick={() => {

                      if (validarCampos()) {
                        if (!isUpdate)
                          CriarAgendamentoColeta()
                        else
                          AlterarAgendamentoColeta()
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ColetaPage;
