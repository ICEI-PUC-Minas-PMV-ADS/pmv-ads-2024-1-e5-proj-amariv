import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { InputDate } from "../../components/InputDate";
import { InputTime } from "../../components/InputTime";
import { Button2 } from "../../components/Button2";
import { Form } from "../../components/Form";
import "./index.css";
import { FormAddMateriais } from "./components/FormAddMateriais";
import { CreateColetaDto } from "../../models/ColetaDtos/CreateColetaDto";
import { CreateEnderecoDto } from "../../models/EnderecoDtos/CreateEnderecoDto";
import { coletaController } from "./ColetaController";
import { EnderecoService } from "../../services/EnderecoService";
import { coletaService } from "../../services/ColetaService";



export function ColetaPage() {
  const [nome, setNome ] = useState(String)
  const [cel, setCel ] = useState(String)
  const [tel, setTel] = useState(String)
  const [cep, setCep ] = useState(String)
  const [logradouro, setLogradouro ] = useState(String)
  const [numero, setNumero ] = useState(String)
  const [bairro, setBairro ] = useState(String)
  const [cidade, setCidade ] = useState(String)
  const [complemento, setComplemento] = useState(String)
  const [listaMateriais, setListaMateriais ]  = useState<string>("")
  const [dataColeta, setDataColeta ] = useState(String)
  const [horarioColeta, setHorarioColeta ] = useState(String)
 

  function VerificaDisponibilidadeHorario(): void {
    throw new Error("Function not implemented.");
  }

  async function CriarAgendamentoColeta(): Promise<void> {
    try {
      
      var enderecoDto : CreateEnderecoDto = {
        logradouro : logradouro,
        numero : numero,
        bairro : bairro,
        cep : cep,
        cidade : cidade,
        referencia : complemento
      };

      const endereco = await EnderecoService.salvarEndereco(enderecoDto);
      
      var coletaDto : CreateColetaDto = {
        userId: "4be676cf-a7db-4dc7-a344-8698eb6ba330",
        enderecoId: endereco.successes[0].message,
        clienteNome : nome,
        clienteCel : cel,
        clienteTel : tel,
        lat: 11111,
        lon: 22222,
        dataCadastro : new Date(Date.now()),
        dataDeColeta : coletaController.converteStringEmDate(dataColeta),
        listaItensColeta: listaMateriais,
        status: false
      };

     const coleta = await coletaService.salvarColeta(coletaDto,"4be676cf-a7db-4dc7-a344-8698eb6ba330");

    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="App">
      
        <div className="content">
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem]">
            Novo agendamento de coleta
          </h2>
          <div className="title">
            <p className="text-[#666666] text-sm my-1">Dados do cliente</p>
          </div>

          <Form>
            <div className="dados-cliente">
              <div>
                <Input type="text"
                  label="Nome"
                  id="txtNome"
                  value={nome}
                  onChange={ (evt) => setNome(evt.target.value)} 
                  required 
                  />
              </div>
              <div>
                <Input 
                  type="tel"
                  label="Celular" 
                  id="txtCel" 
                  value={cel}
                  onChange={ (evt) => setCel(evt.target.value)} 
                  />
              </div>
              <div>
                <Input 
                  type="tel" 
                  label="Telefone Fixo"  
                  id="txtTel" 
                  value={tel}
                  onChange={ (evt) => setTel(evt.target.value)} 
                  required 
                  />
              </div>
            </div>

            <div className="title">
              <p className="text-[#666666] text-m my-1">Endereço do cliente</p>
            </div>
            <div className="endereco-cliente">
              <div>
                <Input 
                  type="text" 
                  label="CEP" 
                  value={cep}
                  onChange={ (evt) => setCep(evt.target.value)} 
                  required />
              </div>
              <div>
                <Input 
                  type="text" 
                  label="Logradouro" 
                  value={logradouro}
                  onChange={ (evt) => setLogradouro(evt.target.value)} 
                  required />
              </div>
              <div>
                <Input 
                  type="text" 
                  label="Número" 
                  value={numero}
                  onChange={ (evt) => setNumero(evt.target.value)} 
                  required />
              </div>
            </div>
            <div className="endereco-cliente">
              <div>
                <Input 
                  type="text" 
                  label="Bairro" 
                  value={bairro}
                  onChange={ (evt) => setBairro(evt.target.value)} 
                  required />
              </div>
              <div>
                <Input 
                  type="text" 
                  label="Cidade" 
                  value={cidade}
                  onChange={ (evt) => setCidade(evt.target.value)} 
                  required />
              </div>
              <div>
                <Input 
                  type="text" 
                  label="Complemento" 
                  value={complemento}
                  onChange={ (evt) => setComplemento(evt.target.value)} 
                  required />
              </div>
            </div>
            <div className="endereco-cliente">
              <div>
                <InputDate
                  label="Data da coleta"
                  type="date"               
                  value={dataColeta}
                  onChange={ (evt) => setDataColeta(evt.target.value)} 
                />
              </div>
              <div>
                <InputTime
                  label="Horário de Coleta"
                  type="time"            
                  value={horarioColeta}
                  onChange={ (evt) => setHorarioColeta(evt.target.value)} 
                />
              </div>
              <div>
                <Button2
                  type="button"
                  label="Verificar disponibilidade"
                  className="w-[90%] mt-[15px]"
                  onClick={VerificaDisponibilidadeHorario}
                />
              </div>
            </div>
            
            <FormAddMateriais 
              listaMateriais = {listaMateriais}
              salvarMateriaislista = { (evt) => setListaMateriais(evt)}             
            />  

            <Button2
              type="button"
              label="Criar agendamento"
              className="w-[40%] mt-[15px]"
              onClick={() => CriarAgendamentoColeta()}
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export default ColetaPage;
