import { useEffect, useState } from "react"
import { Button2 } from "../../../components/Button2"
import { InputDate } from "../../../components/InputDate"
import InputTime from "../../../components/InputTime"
import { coletaService } from "../../../services/ColetaService"
import { DateConvert } from "../../../utils/DateConvert"

export type FormVerificaDataProps = {
    setDataColetaFinal : (coleta : string) => void,
    dataColeta : string,
}

export const FormVerificaData = ({setDataColetaFinal, dataColeta }: FormVerificaDataProps) => {
    const [mensagem, setMensagem] = useState<any>()
    const [horarioColeta, setHorarioColeta] = useState(String)
    const [dataColetaDia, setDataColetaDia] = useState(String)
   
    const divideHorario = (dat: string) => {   
             
        if (dat !== "") {
            let dataDividida: string[] = dat.split("T")
            const [h, m] = dataDividida[1].split(":");
            setHorarioColeta(`${h}:${m}`)
            setDataColetaDia(dataDividida[0])
        }
    }

    useEffect(() => {
        divideHorario(dataColeta)
    }, [dataColeta])
    

    const formataNovoHorario = (hora: string, dia: string) => {
        if (hora.length === 0 || dia.length === 0) {
            alert("Data invalida!");
            return;
        }

        let isValid = true;
        try {
            new Date(dia +'T'+hora);
        } catch (e) {
            isValid = false;
        }
        if (!isValid) {
            alert("Data invalida!");
            return;
        }

        const [anoStr, mesStr, diaStr] = dia.split('-');
        const diaNum = parseInt(diaStr, 10);
        const mesNum = parseInt(mesStr, 10) - 1; // Mês em JavaScript é zero-indexado
        const anoNum = parseInt(anoStr, 10);

        const [horaStr, minutoStr] = hora.split(':');
        const horaNum = parseInt(horaStr, 10);
        const minutoNum = parseInt(minutoStr, 10);
        return new Date(anoNum, mesNum, diaNum, horaNum, minutoNum);     
    }

    const mensagemDisponibilidade = (status: boolean) => {
        if (!status) {
            return (
                <div className=" bg-input-color w-[60%] flex flex-row justify-between p-4 rounded-lg">
                    <p className=""> A Horário da coleta se encontra disponível !!</p>
                    <button onClick={() => {setMensagem(undefined)}} className="w-[1.5rem] h-[1.5rem] flex justify-center items-center text-[1.5rem] text-red-600">X</button>
                </div>
            )
        } else {
            return (
                <div className=" bg-[#f5d6d6]  w-[60%] flex flex-row justify-between p-4 rounded-lg">
                    <p className=""> O Horário da coleta não se encontra disponível, por favor escolha outro horario!!</p>
                    <button onClick={() => {setMensagem(undefined)}} className="w-[1.5rem] h-[1.5rem] flex justify-center items-center text-[1.5rem] text-red-600">X</button>
                </div>
            )
        }
    }

    return (
        <>
            <h4 className="text-[#666666] text-lg my-1"> Verificação de disponibilidade da coleta </h4>        
            {
                mensagem  
            }
            <div className="w-[80%] min-h-screen lg:min-h-fit flex rounded-lg bg-[#E8F4EB] items-center justify-center flex-row lg:min-w-80% ">
                          
                <div>
                    <InputDate
                        label="Data da coleta"
                        type="date"
                        required
                        value={dataColetaDia}                  
                        onChange={(evt) => setDataColetaDia(evt.target.value)}
                    />
                </div>
                <div>
                    <InputTime
                        label="Horário de Coleta"
                        type="time"
                        required
                        value={horarioColeta}
                        onChange={(evt) => setHorarioColeta(evt.target.value)}
                    />
                </div>
                <div>
                    <Button2
                        type="button"
                        label="Verificar disponibilidade"
                        className="w-[90%] mt-[15px]"
                        onClick={ async () => {
                                                      
                            const data = formataNovoHorario(horarioColeta, dataColetaDia)  
                            if (data) {
                                const resultado = await coletaService.VerificaDisponibilidadeColeta(data)
                                if (!resultado) {
                                    setDataColetaFinal(DateConvert.getIsoDateTime(data));
                                }
                                setMensagem(mensagemDisponibilidade(resultado))
                            }
                        }}                                            
                    />
                </div>
            </div>
        </>

    )
}